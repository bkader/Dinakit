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

    // checkbox
    $(document).on('click', '.checkbox', function (e) {
        e.preventDefault();
        var $that = $(this), $checkbox = $that.children('input[type="checkbox"]');
        if($checkbox.prop("checked")) {
            $that.removeClass('checked');
            $checkbox.prop('checked', false);
        } else {
            $that.addClass('checked');
            $checkbox.prop('checked', true);
        }
    });

    /*$(document).on('focus', 'textarea.auto-expand', function() {
    	$(this).css({
    		overflow: 'hidden',
    		'min-height': $(this).innerHeight(),
    	});
    }).on('change keyup keydown paste cut', 'textarea.auto-expand', function(e) {
    	var $that = $(this)
    		, minHeight = $that.innerHeight()
    		, $val = $that.val();
    	if ($.trim($val).length > 0) {
    		$that.height(0).height(this.scrollHeight);
    	} else {
    		//console.log('empty');
    		$that.height(0);
    	}
    });*/

	$(document).on('change keyup keydown paste cut', 'textarea.auto-expand', function () {
		$(this).css({'overflow':'hidden'}).height(0).height(this.scrollHeight);
	}).find('textarea.auto-expand').change();

/*$(document).on('change keyup keydown paste cut', 'textarea.auto-expand', function () {
        $(this).height(0).height(this.scrollHeight);
    }).find('textarea.auto-expand').change();*/

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

        $('.carousel').each(function() {
            var self = $(this),
                inner = self.find('.inner'),
                items = inner.children('.item').length;

            // Change self CSS
            self.css({
                overflow: 'hidden',
                width: self.width()+'px',
                height: 300 + 'px',
            });
            inner.css({
                width: items * 100 + '%',
                position: 'relative',
                marginLeft: -100 + '%',
            });
            inner.children('.item').width(100 / items + '%');
        });

    });

    $.fn.toggleClick = function (func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleClicked', 0);
        this.click(function() {
            var data = $(this).data(),
                tc = data.toggleClicked;
            $.proxy(funcs[tc], this)();
            data.toggleClicked = (tc + 1) % 2;
        });
        return this;
    };

    $('.select').toggleClick(function() {
        $(this).addClass('open');
    }, function() {
        $(this).removeClass('open');
    });
    /*$(document).on('toggleClick', '.select', function(e) {
        e.preventDefault();
        return $(this).addClass('open');
        var $this     = $(this),
            input     = $this.find('[type="hidden"]'),
            search    = $this.find('input.search'),
            preview   = $this.find('.text'),
            menu      = $this.find('.menu'),
            opened    = false;
        if (input && preview) {
            $this.addClass('open');
            menu.find('a[data-value]').click(function(e) {
                e.preventDefault();
                var $val = $(this).attr('data-value'),
                    $html = $(this).html();
                if ($val.length && $html.length) {
                    preview.html($html);
                }
            });
        }
    }, function(e) {
        e.preventDefault();
        return $(this).removeClass('open');
    });*/

    $.fn.emoticonize = function() {
        var emoticons = {
            // smile
            ':-)': 'smile', ':)': 'smile', ':]': 'smile', '=)': 'smile',
            // sad
            ':-(': 'sad', ':(': 'sad', ':[': 'sad', '=(': 'sad',
            // tongue
            ':p': 'tongue', ':P': 'tongue', ':-p': 'tongue', ':-P': 'tongue', '=P': 'tongue',
            // Grin
            ':-D': 'grin', ':D': 'grin', '=D': 'grin',
            // Gasp
            ':o': 'gasp', ':-o': 'gasp', ':O': 'gasp', ':-O': 'gasp',
            // Wink
            ';)': 'wink', ';-)': 'wink',
            // Glasses
            '8-)': 'glasses', '8-)': 'glasses', 'B)': 'glasses', 'B-)': 'glasses',
            // Sunglasses
            '8-|': 'sunglasses', '8|': 'sunglasses', 'B-|': 'sunglasses', 'B|': 'sunglasses',
            // Grumpy
            '>:(': 'grumpy', '>:-(': 'grumpy',
            // Unsure
            ':/': 'unsure', ':-/': 'unsure', ':-\\': 'unsure', ':\\': 'unsure',
            // Cry
            ':\'(': 'cry', ':\'-(': 'cry', ';(': 'cry', ';-(': 'cry',
            // Devil
            '3:)': 'devil', '3:-)': 'devil',
            // Angel
            'o:)': 'angel', 'O:)': 'angel', 'o:-)': 'angel', 'O:-)': 'angel',
            // Kiss
            ':-*': 'kiss', ':*': 'kiss',
            // Heart
            '<3': 'heart',
            // Kiki
            '^_^': 'kiki',
            // Squint
            '-_-': 'squint',
            // Confused
            'O.o': 'confused', 'o.O': 'confused',
            // Upset
            '>:o': 'upset', '>:O': 'upset', '>:-o': 'upset', '>:-O': 'upset',
            // Pacman
            ':v': 'pacman', ':-v': 'pacman',
            // Curly lips
            ':3': 'conlonthree', ':-3': 'conlonthree',
        }, patterns = [], metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;
        for (var i in emoticons) {
            if (emoticons.hasOwnProperty(i)) {
                patterns.push('('+i.replace(metachars, "\\$&")+')');
            }
        }
        var text = this.html();
        text = text.replace(new RegExp(patterns.join('|'),'g'), function (match) {
            return typeof emoticons[match] != 'undefined' ? '<i class="smiley ' + emoticons[match] + '" title="' + match + '"></i>' : match;
        });
        this.html(text);
        return this;
    };

    $(".emoticonize").emoticonize();

    $('html').click(function () {
        $('.btn-dropdown:not(:hover)').removeClass('open');
        $('.select').removeClass('open');
    });

}(jQuery));