$(function () {
    //신청하기
    $('.apply').click(function(){
        $(this).toggleClass("active");
        $('.layer-ask').toggle()
    })
    //신청안내
    $('#apply-info').click(function(){
        $('.layer-popup').show()
    })
    $('.apply-info').click(function(){
        $('.layer-popup').show()
    })
    $('.layer-close').click(function(){
        $('.layer-popup').hide()
    }) 
	
	//KT 신청하기
    $('#ktBtn_popup').click(function(){
        $(this).toggleClass("active");
        $('.layer-kt-ask').toggle()
    })

    //sns버튼
    $('.sns-area .btn-share').on('click', function(e){
		$('.sns-area .btn-sns').toggle();
		$('.top-three-box .top-three').css('display', 'none');

		var checkShowHide = $(this).next('.btn-sns').css('display');

		if (checkShowHide == "block") {
			$(this).attr("title","접기");
		} else {
			$(this).attr("title","펼치기");
		}

		e.preventDefault();
    });

    //tab-cont
    $(document).on('click','.tab-trig li', function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        var trigIndex = $(this).index();
        $('.tab-cont').eq(trigIndex).addClass('active').siblings('li').removeClass('active')
    })

    // 아래로 내려가는 동영상 아코디언
    $(document).on('click', '.accordions2 .accordion-trigger2', function (e) {
    e.preventDefault();
    var top = $(this).offset().top;
    var trigger_height = $(this).height();
    if ($(this).hasClass('active')) {
		$(this).prev().find('.script-area').removeAttr('tabindex', 0);
        $(this).removeClass('active').children().text('자막열기').parent().prev('.accordion-contents2').stop().slideUp(500);
    } else {
        $(this).closest('.accordions2').find('.accordion-trigger2').removeClass('active');
        $(this).closest('.accordions2').find('.accordion-contents2').stop().slideUp(500);
        $(this).addClass('active').children().text('자막닫기').parent().prev('.accordion-contents2').stop().slideDown(500, function() {
			$(this).find('.script-area').attr('tabindex', 0);
			$(this).find('.script-area').focus();
		});
        $(this).animate({scrollTop:top + trigger_height},500);
    }
    });

	//접근성 201711 추가
	$('.btns a').click(function(){
		var checkShowHide = $(this).next('.layer-ask').css('display');

		if(checkShowHide == '' || typeof(checkShowHide) == 'undefined') {
			$('.apply').removeClass('active');

			return;
		}

		if (checkShowHide == "block") {
			$(this).attr("title","레이어팝업 접기");
			$('.layer-kt-ask').css('display' ,'none');
		} else {
			$(this).attr("title","레이어팝업 펼치기");
		}
	});
	
	$('#ktBtn_popup').click(function(){
		var checkKtShowHide = $(this).next('.layer-kt-ask').css('display');

		if (checkKtShowHide == "block") {
			$(this).attr("title","레이어팝업 접기");
			$('.layer-ask').css('display' ,'none');
		} else {
			$(this).attr("title","레이어팝업 펼치기");
		}
	});

	$('.recommend .tab a').click(function(){
		var thisTxtCheck = $(this).hasClass('active');
		if (thisTxtCheck == true) {
			$('.recommend .tab a').attr("title","");
			$(this).attr("title","선택함");
		}
	});


	$('.top-three-box .btn-back').click(function(){
		var checkShowHide = $(this).next('.top-three').css('display');
		if (checkShowHide == "block") {
			$(this).attr("title","펼치기");
			$(this).next().css('display', 'none');
		} else {
			$(this).attr("title","접기");
			$(this).next().css('display', 'block');
			$('.sns-area .btn-sns').css('display', 'none');
		}
	});
});

//접근성 관련 추가 코드
$(document).ready(function() {
	$('.recommend .tab').find('a.active').attr('title','선택함') // 201711 접근성 추가

	$('.accordions').find('.accordion-trigger').each(function() {
		if($(this).parent().length > 0 && $(this).parent().find('.seo-improve-heading').length > 0) {
			$(this).parent().find('.seo-improve-heading').attr('aria-hidden', true);
			var btnName = $(this).parent().find('.seo-improve-heading').text();
			$(this).data('fixedTitle', btnName);

			$(this).attr({
				'title': '하위메뉴 열기',
				'aria-expanded': false,
				'aria-label': $(this).data('fixedTitle')
			});
	   } else {
		   $('.accordions').find('.accordion-trigger').attr('title','닫힘');
	   }
   });

	$('.accordions').find('.accordion-trigger').on('click', function (e) {
	   e.preventDefault();
	   var thisTxtCheck = $(this).hasClass('active');
	   if($(this).parent().length > 0 && $(this).parent().find('.seo-improve-heading').length > 0) {
		   if (thisTxtCheck == true) {
			   $('.accordions').find('.accordion-trigger').attr({
				   'title': '하위메뉴 열기',
				   'aria-expanded': false
			   });
			   $(this).attr({
					'title': '하위메뉴 닫기',
					'aria-expanded': true
			   });
		   } else {
			   $(this).attr({
					'title': '하위메뉴 열기',
					'aria-expanded': false
			   });
		   }
	   } else {
		  if (thisTxtCheck == true) {
			  $('.accordions .accordion-trigger').attr('title','닫힘');
			  $(this).attr('title','열림');
		   } else {
			  $(this).closest('.accordion-trigger').attr('title','닫힘');
		  }
	   }
      return false;
    });
});

(function($){
	var $window = $(window),
		$document = $(document);

	$.fn.comTabs = function(options) {
		var config = $.extend({
			items : '> li',
			selectIndex : 0,
			tabContent : 'tabContent',
			selectedClass : 'selected',
			comTabNo : 'tabNo'
		}, options);
		return this.each(function() {
			var self = this,
				$self = $(self),
				$items = $self.find(config.items),
				pgcode = getUrlVars();

			if ( $.data(self, 'init.comTabs') ) {
				destroy();
			}

			$items.each(function(i){
				var item = this,
					$item = $(item),
					anchor = item.getElementsByTagName('a')[0],
					contnetId = anchor && anchor.getAttribute('href', 2),
					content = contnetId && (contnetId !== '#') && $document.find(contnetId).addClass(config.selectedClass);

					$.data(item, 'content.comTabs', content);
					$.data(item, 'anchor.comTabs', anchor);

					$item.bind('click', function(e) {
						var index = i;

						select(index);

						e.preventDefault();
					});

				if(pgcode[config.comTabNo]){
					content.removeClass(config.selectedClass);

					if(contnetId.split('#')[1].match(pgcode[config.comTabNo]) && contnetId.split('#')[1].length === pgcode[config.comTabNo].length ){
						$(anchor).parent().addClass(config.selectedClass);
						$(anchor).attr('title', '선택됨');

						$(contnetId).addClass(config.selectedClass);
					}
				}
			});

			$.data(self, 'init.comTabs', true);

			if(!pgcode[config.comTabNo]) { select(config.selectIndex); }

			function select(index) {
				unselectAll();

				var $item = $items.eq(index),
					$content = $item.data('content.comTabs'),
					anchor = $item.data('anchor.comTabs');

				$item.addClass(config.selectedClass);
				$content.addClass(config.selectedClass);
				anchor.setAttribute('title', '선택됨');
			}

			function unselectAll() {
				$items.each(function(){
					var $item = $(this),
						$content = $item.data('content.comTabs'),
						anchor = $item.data('anchor.comTabs');

					$item.removeClass(config.selectedClass);
					$content.removeClass(config.selectedClass);
					anchor.removeAttribute('title');

					$.data(this, 'content.comTabs').unbind('.comTabs');
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
						content = $.data(this, 'content.comTabs'),
						anchor = $.data(this, 'anchor.comTabs');

					content.removeClass(config.selectedClass);
					$(anchor).parent().removeClass(config.selectedClass);

					$.data(this, 'content.comTabs').unbind('.tabs');
					$.removeData(this, 'content.comTabs');
					$.removeData(this, 'anchor.comTabs');
					$item.unbind('.comTabs');
				});
				$self
					.removeData('content.comTabs')
					.removeData('anchor.comTabs');
			}
		});
	};

	$(function(){
		$('.com-tabs').comTabs();
	});
})(jQuery);

//이전/다음 말풍선 처리
$(document).ready(function(){
	if($('.btn-pagelistnext').length > 0){
		var cv = mkt.getComCookie('product_pagelistnext');
		if(cv != 'hide'){
			$('.txt-pagelistnext').show();
			mkt.setComCookie('product_pagelistnext', 'hide', 365);
			setTimeout(function (){
				$('.txt-pagelistnext').fadeOut(200);
			}, 2000);
		}
	}
	if($('.btn-pagelistprev').length > 0){
		var cv = mkt.getComCookie('product_pagelistprev');
		if(cv != 'hide'){
			$('.txt-pagelistprev').show();
			mkt.setComCookie('product_pagelistprev', 'hide', 365);
			setTimeout(function (){
				$('.txt-pagelistprev').fadeOut(200);
			}, 2000);
		}
	}
});

const comProductObject = {
	productAppCheck: function() {
		var isApp = false;
		if (/ollehcs/i.test(navigator.userAgent)) {
			isApp = true;
		}
		return isApp;
	}
}

const ComAnchor = (function() {
	function ComAnchor(element, options) {
		this.element = element;
		this.settings = Object.assign({
		
		}, options);
	}
	/*ComAnchor.prototype.move = function(y) {
		const getValue = this.getUrlValue();
		
		this.element.forEach(function(element) {
			const moveTimer = setTimeout(function() {
				if(element.dataset.anchorId === getValue.ott) {
					const Y = y ? y : window.scrollY > 64 ? 72 : 164;
					window.scrollTo(0, element.offsetTop - Y);
				}
				clearTimeout(moveTimer);
			}, 100);
		});
	}*/
	ComAnchor.prototype.getUrlValue =  function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split("=");
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	
	return ComAnchor;
})();

const ComProduct = (function() {
	function ComProduct(element) {
		this.element = element;
	}

	ComProduct.prototype.getLinksTitleChange = function() {
		const element = document.querySelectorAll(this.element);

		for(let i=0; i < element.length; i++) {
			const link = element[i];

			if(link.getAttribute('target') === '_blank' && comProductObject.productAppCheck()) {
				link.removeAttribute('target');
				link.removeAttribute('title');
			}
		}
	}

	ComProduct.prototype.getAllSiblings = function(currentNode) {
		let siblings = [];

		if(!currentNode.parentNode) {
			return siblings;
		}
		let sibling  = currentNode.parentNode.firstChild;
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== currentNode) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}
		return siblings;
	}

	ComProduct.prototype.getTargetDepth = function(element) {
		let depth = 0;
		let currentElement = element;

		while (currentElement.parentNode) {
			depth++;
			currentElement = currentElement.parentNode;
		}
		return depth;
	}

	ComProduct.prototype.getAncestorSiblings = function(target) {
		const targetDepth = this.getTargetDepth(target);
		const ancestorSiblings = [];
		let currentElement = target;

		for(let i=0; i < targetDepth; i++) {
			if(!currentElement.parentNode) break;
			const siblings = this.getAllSiblings(currentElement.parentNode);
			ancestorSiblings.push(siblings);
			currentElement = currentElement.parentNode;
		}

		return ancestorSiblings;
	}

	ComProduct.prototype.setWaAriaToggle = function(element, flag) {
		const ancestorSiblings = this.getAncestorSiblings(element);

		ancestorSiblings.forEach(function(el) {
			el.map(function(a) {
				flag ? a.setAttribute('aria-hidden', true) : a.removeAttribute('aria-hidden');
			});
		});
	}

	return ComProduct;
})();

function productToggleAria(targetElement, closeTargets, flag) {
	if(!(targetElement instanceof Element)) {
		return;
	}

	const ariaHandler = new ComProduct();
	const handleToggle = function(flag) {
		ariaHandler.setWaAriaToggle(targetElement, flag);
	}
	handleToggle(flag);

	const handleClick = function(closeTarget) {
		const closeElement = targetElement.parentNode.querySelector(closeTarget);
		if(closeElement) {
			closeElement.addEventListener('click', function() {
				handleToggle(false);
			}, {once: true});
		}
	}

	Array.isArray(closeTargets) ? closeTargets.forEach(handleClick) : handleClick(closeTargets);
}

const ComProductTooltip = (function() {
	function ComProductTooltip(element) {
		this.tooltipElement = document.querySelector(element);
		this.isInitialized = false;
		this.scrollThreshold = 50;
		this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
	}
	
	ComProductTooltip.prototype.init = function() {
		if (this.isInitialized) {
			return;
		}
		
		if (this.tooltipElement) {
			this.bindEvent();
		}
		
		this.isInitialized = true;
	}
	
	ComProductTooltip.prototype.bindEvent = function() {
		this.tooltipElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}
	
	ComProductTooltip.prototype.handleTouchEnd = function() {
		setTimeout(() => {
			this.tooltipElement.classList.add('remove');
		}, 3000);
	}
	
	ComProductTooltip.prototype.handleScroll = function() {
		const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		
		if (Math.abs(currentScrollPosition - this.lastScrollPosition) > this.scrollThreshold) {
			if (this.tooltipElement) {
				setTimeout(() => {
					this.tooltipElement.classList.add('remove');
				}, 3000);
			}
			
			this.lastScrollPosition = currentScrollPosition;
		}
	}
	
	ComProductTooltip.prototype.destroy = function() {
		if (this.tooltipElement) {
			this.tooltipElement.removeEventListener('touchend', this.handleTouchEnd.bind(this));
			window.removeEventListener('scroll', this.handleScroll.bind(this));
		}
		
		this.isInitialized = false;
	}
	
	return ComProductTooltip;
})();

document.addEventListener("DOMContentLoaded", function(){
	const comLinks = new ComProduct('a[target]');
	comLinks.getLinksTitleChange();

	if(!document.querySelector('.month-plan')) {
		document.querySelector('.pagelistbtndiv') && document.querySelector('.pagelistbtndiv').classList.add('pagelistbtndiv-type1');
	}

	const tooltip = new ComProductTooltip('[data-js="comTooltip"]');
	tooltip.init();
});

window.addEventListener('load', function(){
	const comLinks = new ComProduct('a[target]');
	comLinks.getLinksTitleChange();

	/* cms html 경우 동작이 되지 않아 추가 선택자 선언 */
	const appTimer = setTimeout(function() {
		$('[data-js="accordionAction"]').find('.seo-improve-heading').attr('aria-hidden', true);
		$('[data-js="accordionAction"]').find('.accordion-trigger').attr({
			'title': '하위메뉴 열기',
			'aria-expanded': false
		});
		$('[data-js="accordionAction"]').find('.accordion-trigger').each(function() {
			var btnName = $(this).parent().find('.seo-improve-heading').text();
			$(this).attr('aria-label', btnName);
		});
		$('[data-js="accordionAction"]').find('.accordion-trigger').on('click', function (e) {
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').next('.accordion-contents').hide();
				$(this).attr({
					'title': '하위메뉴 열기',
					'aria-expanded': false
				});
			} else {
				$(this).closest('.accordions').find('.accordion-trigger').removeClass('active').attr({
					'title': '하위메뉴 열기',
					'aria-expanded': false
				});
				$(this).closest('.accordions').find('.accordion-contents').hide();
				$(this).addClass('active').attr({
					'title': '하위메뉴 닫기',
					'aria-expanded': true
				}).next('.accordion-contents').stop().slideDown(500);
			}
		});

		$('[data-js="snsAction"]').on('click', function(e){
			const $btnSnsElement = $(this).find('.btn-sns');

			$btnSnsElement.toggle();
			var checkShowHide = $btnSnsElement.css('display');

			if (checkShowHide == "block") {
				$(this).attr("title","접기");
			} else {
				$(this).attr("title","펼치기");
			}

			e.preventDefault();
		});

		$('[data-js="btnAction"]').on('click', function(){
			const $parentElement = $(this).parent();
			$(this).attr('title', '펼치기');
			$(this).toggleClass("active");

			if ($(this).hasClass('active')) {
				$(this).attr('title', '접기');
			} else {
				$(this).attr('title', '펼치기');
			}
			$parentElement.find('.layer-ask').toggle();
		});
		clearTimeout(appTimer);
	}, 500);
});


window.addEventListener('load',function(){
	const $moveBtn = document.getElementById('N-pdt-acc-move');
	if($moveBtn){
		$moveBtn.addEventListener('click', function (evt) {
			evt.preventDefault();
			const cHeadline = document.querySelector('.N-cHeadline-cover.ui-sticky').offsetHeight;
			const targetSP = Array.from(document.querySelectorAll('.N-pdt-accordion-tit.opener')).find(function (button) {
			   return button.textContent.trim() === '가입 및 유의사항'
			})
			if (targetSP) {
				window.scrollTo({
					top: 100
				});
				setTimeout(function(){
					window.scrollTo({
						top: targetSP.getBoundingClientRect().top + window.pageYOffset - (cHeadline + 47),
						behavior: 'smooth'
					 });
				},100)
			   targetSP.classList.add('active');
			   targetSP.setAttribute('title', '하위메뉴 닫기');
				targetSP.setAttribute('aria-expanded', true);
			   const targetParent = targetSP.closest('.seo-improve-heading');
			   const siblingTarget = targetParent.nextElementSibling;
			   if (siblingTarget) {
				  siblingTarget.style.display = 'block';
			   }
			}
		 })
	}
 })

$(document).ready(function() {
	itemTabEvent();
});

function itemTabEvent() {
	var itemList = ['1047','1645'];
	var parms = (location.search.replaceAll('?','')).split('&');
	for (var i = 0; i < parms.length; i++) {
		if (parms[i].indexOf("ItemCode") >= 0) {
			for (var j = 0; j < itemList.length; j++) {
				if (parms[i].substring(parms[i].indexOf('=') + 1) == itemList[j]) {
					$j('.tabs').find('a[href="#trigger1-2"]').trigger('click');
					break;
				}
			}
			break;
		}
	}
}
