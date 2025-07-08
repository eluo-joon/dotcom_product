$j(function() {
    //cl_rate-system 
    $j('#choice1').on('click', 'a', function(e) {
        e.preventDefault();
        $j('#choice1').find('li').removeClass('active');
        $j('#choice1').find('li').children('a').attr('title','') // 201711 접근성 추가
        $j(this).closest('li').addClass('active');
        $j(this).closest('li').children('a').attr('title','선택함') // 201711 접근성 추가
    });
    $j('#choice2 ul').on('click', 'a', function(e) {
        e.preventDefault();
        $j('#choice2').find('li').removeClass('active');
        $j('#choice2').find('li').children('a').attr('title','') // 201711 접근성 추가
        $j(this).closest('li').addClass('active');
        $j(this).closest('li').children('a').attr('title','선택함') // 201711 접근성 추가
    });
    $j('.plan-list').find('button').on('click', function() {
        $j(this).toggleClass('active').find('i').text('목록닫기').closest('.plan-list').next('.detail-list').toggle();
        if ($j(this).hasClass('active')) {
            $j(this).find('i').text('목록보기');
        }
    });
    //cl_rate-system-popup 
    $j('a[href="#compare-alert"]').on('click', function(e) {
        e.preventDefault();
        $j(this).toggleClass('active');
        var length = $j('a[href="#compare-alert"].active').length;
        if (length < 4) {
            $j('.floating-compare .num').text(length);
            $j('#compare-alert').stop().fadeIn(300).delay(800).fadeOut(300).find('span').text(length);
        } else {
            $j(this).removeClass('active');
        }
    });

    //cl_rate-system-popup 
    var sliderBanner = $j('.slider-banner-area .banner-area .visual').bxSlider({
        slideWidth: 1084,
		speed: 800,
		auto: true,
		pause: 3000,
		autoHover: true,
		autoControls: true,
		controls: true,
		pager: true,
		touchEnabled: false,
		slideMargin: 10
    });

	var sliderTopBanner = $j('.slider-banner-area2 .banner-area .visual').bxSlider({
		speed: 800,
		auto: true,
		pause: 3000,
		autoHover: true,
		autoControls: true,
		controls: true,
		pager: true,
		touchEnabled: false,
		slideMargin: 10
    });

    // if($j('.banner-area .visual').length){
    //     if(sliderBanner.getSlideCount() == 1) $j('.bx-controls').hide();
    // }

	
  //롤링 배너가 1개일 때 인디케이터 감춤
    $j('.bx-wrapper').each(function() {
        var thsbxlist = $j(this).find("ul").children("li:not(.bx-clone)");
        var thsbxctrl = $j(this).find('.bx-controls');
        if (thsbxlist.length == 1) {
            thsbxctrl.hide();
        }
    });

});
$j(document).ready(function(){
	$j('#choice1').find('li.active').children('a').attr('title','선택함') // 201711 접근성 추가
	$j('#choice2').find('li.active').children('a').attr('title','선택함') // 201711 접근성 추가

	// 소상공인 링크 추가 : 소상공인 상품정보
	/*var pageV = $j("#cate_code").attr("value");
	if (pageV == "6046")	{
		var sslinktext = "<div class='top-three-box ssmenulink'><span class='btn-back'>연관상품안내</span><div class='top-three' style='display: block;'><ul class='three-list'><li><a href='https://product.kt.com/wDic/productDetail.do?ItemCode=1512' class='smleftlink'>소상공인 추천상품</a></li><li><a href='https://product.kt.com/wDic/productDetail.do?ItemCode=1513' class='smrightlink'>사장님 혜택존</a></li></ul></div></div>"
		$j(".hgroup").append(sslinktext);
		$j(".three-list .smleftlink").bind('click', KT_trackClicks('KT-개인_상품서비스', '^KT-개인_상품서비스^소상공인_메뉴간이동_소상공인 추천상품'));
		$j(".three-list .smrightlink").bind('click', KT_trackClicks('KT-개인_상품서비스', '^KT-개인_상품서비스^소상공인_메뉴간이동_사장님 혜택존'));
	}*/
});

/* 상품서비스_모바일_리스트_기능개선_v0.1_20190226 레이어 팝업 */
(function($){
	var $window = $(window),
		$document = $(document);

	$.fn.Laypop = function(options) {
		var config = $.extend({
			sUrl : '/wDic/myPriceTypePop.do',
			tit : '내게 맞는 모바일 요금제 찾기',
			w : 1200,
			h : 710,
			contH : 618
		}, options);
		return this.each(function() {
			var self = this,
				$self = $(self);

			$self.bind('click', function() {
				var item = this,
					$item = $(item),
					contnetId = item && item.getAttribute('href', 2),
					content = contnetId.split('#')[1];
					wpos = config.w / 2,
					hpos = config.h / 2,
					createHtml = [];

					config.contH != 0 ? config.contH : config.contH = 0;
					
					createHtml = [
						'<button id="lastmove" type="button">레이어 닫기 버튼으로 이동</button>',
						'<div id="'+content+'" class="layers big" style="z-index:10001;width:'+config.w+'px; height:'+config.h+'px; position:fixed; top:50%; margin-top:-'+hpos+'px; left:50%; margin-left:-'+wpos+'px;" tabindex="0">',
						'<div class="layer-header"><strong>'+config.tit+'</strong></div>',
						'<div class="layer-contents"><div style="height:'+config.contH+'px;">',
						'<!-- WAC_ER_케이티닷컴 개인_1st 수정 -->',
						'<iframe src="https://product.kt.com/wDic/myPriceTypePop.do" width="100%" height="100%;" frameborder="0" scrolling="yes" allowfullscreen="false" title="내게 맞는 요금제를 찾아보세요"></iframe>',
						'<!-- // WAC_ER_케이티닷컴 개인_1st 수정 -->',
						'</div></div>',
						'<div id="'+content+'-close" class="layer-close"><button type="button"><span><img src="/static/common/web/img/btn-layer-close.png" alt="닫기"></span></button></div>',
						'</div>'
					].join('');

				$('body').append(createHtml);
				$('body').append('<div class="popup-dim" style="background:#000; opacity:0.5;"></div>');
				$('#' + this.id).focus();
				$('html, body').css({'overflow' : 'hidden'});

				$('.layer-close').on('click', function() {
					
					$document.find(contnetId).remove();
					$('.popup-dim').remove();
					$('#lastmove').remove();
					$('a[href="'+contnetId+'"]').focus();
					$('html, body').css({'overflow' : ''});
				});

				acc(contnetId);
			});

			function acc(contnetId) {
				var $item = $(contnetId),
					$close = $(contnetId + '-close');

				$(contnetId + '-close').on('keydown', function(e) {
					if(e.keyCode == 9) {
						$item.focus();
					}
				});

				$('#lastmove').on('focus', function() {
					$close.find('button').focus();
				});
			}
		});
	};

	$(function() {
		$('#Laypop').Laypop();
	});
})(jQuery);
/* // 상품서비스_모바일_리스트_기능개선_v0.1_20190226 레이어 팝업 */

/* 2507 요금카테고리 개편*/
document.addEventListener("DOMContentLoaded", ()=> {
	// (function swiperTab () {
	// 	const swiperTab = document?.querySelector('.search-period-area.type-swiper');
	// 	const mainTab = swiperTab?.querySelector('.ui-tab.type-main');
	// 	if(!swiperTab || !mainTab) return;

	// 	const mainTabBtns = mainTab.querySelectorAll('.ui-tab-list-btn');
	// 	const subTabs = document.querySelectorAll('.ui-tab.type-sub .swiper-container');
	// 	const hasSubTabs = subTabs.length > 0;
	// 	let isFirstInit = true;

	// 	function initTab() {
	// 		if (mainTabBtns.length === 0) return;

	// 		let defaultIndex = -1;

	// 		if (hasSubTabs) {
	// 			subTabs.forEach((tab, idx) => {
	// 				const btns = tab.querySelectorAll('.ui-tab-list-btn');
	// 				btns.forEach(btn => {
	// 					if(btn.classList.contains('active')) {
	// 						defaultIndex = idx;
	// 						btn.setAttribute('title', '선택함(현재 페이지)')
	// 					}
	// 				})
	// 			});
	// 		} else {
	// 			mainTabBtns.forEach((btn, idx) => {
	// 				if (btn.classList.contains('active')) {
	// 					defaultIndex = idx;
	// 				}
	// 			});
	// 		}

	// 		if (defaultIndex === -1) defaultIndex = 0;

	// 		if (hasSubTabs) initSwiper();

	// 		activateTab(mainTabBtns[defaultIndex], defaultIndex);

	// 		bindEvent();
	// 	}

	// 	function initSwiper () {
	// 		subTabs.forEach(tab => {
	// 			const slides = tab.querySelectorAll('.swiper-slide');
	// 			let totalWidth = 0;

	// 			slides.forEach(slide => {
	// 				totalWidth += slide.offsetWidth;
	// 			});

	// 			if (totalWidth > tab.offsetWidth) {
	// 				const nextBtn = document.createElement('button');
	// 				nextBtn.className = 'swiper-button swiper-button-next';
	// 				const prevBtn = document.createElement('button');
	// 				prevBtn.className = 'swiper-button swiper-button-prev';
	// 				const scrollbar = document.createElement('div');
	// 				scrollbar.className = 'swiper-scrollbar'
	// 				tab.appendChild(prevBtn);
	// 				tab.appendChild(nextBtn);
	// 				tab.appendChild(scrollbar);

	// 				new Swiper(tab, {
	// 					slidesPerView: 'auto',
	// 					resistanceRatio: 0,
	// 					navigation: {
	// 						nextEl: nextBtn,
	// 						prevEl: prevBtn,
	// 					},
	// 					scrollbar: {
	// 						el: '.swiper-scrollbar',
	// 						draggable: true,
	// 						// dragSize: 200
	// 					},
	// 					on: {
	// 						init: function () {
	// 							const swiper = this;
	// 							const focusBtns = tab.querySelectorAll('.swiper-slide .ui-tab-list-btn');
	// 							focusBtns.forEach((btn, index) => {
	// 								btn.addEventListener('focus', () => swiper.slideTo(index));
	// 							});
	// 						},
	// 					},
	// 				});

	// 			} else {
	// 				const nextBtn = tab.querySelector('.swiper-button-next');
	// 				const prevBtn = tab.querySelector('.swiper-button-prev');
	// 				if (nextBtn) nextBtn.style.display = 'none';
	// 				if (prevBtn) prevBtn.style.display = 'none';
	// 			}
	// 		});
	// 	}

	// 	function activateTab (btn, idx) {
	// 		mainTabBtns.forEach(item => {
	// 			item.removeAttribute('title');
	// 			item.classList.remove('active');
	// 		});
	// 		btn.classList.add('active');
	// 		btn.setAttribute('title', '선택함');

	// 		if (hasSubTabs) {
	// 			subTabs.forEach((item) => {
	// 				item.classList.remove('is-show');
	// 				const allBtns = item.querySelectorAll('.ui-tab-list-btn');
	// 				allBtns.forEach(el => {
	// 					el.setAttribute('tabindex', '-1');
	// 					el.setAttribute('aria-hidden', 'true');
	// 				});

	// 				const prevBtn = item.querySelector('.swiper-button-prev');
	// 				const nextBtn = item.querySelector('.swiper-button-next');
	// 				if (prevBtn) {
	// 					prevBtn.setAttribute('tabindex', '-1');
	// 					prevBtn.setAttribute('aria-hidden', 'true');
	// 				}
	// 				if (nextBtn) {
	// 					nextBtn.setAttribute('tabindex', '-1');
	// 					nextBtn.setAttribute('aria-hidden', 'true');
	// 				}
	// 			});

	// 			const activeTab = subTabs[idx];
	// 			activeTab.classList.add('is-show');

	// 			const activeBtns = activeTab.querySelectorAll('.ui-tab-list-btn');
	// 			activeBtns.forEach(el => {
	// 				el.removeAttribute('tabindex');
	// 				el.removeAttribute('aria-hidden');
	// 			});

	// 			const activePrevBtn = activeTab.querySelector('.swiper-button-prev');
	// 			const activeNextBtn = activeTab.querySelector('.swiper-button-next');
	// 			if (activePrevBtn) {
	// 				activePrevBtn.removeAttribute('tabindex');
	// 				activePrevBtn.removeAttribute('aria-hidden');
	// 			}
	// 			if (activeNextBtn) {
	// 				activeNextBtn.removeAttribute('tabindex');
	// 				activeNextBtn.removeAttribute('aria-hidden');
	// 			}

	// 			if (isFirstInit) {
	// 				const defaultActiveBtn = activeTab.querySelector('.ui-tab-list-btn.active');
	// 				if (defaultActiveBtn) {
	// 					const slides = activeTab.querySelectorAll('.swiper-slide');
	// 					let slideIndex = 0;
	// 					slides.forEach((slide, i) => {
	// 						if (slide.contains(defaultActiveBtn)) {
	// 							slideIndex = i;
	// 						}
	// 					});

	// 					const swiper = activeTab.swiper;
	// 					if (swiper) swiper.slideTo(slideIndex, 0);
	// 				}

	// 				isFirstInit = false;
	// 			}
	// 		}
	// 	}

	// 	function bindEvent () {
	// 		mainTabBtns.forEach((btn, idx) => {
	// 			btn.addEventListener('click', e => {				
	// 				if (btn.classList.contains('active')) return;
	// 				activateTab(btn, idx);

	// 				const wrapper = subTabs[idx];
	// 				if (wrapper) {
	// 					wrapper.setAttribute('tabindex', '-1');
	// 					wrapper.focus();
	// 				}
	// 			});
	// 		})
	// 	}

	// 	initTab ();
	// }) (); 

/* 2507 요금카테고리 개편 */
		class SwiperTab {
			constructor(el) {
				this.swiperTab = el;
				this.mainTab = this.swiperTab?.querySelector('.ui-tab.type-main');
				if (!this.swiperTab || !this.mainTab) return;

				this.mainTabBtns = this.mainTab.querySelectorAll('.ui-tab-list-btn');
				this.subTabs = this.swiperTab.querySelectorAll('.ui-tab.type-sub .swiper-container');
				this.hasSubTabs = this.subTabs.length > 0;
				this.isFirstInit = true;

				this.initTab();
			}

			initTab() {
				if (this.mainTabBtns.length === 0) return;

				let defaultIndex = -1;

				if (this.hasSubTabs) {
					this.subTabs.forEach((tab, idx) => {
						const btns = tab.querySelectorAll('.ui-tab-list-btn');
						btns.forEach(btn => {
							if (btn.classList.contains('active')) {
								defaultIndex = idx;
								btn.setAttribute('title', '선택함(현재 페이지)');
							}
						});
					});
				} else {
					this.mainTabBtns.forEach((btn, idx) => {
						if (btn.classList.contains('active')) {
							defaultIndex = idx;
						}
					});
				}

				if (defaultIndex === -1) defaultIndex = 0;

				if (this.hasSubTabs) this.initSwiper();

				this.activateTab(this.mainTabBtns[defaultIndex], defaultIndex);

				this.bindEvent();
			}

			initSwiper() {
				this.subTabs.forEach(tab => {
					const slides = tab.querySelectorAll('.swiper-slide');
					let totalWidth = 0;

					slides.forEach(slide => {
						totalWidth += slide.offsetWidth;
					});

					if (totalWidth > tab.offsetWidth) {
						const nextBtn = document.createElement('button');
						nextBtn.className = 'swiper-button swiper-button-next';
						const prevBtn = document.createElement('button');
						prevBtn.className = 'swiper-button swiper-button-prev';
						const scrollbar = document.createElement('div');
						scrollbar.className = 'swiper-scrollbar';
						tab.appendChild(prevBtn);
						tab.appendChild(nextBtn);
						tab.appendChild(scrollbar);

						new Swiper(tab, {
							slidesPerView: 'auto',
							resistanceRatio: 0,
							navigation: {
								nextEl: nextBtn,
								prevEl: prevBtn,
							},
							scrollbar: {
								el: '.swiper-scrollbar',
								draggable: true,
							},
							on: {
								init: function () {
									const swiper = this;
									const focusBtns = tab.querySelectorAll('.swiper-slide .ui-tab-list-btn');
									focusBtns.forEach((btn, index) => {
										btn.addEventListener('focus', () => swiper.slideTo(index));
									});
								},
							},
						});

					} else {
						const nextBtn = tab.querySelector('.swiper-button-next');
						const prevBtn = tab.querySelector('.swiper-button-prev');
						if (nextBtn) nextBtn.style.display = 'none';
						if (prevBtn) prevBtn.style.display = 'none';
					}
				});
			}

			activateTab(btn, idx) {
				this.mainTabBtns.forEach(item => {
					item.removeAttribute('title');
					item.classList.remove('active');
				});
				btn.classList.add('active');
				btn.setAttribute('title', '선택함');

				if (this.hasSubTabs) {
					this.subTabs.forEach(item => {
						item.classList.remove('is-show');
						const allBtns = item.querySelectorAll('.ui-tab-list-btn');
						allBtns.forEach(el => {
							el.setAttribute('tabindex', '-1');
							el.setAttribute('aria-hidden', 'true');
						});

						const prevBtn = item.querySelector('.swiper-button-prev');
						const nextBtn = item.querySelector('.swiper-button-next');
						if (prevBtn) {
							prevBtn.setAttribute('tabindex', '-1');
							prevBtn.setAttribute('aria-hidden', 'true');
						}
						if (nextBtn) {
							nextBtn.setAttribute('tabindex', '-1');
							nextBtn.setAttribute('aria-hidden', 'true');
						}
					});

					const activeTab = this.subTabs[idx];
					activeTab.classList.add('is-show');

					const activeBtns = activeTab.querySelectorAll('.ui-tab-list-btn');
					activeBtns.forEach(el => {
						el.removeAttribute('tabindex');
						el.removeAttribute('aria-hidden');
					});

					const activePrevBtn = activeTab.querySelector('.swiper-button-prev');
					const activeNextBtn = activeTab.querySelector('.swiper-button-next');
					if (activePrevBtn) {
						activePrevBtn.removeAttribute('tabindex');
						activePrevBtn.removeAttribute('aria-hidden');
					}
					if (activeNextBtn) {
						activeNextBtn.removeAttribute('tabindex');
						activeNextBtn.removeAttribute('aria-hidden');
					}

					if (this.isFirstInit) {
						const defaultActiveBtn = activeTab.querySelector('.ui-tab-list-btn.active');
						if (defaultActiveBtn) {
							const slides = activeTab.querySelectorAll('.swiper-slide');
							let slideIndex = 0;
							slides.forEach((slide, i) => {
								if (slide.contains(defaultActiveBtn)) {
									slideIndex = i;
								}
							});

							const swiper = activeTab.swiper;
							if (swiper) swiper.slideTo(slideIndex, 0);
						}

						this.isFirstInit = false;
					}
				}
			}

			bindEvent() {
				this.mainTabBtns.forEach((btn, idx) => {
					btn.addEventListener('click', () => {
						if (btn.classList.contains('active')) return;
						this.activateTab(btn, idx);

						const wrapper = this.subTabs[idx];
						if (wrapper) {
							wrapper.setAttribute('tabindex', '-1');
							wrapper.focus();
						}
					});
				});
			}
		}

		// 여러 개 있을 경우
		const swiperTabs = document?.querySelectorAll('.search-period-area.type-swiper');
		if (swiperTabs.length > 0) {
			swiperTabs.forEach(el => {
				new SwiperTab(el);
			});
		}

});