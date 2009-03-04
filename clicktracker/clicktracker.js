// ----------------------------------------------------------------------------
// ClickTracker jQuery plugin to track users clicks
// v 1.2 beta
// Dual licensed under the MIT and GPL licenses.
// ----------------------------------------------------------------------------
// Copyright (C) 2009 Jay Salvat
// http://www.jaysalvat.com/
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------
 
(function($) { 
	
var path = getPath();
	
$.fn.saveClicks = function() { 
	return this.each(function() {
		var $$ = $(this);
		$$.bind('mousedown.clicktracker', function(evt) { 
        	$.post(path+'clicktracker.php', {  
            	x: evt.pageX - $$.offset().left,  
            	y: evt.pageY - $$.offset().top,
				e: getElement(this),
            	l: escape(document.location.pathname) 
        	}); 
    	});
	}); 
}; 
 
$.fn.stopSavingClicks = function() { 
	return this.each(function() {
		$(this).unbind('mousedown.clicktracker');
	});
};

$.fn.displayClicks = function(settings) {
	var defaults = {
		overlay:'fullscreen'
	}
	var settings = $.extend({}, defaults, settings);
	return this.each(function() {
		var $$ = $(this);
		if ($$.data('clicktracker')) {
			return false;
		}
	    var container = $('<div class="clicktracker-container"></div>');
		var overlay   = $('<div class="clicktracker-overlay"></div>'); 
		var loading   = $('<div class="clicktracker-loading"></div>');

		$$.data('clicktracker', {
		 	overlay:   	overlay,
			loading: 	loading,
			container: 	container
		});

		if (settings.overlay == 'partial') {
			$(overlay).appendTo('body');
			placeMap($$, overlay);	
		} else {
			addOverlay();
		}
		
		$(loading).appendTo('body');
		placeMap($$, loading);

		$(container).appendTo('body');
		placeMap($$, container);

	    $.get(path+'clicktracker.php', { 
				l: escape(document.location.pathname), 
				e: getElement(this) 
			},  
	        function(response) { 
				$(loading).remove(); 
	            $(response).appendTo(container);
	        } 
	    );
	}); 
}; 

$.fn.removeClicks = function() { 
	return this.each(function() {
		var $$ = $(this);	
		if (dt = $$.data('clicktracker')) {
			dt.container.remove();
			dt.overlay.remove();
			dt.loading.remove();
			removeOverlay();
		}
		$$.removeData('clicktracker');
	});
};

function addOverlay() {
	if ($('#clicktracker-overlay').size() == 0) {
		$('<div id="clicktracker-overlay"></div>')
			.appendTo('body')
			// .width($(window).width())
			// .height($(window).height())
			.width('100%')
			.height('100%')
			.css('top', 0)
			.css('left', 0);
	}
}

function removeOverlay() {
	if ($('.clicktracker-container').size() == 0) {
		$('#clicktracker-overlay').remove();
	}
}

function getPath() {
	var path;
	$('script').each(function(i, script) { 
		matching = $(script).get(0).src.match(/(.*)clicktracker(\.pack)?\.js$/); 
		if (matching !== null) { 
			path = matching[1];
		} 
	});
	return path;
}

function getElement(elmt) {
	tg = elmt.nodeName;
	id = elmt.id ? '#'+ elmt.id : '';
	cl = ''; //elmt.className ? '.'+ elmt.className : '';
	return tg + id + cl;
};

function placeMap($$, elmt) {
	elmt.width( $$.outerWidth())
		.height($$.outerHeight())
		.css('top',  $$.offset().top)
		.css('left', $$.offset().left);
	
	if ($$.data('clicktracker')) {
		setTimeout(function() {
			placeMap($$, elmt);
		}, 100);	
	}
};
         
})(jQuery);