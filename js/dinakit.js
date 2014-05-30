(function($) {

    /* modal close */
    $(document).on('click', '.alert-close', function(e) {
        $(this).closest('.alert').hide(150, function() {
            $(this).remove();
        });
        e.preventDefault();
    });

    /* modal close */
    $(document).on('click', '.modal-close', function(e) {
        $(this).closest('.modal').fadeOut(150, function() {
            $(this).remove();
        });
        e.preventDefault();
    });

    /* dropdown toggle */
    $(document).on('click', '.dropdown', function(e) {
        $(this).children('.dropdown-menu').toggleClass('open');
        e.preventDefault();
    });
    $('html, body').on('click', function() {
        if($('.dropdown-menu').hasClass('open')) {
            $('.dropdown-menu').removeClass('open');
        }
    });

})(jQuery);