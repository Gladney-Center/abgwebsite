var domesticScore = 0,
    internationalScore = 0,
    fosterScore = 0,
    destinations = {
        domestic: {
            title: "Domestic Infant Adoption",
            url: "/i-want-to-adopt/domestic-infant"
        },
        international: {
            title: "International Adoption",
            url: "/i-want-to-adopt/international"
        },
        foster: {
            title: "Foster Adoption",
            url: "/i-want-to-adopt/foster-adoption"
        }
    },
    Wizard = {

    init: function() {
        if ($('.wizard').length) {
            this.bindUIActions();
        }
    },

    bindUIActions: function() {
        $('.btn-answer').click(function(e) {
            e.preventDefault();
            var btn = $(this), // the clicked button
                q = btn.closest('.question'), // the parent "question" of the button
                dWeight = btn.data('weightDomestic'),
                iWeight = btn.data('weightInternational'),
                fWeight = btn.data('weightFoster'),
                theBrosen = btn.siblings('.selected'), // any previously selected button
                next = btn.attr('href'); // the next question in the wizard

            // If the user wants to change an answer, this will remove the score
            // from the previous selected button before adding the new scores
            if (theBrosen.length) {
                domesticScore -= theBrosen.data('weightDomestic');
                internationalScore -= theBrosen.data('weightInternational');
                fosterScore -= theBrosen.data('weightFoster');
            }

            btn.siblings().removeClass('selected');
            btn.addClass('selected');
            $(next).addClass('viewed');
            document.querySelector(next).scrollIntoView({ behavior: 'smooth' });
            Wizard.calculateAnswers(dWeight, iWeight, fWeight);
        });

        $('.btn-start-over').click(function(e) {
           e.preventDefault();
           document.querySelector('#wizard').scrollIntoView({ behavior: 'smooth' });
        });
    },

    calculateAnswers: function(dw, iw, fw) {
        domesticScore += dw;
        internationalScore += iw;
        fosterScore += fw;

        var totals = {
            domestic: domesticScore,
            international: internationalScore,
            foster: fosterScore
        };

        // This figures out which of the three current scores is the highest
        var winner = Object.keys(totals).reduce(function(a, b) {
            return totals[a] > totals[b] ? a : b;
        });

        // console.log('domesticScore: ' + domesticScore);
        // console.log('internationalScore: ' + internationalScore);
        // console.log('fosterScore: ' + fosterScore);
        // console.log('------------------------');
        // console.log('winner: ' + destinations[winner].title);
        // console.log(' ');

        $('.answer .type-title').text(destinations[winner].title);
        $('.answer .button').attr('href', destinations[winner].url);
    },

    resetWizard: function() {
        $('.wizard .question').removeClass('viewed ');
        $('.wizard .answer').removeClass('viewed ');
        $('.wizard .btn-answer').removeClass('selected');
        domesticScore = 0;
        internationalScore = 0;
        fosterScore = 0;
    }

};