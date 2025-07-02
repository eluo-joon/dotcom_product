/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

$j = jQuery.noConflict();

var cfmUi = {};
cfmUi.COMMON = function(){}

// 상단부분
cfmUi.COMMON.top = function(){
	// 로그인, 로그아웃 버튼
	$j(".btn-gnblogin, .btn-gnblogout").on('focus', function() {
		$j(this).next(".wrap-gnblogdiv").show();
		if ($j(this).parent('div').hasClass('wrap-gnblogin')){
			$j(".wrap-gnblogout .wrap-gnblogdiv").hide();
		} else {
			$j(".wrap-gnblogin .wrap-gnblogdiv").hide();		
		}

		//GNB 메뉴 열려있으면 닫기 - 웹접근성
		if($j('#cfmClGnb .sub-navigation').is(':visible')){
			$j('#cfmClGnb .sub-navigation').hide();
			$j("#cfmClHeader, #cfmClGnb").removeClass("active");
		}		

		$j("#btn-search").on('focus', function() {
			$j(".wrap-gnblogdiv").hide();
		});

		$j(".sub-navigation a").on('focus', function() {
			$j(".wrap-gnblogdiv").hide();
		});

		$j(".btn-group").on('click', function() {
			$j(".wrap-gnblogdiv").hide();
		});
	});
	$j(".wrap-gnblogin, .wrap-gnblogout").on('mouseenter', function() {
		$j(this).find(".wrap-gnblogdiv").show();
	}).on('mouseleave', function() {
		$j(this).find(".wrap-gnblogdiv").hide();
	});

	//통합검색 버튼
	$j('#btn-search').on('click', function(e){
		e.preventDefault();
		cfmTotalSearch(this);
	});

	//전체메뉴
	$j('#btn-all-menus').on('click', function (e) {
		e.preventDefault();
		if ($j(this).hasClass('active')) {
			cfmAllMenus(this, true);
		} else {
			cfmAllMenus(this);
		}
	});
}

// GNB메뉴
cfmUi.COMMON.navGNB = function(){
	//depth4 유무 구분
	$j("#cfmClGnb .navigation .depth3>li").each(function(idx){
		var data = $j(this).find('a').data();
		if(data.menudispcnt > 0){
			$j("#cfmClGnb .navigation .depth3>li:eq("+idx+")>a").addClass('is-depth4').attr("title","펼치기");
		}
	});

	if(!$j("#cfmClGnb").hasClass("sub")) $j("#cfmClHeader").addClass("bg-blur");

	$j("#cfmClGnb .navigation>ul>li>a").on('mouseenter focus', function(){
		var ret = cfmLayers('gnbmenu', 'on');
		if(ret != false){
			$j("body").addClass("cfm-nonscroll"); //스크롤
			$j("#cfmClGnb .navigation>ul>li>a").removeClass('active'); //하위뎁스 active 삭제
			$j("#cfmClGnb .sub-navigation .is-depth4").removeClass('active'); //하위뎁스(3뎁스) active 삭제
			$j("#cfmClGnb .sub-navigation ul.depth4").hide(); //4뎁스 hide
			$j("#cfmClGnb .sub-navigation").stop().slideUp(200).removeAttr('style');
			$j(this).addClass('active').next().stop().slideDown(300);
			$j("select").blur();
		}		
	});

	$j("#cfmClGnb").on('mouseleave', function(){
		var ret = cfmLayers('gnbmenu', 'off');
		if(ret != false){
			$j("body").removeClass("cfm-nonscroll"); //스크롤
			$j("#cfmClGnb .sub-navigation").hide(); //GNB 닫기
		}
	});

	var $navDepth3 = $j(".navigation .is-depth4");
	$navDepth3.click(function(e){		
		e.preventDefault();

		//클릭통계
		var data = $j(this).data();
		if(data.statinfo != undefined){
			KT_trackClicks('KT-개인_공통', data.statinfo +'^'+ $j(this).attr('title'));
		}
		
		if($j(this).hasClass('active')){
			$j(this).removeClass('active').attr("title","펼치기");
			$j(".depth4").slideUp(300);
		}else{
			$navDepth3.removeClass('active').attr("title","펼치기");
			$j(".depth4").slideUp(300);
			$j(this).addClass('active').attr("title","접기").next().stop().slideDown(300);
		}
	});
}

// 전체메뉴
cfmUi.COMMON.navAll = function(){
	$j('#btn-all-menus').attr('title', '열기'); //0707 웹접근성

	//depth4 유무 구분 
	$j("#all-menus .depth3>li").each(function(idx){
		var data = $j(this).find('a').data();
		if(data.showcnt > 0){
			$j("#all-menus .depth3>li:eq("+idx+")>a").addClass('is-depth4').attr("title","펼치기");
		}
	});

	var $allDepth1 = $j('#all-menus .menus .depth1 .toggle-btn');
	$allDepth1.each(function(idx){
		var $allDepth1txt = $j(this).prev('a').text();
		$j(this).attr('title', $allDepth1txt + ' 닫기');
	});
	$allDepth1.on('click', function(e){
		e.preventDefault();
		$j(this).toggleClass('active').closest('li').find('.depth2').stop().slideToggle();
		var $allDepth1txt = $j(this).prev('a').text();

		if(!$j(this).hasClass('active')){
			$j(this).attr('title', $allDepth1txt + ' 펼치기');
		}else{
			$j(this).attr('title', $allDepth1txt + ' 닫기');
		}
	});
	var $allDepth3 = $j('#all-menus .menus .is-depth4');
	$allDepth3.on('click', function(e){
		e.preventDefault();

		//클릭통계
		var data = $j(this).data();
		if(data.statinfo != undefined){
			data.statinfo = data.statinfo.replace('^GNB', '^전체메뉴'); //통계정보 변경
			KT_trackClicks('KT-개인_공통', data.statinfo +'_'+ $j(this).attr('title'));
		}

		$j(this).toggleClass('active').next('.depth4').stop().slideToggle();
		if($j(this).hasClass('active')){
			$j(this).attr("title","접기");
		}else{
			$j(this).attr("title","펼치기");
		}
	});
}

// 통합검색 
cfmUi.COMMON.search = function(){
	
}

// 슬아이드 배너
cfmUi.COMMON.clickBanner = function(){
	// 상단 banner
    var topBannerHeight = $j('.top-banner').height();

    //상단 banner 배너가 있을 때 전체 메뉴 위치 조정
    var oldTop = parseInt($j('#all-menus').css('top'));
    if($j('.top-banner:visible').length > 0){
        $j('#all-menus').css('top', oldTop + topBannerHeight);
    }

    // 상단 banner 닫을 때
    $j('.top-banner').find('.btn-close').on('click', function () {
        $j('.top-banner').delay(300).animate({top: -topBannerHeight}, 1500, 'swing', function(){$j('.top-banner').hide();}); 
        $j('#cfmClHeader, #cfmClContainer').delay(300).animate({"margin-top": '-1px'}, 1500, 'swing');

        $j('#all-menus').delay(200).animate({top:oldTop}, 1000, 'swing');

        bannerHeight = 0;
    });

    // 상단 banner 있을 때
    if( $j('.top-banner:visible').length > 0 ){
        $j('.top-banner').delay(300).animate({top: 0}, 1500, 'swing');
        $j('#cfmClHeader, #cfmClContainer').delay(300).animate({"margin-top": topBannerHeight}, 1500, 'swing');
    }
}

// 팝업
cfmUi.COMMON.pupup = function(){
	var pop_slider=$j(".popup-layer-contents").bxSlider({
		pager: ($j(".popup-layer-contents > div").length > 1) ? true : false,
		auto: false,
		startSlide: 0,
		autoControls: false, //재생, 정지버튼
		stopAutoOnClick: false, //버튼 클릭시 자동롤링 정지
		controls: false,
		autoHover: true, //마우스 오버시 자동롤링 정지
		touchEnabled : true, //크롬에서 마우스 클릭 시 링크 안 되는 오류가 있어서 PC인 경우 사용
		ariaLive : false, //스크린리더에서 슬라이딩 배너를 먼저 읽어서 이용자에게 불편을 주는 경우가 있어서 사용
		speed: 300,
		pause: 3800,
		swipeThreshold : 100,
		oneToOneTouch: false,
		onSliderLoad: function(currentIndex){
			// 컨트롤 영역을 배너 앞으로 옮김
			$j( ".popup-dim .bx-controls" ).insertBefore( $j( ".popup-dim .bx-viewport" ) );

			// 인디케이터를 정지/재생 앞으로 옮김 
			$j( ".popup-dim .bx-pager.bx-default-pager" ).insertBefore( $j( ".popup-dim .bx-controls-auto" ) );

			// 선택된 인디케이터에 선택됨 표시
			$j('.popup-dim .bx-pager-item').eq(currentIndex).children('a').attr('title','선택됨');

			// 포커스가 있을 때 멈춤
			$j('.popup-dim').find('a, area, button').on('focus', function (){
				pop_slider.stopAuto();
			});

			$j('#portal-popup').css('visibility', 'visible').animate({opacity:1});
		},onSlideAfter: function($slideElement, oldIndex, newIndex){
			// 선택된 인디케이터에 선택됨 표시
			$j('.popup-dim .bx-pager-item a').attr('title','');
			$j('.popup-dim .bx-pager-item').eq(newIndex).children('a').attr('title','선택됨');
		}
	});


	// 메인 팝업 배너 닫기
	$j('.layer-notice').find('button').on('click', function(){
		setTimeout(function(){ 
			$j(".nav-call.js-popup-call").focus();	// 팝업 닫은 후 전체메뉴 링크로 이동			
		}, 300);
		$j(this).closest('div[class*="popup-"]').fadeOut();
		$j(".popup-dim").siblings().attr("aria-hidden","false");
	});
}

// 퀵메뉴
cfmUi.COMMON.floating = function(){
	// 퀵메뉴 토글 : shortstt 클래스 추가/삭제로 토글
	$j(".floating-menu-btn-toggle").on('click', function(){
		if ($j('.floating-menu .inner').hasClass('shortstt')){
			$j(this).find('.hidetxt').text('퀵메뉴 접기');//2021 웹접근성 : 텍스트 수정//2023 웹접근성 : 텍스트 수정
			$j('.floating-menu .inner').removeClass('shortstt');
		} else {
			$j(this).find('.hidetxt').text('퀵메뉴 펼치기');//2021 웹접근성 : 텍스트 수정//2023 웹접근성 : 텍스트 수정
			$j('.floating-menu .inner').addClass('shortstt');
		}	
	});
}

// 플로팅 온마시 배너
cfmUi.COMMON.floatingBanner = function(){
	//큰이미지 노출(3초후-작은이미지노출)
	opntoast();

	//큰이미지 마우스오버시(유지-큰이미지노출)
	$j(".bn_fix_b").on("mouseenter", function(){
		clearTimeout(campaignFloatingTime);
	});

	//큰이미지 마우스아웃시(3초후-작은이미지노출)
	$j(".bn_fix_b").on("mouseleave", function(){
		campaignFloatingTime = setTimeout(function(){ clstoast(); }, 3000);
	});

	//큰이미지 닫기(즉시-작은이미지노출)
	$j("#floatTy3_close").click(function(){
		clstoast();
		$j(".bn_fix_s a").focus(); //0712 웹접근성 포커스
	});

	//작은이미지 마우스오버시(즉시-큰이미지노출)
	$j(".bn_fix_s a").on("mouseenter", function(){
		if(!$j(".bn_fix_b").is(':visible')){
			opntoast();
		}
	});

	//작은이미지 클릭시(즉시-큰이미지노출)
	$j(".bn_fix_s a").on("click", function(){
		if(!$j(".bn_fix_b").is(':visible')){
			opntoast();
			$j(".bn_fix_b a").focus(); //0712 웹접근성 포커스
		}
	});
	
	//스크롤이동시(즉시-작은이미지노출)
	$j(document).scroll(function(){	
		clstoast();		
	});
}

// total search
var cfmTotalSearch = function(obj){
	var self = $j(obj);
	var target = $j($j(obj).attr("href"));
	
	cfmLayers('search', 'on');
	self.toggleClass('active');
	target.hide();
	
	if(self.hasClass('active')){
		target.stop().slideDown(500);
		$j("#cfmClHeader, #cfmClGnb").addClass("active");
	}else{
		$j("#cfmClHeader, #cfmClGnb").removeClass("active");
	}

	target.attr("tabindex", "0").focus();
	target.find(".bottom button").click(function(){ //닫기 - 05.23 .unbind() 삭제
		cfmLayers('search', 'off');
		self.removeClass('active').focus();
		target.hide();
	});
}

// all-menus
var cfmAllMenus = function(obj, visible){
	var self = $j(obj);
	var target = $j($j(obj).attr("href"));

	if(visible){
		self.attr('title', '열기'); //0707 웹접근성

		cfmLayers('allmenu', 'off');
		self.removeClass('active').focus();
		target.hide();
	}else{
		self.attr('title', '닫기'); //0707 웹접근성

		cfmLayers('allmenu', 'on');
		self.toggleClass('active');
		target.hide();

		if(self.hasClass('active')){
			target.stop().slideDown(400, function(){
				var marginValue = 40;
				var scrollbarHeight = $j('#all-menus').height() - $j('#all-menus .search-area').height() - marginValue;
				$j('#scrollbar').outerHeight(scrollbarHeight).attr('tabindex','0');
			});
		}

		target.find(".bottom button").click(function(){
			self.attr('title', '열기'); //0707 웹접근성

			cfmLayers('allmenu', 'off');
			self.removeClass('active').focus();
			target.hide();
		});
	}	
}

// 레이어 관리
var cfmLayers = function(target, type){
	var $gnbmenu = $j('#cfmClGnb .sub-navigation'); //GNB메뉴 레이어
	var $search = $j('#cfmClGnb .total-search'); //검색 레이어
	var $allmenu = $j('#cfmClGnb .all-menus'); //전체메뉴 레이어
	var $ktalk = $j('#cfmClGnb .cfmSmartTalkLinkTxtDiv'); //케이톡 레이어
	var $quickmenu = $j('#cfmClHeader .floating-menu .inner'); //퀵메뉴 레이어

	var $allmenu_btn = $j('#cfmClGnb #btn-all-menus'); //전체메뉴 버튼
	var $search_btn = $j('#cfmClGnb #btn-search'); //검색 버튼
	
	if(type == 'on'){
		if(target == 'gnbmenu'){ //GNB메뉴
			if($allmenu_btn.hasClass('active') || $search_btn.hasClass('active')){ //전체메뉴,검색 레이어 열림 기능 skip
				return false;
			}

			$search.hide();
			$allmenu.hide();
			$ktalk.attr('style','visibility:hidden;');
			$allmenu_btn.removeClass('active');
			$search_btn.removeClass('active');

			$j("#cfmClHeader, #cfmClGnb").addClass("active");
		}else if(target == 'search'){ //검색
			$gnbmenu.hide();
			$allmenu.hide();
			$ktalk.attr('style','visibility:hidden;');	
			$allmenu_btn.removeClass('active');

			//1뎁스 active 삭제
			$j('.navigation').find('a.active').removeClass('active'); 

			$j("#cfmClHeader, #cfmClGnb").addClass("active");
			$j("#cfmClGnb").removeClass('allmenus').toggleClass('search');
		}else if(target == 'allmenu'){ //전체메뉴
			$gnbmenu.hide();
			$search.hide();
			$search_btn.removeClass('active');

			//1뎁스 active 삭제
			$j('.navigation').find('a.active').removeClass('active'); 

			$j("#cfmClHeader, #cfmClGnb").addClass("active");
			$j('#cfmClGnb').removeClass('search').toggleClass('allmenus');
		}
	}else if(type == 'off'){
		if(target == 'gnbmenu'){ //GNB메뉴
			if($allmenu_btn.hasClass('active') || $search_btn.hasClass('active')){ //전체메뉴,검색 레이어 열림 기능 skip
				return false;
			}

			if($j('.cfmSmartTalkLinkChatDiv').is(':visible') == false) $ktalk.attr('style','visibility:visibe;');
			
			$j("#cfmClHeader, #cfmClGnb").removeClass("active");
		}else if(target == 'search'){ //검색
			if($j('.cfmSmartTalkLinkChatDiv').is(':visible') == false) $ktalk.attr('style','visibility:visibe;');

			$j("#cfmClHeader, #cfmClGnb").removeClass("active");
			$j('#cfmClGnb').removeClass('search');
		}else if(target == 'allmenu'){ //전체메뉴	
			if($j('.cfmSmartTalkLinkChatDiv').is(':visible') == false) $ktalk.attr('style','visibility:visibe;');

			$j("#cfmClHeader, #cfmClGnb").removeClass("active");
			$j('#cfmClGnb').removeClass('allmenus');
		}
	}
}

// 0713 웹접근성 포커스 이동 
function accessibilityFocus() { 
	$j(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){ 
		var next = $j(e.target).attr('data-focus-next'), 
		    prev = $j(e.target).attr('data-focus-prev'), 
			target = next || prev || false; 
		
		if(!target || e.keyCode != 9) { return; } 
		if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) { 
			setTimeout(function(){ $j('[data-focus="' + target + '"]').focus(); }, 1); 
		} 
	}); 
} 

$j(function (){
	// 250422 추가 : 채널 영역이 포커스 받을 때 GNB 메뉴 열려 있으면 닫기 
	$j(".navigation .inner .current").attr("title","선택됨");
	
	// 250422 추가 : 채널 영역이 포커스 받을 때 GNB 메뉴 열려 있으면 닫기 
	$j(".list-channel a").on('focus', function() {
		if($j('#cfmClGnb .sub-navigation').is(':visible')){
			$j('#cfmClGnb .sub-navigation').hide();
			$j("#cfmClHeader, #cfmClGnb").removeClass("active");
		}
	});
	
	// 하단 footer family 
    $j('.family').on('click', 'button', function(){
        var famHeight = $j('.family > div ul').height();

        $j(this).toggleClass('open');
        if($j(this).hasClass('open')){
            $j(this).attr('title','닫기').next('div').show().stop().animate({top:-(famHeight+40), opacity:1, height:famHeight}, 700);//1122 vos 1093984
        }else{
            $j(this).attr('title','열기').next('div').stop().animate({top:-40, opacity:0, height:0}, 400);//1122 vos 1093984
        }
    });

	// 하단 플로팅 영역 : 맨위로 이동
    $j('#top-btn').on('click', function (e) {
        $j('html, body').animate({scrollTop: 0}, 100);
        //e.preventDefault(); //웹접근성
    });

	//page scroll
	$j(window).scroll(function () {
		//푸터 버튼 위치 이동, 퀵메뉴 닫기
		if ($j(window).scrollTop() < 110) {
			$j('#top-btn').stop().fadeOut();

			if($j('.floating-menu .inner').hasClass('shortstt')){
				$j('.footer-float-icon-div').removeClass('ascrl');
				$j('.floating-menu .inner').removeClass('shortstt');
				$j('.floating-menu-btn').find('.hidetxt').text('퀵메뉴 접기');//241104 웹접근성 개선
			}			
		} else {
			$j('#top-btn').stop().fadeIn();

			if(!$j('.floating-menu .inner').hasClass('shortstt')){
				$j('.footer-float-icon-div').addClass('ascrl');
				$j('.floating-menu .inner').addClass('shortstt');
				$j('.floating-menu-btn').find('.hidetxt').text('퀵메뉴 펼치기');//241104 웹접근성 개선
			}
		}	
	});//scroll

	//cfmClSkip 삭제후 넣기
	if($j("#cfmClSkip").length){
		$j("#cfmClSkip").remove();
	}

	// 로그인 페이지에서는 본문 바로가기 / 주메뉴 바로 가기 안보이도록 처리 240130
	hideClSkipLocation = "/wamui/AthWeb.do";

	if ( location.pathname != hideClSkipLocation )
	{
		$j("#cfmClWrapper").prepend('<div id="cfmClSkip"><a href="#cfmClContents">본문 바로 가기</a><a href="#cfmClGnbLogo">주메뉴 바로 가기</a></div>');
	}

	//0713 웹접근성 tabindex
	//2023 웹접근성 : 삭제 $j("#cfmClContents").attr('tabindex', 0);
	
	//0713 웹접근성 포커스 이동 함수 
	accessibilityFocus();
});