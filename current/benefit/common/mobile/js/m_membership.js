//document.domain='kt.com';
(function($){
	var $window = $(window),
		$document = $(document);

	$.fn.tabs = function(options) {
		var config = $.extend({
			items : '> li',
			selectedClass : 'selected',
			moveY : false
		}, options);
		return this.each(function() {
			var self = this,
				$self = $(self),
				$items = $self.find(config.items),
				pgcode = getUrlVars();

			if ( $.data(self, 'init.tabs') ) {
				destroy();
			}

			$items.each(function(i){
				var item = this,
					$item = $(item),
					anchor = item.getElementsByTagName('a')[0],
					contnetId = anchor && anchor.getAttribute('href', 2),
					content = contnetId && (contnetId !== '#') && $document.find(contnetId).addClass(config.selectedClass);

					$.data(item, 'content.tabs', content);
					$.data(item, 'anchor.tabs', anchor);

					$item.bind('click', function(e) {
						var index = i;

						select(index);

						e.preventDefault();
					});

				if(pgcode['tabNo']){
					content.removeClass(config.selectedClass);

					if(contnetId.split('#')[1].match(pgcode['tabNo'])){
						$(anchor).parent().addClass(config.selectedClass);
						$(anchor).attr('title', '선택됨');

						if(config.moveY) {
							const moveTimer = setTimeout(function() {
								$('html, body').animate({scrollTop:($(anchor).offset().top) - 145}, 0);
								clearTimeout(moveTimer);
							}, 550);
						}

						$(contnetId).addClass(config.selectedClass);
					}
				}
			});

			$.data(self, 'init.tabs', true);

			if(!pgcode['tabNo']) { select(0); }

			function select(index) {
				unselectAll();

				var $item = $items.eq(index),
					$content = $item.data('content.tabs'),
					anchor = $item.data('anchor.tabs');

				$item.addClass(config.selectedClass);
				$content.addClass(config.selectedClass);
				anchor.setAttribute('title', '선택됨');
			}

			function unselectAll() {
				$items.each(function(){
					var $item = $(this),
						$content = $item.data('content.tabs'),
						anchor = $item.data('anchor.tabs');

					$item.removeClass(config.selectedClass);
					$content.removeClass(config.selectedClass);
					anchor.removeAttribute('title');

					$.data(this, 'content.tabs').unbind('.tabs');
				});
			}

			function getUrlVars() {
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

				for(var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split("=");
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			}

			function destroy() {
				$items.each(function () {
					var $item = $(this),
						content = $.data(this, 'content.tabs'),
						anchor = $.data(this, 'anchor.tabs');

					content.removeClass(config.selectedClass);
					$(anchor).parent().removeClass(config.selectedClass);

					$.data(this, 'content.tabs').unbind('.tabs');
					$.removeData(this, 'content.tabs');
					$.removeData(this, 'anchor.tabs');
					$item.unbind('.tabs');
				});
				$self
					.removeData('content.tabs')
					.removeData('anchor.tabs');
			}
		});
	};
	
	$.fn.fixed = function() {
		return this.each(function() {
			var self = this,
				$self = $(self),
				offY = 0,
				documentScy = $('html, body').scrollTop(),
				selfH = $self.outerHeight(true);
				userAgent = navigator.userAgent.toLowerCase(),
				iosFlag = (userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) 	|| (userAgent.search("ipad") > -1);

			if(iosFlag) {
				$self.addClass('ios-fixed');

				return;
			}

			$self.after('<div class="usedate-fixed-block"></div>');

			$(window).on('load', function() {
				offY = $self.offset().top;

				if(documentScy >= offY) {
					$self.addClass('fixed');
					$self.next().addClass('fixed');
					$('.usedate-fixed-block').css({
						height : selfH
					});
				} else {
					$self.removeClass('fixed');
					$self.next().removeClass('fixed');
					$('.usedate-fixed-block').css({
						height : 'auto'
					});
				}

				var scl = $window.scroll(function(){
					var scy = $(this).scrollTop(),
						flag;

					if(scy >= offY) {
						$self.addClass('fixed');
						$self.next().addClass('fixed');
						$('.usedate-fixed-block').css({
							height : selfH
						});
					} else {
						$self.removeClass('fixed');
						$self.next().removeClass('fixed');
						$('.usedate-fixed-block').css({
							height : 'auto'
						});
					}
				});

				$window.resize(function() {
					offY = $('.usedate-fixed-block').css('height').split('px')[0] == 0 ? $self.offset().top : $('.usedate-fixed-block').offset().top,
					selfH = $self.outerHeight(true);

					scl;
				});
			});
		});
	};

	$.fn.bgroopLine = function() {
		var self = this,
			$self = $(self),
			selfW = $self.outerWidth(true);

		$self.append('<div class="roopline-box" style="width:'+(selfW-21)+'px;"></div>')

		for(var i=1; i < 10; i++) {
			$self.find('.roopline-box').append('<span class="roopline addline'+i+'"></span>');
		}

		$window.resize(function() {
			selfW = $self.outerWidth(true);

			$('.roopline-box').css({
				width : (selfW-21)
			});
		});
	};

	$.fn.faq = function() {
		return this.each(function() {
			var self = this,
				$self = $(self),
				$items = $self.find('.mbs-accordion-column'),
				$event = $items.find('.opener'),
				$aw = $items.find('.content-column');
			$event.each(function(i) {
				var $item = $(this);
				unselect(i);
				$item.bind('click', function(e) {
					select(i);
					e.preventDefault();
				});
			});
			function select(index) {
				var indexText = $event.eq(index).text();
				if($event.eq(index).parent().hasClass('selected')) {
					unselect(index);
					return;
				}
				$event.eq(index).parent().addClass('selected');
				$event.eq(index).attr('title', '닫기');
				$event.eq(index).next().slideDown(300);
			}
			function unselect(index) {
				var indexText = $event.eq(index).text();
				$event.eq(index).next().slideUp(300, function() {
					$event.eq(index).parent().removeClass('selected');
					$event.eq(index).attr('title', '열기');
				});
			}
		});
	};

	$(function(){
		$('.mbs-tabs').tabs();
		$('.usedate-fixed').fixed();
		$('.mbs-use-days .cont-box').bgroopLine();

		$j(document).on('click', '.accordions2 .accordion-trigger2', function (e) {
			e.preventDefault();
			var top = $j(this).offset().top;
			var trigger_height = $j(this).height();
			if ($j(this).hasClass('active')) {
				$j(this).removeClass('active').children().text('자막열기').parent().prev('.accordion-contents2').stop().slideUp(500);
			} else {
				$j(this).closest('.accordions2').find('.accordion-trigger2').removeClass('active');
				$j(this).closest('.accordions2').find('.accordion-contents2').stop().slideUp(500);
				$j(this).addClass('active').children().text('자막닫기').parent().prev('.accordion-contents2').stop().slideDown(500);
				$j(this).animate({scrollTop:top + trigger_height},500);
				$j(this).prev().find('.script-area').attr('tabindex', 0).focus();
				setTimeout(function() {
					$j(this).prev().find('.script-area').focus();
				}, 700);
			}
		});
	});
})(jQuery);

const ComProduct = (function() {
	function ComProduct(element) {
		this.element = element;
	}

	ComProduct.prototype.getLinksTitleChange = function() {
		const element = document.querySelectorAll(this.element);

		for(let i=0; i < element.length; i++) {
			const link = element[i];

			if(link.getAttribute('target') === '_blank' && window.mkt.appChk()) {
				link.removeAttribute('target');
				link.removeAttribute('title');
			}
		}
	}

	return ComProduct;
})();

document.addEventListener("DOMContentLoaded", function(){
	const comLinks = new ComProduct('a[title]');
	comLinks.getLinksTitleChange();
});