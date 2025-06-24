//document.domain='kt.com';

var $j = jQuery.noConflict();
var moveLeft=0;
var moveLeft2=0;

$j(function(){

	//공통 텝(dl)
	var $tabCon = $j('.tab_con');
	$tabCon.each(function(i, e){
		var _dt = $j(e).find('>dt'),
			_dd = $j(e).find('>dd');

		_dt.each(function() {
			var item = this,
				$item = $j(item),
				anchor = item.getElementsByTagName('a')[0],
				contnetId = anchor && anchor.getAttribute('href', 2),
				pgcode = getUrlVars();

			if(!pgcode['tabNo']) { 
				_dt.eq(0).addClass('on');
				_dd.eq(0).addClass('on');

				return;
			}

			if(pgcode['tabNo'] && contnetId){
				$item.removeClass('on');
				$item.next().removeClass('on')

				if(contnetId.split('#')[1].match(pgcode['tabNo'])){
					$j(anchor).parent().addClass('on');
					$j(anchor).attr('title', '선택됨');
					$j(anchor).parent().next().addClass('on');
				}
			}
		});

		_dt.click(function(){
			var idx = $j(this).index();
			$j(e).children().removeClass('on');
			$j(e).children().find('>a').removeAttr('title');
			$j(this).addClass('on').next().addClass('on');
			$j(this).find('>a').attr('title', '선택됨');

			//인터넷 할인 혜택
			$j('.p_con').removeClass().addClass('p_con p_'+(idx/2+1)+'');

			return false;
		});

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
	});

	// GiGA WiFi 3뎁스 텝영역
	$j('.use_wifi .area1 dt').each(function(i){
		var dtWidth = $j(this).width() + 40;
		$j(this).css('left', moveLeft + 'px')
		moveLeft = moveLeft + dtWidth 
	})
	$j('.use_wifi .area2 dt').each(function(i){
		var dtWidth2 = $j(this).width() + 40;
		$j(this).css('left', moveLeft2 + 'px')
		moveLeft2 = moveLeft2 + dtWidth2
	})

});


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
							$('html, body').animate({scrollTop:($(anchor).offset().top) - 110}, 0);
						}

						$(contnetId).addClass(config.selectedClass);
					}
				}
			});

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
		});
	};

	$.fn.fixed = function() {
		return this.each(function() {
			var self = this,
				$self = $(self),
				documentScy = $('html, body').scrollTop(),
				offY = $self.offset().top;

			$self.after('<div class="usedatefixed-block"></div>');

			if(documentScy >= offY) {
				$self.addClass('selected');
				$self.next().addClass('selected');
			} else {
				$self.removeClass('selected');
				$self.next().removeClass('selected');
			}

			$window.scroll(function(){
				var scy = $(this).scrollTop(),
					flag;

				if(scy >= (offY-82)) {
					$self.addClass('selected');
					$self.next().addClass('selected')

					if($window.outerWidth() < 1260){
						var viewslt = $window.scrollLeft();

						$self.css({
							left: -viewslt
						});
					}
				} else {
					$self.removeClass('selected');
					$self.next().removeClass('selected');

					$self.css({
						left: 0
					});
				}
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
		$('.mbs-tab').tabs();
		$('.usedatefixed').fixed();
	});

	// 아래로 내려가는 아코디언 (video)
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
})(jQuery);

var wDicProdCom = {
	lnkPhonePopBtn: function(sUrl, sw, sh) {
		var cw = screen.availWidth,
			ch = screen.availHeight,
			sw = !sw ? 656 : sw,
			sh = !sh ? 587 : sh,
			ml = 0
			mt = 0;

        ml = (cw - sw) / 2;
        mt = (ch - sh) / 2;

        window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');
    }
}