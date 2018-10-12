var Carousels = {

    init: function() {
        this.imageCarousel();
        this.contentCarousel();
        this.thumbnailCarousel();
    },

    imageCarousel: function() {
        if ($(".js-image-carousel").length) {
            var $carousel = $(".js-image-carousel").flickity({
                cellAlign: 'center',
                wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
                autoPlay: 3000
            });


            /* Click an item to select that item */
            $carousel.on( 'staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
                if ( typeof cellIndex == 'number' ) {
                    $carousel.flickity( 'selectCell', cellIndex );
                }
            });
        }
    },

    contentCarousel: function() {
        if ($(".js-content-carousel").length) {
            $(".js-content-carousel").flickity({
                wrapAround: true,
                pageDots: false,
                autoPlay: 6000
            });
        }
    },

    thumbnailCarousel: function() {
        if ($('.js-thumbnail-carousel').length) {
            var $carousel = $('.js-thumbnail-carousel .thumbnail-carousel__carousel').flickity({
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true
            });

            // Flickity instance
            var flkty = $carousel.data('flickity');
            // elements
            var $thumbnails = $('.js-thumbnail-carousel .thumbnail-carousel__thumbs');
            var $cellButtons = $thumbnails.find('a');

            // update selected cellButtons
            $carousel.on( 'select.flickity', function() {
                $cellButtons.filter('.is-selected')
                    .removeClass('is-selected');
                $cellButtons.eq( flkty.selectedIndex )
                    .addClass('is-selected');
            });

            // select cell on button click
            $thumbnails.on( 'click', 'a', function(e) {
                e.preventDefault();
                var index = $(this).index();
                $carousel.flickity( 'select', index );
            });
            // previous
            $('.js-thumbnail-carousel .thumbnail-carousel__prev').on( 'click', function(e) {
                e.preventDefault();
                $carousel.flickity('previous');
            });
            // next
            $('.js-thumbnail-carousel .thumbnail-carousel__next').on( 'click', function(e) {
                e.preventDefault();
                $carousel.flickity('next');
            });
        }
    }

};
