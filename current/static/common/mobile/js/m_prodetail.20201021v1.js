$j(function () {
	/* 상품페이지 공통 */
	$j('.m-prodetail').attr('id', 'mCfmClContainer');

    //신청하기
    $j('.apply').click(function(){
        $j(this).toggleClass("active");
        $j('.layer-ask').toggle()
    })
    //신청안내
    $j('.apply-info').click(function(){
        $j('.layer-popup').show();
		$j('.layer-popup').attr('tabindex', 0).focus();
    });
    $j('.layer-close').click(function(){
		$j('.layer-popup').hide();
		$j('.layer-popup').removeAttr('tabindex');
		$j('.apply-info').focus();
    });
	
	//KT 신청하기
    $j('#ktBtn_popup').click(function(){
        $j(this).toggleClass("active");
        $j('.layer-kt-ask').toggle()
    })

    //sns버튼
    $j('.sns-area .btn-share').on('click', function(e){
		$j('.sns-area .btn-sns').toggle();
		$j('.top-three-box .top-three').css('display', 'none');

		e.preventDefault();
    });

    //tab-cont
    $j(document).on('click','.tab-trig li', function(){
        $j(this).addClass('active').siblings('li').removeClass('active');
		$j(this).siblings('li').find('a').removeAttr('title');
		$j(this).find('a').attr('title', '선택됨');
        var trigIndex = $j(this).index();
        $j('.tab-cont').eq(trigIndex).addClass('active').siblings('li').removeClass('active')
    })

    // 아래로 내려가는 동영상 아코디언
    $j(document).on('click', '.accordions2 .accordion-trigger2', function (e) {
    e.preventDefault();
    var top = $j(this).offset().top;
    var trigger_height = $j(this).height();
    if ($j(this).hasClass('active')) {
		$j(this).prev().find('.script-area').removeAttr('tabindex', 0);
        $j(this).removeClass('active').children().text('자막열기').parent().prev('.accordion-contents2').stop().slideUp(500);
    } else {
        $j(this).closest('.accordions2').find('.accordion-trigger2').removeClass('active');
        $j(this).closest('.accordions2').find('.accordion-contents2').stop().slideUp(500);
        $j(this).addClass('active').children().text('자막닫기').parent().prev('.accordion-contents2').stop().slideDown(500, function() {
			$j(this).find('.script-area').attr('tabindex', 0);
			$j(this).find('.script-area').focus();
		});
        $j(this).animate({scrollTop:top + trigger_height},500);
    }
    });

	//접근성 201711 추가
	$j('.sns-area .btn-share').click(function(){
		var checkShowHide = $j(this).next('.btn-sns').css('display');
		if (checkShowHide == "block") {
			$j(this).attr("title","접기");
		} else {
			$j(this).attr("title","펼치기");
		}
	});
	$j('.btns a').click(function(){
		var checkShowHide = $j(this).next('.layer-ask').css('display');

		if(checkShowHide == '' || typeof(checkShowHide) == 'undefined') {
			$('.apply').removeClass('active');

			return;
		}

		if (checkShowHide == "block") {
			$j(this).attr("title","레이어팝업 접기");
			$j('.layer-kt-ask').css('display' ,'none');
		} else {
			$j(this).attr("title","레이어팝업 펼치기");
		}
	});
	
	$j('#ktBtn_popup').click(function(){
		var checkKtShowHide = $j(this).next('.layer-kt-ask').css('display');

		if (checkKtShowHide == "block") {
			$j(this).attr("title","레이어팝업 접기");
			$j('.layer-ask').css('display' ,'none');
		} else {
			$j(this).attr("title","레이어팝업 펼치기");
		}
	});

	$j('.recommend .tab a').click(function(){
		var thisTxtCheck = $j(this).hasClass('active');
		if (thisTxtCheck == true) {
			$j('.recommend .tab a').attr("title","");
			$j(this).attr("title","선택함");
		}
	});


	$j('.top-three-box .btn-back').click(function(){
		var checkShowHide = $j(this).next('.top-three').css('display');
		if (checkShowHide == "block") {
			$j(this).attr("title","펼치기");
			$j(this).next().css('display', 'none');
		} else {
			$j(this).attr("title","접기");
			$j(this).next().css('display', 'block');
			$j('.sns-area .btn-sns').css('display', 'none');
		}
	});
});

//접근성 관련 추가 코드
$j(document).ready(function() {
   $j('.recommend .tab').find('a.active').attr('title','선택됨') // 201711 접근성 추가

   $j('.accordions').find('.accordion-trigger').attr('title','열기');
   $j('.accordions').find('.accordion-trigger').on('click', function (e) {
       e.preventDefault();
      var thisTxtCheck = $j(this).hasClass('active');
      if (thisTxtCheck == true) {
         $j('.accordions .accordion-trigger').attr('title','열기');
		 setTimeout(function() {
			titlinkMore('.link-more');
		}, 200);
         $j(this).attr('title','닫기');
       } else {
         $j(this).closest('.accordion-trigger').attr('title','열기');
      }
      return false;
    });
});

function titlinkMore(item) {
	var $item = $j(item),
		titValue = $item.attr('title');

	if(titValue == '새창이동') {
		$item.attr('title', '새창열림');
	}

	$item.html('<img src="https://m.product.kt.com/static/common/mobile/img/prodetail/icon-more.png" alt="자세히 보기">');
}

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

		setTimeout(function() {
			titlinkMore('.link-more');
		}, 200);
	});
})(jQuery);