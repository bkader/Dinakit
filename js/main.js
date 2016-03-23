// Allow for console.log to not break IE
if (typeof window.console == "undefined" || typeof window.console.log == "undefined") {
  window.console = {
    log  : function() {},
    info : function(){},
    warn : function(){}
  };
}
if(typeof window.console.group == 'undefined' || typeof window.console.groupEnd == 'undefined' || typeof window.console.groupCollapsed == 'undefined') {
  window.console.group = function(){};
  window.console.groupEnd = function(){};
  window.console.groupCollapsed = function(){};
}
if(typeof window.console.markTimeline == 'undefined') {
  window.console.markTimeline = function(){};
}
window.console.clear = function(){};

;(function($) {
	'use strict';

	$(document).on('click', '#emo_send', function(e) {
		e.preventDefault();
		var _textarea = $("#emo_test"),
			_text = _textarea.val(),
			_preview = $("#emo_preview");
		if (!_text.length) return;
		_preview.append(emoticonize(_text));
		_textarea.val('');
	})
})(jQuery);