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

// GNB 영역
var cfmGnbHtml = '';
cfmGnbHtml += '<strong class="ktheading"></strong>'; //로고
cfmGnbHtml += '<div class="navigation"></div>'; //GNB메뉴
cfmGnbHtml += '<div class="chnlink">';
cfmGnbHtml += ' <ul class="list-channel"></ul>'; //채널메뉴
cfmGnbHtml += '</div>'; 
cfmGnbHtml += '<div class="utils">';
cfmGnbHtml += ' <div id="inner" class="inner"></div>'; //GNB버튼
cfmGnbHtml += ' <div id="total-search" class="total-search" data-focus="searchLink01" data-focus-prev="searchLink02" tabindex="0">'; //통합검색
cfmGnbHtml += '     <div class="search">';
cfmGnbHtml += '         <form onsubmit="return false;">';
cfmGnbHtml += '             <fieldset>';
cfmGnbHtml += '                 <legend class="invisible">통합검색</legend>';
cfmGnbHtml += '                 <input type="text" id="searchInput" placeholder="무엇이 궁금하신가요?" value="" title="통합검색" maxlength="30" autocomplete="off">';
cfmGnbHtml += '                 <button type="button" class="searchInput-btn-clear"><span>검색어지우기</span></button>';
cfmGnbHtml += '                 <button type="button" class="tsearch"><span>검색</span></button>';
cfmGnbHtml += '             </fieldset>';
cfmGnbHtml += '         </form>';
cfmGnbHtml += '         <div class="rltmkywd-div" id="searchWrapBefore">';
cfmGnbHtml += '             <div class="rltm_word">';
cfmGnbHtml += '                 <div class="cfmCltabs">';
cfmGnbHtml += '                     <ul class="cfmCltab">';
cfmGnbHtml += '                 	    <li class="cfmCl-ui-tab-title"><a role="button" href="#" class="menu1st kt_popkeyword"><span>KT 인기검색어</span></a></li>';
cfmGnbHtml += '                 		<li class="cfmCl-ui-tab-title"><a role="button" href="#" class="menu2nd shop_popkeyword"><span>Shop 인기검색어</span></a></li>';
cfmGnbHtml += '                 	</ul>';
cfmGnbHtml += '                 	<div class="cfmCltab-contents">';
cfmGnbHtml += '                 	    <div class="cfmCl-tabcontents active">';
cfmGnbHtml += '                             <ol id="rltmkywd-list" class="rltmkywd-list"></ol>';
cfmGnbHtml += '                 	    </div>';
cfmGnbHtml += '                 	</div>';
cfmGnbHtml += '                 </div>';
cfmGnbHtml += '             </div>';
cfmGnbHtml += '         </div>';
cfmGnbHtml += '         <div class="result" id="searchWrapAfter" style="display: none;"></div>';
cfmGnbHtml += '     </div>';
cfmGnbHtml += '     <div class="bottom">';
cfmGnbHtml += '         <button type="button" class="close-search" data-focus="searchLink02" data-focus-next="searchLink01"><span>닫기</span></button>';
cfmGnbHtml += '     </div>';
cfmGnbHtml += ' </div>';
cfmGnbHtml += ' <div id="all-menus" class="all-menus" data-focus="allmenuLink01" data-focus-prev="allmenuLink02">'; //전체메뉴
cfmGnbHtml += '     <div class="inner">';
cfmGnbHtml += '         <strong class="all-menus-tit">전체메뉴</strong>';
cfmGnbHtml += '         <div class="search-area">';
cfmGnbHtml += '             <form onsubmit="return false;">';
cfmGnbHtml += '                 <fieldset class="reverse">';
cfmGnbHtml += '                     <legend class="invisible">메뉴검색</legend>';
cfmGnbHtml += '                     <input type="text" class="flow search-text" placeholder="검색어를 입력하세요." value="" maxlength="30" title="검색어를 입력하세요.">';
cfmGnbHtml += '                     <button type="button" class="btn-allmenusearchclear" style="display:none;">검색어지우기</button>';
cfmGnbHtml += '                     <button type="button" class="flow btn-search"><span>메뉴검색</span></button>';
cfmGnbHtml += '                 </fieldset>';
cfmGnbHtml += '             </form>';
cfmGnbHtml += '             <div class="result"></div>'; //전체메뉴-메뉴검색
cfmGnbHtml += '         </div>';
cfmGnbHtml += '         <div class="menus" id="scrollbar"></div>'; 
cfmGnbHtml += '     </div>';
cfmGnbHtml += '     <div class="bottom">';
cfmGnbHtml += '         <div class="inner">';
cfmGnbHtml += '             <button type="button" data-focus="allmenuLink02" data-focus-next="allmenuLink01"><span>닫기</span></button>';
cfmGnbHtml += '         </div>';
cfmGnbHtml += '     </div>';
cfmGnbHtml += ' </div>';
cfmGnbHtml += '</div>'; 

// DATA - 배포파일(cashing)
var cfmGnbNow = new Date();
var cfmGnbVersion = '?version=' + cfmGnbNow.getFullYear() +''+ (cfmGnbNow.getMonth()+1) +''+ cfmGnbNow.getDate() +''+ cfmGnbNow.getHours();
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_menu.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //GNB/전체메뉴
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_channel.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //채널메뉴
document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_top.js' + cfmGnbVersion + '" charset="UTF-8"></script>'); //GNB상단영역

// 전체메뉴 검색
var cfmAllMenuSearch;
var cfmAllMenuSearchSelect = 0;

// 장바구니
var cfmCartUseYn;

var cfmGnbAreaTarget = '#cfm'+ ktChannel +'Gnb ';
// Breadcrumbs Type
var cfmGnbBreadcrumbs = 'N';
var cfmGnbAreaHtml = {

    //초기화 & 세팅
    init: function(gnbView){
        //입점 서비스 페이지 내 KT 슬로건 (title tag) 일괄 변경
        cfmGnbAreaHtml.titleReplace();

        //Html import
        document.writeln(cfmGnbHtml);

        //상단영역
        cfmGnbAreaHtml.topArea();
        
        //GNB메뉴
        cfmGnbAreaHtml.menuArea();

        //채널영역
        cfmGnbAreaHtml.channelArea();  
        
        //전체메뉴
        cfmGnbAreaHtml.allMenuArea();                    

        //페이지별 예외처리
        cfmGnbAreaHtml.pageException(gnbView);

        //메뉴숨기기
        cfmGnbAreaHtml.menuHide();        
    },

    //title tag 변경
	titleReplace: function(){
		var cfmTit = document.title;
        if (cfmTit !== undefined && cfmTit !== null && cfmTit !== ''){
            document.title = document.title.replace(/글로벌 No.1 KT/g, 'KT');
        }
	},

    //페이지별 예외처리
	pageException: function(gnbView){
		var ktGnbView = '';
        if (gnbView === undefined || gnbView === ''){
            ktGnbView = '';
        } else {
            ktGnbView = gnbView;
        }

        //통합검색 예외처리(통합검색 영역 비노출)
		if (ktGnbView.indexOf("MiddleSearch:hide") !== -1){
            $j('#btn-search').parent().hide(); //버튼
            $j('#total-search').hide(); //레이어
        }

        //Breadcrumbs
        if (ktGnbView.indexOf("HeadBreadcrumb:show") !== -1){
            cfmGnbBreadcrumbs = 'Y';
        } 
	},

    //메뉴숨기기
	menuHide: function(){
		var ktLoginYn = kt.isLogin();
        var hideMenuArr = [];
        if(ktLoginYn === 'Y'){
            hideMenuArr = hideMenuArr_login;
        } else {
            hideMenuArr = hideMenuArr_logout;
        }

        var hideLen = hideMenuArr.length;
        if(hideLen > 0){
            for(var i = 0; i < hideLen; i++){
                $j('a[data-menucd=' + hideMenuArr[i] + ']').closest('li').remove();
            }
        }
	},

	//메뉴아이콘
	menuIconType: function(traget, item){
		var returnClass = '', returnAlt = '';

        if(item.iconShowYn == 'Y'){
            if(item.iconType == '01'){
                returnClass = 'cfmClGnb_new';
				returnAlt = '<em>신규메뉴</em>';
            }else if(item.iconType == '02'){
                returnClass = 'cfmClGnb_hot';
				returnAlt = '<em>인기메뉴</em>';
            }else if(item.iconType == '03'){
                returnClass = 'cfmClGnb_newhot';
				returnAlt = '<em>신규메뉴 인기메뉴</em>';
            }else if(item.iconType == '04'){
                returnClass = 'cfmClGnb_hotnew';
				returnAlt = '<em>인기메뉴 신규메뉴</em>';
            }

            if(kt_common.isNull(returnClass) != ''){
			    traget.find('a').addClass(returnClass);
			    traget.find('.menu_name').html(returnAlt + traget.find('.menu_name').html());
            }
        }
	},

    //상단영역
    topArea: function(){
        if($j('#ktMainYn').length){ //2024 웹접근성 관련 
            $j(cfmGnbAreaTarget +'.ktheading').replaceWith('<h1 class="ktheading"></h1>');
        }
        var logo = $j('<a href="#" id="cfmClGnbLogo"><img src="'+ cfm_domain +'/images/v2/layout/gnb-ktlogo.png?version=2025042401" alt="kt"></a>'); //로고
        var html = $j(`<div class="btn-group">
            <div class="wrap-cfmclover wrap-cfmclki">
                <a href="javascript:kt_common.ktMenuLinkStat('https://www.kt.com/kintelligence.html','^KT-개인_공통^GNB^ServiceMenu^Kintelligence','_self','');">
                    <span><img src="${cfm_domain}/images/v2/layout/wrap-cfmclki.png" alt="K-intelligence"></span>
                    <span class="wrap-cfmclmover"><img src="${cfm_domain}/images/v2/layout/wrap-cfmclkiover.png" alt="K-intelligence"></span>
                </a>
            </div>
            <div class="wrap-cfmclover wrap-cfmclyogo">
                <a href="javascript:kt_common.ktMenuLinkStat('https://shop.kt.com/unify/yogoEvent.do','^KT-개인_공통^GNB^ServiceMenu^요고','_self','');">
                    <span><img src="${cfm_domain}/images/v2/layout/wrap-cfmclyogo.png" alt="요고"></span>
                    <span class="wrap-cfmclmover"><img src="${cfm_domain}/images/v2/layout/wrap-cfmclyogoover.png" alt="요고"></span>
                </a>
            </div>
            <div class="wrap-cfmclover wrap-cfmclott">
                <a href="javascript:kt_common.ktMenuLinkStat('https://my.kt.com/product/OttSubscribeView.do','^KT-개인_공통^GNB^ServiceMenu^OTT구독','_self','');">
                    <span><img src="${cfm_domain}/images/v2/layout/wrap-cfmclott.png" alt="OTT 구독"></span>
                    <span class="wrap-cfmclmover"><img src="${cfm_domain}/images/v2/layout/wrap-cfmclottover.png" alt="OTT 구독"></span>
                </a>
            </div>
        </div>`); //버튼영역 (K-intelligence, 요고 추가 2025 GNB 개선)

        //버튼영역-2차
        try {
            $j.each(cfmGnbTopJson, function(i, areaData){
                cfmCartUseYn = areaData.shopYn;
                $j.each(areaData.areaSetList[0].areaContsList, function(j, item){
                    if(item.title == '로그인전' && kt.isLogin() != 'Y'){
                        html.append(item.htmlInfo);
                    }else if(item.title == '로그인후' && kt.isLogin() == 'Y'){
                        html.append(item.htmlInfo);
                    }
                });
            });
        } catch(e) {
            common_log.log('kt_gnb.js topArea() [' + e.message + ']');
        }

        //전체메뉴
        html.append('<div class="wrap-all-menu-trigger">'+
                    '   <a href="#all-menus" id="btn-all-menus" class="nav-all-menu-trigger btn-all-menu">'+
                    '       <img src="'+ cfm_domain +'/images/v2/layout/gnb-allmenu.png" alt=""><em class="utils_txt">전체메뉴</em>'+
                    '   </a>'+
                    '</div>');

        //링크정보
        var statInfo = '^KT-개인_공통^GNB^';
        kt_common.linkInfo('common', 'click', logo, {svcUrl:cl_domain, statInfo:statInfo+'KT BI'}, '1');
        kt_common.linkInfo('common', 'click', html.find('#cfmSmartTalkLink'), {svcUrl:'cfmSmartTalkLink', statInfo:'^KT-개인_공통^챗봇^아이콘'}, '2');
        kt_common.linkInfo('common', 'click', html.find('#btn-all-menus'), {svcUrl:'', statInfo:statInfo+'전체메뉴'}, '1');        

        $j(cfmGnbAreaTarget +'.ktheading').append(logo);
        $j(cfmGnbAreaTarget +'.utils #inner').append(html);

        //ui 처리 kt_ui.js 호출
        cfmUi.COMMON.top();
        cfmUi.COMMON.search();
    },

    //상단영역-GNB메뉴
    menuArea: function(){
        try {
            var depth1Cnt = 1, depth2Cnt = 0;
            var depthLower = 0;
            var html = $j('<ul class="inner"></ul>');

            $j.each(cfmGnbMenuJson, function(i, item){ 
                //GNB 노출
                if(item.menuDispYn == 'Y'){
                    var depth1 = '', depth2 = '', depth3 = '', depth4 = '';				
                    if(item.rleval == "1"){
                        depth1 = $j('<li class="nav'+ depth1Cnt +'"><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></li>');	
                        depth1.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth1.find('a').attr('data-menucd', item.menuCd);				
                        
                        //메뉴링크
                        kt_common.linkInfo('common', 'gnb', depth1.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth1, item);

                        //혜택 class
                        if(item.gnbMenuDivType == 'membership') depth1.addClass('membership');

                        //하위메뉴여부-단구성					
                        if(item.menuDispCnt > 0){
                            depth1.append('<div class="sub-navigation"></div>');

                            if(item.gnbMenuDivType == 'membership'){ //혜택예외처리
                                depth1.find('.sub-navigation').append('<div class="cate"><strong class="cateheading_style01">멤버십 혜택</strong><ul class="depth2"></ul></div>');
                                depth1.find('.sub-navigation').append('<div class="cate"><strong class="cateheading_style02">스페셜 혜택</strong><ul class="depth2"></ul></div>');
                            }else{
                                for (var index = 0; index < Math.ceil(item.menuDispCnt/5); index++) {
                                    depth1.find('.sub-navigation').append('<ul class="depth2"></ul>');							
                                }
                            }
                        }

                        depth1.find('.sub-navigation').append('<div class="sub-navigation-banner"></div>');

                        html.append(depth1);

                        depth1Cnt += 1;
                        depth2Cnt = 0;

                    }else if(item.rleval == "2"){
                        depth2 = $j('<li><a href="#"><strong><span class="menu_name">'+ item.gnbMenuNm +'</span></strong></a></li>');
                        depth2.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth2.find('a').attr('data-menucd', item.menuCd);	

                        //메뉴링크
                        kt_common.linkInfo('common', 'gnb', depth2.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth2, item);

                        //하위메뉴여부
                        if(item.menuDispCnt > 0) depth2.append('<ul class="depth3"></ul>');					

                        //하위메뉴연결여부
                        if(item.gnbMenuId == depthLower){
                            html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth2 li').last().append(depth2);
                            return true;
                        }else if(item.gnbMenuDispType == 'Y'){
                            var depth2Data = cfmGnbMenuJson.filter(function(element){	
                                return (element.rleval == '2' && element.upGnbMenuId == item.upGnbMenuId);
                            });

                            $j.each(depth2Data, function(j, data){
                                if(data.gnbMenuId == item.gnbMenuId){
                                    depthLower = depth2Data[j+1].gnbMenuId;
                                    return false;
                                }
                            });
                        }

                        //단구성
                        if(item.gnbMenuDivType == '01' || item.gnbMenuDivType == '02'){ //혜택예외처리
                            html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth2').eq((item.gnbMenuDivType-1)).append(depth2);
                        }else{
                            html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth2').eq(Math.floor(depth2Cnt/5)).append(depth2);
                        }					

                        depth2Cnt += 1;
                    }else if(item.rleval == "3"){
                        depth3 = $j('<li><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></li>');
                        depth3.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth3.find('a').attr('data-menucd', item.menuCd);
                        depth3.find('a').attr('data-menudispcnt', item.menuDispCnt);
                        depth3.find('a').attr('data-statinfo', item.statInfo);
                        if (item.menuCd =='EMC000') { // 네이버 서브링크 미노출 처리 추가
                            depth3.find('a').attr('rel', 'nosublink');
                        }

                        //메뉴링크
                        kt_common.linkInfo('common', 'gnb', depth3.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth3, item);

                        //하위메뉴여부
                        if(item.menuDispCnt > 0) depth3.append('<ul class="depth4"></ul>');

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth3').append(depth3);
                    }else if(item.rleval == "4"){
                        depth4 = $j('<li><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></li>');
                        depth4.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth4.find('a').attr('data-menucd', item.menuCd);	
                        
                        //메뉴링크
                        kt_common.linkInfo('common', 'gnb', depth4.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth4, item);

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth4').append(depth4);
                    }
                }			
            });

            $j(cfmGnbAreaTarget + '.navigation').html(html);

            //current 메뉴(1Depth)
            if (!document.getElementById('ktMainYn')){
                $j(cfmGnbAreaTarget + ".navigation > ul > li[class^='nav'] > a" ).each(function (index, item){
                    var chkMenu1depth = $j(item).attr('data-menucd');
                    if (chkMenu.substring(0, 1) == chkMenu1depth.substring(0, 1)){
                        $j(item).addClass('current');
                    }
                });
            }

            //GNB 배너
            kt_api.gnbBanner();

            //ui 처리 kt_ui.js 호출
            cfmUi.COMMON.navGNB();
        } catch(e) {
            common_log.log('kt_gnb.js menuArea() [' + e.message + ']');
        }
    },

    //상단영역-채널메뉴
    channelArea: function(){
        try {
            var html = $j(cfmGnbAreaTarget + '.list-channel');

            $j.each(cfmGnbChannelJson, function(i, item){
                var li;
                let pointClass = '';
                if(item.title == 'ENG' || item.title == 'EN'){ //영문사이트
                    li = $j('<li class="lang"><a href="#" class="btn-lang">' + item.title +'</a></li>');
                } else {
                    if (item.floatTrgtType == '02' || item.floatTrgtType == '03') {
                        pointClass = ` class="cfmClChnlink-point"`;
                    }
                    li = $j(`<li><a href="#"${pointClass}>${item.title}</a></li>`);
                }

                li.data(item);                
                kt_common.linkInfo('common', 'channel', li.find('a'), item, item.floatTrgtType, item.floatPopupWdth, item.floatPopupVrtc); //메뉴링크                
                html.append(li);

                if(item.title == 'ENG' || item.title == 'EN'){ //영문사이트
                    li.find('a').attr('title', '영문사이트 새창열림');
                }
            });

            $j(cfmGnbAreaTarget + '.list-channel').append(html);

            //current 채널
            $j(cfmGnbAreaTarget + '.list-channel li' ).each(function (i, item){
                if($j(item).data('title').trim() == ktChannelName){
                    $j(item).addClass('current');
                    $j(item).find('a').attr('title', '선택됨');
                }
            });
        } catch(e) {
            common_log.log('kt_gnb.js channelArea() [' + e.message + ']');
        }
    },

    //전체메뉴영역-전체메뉴
	allMenuArea: function(){
        try {
            var depth2Cnt = 0;	
            var html = $j('<ul class="depth1"></ul>');

            $j.each(cfmGnbMenuJson, function(i, item){ 
                //전체메뉴 노출
                if(item.showYn == 'Y'){
                    var depth1 = '', depth2 = '', depth3 = '', depth4 = '';
                    if(item.rleval == "1"){
                        depth1 = $j('<li class="depth1-li"><span class="toggle-area"><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></span></li>');
                        depth1.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth1.find('a').attr('data-menucd', item.menuCd);
                        depth1.find('a').attr('data-depth', item.rleval);

                        //depth1 class
                        depth1.find('.toggle-area>a').addClass('link-title');

                        //메뉴링크
                        kt_common.linkInfo('common', 'all', depth1.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth1, item);

                        //하위메뉴여부-단구성
                        if(item.showCnt > 0){
                            for (var index = 0; index < Math.ceil(item.showCnt/5); index++) {
                                depth1.append('<ul class="depth2"></ul>');
                            }
                        }

                        html.append(depth1);

                        depth2Cnt = 0;

                    }else if(item.rleval == "2"){
                        depth2 = $j('<li class="depth2-li"><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></li>');
                        depth2.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth2.find('a').attr('data-menucd', item.menuCd);
                        depth2.find('a').attr('data-depth', item.rleval);

                        //메뉴링크
                        kt_common.linkInfo('common', 'all', depth2.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth2, item);

                        //하위메뉴여부
                        if(item.showCnt > 0) depth2.append('<ul class="depth3"></ul>');

                        //단구성
                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().parent().find('.depth2').eq(Math.floor(depth2Cnt/5)).append(depth2);

                        depth2Cnt += 1;

                    }else if(item.rleval == "3"){
                        depth3 = $j('<li class="depth3-li"><a href="#"><span class="menu_name">'+ item.gnbMenuNm +'</span></a></li>');
                        depth3.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth3.find('a').attr('data-menucd', item.menuCd);
                        depth3.find('a').attr('data-depth', item.rleval);
                        depth3.find('a').attr('data-showcnt', item.showCnt);
                        depth3.find('a').attr('data-statinfo', item.statInfo);
                        if (item.menuCd =='EMC000') { // 네이버 서브링크 미노출 처리 추가
                            depth3.find('a').attr('rel', 'nosublink');
                        }

                        //메뉴링크
                        kt_common.linkInfo('common', 'all', depth3.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth3, item);

                        //하위메뉴여부                    
                        if(item.showCnt > 0) depth3.append('<ul class="depth4"></ul>');

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth3').append(depth3);

                    }else if(item.rleval == "4"){
                        depth4 = $j('<li><a href="#"><span class="menu_name">ㆍ'+ item.gnbMenuNm +'</span></a></li>');
                        depth4.find('a').attr('data-gnbMenuId', item.gnbMenuId);
                        depth4.find('a').attr('data-menucd', item.menuCd);
                        depth4.find('a').attr('data-depth', item.rleval);

                        //메뉴링크
                        kt_common.linkInfo('common', 'all', depth4.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc);

                        //메뉴아이콘적용
                        cfmGnbAreaHtml.menuIconType(depth4, item);

                        html.find('[data-gnbMenuId='+ item.upGnbMenuId +']').parent().find('.depth4').append(depth4);

                    }
                }
            });

            $j(cfmGnbAreaTarget + '.all-menus .menus').html(html);

            //전체메뉴-검색버튼
            $j(cfmGnbAreaTarget + '.all-menus .search-area .btn-search').on('click',function(){
                cfmGnbAreaHtml.allMenuSearch();
            });
            
            //전체메뉴-검색필드
            $j(cfmGnbAreaTarget + '.all-menus .search-area input[class=\'flow search-text\']').on('keydown',function(event){
                if (event.keyCode === 13){
                    cfmGnbAreaHtml.allMenuSearch();
                    return false;
                }
            });
            $j(cfmGnbAreaTarget + '.all-menus .search-area input[class=\'flow search-text\']').on('keyup', function(event) {
                var words = $j(this).val().trim();
                if(words !== '') {
                    $j('.btn-allmenusearchclear').show();
                } else {
                    $j('.btn-allmenusearchclear').hide();
                }
                
                // 검색어 지우기
                $j('.btn-allmenusearchclear').click(function() {
                    $j(this).hide();
                    $j(cfmGnbAreaTarget + '.all-menus .search-area input[class=\'flow search-text\']').val('').focus();

                    cfmGnbAreaHtml.allMenuSearchSelect(-1);
                    $j(cfmGnbAreaTarget + '.all-menus').find('.result').html('');
                });            
            });

            //전체메뉴-검색 클릭통계
            kt_common.linkInfo('common', 'click', $j(cfmGnbAreaTarget + '.all-menus .search-area input[class=\'flow search-text\']'), {svcUrl:'', statInfo:'^KT-개인_공통^전체메뉴^검색^검색필드'}, '1');
            kt_common.linkInfo('common', 'click', $j(cfmGnbAreaTarget + '.all-menus .search-area .btn-search'), {svcUrl:'', statInfo:'^KT-개인_공통^전체메뉴^검색^검색버튼'}, '1');
            
            //ui 처리 kt_ui.js 호출
            cfmUi.COMMON.navAll();
        } catch(e) {
            common_log.log('kt_gnb.js allMenuArea() [' + e.message + ']');
        }
    },

    //전체메뉴영역-전체메뉴 검색
    allMenuSearch: function(){
        var obj = $j(cfmGnbAreaTarget + '.all-menus');

        //초기화
        cfmAllMenuSearchSelect = -1;
        cfmGnbAreaHtml.allMenuSearchSelect(cfmAllMenuSearchSelect);
        obj.find('.result').html('');

        var keyword = obj.find('input[class=\'flow search-text\']').val();
        if (keyword == ''){
            alert('검색어를 입력하세요.');                        
            obj.find('input[class=\'flow search-text\']').focus();
            return false;
        }

        var blank_pattern = /^\s+|\s+$/g;
        if (keyword.replace(blank_pattern, '') === ''){
            alert('공백만 입력되었습니다.');
            return false;
        }

        var special_pattern = /[`().~!@#$%^&*|\\\'\/?]/gi;
        if (special_pattern.test(keyword) === true){
            alert('특수문자는 검색할 수 없습니다.');
            return false;
        }

        var html;
        cfmAllMenuSearch = $j(cfmGnbAreaTarget + '.all-menus a').filter(function(i, item){
            return $j(item).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });
        if(cfmAllMenuSearch.length > 0){
            html = $j('<span style=""><em>‘'+ keyword +'’</em>와 일치되는 메뉴명이 <em>'+ cfmAllMenuSearch.length +'개</em> 있습니다.</span>'+
                        '<button type="button" class="next"><span>다음 검색어 결과로 이동</span></button>'+
                        ' <button type="button" class="prev"><span>이전 검색어 결과로 이동</span></button>');
           
            //첫번째 세팅
            cfmAllMenuSearchSelect = 0;
        }else{
            html = $j('<span style=""><em>‘'+ keyword +'’</em>에 대한 검색 결과가 없습니다.</span>');            
        }

        $j(cfmGnbAreaTarget + '.all-menus .result').html(html);
        cfmGnbAreaHtml.allMenuSearchSelect(cfmAllMenuSearchSelect);

        //전체메뉴-검색 클릭통계
        kt_common.linkInfo('common', 'click', $j(cfmGnbAreaTarget + '.all-menus .result .next'), {svcUrl:'', statInfo:'^KT-개인_공통^전체메뉴^검색^다음화살표'}, '1');
        kt_common.linkInfo('common', 'click', $j(cfmGnbAreaTarget + '.all-menus .result .prev'), {svcUrl:'', statInfo:'^KT-개인_공통^전체메뉴^검색^이전화살표'}, '1');
    },

    //전체메뉴영역-전체메뉴 검색 선택
    allMenuSearchSelect: function(index){
        //초기화         
        $j(cfmGnbAreaTarget + '.all-menus a').removeClass('search-highlight');

        if(index < 0){
            $j(cfmGnbAreaTarget + '.all-menus a').removeClass('active');         
            $j(cfmGnbAreaTarget + '.all-menus .depth4').hide();
        }else{ 
            var data = $j(cfmAllMenuSearch[index]).data();
            if(data.depth == 4){
                if(!$j(cfmAllMenuSearch[index]).parent().parent().parent().find('.is-depth4').hasClass('active')){
                    $j(cfmAllMenuSearch[index]).parent().parent().parent().find('.is-depth4').addClass('active');
                    $j(cfmAllMenuSearch[index]).parent().parent().parent().find('.depth4').show();
                }               
            }

            $j(cfmAllMenuSearch[index]).addClass('search-highlight');
            $j(cfmAllMenuSearch[index]).focus();
        }
    },

    //서브-로케이션바
    locationBar: function(){
        //현재메뉴
        var current = cfmGnbMenuJson.filter(function(element){
            return element.menuCd == ktMenuCd;
        });

        //현재메뉴가 없는 경우(api 호출)
        if(current.length == 0){
            kt_api.locationMenu();
        }else{
            var data = current[0];
            if(kt_common.isNull(data.lctnBarYn) == 'Y'){ //로케이션바 노출
                var html = $j('.location');            
                var path = data.path.split(' > ');

                html.html('<span><a href="'+ cl_domain +'" class="home">HOME</a></span>'); //홈

                $j.each(path, function(i, menuCd){
                    var menu = cfmGnbMenuJson.filter(function(element){
                        return element.menuCd == menuCd;
                    });
                    if(menu.length > 0){
                        var item = menu[0];
                        var conts;
                        if((item.menuCd == ktMenuCd)){
                            conts = $j('<span>'+ item.gnbMenuNm +'</span>');                        
                        }else{
                            conts = $j('<span><a href="#">'+ item.gnbMenuNm +'</a></span>');
                            if (item.menuCd =='EMC000') { // 네이버 서브링크 미노출 처리 추가
                                conts.find('a').attr('rel', 'nosublink');
                            }
                            kt_common.linkInfo('common', 'locationBar', conts.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc); //메뉴링크
                        }
                        html.append(conts);
                    }
                });

                html.find('span:last').attr('title', '현재페이지');
            }            
        }
        
        //kt_api.breadcrumb();			
        var breadcrumbTargetUrl = new URL(location.href);
        if(cfmGnbBreadcrumbs == 'Y' || (breadcrumbTargetUrl .hostname == "product.kt.com")){
            kt_api.breadcrumb();
        } 
    },

    //서브-로케이션바 callback
	callBackLocationMenu: function(type, result){
        try {
            if(type === 'success'){
                var isShow = false;
                var html = $j('.location');
                html.html('<span><a href="'+ cl_domain +'" class="home">HOME</a></span>'); //홈
    
                $j.each(result.data, function(i, item){
                    var conts = $j('<span><a href="#">'+ item.gnbMenuNm +'</a></span>');
                    kt_common.linkInfo('common', 'locationBar', conts.find('a'), item, item.newWndwType, item.popupWdth, item.popupVrtc); //메뉴링크
                    html.append(conts);
                    isShow = true;
                });
    
                if(!isShow){
                    html.hide();
                }
            }            
        } catch (e) {
            common_log.log('kt_gnb.js locationMenu> callBackLocationMenu() [' + e.message + ']');
        }
    },

    //GNB배너 callback
    callbackGnbBanner: function(type, result){
        try {
            if(type == 'success'){
                $j.each(result.data, function(i, areaData){
                    var target = $j('.navigation').find('[data-menucd='+ areaData.menuCode +']').parent().find('.sub-navigation-banner');
                    var item = areaData.areaContsList[0];
                    
                    // 팝업을 위한 wdth, vrtc 변수 값 덮어쓰기
                    areaData.areaContsList[0].popupWdth = areaData.areaContsList[0].floatPopupWdth;
                    areaData.areaContsList[0].popupVrtc = areaData.areaContsList[0].floatPopupVrtc;
                    
                    //html,이미지
                    kt_common.contsViewType('common', target, areaData, item);
                });
            }            
        } catch (e) {
            common_log.log('kt_gnb.js gnbBanner> callbackGnbBanner() [' + e.message + ']');
        }
    },

    //Shop(장바구니개수) 노출-2차
    cartDispaly: function(){
        if(kt.isLogin() == 'Y' && cfmCartUseYn == "Y"){ //로그인후-연동여부('Y')
            kt_api.cartCount();
        }
    },

    //Shop(장바구니개수) UI-2차
    cartHtml: function(cfmCartCount){
        if(kt_common.isNull(cfmCartCount) != '' && !isNaN(cfmCartCount)){
            //99+표시
            if(cfmCartCount > 99) cfmCartCount = '99+';
            
            var html = `<span class="noticeno"><em class="hidetxt">총</em>${cfmCartCount}<em class="hidetxt">건의 상품이 있습니다.</em></span>`;

            //상단영역
            var target = $j('#cfmClGnb').find('.btn-gnbcart');
            target.append(html);
        }
    }
}

$j(document).ready(function(){
    //메뉴검색-다음버튼
    $j(cfmGnbAreaTarget + '.all-menus .result').on('click', '.next', function(){
        if(cfmAllMenuSearchSelect < (cfmAllMenuSearch.length-1)){
            cfmAllMenuSearchSelect +=1;                                      
        }else{
            cfmAllMenuSearchSelect = 0;
        }
        cfmGnbAreaHtml.allMenuSearchSelect(cfmAllMenuSearchSelect);   
    });

    //메뉴검색-이전버튼
    $j(cfmGnbAreaTarget + '.all-menus .result').on('click', '.prev', function(){
        if(cfmAllMenuSearchSelect > 0){
            cfmAllMenuSearchSelect -=1;                    
        }else{
            cfmAllMenuSearchSelect = (cfmAllMenuSearch.length-1);
        }
        cfmGnbAreaHtml.allMenuSearchSelect(cfmAllMenuSearchSelect);
    });

    //Shop(장바구니개수)
    cfmGnbAreaHtml.cartDispaly();
});