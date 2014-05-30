;(function($) {
    /* test */
    $(document).on('click', '.test-modal', function(e) {
        var modal = '<div class="modal"><div class="modal-inner"><div class="modal-heading"><a href="#" class="modal-close"><i class="fa fa-times"></i></a>Yup! This is a modal</div><div class="modal-body">This is only a test buddy!</div><div class="modal-footer text-right"><a href="#" class="modal-close button button-black">Close</a></div></div></div>';

        $(modal).hide().appendTo('body').fadeIn(150);
        e.preventDefault();
    });
})(jQuery);