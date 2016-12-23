(function ($) {
    'use strict';

    jQuery(document).ready(function () {
        $(window).load(function () {
            $('.preloader').fadeOut();
            $('.preloader-area').delay(350).fadeOut('slow');
        });
    });
})(jQuery);
