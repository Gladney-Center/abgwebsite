var ar_s,
    AgeRange = {

    settings: {
        start: [ 0, 18 ],
        connect: true,
        step: 1,
        tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
        range: {
            'min': [  0 ],
            'max': [ 18 ]
        }
    },

    init: function() {
        ar_s = this.settings;

        if ($('#ageRange').length) {
            var handlesSlider = document.getElementById('ageRange');
            noUiSlider.create(handlesSlider, ar_s);
        }
    }

};
