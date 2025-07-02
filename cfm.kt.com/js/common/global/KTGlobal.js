/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

// 기본도메인
var default_domain 	= 'kt.com';

var cfm_domain 		= '';   // 공통
var inside_domain 	= '';   // Inside
var cl_domain 		= '';   // 개인
var bz_domain 		= '';   // 기업
var corp_domain 	= '';   // 회사소개(국문)
var corp_eng_domain = '';   // 회사소개(영문)
var event_domain 	= '';   // 이벤트
var api_domain 		= '';   // api
var snc_domain 		= '';   // See&Click
var logapi_domain	= '';   // logapi
var omslog_domain	= '';   // 온라인마케팅 로그
var omsoffer_domain	= '';   // 온라인마케팅 타겟오퍼
var iAmUI_URL 		= '';   // IAMUI 호출 URL
var search_URL 		= '';   // 통합검색 URL
var ibot_domain		= '';   // 통합 챗봇 케이톡 URL
var sdeg_domain		= '';   // 만족도조사 URL

var cfm_mobile_domain 	    = '';   // 공통
var cl_mobile_domain 	    = '';   // 개인
var bz_mobile_domain 	    = '';   // 기업
var corp_mobile_domain	    = '';   // 회사소개
var corp_eng_mobile_domain	= '';   // 회사소개 영문
var ibot_mobile_domain		= '';   // 통합 챗봇 케이톡 URL
var api_mobile_domain	    = '';

/*
PC		개인		: 'AA0000'
Mobile	개인		: '2A0000'
PC		기업		: '3A0000'
Mobile	기업		: '4A0000'
PC		CORP(국문) 	: '5A0000'
Mobile	CORP(국문)	: '6A0000'
PC		CORP(영문)	: '7A0000'
Mobile	CORP(영문)	: '8A0000'
*/
var ktMenuCode 		= '';		// 메뉴코드(menuCode -> ktMenuCode 변경 Shop이랑 겹침-2차)
var menu1depth		= '';		// GNB 포커스 지정 

var ktChannel 		= 'Cl';		// 채널코드
var ktChannelName 	= '개인';	// 채널명

// 숨김메뉴관리
var hideMenuArr_login   = ['MC0000'];   // 로그인상태
var hideMenuArr_logout  = ['MF0000'];   // 로그아웃상태

// screen API
var cfmloadScreen = false;
var loadFintShopChk;    //매장찾기
var loadStsfcSurveyChk; //만족도조사
var loadServerTime;		//서버시간

// 만족도조사
var sdegWidgetId;	//Widget ID
var sdegKey;		//key

// 지원브라우져
var support_ie_version  = 10;                       // 지원 ie버젼
var isSupportBrowser    = fn_isSupportBrowser();    // 지원브라우져여부

// KTGlobal 변수생성 - 로그인팝업 사이즈변경 450x600
var KTGlobal = {
	loginWidth : 450,
	loginHeight : 840
}

//css 및 js cashing 해결을 위한 버전 추가
var version = '?version=25052901';

// 개발 환경에 따른 URL 설정 /start
var properties 		= 'prd';

switch (properties){
	case 'local' :	// 로컬 개발
		cfm_domain 			= '//cfm.' 		+ default_domain;
		inside_domain 		= '//inside.' 	+ default_domain;
		cl_domain 			= '//www.' 		+ default_domain;
		bz_domain 			= 'https://biz.' 		+ default_domain;
		corp_domain 		= 'https://corp.' 		+ default_domain;
		corp_eng_domain		= 'https://corp.' 		+ default_domain + '/eng';
		event_domain 		= '//event.' 			+ default_domain;
		api_domain 			= 'https://rdi.' 	+ default_domain;
		snc_domain 			= 'https://snc.' 		+ default_domain;
		logapi_domain 		= 'https://logapi.' 	+ default_domain;
		smarttalk_domain 	= 'https://smarttalk.' 	+ default_domain;
		omslog_domain		= 'https://log.onmas.'	+ default_domain;
		omsoffer_domain		= 'https://offer.onmas.'+ default_domain;
		sdeg_domain			= 'https://dt.kt.co.kr';
		
		iAmUI_URL		    = 'https://accounts.kt.com';
		search_URL		    = 'https://search.kt.com';

		cfm_mobile_domain 		= 'https://m.' 		+ default_domain;
		cl_mobile_domain 		= 'https://m.' 		+ default_domain;
		bz_mobile_domain 		= 'https://m.biz.' 	+ default_domain;
		corp_mobile_domain 		= 'https://m.corp.' + default_domain;
		corp_eng_mobile_domain	= 'https://m.corp.'	+ default_domain + '/eng';	
		
		api_mobile_domain   	= 'https://mtb.rdi.'  + default_domain;
		break;

	case 'dev' :	// 개발기	
		cfm_domain 			= 'https://cfm.' 		+ default_domain;
		inside_domain 		= 'https://inside.' 	+ default_domain;
		cl_domain 			= 'https://www.' 		+ default_domain;
		bz_domain 			= 'https://biz.' 		+ default_domain;
		corp_domain 		= 'https://corp.' 		+ default_domain;
		corp_eng_domain		= 'https://corp.' 		+ default_domain + '/eng';
		event_domain 		= 'https://event.' 		+ default_domain;
		api_domain 			= 'https://rdi.' 		+ default_domain;

		snc_domain 			= 'https://snc.'				+ default_domain;
		logapi_domain 		= 'https://logapi.'			+ default_domain;
		smarttalk_domain 	= 'https://smarttalk.'		+ default_domain;
		omslog_domain		= 'https://log.onmas.'		+ default_domain;
		omsoffer_domain		= 'https://offer.onmas.'		+ default_domain;
		sdeg_domain			= 'https://dt.kt.co.kr';

		iAmUI_URL		    = 'https://accounts.kt.com';						
		search_URL		    = 'https://search.kt.com';

		cfm_mobile_domain 		= 'https://m.' 		+ default_domain;
		cl_mobile_domain 		= 'https://m.' 		+ default_domain;
		bz_mobile_domain 		= 'https://m.biz.' 	+ default_domain;
		corp_mobile_domain 		= 'https://m.corp.' + default_domain;
		corp_eng_mobile_domain	= 'https://m.corp.'	+ default_domain + '/eng';	

		api_mobile_domain   	= 'https://m.rdi.'  + default_domain;

		var cfmheadTitle = document.title;
		document.title = "[DEV] "+ cfmheadTitle;
		break;

	case 'tb' :	// TB
		cfm_domain 			= 'https://cfm.' 		+ default_domain;
		inside_domain 		= 'https://inside.' 	+ default_domain;
		cl_domain 			= 'https://www.' 		+ default_domain;
		bz_domain 			= 'https://biz.' 		+ default_domain;
		corp_domain 		= 'https://corp.' 		+ default_domain;
		corp_eng_domain		= 'https://corp.' 		+ default_domain + '/eng';
		event_domain 		= 'https://event.' 		+ default_domain;

		api_domain 			= 'https://rdi.' 		+ default_domain;
		snc_domain 			= 'https://snc.' 		+ default_domain;
		logapi_domain 		= 'https://logapi.' 		+ default_domain;
		smarttalk_domain 	= 'https://smarttalk.' 	+ default_domain;
		omslog_domain		= 'https://log.onmas.'	+ default_domain;
		omsoffer_domain		= 'https://offer.onmas.'	+ default_domain;
		sdeg_domain			= 'https://dt.kt.co.kr';

		iAmUI_URL		    = 'https://accounts.kt.com';
		search_URL		    = 'https://search.kt.com';

		cfm_mobile_domain 		= 'https://m' + properties + '.' 			+ default_domain;
		cl_mobile_domain 		= 'https://m' + properties + '.' 			+ default_domain;
		bz_mobile_domain 		= 'https://m' + properties + '.biz.' 		+ default_domain;
		corp_mobile_domain 		= 'https://m' + properties + '.corp.'		+ default_domain;
		corp_eng_mobile_domain	= 'https://m' + properties + '.corp.'		+ default_domain + '/eng';

		api_mobile_domain   	= 'https://m' + properties + '.rdi.' 		+ default_domain;

		var cfmheadTitle = document.title;
		document.title = "[TB] "+ cfmheadTitle;
		break;

	default :	// 상용
		cfm_domain 			= 'https://cfm.' 		+ default_domain;
		inside_domain 		= 'https://inside.' 	+ default_domain;
		cl_domain 			= 'https://www.' 		+ default_domain;
		bz_domain 			= 'https://biz.' 		+ default_domain;
		corp_domain 		= 'https://corp.' 		+ default_domain;
		corp_eng_domain		= 'https://corp.' 		+ default_domain + '/eng';
		event_domain 		= 'https://event.' 		+ default_domain;
		api_domain 			= 'https://rdi.' 		+ default_domain;
		snc_domain 			= 'https://snc.' 		+ default_domain;
		logapi_domain 		= 'https://logapi.' 	+ default_domain;
		smarttalk_domain 	= 'https://smarttalk.' 	+ default_domain;
		omslog_domain		= 'https://log.onmas.'	+ default_domain;
		omsoffer_domain		= 'https://offer.onmas.'+ default_domain;
		sdeg_domain     	= 'http://dt.kt.co.kr';
		
		iAmUI_URL		    = 'https://accounts.kt.com';
		search_URL		    = 'https://search.kt.com';

		cfm_mobile_domain 		= 'https://m.' 		+ default_domain;
		cl_mobile_domain 		= 'https://m.' 		+ default_domain;
		bz_mobile_domain 		= 'https://m.biz.' 	+ default_domain;
		corp_mobile_domain 		= 'https://m.corp.' + default_domain;
		corp_eng_mobile_domain	= 'https://m.corp.'	+ default_domain + '/eng';	
		
		api_mobile_domain   	= 'https://m.rdi.'  + default_domain;
		break;						
}

ibot_domain         = 'https://ibot.' + default_domain + '/client/pc-web/chat.html';
ibot_mobile_domain  = 'https://ibot.' + default_domain + '/client/mobile-web/chat.html';

// 개발 환경에 따른 URL 설정 /end

// 입점 서비스 페이지 내 KT 슬로건 (title tag) 일괄 변경
var cfmTit = cfmTitleTag();

// 도메인설정
document.domain = default_domain;

// 공통 UI
document.write('<link rel="stylesheet" type="text/css" href="' + cfm_domain + '/css/v2/kt-style.css' + version + '">');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/plugin/jquery-3.6.0.min.js"></script>');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/plugin/jquery-ui.min.js"></script>');
//document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/plugin/swiper.min.js"></script>');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/plugin/jquery.bxslider.js' + version + '"></script>');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/plugin/gsap.min.js"></script>');

//mCustomScrollbar(서브-사용되는 페이지 있음)
document.write('<link rel="stylesheet" type="text/css" href="' + cfm_domain + '/js/cl/plugin/mCustomScrollbar/jquery.mCustomScrollbar.min.css' + version + '">');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/cl/plugin/mCustomScrollbar/jquery.mCustomScrollbar.min.js"></script>');

// 공통 js
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/json/gtm_logUse_html.js' + version + '"></script>');

document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/common_log.js' + version + '"></script>');
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_api.js' + version + '"></script>'); 		//API연동
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_offer.js' + version + '"></script>');	//온마시연동
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_common.js' + version + '"></script>'); 	//공통함수
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_ui.js' + version + '"></script>'); 		//공통 ui
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_gnb.js' + version + '"></script>'); 		//GNB
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_floating.js' + version + '"></script>'); //플로팅
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_footer.js' + version + '"></script>'); 	//FOOTER
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_notice.js' + version + '"></script>'); 	//공지
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/v2/common/kt_search.js' + version + '"></script>'); 	//통합검색
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/sdp/check_utf.js' + version + '"></script>'); 		//자동로그아웃
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/integrate/kLogcode.js' + version + '"></script>'); 	//로그
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/adobe/staticsLogcodeLaunch.js' + version + '"></script>');	//Adobe통계
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/json/oms_logUse_html.js' + version + '"></script>');	//온마시통계제어
document.write('<script type="text/javascript" src="' + cfm_domain + '/js/common/global/oms.js' + version + '"></script>');

// 온마시 통계 js
//document.write('<script type="text/javascript" src="' + omslog_domain + '/js/logCollect.js' + version + '"></script>');
//document.write('<script type="text/javascript" src="' + omslog_domain + '/js/targetOffer.js' + version + '"></script>');

//메뉴 체크
var chkMenu = menuChk();
//adobe page name 체크
var adobePageName = adobePageNameChk();

// 공통 호출 함수
window.kt = 
{
	// GNB 영역 생성
	gnb : function(gnbView){
		try {
			cfmGnbAreaHtml.init(gnbView);
		} catch(e){
			common_log.log('KTGlobal.js kt.gnb() [' + e.message + ']');
		}
	},

	// 플로팅 영역 생성
	floating : function(){
		try {
            cfmFloatingAreaHtml.init();
		} catch(e){
			common_log.log('KTGlobal.js kt.floating() [' + e.message + ']');
		}
	},

	// 푸터 영역 생성
    footer : function(footerOptions){		
        try {
            cfmFooterAreaHtml.init(footerOptions);
		} catch(e){
			common_log.log('KTGlobal.js kt.footer() [' + e.message + ']');
		}
    },

	// locationBar 영역 생성
	locationBar : function(){
		try {
			cfmGnbAreaHtml.locationBar();
			//kt_api.breadcrumb();
			/*
			var breadcrumbTargetUrl = new URL(location.href);
			if(breadcrumbTargetUrl .hostname == "product.kt.com"){
				kt_api.breadcrumb();
			} 
			*/
			
		} catch(e){
			common_log.log('KTGlobal.js kt.locationBar() [' + e.message + ']');
		}
	},

	// 간편조회 배너 영역 생성
	simpleBanner : function(){
		banner.simple();
	},

    // 마이페이지 배너 영역 생성-미사용
	//mypageBanner : function(){
	//	banner.mypage();
	//},

    // 로그인 팝업창
	popupLogin : function(strContKtUrl){
        try {			
			if(strContKtUrl === undefined || strContKtUrl === ''){
				strContKtUrl=location.href;
			}
		} catch(e){
			var strContKtUrl=location.href;
		}

		strContKtUrl=strContKtUrl.split('#')[0];

		var popWidth=KTGlobal.loginWidth;
		var popHeight=KTGlobal.loginHeight;
		var monScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var monScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
		var browWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var browHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		var cfmLeft = ((browWidth / 2) - (popWidth / 2)) + monScreenLeft;
		var cfmTop = ((browHeight / 2) - (popHeight / 2)) + monScreenTop;

		//팝업형 로그인페이지	
		var popArg = {
			'url' : iAmUI_URL + '/wamui/AthWebPopup.do?urlcd=' + encodeURIComponent(strContKtUrl)
			,'width' : popWidth
			,'height' : popHeight
		};

		kt.loadPopup(popArg);
	},

    // 로그인 페이지
    loginLink : function(){
		var rtUrl = document.location;
		top.location.href = iAmUI_URL + '/wamui/AthWebOlleh.do?urlcd='+ escape(rtUrl);
	},

    // 로그인 안내메세지
    loginNotice : function(svc, url, focusID){
        svc=svc.toLowerCase();
		var ktLoginYn = kt.isLogin();
		var strMessage = ' 본 서비스는 로그인이 필요합니다. \n 로그인 후 이용하실 수 있습니다.';

		/*
		if(ktLoginYn === 'Y'){
			if(svc === 'regolleh'){
				strMessage = ' 본 서비스는 모바일(핸드폰)상품이 등록된 \n kt ID로 이용하실 수 있습니다. \n 모바일(핸드폰) 상품을 등록한 후 이용 바랍니다.';
			}else if(svc === 'regshow'){
				strMessage = ' 본 서비스는 모바일(핸드폰)상품이 등록된 \n kt ID 또는 SHOW ID로 이용하실 수 있습니다. \n 모바일(핸드폰) 상품을 등록한 후 이용 바랍니다.';
			}else if(svc === 'rqook'){
				strMessage = ' 본 서비스는 현재 로그인된 SHOW ID로는 이용하실 수 없습니다. \n QOOK ID 또는 kt ID로 통합(전환) 후 이용하실 수 있습니다.';
			}else if(svc === 'rshow'){
				strMessage = ' 본 서비스는 현재 로그인된 QOOK ID로는 이용하실 수 없습니다. \n SHOW ID 또는 kt ID로 통합(전환) 후 이용하실 수 있습니다.';
			}else{
				return false;
			}
		}else{
			if(svc === 'regolleh'){
				strMessage = ' 본 서비스는 로그인이 필요합니다. \n 모바일(핸드폰) 상품이 등록된 kt ID로 \n 로그인 후 이용하실 수 있습니다.';
			}else if(svc === 'regshow'){
				strMessage = ' 본 서비스는 로그인이 필요합니다. \n 모바일(핸드폰) 상품이 등록된 kt ID 또는 SHOW ID로 \n 로그인 후 이용하실 수 있습니다.';
			}else if(svc === 'rqook'){
				strMessage = ' 본 서비스는 로그인이 필요합니다. \n kt ID 또는 QOOK ID로 로그인 후 이용하실 수 있습니다.';
			}else if(svc === 'rshow'){
				strMessage = ' 본 서비스는 로그인이 필요합니다. \n kt ID 또는 SHOW ID로 로그인 후 이용하실 수 있습니다.';
			}else{
				strMessage = ' 본 서비스는 로그인이 필요합니다. \n 로그인 후 이용하실 수 있습니다.';
			}
		}
		*/

		if(ktLoginYn === 'Y' && url !== ''){
			location.href=url;
		}else{
			if(confirm(strMessage)){			
				kt.loginLink();
			}else{			
				history.back();
			}
		}
    },
    
	// 로그인 여부 확인
	isLogin : function(){
        var kt_sso_userid = this.getComCookie('kt_sso_userid');
		if(kt_sso_userid !== ''){
			return 'Y';
		} else {
			return 'N';
		}
	},

    // 로그아웃
    goLogout : function(){
		var rtUrl = document.location;
        top.location.href = iAmUI_URL + "/wamui/ComSSOLogout.do?urlcd="+encodeURI(rtUrl);
    },

    // 
    sdpCommonSessionlogOut : function(){
	   var rtUrl = document.location;
       top.location.href = iAmUI_URL + "/wamui/ComSSOLogout.do?timeout=Y&urlcd="+encodeURI(rtUrl);
    },

    // 풀스크린팝업
	loadPage : function(){
        var popArg = args;
		var url = popArg.url;
		var name = popArg.name;

		// 기본 팝업명
		if(name === undefined){
			name = 'newWindow';
		}

		var newWindow = window.open(url, name, 'fullscreen');
		if (window.focus){
			newWindow.focus();
		}
	},

	// 팝업
	loadPopup : function(args){
        var popArg = args;
		var url = popArg.url;
		var name = popArg.name;

		// 기본 팝업명
		if(name === undefined){
			name = 'newWindow';
		}

		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		// 팝업위치
		var left = ((width / 2) - (popArg.width / 2)) + dualScreenLeft;
		var top = ((height / 2) - (popArg.height / 2)) + dualScreenTop;

		// 팝업크기
		if (popArg.width !== undefined){
			width = popArg.width;
		}
		if (popArg.height !== undefined){
			height = popArg.height;
		}

		var newWindow = window.open(url, name, 'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top + ',status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes');
		if (window.focus){
			newWindow.focus();
		}
	},

	// 쿠키 정보 설정
	setComCookie : function(name, value, expireDate){
        var cookie = name + '=' + escape (value) +  '; path=/; domain=.kt.com;';
		if(expireDate !== undefined && expireDate !== null && expireDate !== ''){
			var today = new Date();
			expireDate = expireDate * 24 * 60 * 60; // 초로 변환
			today.setSeconds(today.getSeconds() + expireDate);
			cookie += 'expires=' + today.toGMTString() + ';';
		}
		document.cookie = cookie;
	},
	
	// 쿠키 정보 조회
	getComCookie : function(name){
        var search = name + '=';
		if (document.cookie.length > 0){
			offset = document.cookie.indexOf(search);
			if (offset !== -1){
				offset += search.length;
				end = document.cookie.indexOf(';', offset);
				if (end === -1)
					end = document.cookie.length;
				return unescape(document.cookie.substring(offset, end));
			}
		}
		return '';
	},

    iamuiUrlRtn : function(rtUrl){
        top.location.href = iAmUI_URL + rtUrl;
    }
}

// title tag
function cfmTitleTag(){
	var cfmTit;
	try {
		cfmTit = document.title;
		if (cfmTit !== undefined && cfmTit !== null && cfmTit !== ''){
			document.title = document.title.replace(/글로벌 No.1 KT/g, 'KT');
		}
	} catch (error) {
		cfmTit = '';
	}
	
	return cfmTit;
}

// 메뉴체크 - menucode 체크 함수 
function menuChk(){
	try {
		if (ktMenuCd === undefined || ktMenuCd === null || ktMenuCd === ''){
			ktMenuCode = 'XXXXXX';
			ktMenuCd = ktMenuCode;
		} 
		else {
			if (ktMenuCd.length > 6){
				var strCnt = 6;
				if (ktMenuCd.length === 7){
					strCnt = 7;
				} 
				ktMenuCode = ktMenuCd.substring(0, strCnt);
			} else {
				ktMenuCode = ktMenuCd;
			}
		}
	} catch(e){
		ktMenuCode = 'XXXXXX';
		ktMenuCd = ktMenuCode;
	}
	
	return ktMenuCode.substring(0, 2);
}

//adobe page name 체크
function adobePageNameChk() {
	var rtVal = '';
	try
	{
		if (ktadPageName === undefined || ktadPageName === null || ktadPageName === '') {
			rtVal = '';
		} 
		else {
			rtVal= ktadPageName;
		}
	}catch(e)
	{
		rtVal = '';
	}
	
	return rtVal;
}

// main 페이지 확인
function mainCheck(channel){
	if(!document.getElementById('ktMainYn')){
		document.getElementById('cfm'+ channel +'Gnb').className = 'sub';			
	}
}

// 모바일체크
function isMobile(){
	var isMobile = false;
	if(navigator.userAgent.indexOf('Mobile') >= 0 && navigator.userAgent.indexOf('iPad') < 0){
        if(navigator.geolocation){
            isMobile = true;
        }
    }
	return isMobile;
}

// 스크립트 로드
function loadScript(url){
	var script = document.createElement('script');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

// AppView Check
function isAppCheck(){
	var isApp = false;

	var os = kt.getComCookie('os');
	var appVer = kt.getComCookie('appver');

	if (os === undefined || os === null || os === '' || 
		appVer === undefined || appVer === null || appVer === ''){
		return isApp;
	} 

	return true;
}

// IE Version
function getIEVersion(){
	var word;
	var version = 'N/A';
	var agent = navigator.userAgent.toLowerCase();
	var name = navigator.appName;

	// IE old version(IE 10 or Lower)
	if(name === 'Microsoft Internet Explorer'){
		word = 'msie ';
	} else {
		// IE 11
		if(agent.search('trident') > -1){
			word = 'trident/.*rv:';
		// IE 12(Microsoft Edge)
		} else if(agent.search('edge/') > -1){
			word = 'edge/';
		}
	}

	var reg = new RegExp(word + '([0-9]{1,})(\\.{0,}[0-9]{0,1})');
	if(reg.exec(agent) !== null){
		version = RegExp.$1 + RegExp.$2;
	}

	return version;
}

// 지원브라우져 체크
function fn_isSupportBrowser(){
	var isSupport = false;
	var ie_version = getIEVersion();

	if(ie_version !== 'N/A' && document.documentMode && document.documentMode < parseFloat(ie_version)){
		ie_version = document.documentMode + '';
	}

	if(ie_version === 'N/A' || parseFloat(ie_version) >= support_ie_version){
		isSupport = true;
	}
	return isSupport;
}

// 통계코드 관련 하단 이동 1116
var adobeLoadCnt = 0;
function loadAdobeChk(){
	if(adobeLoadCnt < 10){
		if(typeof s.account == "undefined"){
			setTimeout(function(){
				loadAdobeChk();
			}, 500);
			adobeLoadCnt++;
		}else{
			try{ 
                s.t();
            }catch(e){
                common_log.log('KTGlobal.js s.t() [' + e.message + ']');
            };
		}
	}
}

function iamuiUrlRtnFnc(rtURL)
{
    return iAmUI_URL + rtURL;
}