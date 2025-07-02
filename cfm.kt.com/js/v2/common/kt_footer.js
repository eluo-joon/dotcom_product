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

// DATA - 배포파일(cashing)
var cfmFooterNow = new Date();
var cfmFooterVersion = '?version=' + cfmFooterNow.getFullYear() +''+ (cfmFooterNow.getMonth()+1) +''+ cfmFooterNow.getDate() +''+ cfmFooterNow.getHours();
document.write('<script src="' + cfm_domain + '/js/json/'+ kt_common.pageType() +'_footer_html.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //푸터
document.write('<script src="' + cfm_domain + '/js/json/cl_smarttalk_txt.js' + cfmFooterVersion + '" charset="UTF-8"></script>'); //스마트톡(케이톡) 말풍선

var smartTalkOpen;              //케이톡 팝업
var smartTalkTxt = [];          //케이톡 데이터
var rollingSmartTalkLinkCnt = 0; //말풍선 카운터

var cfmFooterNowDate;
var cfmFooterAreaTarget = '#cfm'+ ktChannel +'Footer ';
var cfmFooterAreaHtml = {

	//초기화 & 세팅
	init: function(){
        //screen API
        kt_api.statsScreen(); 

        //Html import
        document.writeln(cfmFooterDiv);

        //모바일버전 보이기
        if(isMobile()){
             $j('.mobile-version').css('display','block');
        }
	},

    //페이지통계
    statPage: function(){
        common_log.log('kt_footer.js statPage() [s.pageName:'+ s.pageName +', muCd: '+ ktMenuCd +', ktMenuCode: '+ ktMenuCode +']');

        //0709 캠페인 오퍼,반응 정보
        try {
            ot.m.muCd = ktMenuCd;
        } catch(e) {
            common_log.log('mkt_footer.js ot.m.muCd [' + e.message + ']');
        }

        if(kt_common.isNull(s.pageName) != ''){
            //Adobe, 구글
            try{ 
                _satellite.pageBottom();
            }catch(e){
                common_log.log('kt_footer.js _satellite.pageBottom() [' + e.message + ']');
            };

            //온라인마케팅시스템 omsf
            try {
                o.m.muCd = ktMenuCd;
                omsf.pageLog();
            } catch(e) {
                common_log.log('kt_footer.js omsf.pageLog() [' + e.message + ']');
            }

            //구마케팅시스템 klog
            klog.cookietrace(s.pageName, null, ktMenuCode);
        }
    },

    statPageLaunch: function(klogpageName){
        common_log.log('kt_footer.js statPageLaunch() [_commonDL.pageInfo.page_name:'+ klogpageName +', muCd: '+ ktMenuCd +', ktMenuCode: '+ ktMenuCode +']');

        //0709 캠페인 오퍼,반응 정보
        try {
            ot.m.muCd = ktMenuCd;
        } catch(e) {
            common_log.log('mkt_footer.js ot.m.muCd [' + e.message + ']');
        }

        try {
            if(kt_common.isNull(klogpageName) != ''){
                
                //온라인마케팅시스템 omsf
                o.m.muCd = ktMenuCd;
                omsf.pageLog();
    
                //구마케팅시스템 klog
                klog.cookietrace(klogpageName, null, ktMenuCode);
            }
            
        } catch (e) {
            common_log.log('kt_footer.js omsf.pageLog() [' + e.message + ']');
        }
    },    

    //스마트톡(케이트톡) - 상단영역
    smartTalkIcon: function(){
        try {
            var isShow = false;
            var areaData = cfmSmartTalkTxtJson[0];
            if ((areaData.showYn == 'Y' && areaData.showPerdType == '01') || (areaData.showYn == 'Y' && (cfmFooterNowDate >= areaData.showSdate && cfmFooterNowDate <= areaData.showEdate))){ //영역노출여부                
                //컨텐츠-CMS
                $j.each(areaData.areaSetList[0].areaContsList, function(i, item){
                    if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmFooterNowDate >= item.showSdate && cfmFooterNowDate <= item.showEdate))){
                        smartTalkTxt.push(item);
                        isShow = true;
                    }
                });
            }

            if(isShow){
                var html = $j('<div class="div-sslink cfmSmartTalkLinkTxtDiv" style="display:none;">'+
                            '       <span class="fm-sslink-sttn">'+
                            '           <span class="fm-sslink-sttn-inn cfmSmartTalkLinkTxtP" data-nosnippet></span>'+
                            '       </span>'+
                            '</div>'+
                            '<div class="cfmSmartTalkLinkChatDiv" data-nosnippet style="display:none;"></div>');

                $j('#cfm'+ ktChannel +'Gnb .wrap-gnbktalk').append(html);

                //문구-CMS
                cfmFooterAreaHtml.smartTalkLinkTxt();

                //온마시 말풍선 연동
                if(areaData.omsShowYn == 'Y'){
                    campaignChatbot();
                }
            }
        } catch (e) {
            common_log.log('kt_footer.js smartTalkIcon() [' + e.message + ']');
        }
    },

    //스마트톡(케이톡) 말풍선 - CMS
    smartTalkLinkTxt: function(html){
        var html = $j('#cfmSmartTalk');

        //설정 데이터 없을시
        if(smartTalkTxt.length == 0) smartTalkTxt.push({title: "무엇이든 물어보세요", statInfo: "무엇이든 물어보세요"});

        //문구 롤링
        html.find('.cfmSmartTalkLinkTxtP').html(`<a href="#">${smartTalkTxt[0].title}<em class="hidetxt">챗봇에서 검색하기</em></a>`);
        html.find('.cfmSmartTalkLinkTxtP').attr('data-urlInfo', smartTalkTxt[0].urlInfo);
        html.find('.cfmSmartTalkLinkTxtP').attr('data-statInfo', smartTalkTxt[0].statInfo);

        //링크정보(케이톡 문구)
        kt_common.linkInfo('common', 'click', html.find('.cfmSmartTalkLinkTxtP a'), {svcUrl:'cfmSmartTalkLink'}, '2');

        var th = html.find('.cfmSmartTalkLinkTxtDiv');
        th.show();
    },

    //스마트톡(케이톡) 말풍선 - 온마시 callback
    callbackCampaignChatbot: function(type, result){
        if(type == 'success'){            
            $j('.cfmSmartTalkLinkTxtDiv').hide();
            $j('.cfmSmartTalkLinkChatDiv').show();
            $j('.cfmSmartTalkLinkChatDiv').html(result.html);
        }
    },

    //스마트톡(케이트톡) 팝업창
	smartTalkPopup: function(stabType, url){

		var popWidth = 420;
		var popHeight = 670;
		
		var winHeight = document.body.clientHeight;				// 현재창의 높이
		var winWidth = document.body.clientWidth;				// 현재창의 너비
		
		var winX = window.screenX || window.screenLeft || 0;	// 현재창의 x좌표
		var winY = window.screenY || window.screenTop || 0; 	// 현재창의 y좌표
   
		var popX = winX + (winWidth - popWidth) / 2;
		var popY = 81;
   
		cfmFooterAreaHtml.smartTalkAction(popWidth, popHeight, popY, popX, stabType, url); //케이톡 팝업
	},

    //스마트톡(케이트톡)
	smartTalkAction : function(popWidth, popHeight, popY, popX, stabType, url){
        var link = '', stat = '';

        if (stabType == 0){ //아이콘
            link = ibot_domain;
        }else if (stabType == 2){ //리마인드 링크
            link = url;
        }else{ //말풍선 링크
            link = ibot_domain + '?messageSearch='+ encodeURIComponent(kt_common.isNull($j('.cfmSmartTalkLinkTxtP').attr('data-urlInfo')));
            stat = kt_common.isNull($j('.cfmSmartTalkLinkTxtP').attr('data-statInfo'));
            KT_trackClicks('KT-개인_공통', '^KT-개인_공통^챗봇^'+ stat);
        }

        if(kt_common.pageType() == 'shop'){ //shop인 경우-2차
            link = link.replace('pc-web', 'pc-shop');
        }
        
        smartTalkOpen = window.open(link, "smartTalkPopup", "width=" + popWidth + "px,height=" + popHeight + "px,top=" + popY + ",left=" + popX + ",resizable=no, status=yes");
        smartTalkOpen.focus();
	},

    //매장찾기 - 우측하단
    fintShopIcon: function(){
        if(kt_common.isNull(loadFintShopChk) == 'Y'){
            var html = $j('<div class="footer-float-icon-item">'+
            '   <div class="cfmFintShop">'+
            '       <a href="#" class="cfmFintShop-banner">'+
            '           <span class="cfmFintShopLinkTxt">가까운 매장 찾기</span>'+
            '       </a>'+
            '       <span class="cfmFintShopGudTxt"><em><em>가까운 매장 찾기</em></em></span>'+
            '   </div>'+
            '</div>');

            //링크정보
            kt_common.linkInfo('common', 'click', html.find('a'), {svcUrl:'https://help.kt.com/store/KtStoreSearch.do', statInfo:'^KT-개인_공통^플로팅메뉴^매장찾기'}, '1');

            $j(cfmFooterAreaTarget + '.footer-float-icon-div').prepend(html);
        }
    },

    //만족도조사 - 우측하단
    satisfaction: function(){
        kt_common.standAloneInfo(); //정보조회
        var isCookie = kt_common.getArrayCookie('stsfcSurvey', sdegWidgetId);
        if(kt_common.isNull(loadStsfcSurveyChk) == 'Y' && isCookie === ''){
            var html = $j('<div class="footer-float-icon-item">'+
            '   <span class="btn-ffloat-icon">'+
            '       <a href="#">'+
            '           <img src="'+ cfm_domain +'/images/v2/footer/ico_ffooter_qstnr.png" alt="만족도조사">'+
            '       </a>'+
            '       <span class="dispProtectedInfoTxt">만족도조사</span>'+
            '   </span>'+
            '</div>');

            //링크정보
            kt_common.linkInfo('common', 'click', html.find('a'), {svcUrl:'stsfcSurvey', statInfo:'^KT-개인_공통^플로팅메뉴^만족도조사'}, '2');

            $j(cfmFooterAreaTarget + '.footer-float-icon-div').prepend(html);
        }
    }
}

$j(document).ready(function(){
    function loadScreenChk(){
        if(cfmloadScreen){	//screen API 로드 true  
            cfmFooterNowDate = kt_common.dateFormat('YYYY.MM.DD HH:mm:ss');
            
            cfmFooterAreaHtml.smartTalkIcon(); //스마트톡(케이트톡) 
            cfmFooterAreaHtml.fintShopIcon(); //매장찾기 
            cfmFooterAreaHtml.satisfaction(); //만족도조사                    
            if (kt_adobeLaunch !== 'Y') {cfmFooterAreaHtml.statPage();} //페이지통계
        }else{        
            setTimeout(function(){ loadScreenChk(); }, 200);
        }
    }

    loadScreenChk();

    // Google Tag Manager 
    try {
        if (kt_common.isNull(googleTagBody) !== '') {
            $j('body').prepend(googleTagBody);
        }
    } catch(e){
        common_log.log('Google Tag Magnger body [' + e.message + ']');
    }
});