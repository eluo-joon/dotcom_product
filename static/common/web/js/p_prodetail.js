$j(function(){
	//cl_bbaa00_07 - 탭안에 슬라이드
	var configRecommend = {
		speed: 800,
		auto: false,
		pause: 3000,
		autoHover: true,
  	autoControls: false,
		controls: false,
		pager: false,
		touchEnabled: false,
		slideWidth: 318,
		minSlides: 3,
    maxSlides: 3,
    moveSlides: 1
	};
	var sliderRecommend = new Array();
	$j('.together-recommend-area .bxslider').each(function(i, slider) {
		sliderRecommend[i] = $j(slider).bxSlider();
	});
	$j.each(sliderRecommend, function(i, slider){ 
		slider.reloadSlider(configRecommend);
		$j('.together-recommend-area .nav .prev').on('click', function(){
			slider.goToPrevSlide();
		});
		$j('.together-recommend-area .nav .next').on('click', function(){
			slider.goToNextSlide();
		});
	});
	$j('.together-recommend-area .tabs').find('a[href*="#trigger"]').on('click', function(){
		$j.each(sliderRecommend, function(i, slider){ 
			slider.reloadSlider(configRecommend);
		});
	});

	//cl_bgca00_01 - 프라임무비팩
	var sliderMP = $j('.m-pack .bxslider').bxSlider({
		speed: 500,
		auto: true,
		pause: 3000,
		autoHover: false,
  	autoControls: false,
		controls: false,
		pager: false,
		touchEnabled: false,
		slideWidth: 360,
    minSlides: 3,
    maxSlides: 3,
		moveSlides: 1,
    slideMargin: 0,
		onSliderLoad: function(currentIndex){
			var $itemSlider = $j('.m-pack .bx-viewport li');
			$itemSlider.not('.bx-clone').removeClass('active').eq(currentIndex+1).addClass('active');
			var $clone = $j('.m-pack .bx-viewport li.active .movie-bx').clone();
			$j('.m-pack .zoom').append($clone);
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			var $itemSlider = $j('.m-pack .bx-viewport li');
			$itemSlider.removeClass('active')
			$itemSlider.not('.bx-clone').eq(newIndex).next().addClass('active');
			var $clone = $j('.m-pack .bx-viewport li.active .movie-bx').clone();
			$j('.m-pack .zoom').html('').append($clone);
		}
	});
	$j(".m-pack .nav button").on('mouseenter', function(){
		sliderMP.stopAuto();
	}).on('mouseleave', function(){
		sliderMP.startAuto();
	});
	$j(".m-pack .nav .prev").on('click', function(){
		sliderMP.goToPrevSlide();
	});
	$j(".m-pack .nav .next").on('click', function(){
		sliderMP.goToNextSlide();
	});

	// 비디오 광고제거
  // $j('.video-box iframe').each(function(){
  //   var iframeSrc = $j(this).attr('src')
  //   $j(this).attr("src", iframeSrc + "?rel=0") 
  // })

	// 비디오 포스터 클릭후 자동재생
	$j(document).on('click','.video-box .poster .play',function(){
		$j(this).parents('.poster').fadeOut(500);

		var videoID = $j(this).attr('href'),
			videoSrc = $j(videoID).attr('src');

		$j('.iframe-play').html('<iframe allowfullscreen="" frameborder="0" height="100%" id="video-01" src="'+videoSrc+'?autoplay=1&rel=0" title="olleh tv UHD 소개영상" width="100%"></iframe>');
	})
	
	// 아래로 내려가는 아코디언
	$j(document).on('click', '.accordions2 .accordion-trigger2', function (e) {
	    e.preventDefault();

		var lenFlag = $j('.pduct-fteform1297-box').length == 1;
		if(lenFlag) {
			var offy = $j('.pduct-fteform1297-box').offset().top;
		}

		var top = $j(this).offset().top;
		var trigger_height = $j(this).height();
		if ($j(this).hasClass('active')) {
			$j(this).prev().find('.script-area').removeAttr('tabindex', 0);
			$j(this).removeClass('active').children().text('자막열기').parent().prev('.accordion-contents2').stop().slideUp(500);

			if(lenFlag) {
				$j('.detail-plan-area .bg-block').animate({
					top : (offy-281)
				}, 500);
			}
		} else {
			$j(this).closest('.accordions2').find('.accordion-trigger2').removeClass('active');
			$j(this).closest('.accordions2').find('.accordion-contents2').stop().slideUp(500);
			$j(this).addClass('active').children().text('자막닫기').parent().prev('.accordion-contents2').stop().slideDown(500);
			$j(this).animate({scrollTop:top + trigger_height},500);

			$j(this).prev().find('.script-area').attr('tabindex', 0).focus();
			setTimeout(function() {
				$j(this).prev().find('.script-area').focus();
			}, 700);

			if(lenFlag) {
				$j('.detail-plan-area .bg-block').animate({
					top : (offy + 281)
				}, 500);
			}
		}
	});

	//접근성 SNS 201711
	$j('.sns-area .btn-share').on('focus', function(e){
	    $j('.sns-area .btn-sns').show();

		var $btnLastAnchor = $j('.sns-area .btn-sns').find('a:last-child');
		var $btnShare = $j('.sns-area .btn-share');

		$btnLastAnchor.length && $btnLastAnchor.on('keydown', function(e) {
			if(e.key === 'Tab') {
				if(e.shiftKey) {return;}
				$j('.sns-area .btn-sns').hide();
			}
		});

		$btnShare.length && $btnShare.on('keydown', function(e) {
			if(e.keyCode === 9 && e.shiftKey) {
				$j('.sns-area .btn-sns').hide();
			}
		});
	});
	$j('.sns-area').hover(function(){
		$j('.sns-area .btn-sns').show();},function(){$j('.sns-area .btn-sns').hide();
	});
	/* $j('.pdt-N-btn .btns a').on('focus',function(){
	    $j('.sns-area .btn-sns').hide();
		$j('.top-three-box .top-three').hide();
		$j(this).next('.layer-ask').show();
	}); */
	//신청하기 버튼 레이어 관련 201711 접근성
	
	//KT 직접신청하기 버튼 레이어 관련 
	$j('#ktBtn_popup').focus(function(){
		$j(this).find('.layer-kt-ask').show();
	});	
	
	$j('#ktBtn_popup').blur(function(){
		$j(this).find('.layer-kt-ask').hide();
	});	

	$j('.video-box iframe *').focus(function(){
	    $j('.sns-area .btn-sns').hide();
	});

	$j('.tel_floating .btn_close').click(function(e){
		e.preventDefault();
		$j('.nav-all-menu-trigger').focus();
		return false;
	});

	
});
/* 230224 웹 접근성 추가 결함 조치 건 */
$j(document).ready(function(){
	// 상단 버튼 레이어 팝업 타입일 경우
	$j('.layer-ask').parents('.btns').addClass('btns--laypop');

	$j('.pdt-N-btn').each(function(){
		if ($j(this).parent().hasClass('btns--laypop')){
			$j(this).attr('title','펼치기');
		}else if ( $j(this).attr('target') == '_blank' ){
			$j(this).attr('title','새창열림');
		}
	});

	$j(document).on('mouseenter click','.pdt-N-btns .btns.btns--laypop .pdt-N-btn',function(e){
		if ( $j(this).next().hasClass('active') ){
			$j(this).next().removeClass('active');
			$j(this).next().off('mouseover');
			$j(this).attr('title', '펼치기');
		}else {
			$j(this).next().addClass('active');
			$j(this).next().trigger('mouseover');
			$j(this).attr('title', '접기');
		}
	});
	$j(document).on('mouseleave','.pdt-N-btns',function(e){
		$j(this).find('.layer-ask').removeClass('active');
		$j(this).find('.btns.btns--laypop a.pdt-N-btn').attr('title', '펼치기');
	});
	$j(document).on('click','.layer-ask_close',function(e){
		e.preventDefault();
		var thisParent = $j(this).parents('.pdt-N-btns');
		$j(this).parents('.layer-ask').removeClass('active');
		$j(this).parents('.btns.btns--laypop').find('a.pdt-N-btn').attr('title', '펼치기').focus();
	});
});


/* // 230224 웹 접근성 추가 결함 조치 건 */
(function($){
	var $window = $(window),
		$document = $(document);

	$.fn.pdbar = function() {
		return this.each(function() {
			var self = this,
				$self = $(self),
				$btn = $self.find('.pd-list-btn'),
				$pdbox = $self.find('.pd-box'),
				$pdcover = $self.find('.pd-cover'),
				$pdlist = $self.find('.pd-list'),
				$pditems = $pdlist.find('li'),
				$tit = $pditems.find('.tit'),
				maxW = 0,
				maxHcss = $pdcover.css('max-height'),
				maxHsplit = typeof maxHcss === "undefined" ? 0 : maxHcss.split('px'),
				maxH = Number(maxHsplit[0]),
				scy = $('html, body').scrollTop(),
				agent = navigator.userAgent.toLowerCase(),
				scyFlag = true,
				bStyle = document.body.style;

			maxW = Math.max.apply(null, $tit.map(function() {
				return $(this).outerWidth();
			}).get());

			$window.scroll(function() {
				scy = $(this).scrollTop();

				if(scy > 0) {
					if(navigator.appVersion.indexOf("MSIE 9") != -1 || agent.indexOf("msie 9") != -1 || !('msTransition' in bStyle) && !('transition' in bStyle)) {
						if(scyFlag) {
							$self.animate({bottom : 0}, 300, function() {
								scyFlag = false;
							});
						}
					}
					$self.addClass('pd-fixed');
				} else {
					if(navigator.appVersion.indexOf("MSIE 9") != -1 || agent.indexOf("msie 9") != -1 || !('msTransition' in bStyle) && !('transition' in bStyle)) {
						$self.animate({bottom : -97}, 300, function() {
							scyFlag = true;
						});
					}
					$self.removeClass('pd-fixed');
					$pdbox.animate({
						top : 0
					}, 500, function() {
						$pdbox.removeClass('pd-open');
						$btn.removeClass('open');
						$btn.text('상품목록 열기');
					});
				}
			});

			scy > 0 ? $self.addClass('pd-fixed') : $self.removeClass('pd-fixed');

			var agent = navigator.userAgent.toLowerCase(); 
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
				maxW = maxW + 10

				$pdbox.css({
					width : $pdbox.outerWidth() + 20
				});
			}

			(maxW+1) > 200 ? $tit.css({width : (maxW+1), 'margin-right' : 10}) : $tit.css({width : (maxW+1)});

			$pditems.find('button').attr('tabindex', -1);
			$btn.bind('click', function() {
				var pdH = maxH < $pdlist.outerHeight() ? maxH+2 : $pdlist.outerHeight()+2;

				if($pdbox.hasClass('pd-open')) {
					$pditems.find('button').attr('tabindex', -1);
					$pdbox.animate({
						top : 0
					}, 500, function() {
						$pdbox.removeClass('pd-open');
						$btn.removeClass('open');
						$btn.text('상품목록 열기');
						$pdbox.css({
							'border-left' : 0,
							'border-right' : 0
						});
					});

					return;
				}

				$btn.addClass('open');
				$btn.text('상품목록 닫기');
				$pdbox.css({
					'border-left' : '2px solid #c1c1c1',
					'border-right' : '2px solid #c1c1c1'
				});

				$pditems.find('button').attr('tabindex', 0);
				$pdbox.animate({
					top : -pdH
				}, 500, function() {
					$pdbox.addClass('pd-open');
				});
			});
		});
	};

	$(function(){
		$('.cfmClProductBar').pdbar();

		setTimeout(function() {
			bgBlock('.pduct-fteform1297-box')
		}, 400);

		$('.top-three-box .btn-back').on('focus', function() {
			$(this).next().css('display', 'block');
			$('.sns-area .btn-sns').hide();

			$(this).length && $(this).on('keydown', function(e) {
				if(e.keyCode === 9 && e.shiftKey) {
					$(this).next().css('display', 'none');
				}
			});
			$(this).parent().length && $(this).parent().find('.more').on('keydown', function(e) {
				if(e.key === 'Tab') {
					if(e.shiftKey) {return;}
					$(this).parent().css('display', 'none');
				}
			});
		});
		$('.top-three-box').hover(function() {
			$(this).find('.top-three').css('display', 'block');
		}, function() {
			$(this).find('.top-three').css('display', 'none');
		});
	});

	function bgBlock(item) {
		var $item = $(item),
			offy = 0;

		if(typeof $item.offset() == 'undefined' || typeof $item.offset() == null) {
			return;
		}

		offy = $item.offset().top;

		$('.detail-plan-area').append('<span class="bg-block"></span>');
		$('.detail-plan-area .bg-block').css({
			top : offy
		});

	}	

})(jQuery);


window.addEventListener('load',function(){
	const $moveBtn = document.getElementById('N-pdt-acc-move');
	if($moveBtn){
		$moveBtn.addEventListener('click', function (evt) {
			evt.preventDefault();
			const targetSP = Array.from(document.querySelectorAll('.N-pdt-accordion-tit.opener')).find(function (button) {
			   return button.textContent.trim() === '가입 및 유의사항'
			})
			if (targetSP) {
			   window.scrollTo({
				  top: targetSP.getBoundingClientRect().top + window.pageYOffset - 110,
				  behavior: 'smooth'
			   });
			   targetSP.classList.add('active');
			   targetSP.setAttribute('title', '하위메뉴 닫기')
			   const targetParent = targetSP.closest('.seo-improve-heading');
			   const siblingTarget = targetParent.nextElementSibling;
			   if (siblingTarget) {
				  siblingTarget.style.display = 'block'
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
					$j('.tabs').find('a[href="#trigger1-1-2"]').trigger('click');
					break;
				}
			}
			break;
		}
	}
}