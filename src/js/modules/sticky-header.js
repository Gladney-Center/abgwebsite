// Borrowed from the great Chris Coyier at CSS-Tricks:
// https://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/
var sh_s,
    StickyHeader = {

    settings: {
        lastScrollTop: 0,
        delta: 40,
        lastDir: 'up'
    },

    init: function() {
        sh_s = this.settings;

        var st = window.pageYOffset | document.body.scrollTop;
        if (st >= 40) {
            document.documentElement.classList.add('scrolled');
        }

        this.bindUIActions();
    },

    bindUIActions: function() {
        window.onscroll = function() {
            StickyHeader.setHeader();
        }
    },

    setHeader: function() {
        var st = window.pageYOffset | document.body.scrollTop,
            dir;

        if (Math.abs(sh_s.lastScrollTop - st) <= sh_s.delta) {
            return;
        }

        if (st > sh_s.lastScrollTop) {
            // downscroll code
            dir = 'down';
        } else {
            // upscroll code
            dir = 'up';
        }

        if (st > sh_s.delta) {
            document.documentElement.classList.add('scrolled');
        } else {
            document.documentElement.classList.remove('scrolled');
        }

        lastDir = dir;
        sh_s.lastScrollTop = st;
    }

};