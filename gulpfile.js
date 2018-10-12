// cache       = require('gulp-cached'),
// changed     = require('gulp-changed'),
// critical    = require('critical');
// csslint     = require('gulp-csslint'),
// favicons    = require('gulp-favicons'),
// jshint      = require('gulp-jshint'),
// log         = require('fancy-log'),
// newer       = require('gulp-newer'),
// print       = require('gulp-print'),
// replace     = require('gulp-replace'),
// scsslint    = require('gulp-scss-lint'),

var gulp = require('gulp');
const $ = require('gulp-load-plugins')({
	pattern: ['*'],
	scope: ['dependencies']
});

var config = {
	brandingColor:           "#36a97f",
	proxyUrl:                "gladney",
	srcPath:                 "src/",
	buildPath:               "public/static/",
	templatesPath:           "templates/",
	bowerJsLibs:    [
		"src/js/modules/konami.js",
		"src/bower/jquery.easie.js/js/jquery.easie.js",
		"src/bower/flickity/dist/flickity.pkgd.js",
		"src/bower/jquery-validation/dist/jquery.validate.js",
		"src/bower/magnific-popup/dist/jquery.magnific-popup.js",
		"src/bower/wnumb/wNumb.js",
		"src/bower/nouislider/distribute/nouislider.js",
		"node_modules/headroom.js/dist/headroom.min.js",
		"node_modules/headroom.js/dist/jQuery.headroom.min.js",
		"node_modules/smoothscroll-polyfill/dist/smoothscroll.js",
		"src/js/modules/jquery.scroll-to-anchor.js",
		"src/js/modules/site-navigation.js",
		"src/js/modules/show-hide-header.js",
		"src/js/modules/carousels.js",
		"src/js/modules/modals.js",
		"src/js/modules/tabbed-content.js",
		"src/js/modules/profile-search.js",
		"src/js/modules/age-range.js",
		"src/js/modules/wizard.js",
		"src/js/modules/sticky-image.js",
	],
};

gulp.task('scss', function() {
	var onError = function(err) {
		$.notify.onError({
			title:           "Gulp",
			subtitle:        "SCSS failure",
			message:         "<%= error.message %>",
		})(err);
		this.emit('end');
	};

	return gulp.src(config.srcPath+'scss/global.scss')
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.sourcemaps.init())
		.pipe($.sassGlob())
		.pipe($.sass())
		.pipe($.autoprefixer())
		.pipe($.minifyCss())
		.pipe($.size({ gzip: true, showFiles: true }))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(config.buildPath+'css'))
		.pipe($.browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', function() {
	$.browserSync({
		logConnections:      false,
		open:                false,
		proxy:               config.proxyUrl,
		reloadOnRestart:     true,
		xip:                 true,
	});
});

gulp.task('js', function() {
	gulp.src( config.bowerJsLibs.concat(config.srcPath+'js/global.js') )
		.pipe($.uglify())
		.pipe($.concat('global.js'))
		.pipe($.size({ gzip: true, showFiles: true }))
		.pipe(gulp.dest(config.buildPath+'js'))
		.pipe($.browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch(config.srcPath+'scss/**/*', ['scss']);
	gulp.watch(config.srcPath+'js/**/*', ['js']);
	gulp.watch(config.srcPath+'sketch/**/*', ['sketch']);
	gulp.watch(config.srcPath+'img/**/*', ['imgmin', 'icon-sprite']);
	gulp.watch(config.templatesPath+'**/*').on("change", $.browserSync.reload);
});

gulp.task("sketch", function(){
	gulp.src(config.srcPath+'sketch/*.sketch')
		.pipe($.sketch({
			export:          "slices",
			formats:         "svg",
			saveForWeb:      true,
			trimmed:         true,
		}))
		.pipe(gulp.dest(config.srcPath+'img/'));
});

gulp.task('imgmin', function () {
	return gulp.src(config.srcPath+'img/**/*.*')
		.pipe($.image({
			pngquant:        true,
			optipng:         false,
			zopflipng:       true,
			jpegRecompress:  false,
			jpegoptim:       true,
			mozjpeg:         true,
			gifsicle:        true,
			svgo:            true,
			concurrent:      10
		}))
		.pipe(gulp.dest(config.buildPath+'img'));
});

gulp.task("icon-sprite", function(){
	$.del([config.buildPath+'img/sprite']).then(function(paths) {
		return gulp.src(config.srcPath+'img/icons/*.svg')
			.pipe($.cleanSketch())
			.pipe($.svgstore())
			.pipe(gulp.dest(config.buildPath+'img/sprite'))
			.pipe($.browserSync.stream());
	});
});

gulp.task('generate-favicons', function(cb) {
	$.del([
		config.buildPath+'favicons',
		config.srcPath+'favicons.json',
	]).then(function(paths) {
		return $.realFavicon.generateFavicon({
			masterPicture: config.srcPath+'img/favicons/simple.svg',
			dest: config.buildPath+'favicons',
			iconsPath: '/static/favicons',
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin',
					backgroundColor: config.brandingColor,
					margin: '14%',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true
					}
				},
				desktopBrowser: {},
				windows: {
					masterPicture: config.srcPath+'img/favicons/simple.svg',
					pictureAspect: 'whiteSilhouette',
					backgroundColor: config.brandingColor,
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false
						}
					}
				},
				androidChrome: {
					pictureAspect: 'shadow',
					themeColor: config.brandingColor,
					manifest: {
						display: 'browser',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false
					}
				},
				safariPinnedTab: {
					masterPicture: config.srcPath+'img/favicons/simple.svg',
					pictureAspect: 'silhouette',
					themeColor: config.brandingColor
				}
			},
			settings: {
				compression: 1,
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false
			},
			markupFile: config.srcPath+'favicons.json'
		}, function(){
			cb();
		});
	});
});

gulp.task('write-favicon-twig', function(cb) {
	var faviconJson = JSON.parse($.fs.readFileSync(config.srcPath+'/favicons.json'));
	$.fs.writeFile('templates/_includes/favicons.twig', faviconJson.favicon.html_code, cb);
});

gulp.task('open-favicon-preview', function() {
	var faviconJson = JSON.parse($.fs.readFileSync(config.srcPath+'/favicons.json'));
	$.del([
		config.srcPath+'/favicons.json',
	]);
	return gulp.src(__filename)
		.pipe($.open({ uri: faviconJson.preview_picture_url }));
});

gulp.task('favicons', function(cb) {
	$.runSequence('sketch', 'generate-favicons', 'write-favicon-twig', 'open-favicon-preview', cb);
});

gulp.task('default', ['browser-sync', 'watch']);
