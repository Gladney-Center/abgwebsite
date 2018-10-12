var ProfileSearch = {

    init: function() {
        if ($(".js-profile-search-toggle").length) {
            this.bindUIActions();
        }
    },

    bindUIActions: function() {
        $(".js-profile-search-toggle").on("click", function(e) {
            e.preventDefault();
            $(this).parent().next().toggleClass('is-open');
            $(this).html($(this).text() == 'Show filters' ? 'Hide filters' : 'Show filters');
        });
    }

};
