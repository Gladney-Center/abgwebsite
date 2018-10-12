# Gladney.org

## Local Setup

### Domain/DB
* Set up a local domain `gladney` and point it at the `public` folder
* If the project is already staged use Cap...
  * `cap staging db:pull` to create the empty database locally and copy down the staging contents.
* Otherwise if this is a new project...
  * Create a database `gladney`
  * Import the latest DB dump from the `/setup` folder
  * Edit the database credentials in `/config/db.php` under `local`, you should only need to edit the database name.

### Craft
* From the project root `chmod -R 777 craft/{app,config,storage} && chmod -R 777 public/uploads` to set the relevant permissions.

### Front-end
* Run `yarn && bower install` to have all required depenedences (npm for gulp and bower for front-end) installed.
* Update the `proxyUrl` attribute in the `config` array in `gulpfile.js`.
* Run `gulp` to get started, it'll compile CSS and JS. BrowserSync watches for changes and refreshes HTML/JS changes and injects CSS changes inline.

### Bonus
* __Sketch__: To use the `gulp sketch` task first make sure you have [SketchTool](http://www.sketchapp.com/tool/) installed. Name your slices in your sketch document in the format `<folder>/<image>`. e.g. `icons/twitter`, Sketchtool will export this out as an SVG to `src/img/icons/twitter.svg`. Sketch is also set up with artboards correctly sized, named and with suitable background colours ready for a Favicon (see below), Crafts "Login Page Logo", and Crafts "Site Icon".
* __Image Optimizaion__: To optimize images from `src/img` run `gulp imgmin`, it'll run over all filetypes and drop the smaller versions into `public/static/img` in the same folder structure, showing you what was saved along the way.
* __SVG Icon Sprites__: `gulp icon-sprite` will take all `.svg` files from `/public/static/img/icons` (use `gulp sketch` and slice names above) and will generate an SVG sprite `/public/static/img/sprite/icons.svg`. The icons will be flattened and colours will be removed (hence them only being useful for icons, so you'll need to define them with `fill` in your CSS). There's also a twig macro _svgSprite_ to help out - `{{ svgSprite.icon('twitter','Twitter Icon','twitter--white') }}` outputs the SVG syntax with _use_ method with the second optional parameter letting you add a `<title>` element inside the SVG (they'll be stripped out from the source icons). The SVG is given a class of `icon icon-{{ icon }}`. The third parameter is optional and lets you set a modifier – in this example the output would be `<svg class="icon icon-twitter icon-twitter--white">`
* __Favicons__: `gulp favicons` takes `/src/img/favicon.svg` along with some sensible defaults and `config.brandingColor` and uses the [Real Favicon Generator](https://realfavicongenerator.net/) API to generate the optimum favicons across the board of platforms and browsers. When the API call completes a `/src/favicons.json` will appear, this is parsed and `/templates/_includes/favicons.twig` is generated, along with a preview image which is downloaded. The `/public/static/favicons` folder and `/src/favicons.json` files are deleted before this task is run. Note that `config.brandingColor` requires the hex code to be lowercase.


### SCSS Structure

- **Base** are the most basic HTML elements, without classes
- **Components** are small items, usually one or two elements
- **Modules** are bigger, usually made up of a few components. They can be reused throughout and are likely to feature on more than one page.
- **Layouts** are containers into which modules are placed. Other than a few special cases (base, container, grid, matrix, flush), these are all page-specific (e.g. `l-home-intro`). They don’t introduce any new styles – they just dictate how modules placed within Tham are laid out.
- **Helpers** are mixins and utilities. Utility classes (e.g. `u-push—bottom`) are used to style elements which aren’t within a more specific module. E.g. a certain heading might need an extra bottom margin, but if it doesn’t already have a class and isn’t within another module then a utility class can be used instead.

### Craft Plugins
There are a few plugins installed by default - we keep these in the repo and installed since they almost never get updated.

- [Typogrify](https://github.com/jamiepittock/craft-typogrify): Used mostly for the `widont` filter but has other uses
- [Cache Bust Files](https://github.com/davist11/craft-bust): Adds last modified timestamp querystrings to static assets
- [Inlin](https://github.com/aelvan/Inlin-Craft): Let's us inline files, usually SVGs from the static folder.
- [Hacksaw](https://github.com/ehousestudio/craft_hacksaw): Allows us to truncate text with neat features.
- [SuperTable](https://github.com/engram-design/SuperTable): Adds a neat small table field similar to table but can be restricted.
- [VZ Address](https://github.com/elivz/VzAddress-Craft): A single field for adding addresses into multifields.

The following plugins we use regularly, but since they're frequently updated they're not in the repo

- [SEOmatic](https://github.com/nystudio107/seomatic): Handles everything related to SEO and more
- [A&M Forms](https://github.com/am-impact/amforms): Easy form builder with fields, notifications and more
- [A&M Navigation](https://github.com/am-impact/amnav): Super flexible navigation builder

You might also like...

- [Retour](https://github.com/nystudio107/retour): For creating static and dynamic redirects if you're redeveloping an existing site.
- [Import](https://github.com/boboldehampsink/import): When you've got a ton of content to add.
- [Neo](https://github.com/benjamminf/craft-neo): If you'd like nested Matrix fields or adding tabs to blocks.
- [Reasons](https://github.com/mmikkel/Reasons-Craft): Adds conditional fields on field layouts.
- [QuickFields](https://github.com/benjamminf/craft-quick-field): Create fields super quickly on the field layout designer.
- [SimpleMap](https://github.com/ethercreative/SimpleMap): Lightweight Google Maps fieldtype.

I could go on forever - there's obviously a ton more, [CraftPlug.in](http://craftplug.in/) is a great place for finding them! [Craft CLI](https://github.com/rsanchez/craft-cli) can save a ton of time installing these plugins and doing other cool stuff.
