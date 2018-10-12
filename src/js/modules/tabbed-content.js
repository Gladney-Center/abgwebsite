var tc_s,
    TabbedContent = {

    settings: {
        module: $('.tabbed-content'),
    },

    init: function() {
        tc_s = this.settings;


        if (tc_s.module.length) {
            tc_s.module.each(function(index) {
                $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
            });

            this.bindUIActions();
        }
    },

    bindUIActions: function() {
        tc_s.module.on('click', '.tabbed-content__title', function(e) {
            e.preventDefault();
            if (!$(this).hasClass('is-active')) {
                var accordionTabs = $(this).closest('.tabbed-content');
                accordionTabs.find('.is-open').removeClass('is-open').hide();

                $(this).next().toggleClass('is-open').toggle();
                accordionTabs.find('.is-active').removeClass('is-active');
                $(this).addClass('is-active');
            }
        });
    }

};