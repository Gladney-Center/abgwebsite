// Borrowed from the great Chris Coyier at CSS-Tricks:
// https://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/

var sm_s,
    NewsWidget = {

    settings: {
        numArticles: 5,
        articleList: $("#article-list"),
        moreButton: $("#more-button")
    },

    init: function() {
        sm_s = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        sm_s.moreButton.on("click", function() {
            NewsWidget.getMoreArticles(sm_s.numArticles);
        });
    },

    getMoreArticles: function(numToGet) {
        // $.ajax or something
        // using numToGet as param
    }

};