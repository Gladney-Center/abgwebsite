var ShowHideHeader = {

    init: function() {
        $(".site-header").headroom({
            offset: 150,
            // callback when pinned, `this` is headroom object
            onPin : function() {
                $('html').removeClass('header-unpinned');
                $('html').addClass('header-pinned');
            },
            // callback when unpinned, `this` is headroom object
            onUnpin : function() {
                $('html').addClass('header-unpinned');
                $('html').removeClass('header-pinned');
            },
            // callback when above offset, `this` is headroom object
            onTop : function() {
                $('html').removeClass('scrolled');
            },
            // callback when below offset, `this` is headroom object
            onNotTop : function() {
                $('html').addClass('scrolled');
            },
        });
    }

};
