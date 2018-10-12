var si_s,
    StickyImage = {

    settings: {
        bounds: document.body.querySelector('.success-story'),
        image: document.body.querySelector('.image-float-right'),
        lastScrollTop: 0,
        delta: 40,
        lastDir: 'up'
    },

    init: function() {
        si_s = this.settings;

        if (si_s.image) {
            var st = window.pageYOffset | document.body.scrollTop;
            if (st >= 40) {
                si_s.image.classList.add('stuck');
            }

            this.bindUIActions();
        }
    },

    bindUIActions: function() {
        window.onscroll = function() {
            StickyImage.setImage();
        }
    },

    setImage: function() {
        var st = window.pageYOffset | document.body.scrollTop,
            domRect = si_s.bounds.getBoundingClientRect(),
            dir;

        // console.log('top: ' + domRect.top);

        if (Math.abs(si_s.lastScrollTop - st) <= si_s.delta) {
            return;
        }

        if (st > si_s.lastScrollTop) {
            // downscroll code
            dir = 'down';
            if (domRect.top < 0) {
                si_s.image.classList.add('stuck');
            }
        } else {
            // upscroll code
            dir = 'up';
            if (domRect.top > 0) {
                si_s.image.classList.remove('stuck');
            }
        }

        lastDir = dir;
        si_s.lastScrollTop = st;
    }

};