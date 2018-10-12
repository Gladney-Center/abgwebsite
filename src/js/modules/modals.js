var Modals = {

    init: function() {
        this.modalInline();
        this.modalWizard();
        this.modalVideo();
    },

    modalInline: function() {
        if ($(".js-modal-trigger").length) {
            $(".js-modal-trigger").magnificPopup({
                type:'inline',
                mainClass: 'mfp-fade',
                midClick: true,
                closeMarkup: '<span title="%title%" class="mfp-close">Close Window</span>'
            });
        }
    },

    modalWizard: function() {
        if ($(".js-wizard-modal-trigger").length) {
            $(".js-wizard-modal-trigger").magnificPopup({
                type:'inline',
                mainClass: 'modal--wizard mfp-fade',
                removalDelay: 300,
                closeMarkup: '<span title="%title%" class="mfp-close">Exit Questionnaire</span>',
                callbacks: {
                    open: function() {
                        $('html').addClass('modal-open');
                    },
                    close: function() {
                        $('html').removeClass('modal-open');
                        Wizard.resetWizard();
                    }
                }
            });
        }
    },

    modalVideo: function() {
        if ($(".js-video-modal-trigger").length) {
            $(".js-video-modal-trigger").magnificPopup({
                type:'inline',
                mainClass: 'modal--video mfp-fade',
                closeMarkup: '<span title="%title%" class="mfp-close">Close Window</span>'
            });
        }
    }

};
