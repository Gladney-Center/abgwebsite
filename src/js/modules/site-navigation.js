var SiteNavigation = {

    init: function() {
        this.bindUIActions();
    },

    bindUIActions: function() {
        var mod = this;
        $(".js-site-nav-toggle").click( mod.toggleMainNav );
        $(".subnav__label").click(function(e) {
            if ($(window).width() < 1180) {
                mod.toggleSubNav(e);
            }
        });
    },

    toggleMainNav: function(e) {
        e.preventDefault();
        $("html").removeClass('site-subnav-is-open').toggleClass('site-nav-is-open');
    },

    toggleSubNav: function(e) {
        e.preventDefault();
        $("html").toggleClass('site-subnav-is-open');
    }

};