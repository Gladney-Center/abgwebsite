// Requires jQuery, and the Easie jQuery plugin
// `bower install jquery.easie.js --save-dev`

var ScrollToAnchor = {

    init: function() {
        sta_s = this.settings;
        this.bindUIActions();

        // If there is a hash in the URL:
        if(window.location.hash) {
            var targetId = window.location.hash;
            this.scrollPage(targetId, this.getHeaderHeight());
        }
    },

    bindUIActions: function() {
        $('.scroll').click(function(e) {
            var target_id,
                pad = ScrollToAnchor.getHeaderHeight(),
                attr = $(this).attr('href');

            if (typeof attr !== typeof undefined && attr !== false) {
                target_id = attr;
            } else {
                target_id = $('a', this).attr('href');
            }

            ScrollToAnchor.scrollPage(target_id, pad);

            $('html').removeClass('menu-open');
            e.preventDefault();
        });
    },

    getHeaderHeight: function() {
        var headHeight;
        headHeight = $('#header-main').outerHeight();
        return headHeight;
    },

    scrollPage: function(trgt, offset) {
        if (typeof offset === 'undefined') {
            offset = 0;
        }

        var target_offset,
            target_array,
            target_top,
            pad,
            dest,
            doc_h = $(document).height(),
            win_h = $(window).height(),
            avail_scroll = doc_h - win_h;

        if (trgt === "#top" || trgt === "#") {
            target_top = 0;
            offset = 0;
        } else {
            target_array = trgt.split('#');
            target_offset = $('#' + target_array[1]).offset();
            target_top = target_offset.top;
        }

        pad = offset;
        dest = target_top - pad;

        if (dest > avail_scroll) {
            dest = avail_scroll;
        }

        $('html, body').stop().animate({scrollTop:dest}, 750, 'easieEaseInOutCubic');
    }

};