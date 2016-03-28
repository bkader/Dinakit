/*
 * # Dinakit Framework 2.0.0 by @KaderBouyakoub <bkader@mail.com>
 * https://bitbucket.org/iangraphics/dinakit - http://dinakit.tk/
 * License - "Don't Be A Dick License" - DBAD by philsturgeon (http://www.dbad-license.org/)
 */
(function($) {
    'use strict';
    $(document).on('click', 'a[href="#"], a[role="button"]', function(e) {
        e.preventDefault();
    });

    // close alerts
    $(document).delegate(".alert-close", "click", function (t){
        t.preventDefault();
        var target = $(this).closest('.alert');
        if(target.length == 0) { return false; }
        target.fadeOut(function () {
            $(this).remove();
        });
    });

    // disable active breadcrumb item link
    $(document).on('click', '.breadcrumb > .item.active > a', function (e) {
        e.preventDefault();
        return false;
    });

    // Button Dropdown
    $(document).delegate('.btn-dropdown>.toggle-dropdown:not(:disabled)', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.btn-dropdown').toggleClass('open');
    });

    // collapse
    $(document).delegate('.collapse > .title', 'click', function (e) {
        e.preventDefault();
        var that = $(this), parent = that.closest('.collapse'), target = that.next();
        if($(target).hasClass('active')) {;
            $(target).slideUp('fast', function() {
                that.removeClass('active');
                target.removeClass('active');
            });
        } else {
            $(parent).children('.content').slideUp('fast', function () {
                $(this).removeClass('active');
                $(this).prev('.title').removeClass('active');
            });
            $(target).hide().addClass('active').slideDown('fast', function () {
                that.addClass('active');
            });
        }
    });

    // label close
    $(document).delegate('.label-close', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.label').fadeOut(function () {
            $(this).remove();
        });
    });

    // badge close
    $(document).delegate('.badge-close', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.badge').fadeOut(function () {
            $(this).remove();
        });
    });

    // disable pagination active item click
    $(document).on('click', '.pagination>.active>a,.pagination>.disabled>a', function (e) {
        e.preventDefault();
        return false;
    });

    // close modals
    $(document).delegate('[data-modal]', 'click', function (e) {
        e.preventDefault();
        var modal = $(this).attr('data-modal');
        if(modal.length == 0 || $(modal).hasClass('open')) { return false; }
        $(modal).addClass('open');
    });

    $(document).delegate('.modal-close', 'click', function(e){
        e.preventDefault();
        var modal = $(this).closest(".modal");
        if(modal.length == 0) { return false; }
        modal.removeClass('open').remove();
    });

    // scroll to
    $(document).delegate(".scroll","click",function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if($(target).length == 0) { return false; }
        $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
    });

    // tabs
    $(document).delegate('.tabs > .controls > .item', 'click', function (e) {
        e.preventDefault();
        var that = $(this),
            target = $(that.attr('href')),
            controls = that.parent(),
            tabs = that.parent().parent();

        if($(target).length == 0) { return false; }
        controls.children().removeClass('active');
        that.addClass('active');
        tabs.children('.content').children().removeClass('active');
        $(target).addClass('active');
    });

	$(document).on('change keyup keydown paste cut', 'textarea.auto-expand', function () {
		$(this).css({'overflow':'hidden'}).height(0).height(this.scrollHeight);
	}).find('textarea.auto-expand').change();

    $(document).ready(function() {

        // btn-label
        $('.btn.btn-label>.label').each(function() {
            var $this = $(this);
            if ($this.is(':first-child')) {
                $this.addClass('label-first');
            } else if ($this.is(':last-child')) {
                $this.addClass('label-last');
            }
        });

        $('.gallery[data-animation]>.item').hover(function() {
            var animation = $(this).parent().attr('data-animation');
            $(this).addClass('animated ' + animation);
        }, function() {
            var animation = $(this).parent().attr('data-animation');
            $(this).removeClass('animated').removeClass(animation);
        });

        $('.progress').each(function() {
            var self = $(this),
                fill = self.find('.fill'),
                label = self.find('.text'),
                percent_value = fill.data('fill'),
                percent = parseInt(percent_value, 10) + '%';

                fill
                    .css({'-webkit-transition': 'none','-moz-transition': 'none','transition': 'none'})
                    .animate({
                        width: percent
                    }, {
                        duration: 1000,
                        step: function(x) {
                            label.text(Math.round(x) + '%');
                        }
                    });
        });
    });

    $(document).on('keyup', '.tags>.tags-field>.tags-input', function(e) {
        if (e.keyCode === 13) {
            var self = $(this),
                tags = self.parent().next(),
                content = self.val();
            if ($.trim(content).length) {
                //var all = content.split(',');
                var all = $.map(content.split(','), $.trim);
                $.each(all, function(index, value) {
                    if ($.trim(value).length) {
                        tags.append('<span class="label">' + value + '<span class="label-close"></span></span>');
                    }
                });
                self.val('');
                return;
            }
        }
    });

    $('html').click(function () {
        $('.btn-dropdown:not(:hover)').removeClass('open');
    });

}(jQuery));