/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

//팝업
var PcampId		= '';
var PcampStatCd = '';
var PexeType	= '';
var PcampName	= '';
var PshowPrist  = 999999999;
var PisCampShow = false;

// 챗봇
var CBcampId    = '';
var CBcampStatCd = '';
var CBexeType   = '';
var CBcampName  = '';

// floating 배너
var FcampId     = '';
var FcampStatCd = '';
var FexeType    = ''; 
var FcampName   = '';
var FshowPrist  = 999999999;
var FisCampShow = false;

// 메인 빅배너
var MBcampId    = '';
var MBcampStatCd = '';
var MBexeType	= '';
var MBcampName	= '';

// 메인 빅배너
var MBcampId_B    = '';
var MBcampStatCd_B = '';
var MBexeType_B	= '';
var MBcampName_B	= '';

// 공통 함수
var campId		= '';   //캠페인 ID
var campStatCd	= '';   //통계코드
var exeType		= '';	//캠페인구분
var campName	= '';

// 캠페인 노출 통계
var campaignStat = function(s){
	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
	}else if(s == "f"){
		campId = FcampId;campStatCd= FcampStatCd;exeType = FexeType;campName = FcampName;
	}else if(s == "mb"){
		campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
    }

	if(kt_common.isNull(s) !== ''){
		trgt.campaignViewLog(campId, campName, exeType);
		//KT_trackClicks(s.pageName, '^KT-개인_타겟오퍼' + campStatCd + '^노출');
		var Click_Name = '^KT-개인_타겟오퍼' + campStatCd + '^노출';
	    var gaClick = gaSplitClickName(Click_Name);
	    gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);
	}
}

// 캠페인 클릭
var campaignClick = function(s, param){
	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
	}else if(s == "f"){
		campId = FcampId;campStatCd= FcampStatCd;exeType = FexeType;campName = FcampName;
	}else if(s == "mb"){
		campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
    }

    if(s == "cb"){ //챗봇 리마인드(케이톡)
        cfmFooterAreaHtml.smartTalkPopup(2, param);

        trgt.campaignClickLog(campId, campName, exeType, 'CL', '^KT-개인_타겟오퍼' + campStatCd + '^클릭');
        KT_trackClicks(s.pageName, '^KT-개인_타겟오퍼' + campStatCd + '^클릭');
        
        return false;
    }else{
        if(kt_common.isNull(param) != ''){
            campStatCd = param;
        }
    
        if(kt_common.isNull(s) !== ''){
            trgt.campaignClickLog(campId, campName, exeType, 'CL', '^KT-개인_타겟오퍼' + campStatCd + '^클릭');
            KT_trackClicks(s.pageName, '^KT-개인_타겟오퍼' + campStatCd + '^클릭');
        }
    }
}

// 캠페인 닫기
var campaignClose = function(s){
    var clickCd = 'X'; // 닫기 코드값 기본 설정

	if(s == "p"){
		campId = PcampId;campStatCd= PcampStatCd;exeType = PexeType;campName = PcampName;
	}else if(s == "cb"){
		campId = CBcampId;campStatCd= CBcampStatCd;exeType = CBexeType;campName = CBcampName;
	}else if(s == "f"){
		campId = FcampId;campStatCd= FcampStatCd;exeType = FexeType;campName = FcampName;
	}else if(s == "mb"){
		campId = MBcampId;campStatCd= MBcampStatCd;exeType = MBexeType;campName = MBcampName;
    }else if(s == "mb_b"){
		campId = MBcampId_B;campStatCd= MBcampStatCd_B;exeType = MBexeType_B;campName = MBcampName_B;
	}

    if(s == "cb"){ //챗봇 리마인드
        $j('.cfmSmartTalkLinkChatDiv').fadeOut().attr('aria-hiden', 'true');

        //CMS 챗봇메세지 다시보여줌            
        setTimeout(function(){ 
            $j('.cfmSmartTalkLinkTxtDiv').show();
            $j('.cfmSmartTalkLinkChatDiv').hide();
            cfmFooterAreaHtml.smartTalkLinkTxt();
        }, 1000);

        if($j('#checkbox_snc_cb').is(':checked')){
            kt_common.setArrayCookie('snc_camp', campId, 1); //24시간(고정)
            clickCd = 'NL'; //코드값
        }
    }else if(s == "p"){ //팝업
        if($j('#checkbox_snc_p').is(':checked')){            
            var campPeriod = $j('#checkbox_snc_p').data('campperiod');
            var campVal = campId+'_'+ktMenuCd;
            kt_common.setArrayCookie('snc_camp', campVal, campPeriod); //hiddDays
            clickCd = 'NL'; //코드값
        }
    }

	if(kt_common.isNull(s) !== ''){
		trgt.campaignClickLog(campId, campName, exeType, clickCd, '^KT-개인_타겟오퍼' + campStatCd + '^닫기');
		KT_trackClicks(s.pageName, '^KT-개인_타겟오퍼' + campStatCd + '^닫기');
	}
}

// 플로팅 배너 노출
var campaignFloatingTime = null;
var campaignFloatingType = 1;
var clstoast = function(){
    if (campaignFloatingType == 0){
        clearTimeout(campaignFloatingTime);

        $j(".bn_fix_b").animate({width:"toggle", height:"toggle"}, "slow", "swing");
        $j(".bn_fix_s").slideDown();
		$j(".bn_fix_s a").focus();//1123 vos 1088322
        campaignFloatingType = 1;
    }
}
var opntoast = function(){
    if (campaignFloatingType == 1){
        if(campaignFloatingTime != null){ clearTimeout(campaignFloatingTime); }
        campaignFloatingTime = setTimeout(function(){ clstoast(); }, 3000);

        $j(".bn_fix_b").animate({width:"toggle", height:"toggle"}, "slow", "swing");
        $j(".bn_fix_s").slideUp();
		$j(".bn_fix_b a").focus();//1123 vos 1088322
        campaignFloatingType = 0;
    }
}

var campaignDisplayCheck = function(){
    if(PshowPrist <= FshowPrist && PisCampShow){
        $j('.floatWrap3').remove(); //플로팅배너 제거
        $j('.see-click-area').css('display','block');

        campaignStat('p'); //노출통계
    }else if(PshowPrist > FshowPrist && FisCampShow){
        $j('.see-click-area').remove(); //팝업배너 제거
        $j('.floatWrap3').css('display','block');

        campaignStat('f'); //노출통계
    }
}

// 팝업 캠페인 조회(공통)
var campaignPopup = function(target){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    data.muCd = menuCd; // 페이지코드

    kt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/kt/popup',
        'cookie' : true,
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){                
                    var resultData = result.data;
                    var cookieNm = resultData.caVal1+'_'+ktMenuCd;
    
                    //노출 쿠키 
                    var snc_camp = kt_common.getArrayCookie('snc_camp', cookieNm);           
                    if(snc_camp === ''){
                        var nTime = kt_common.dateFormat('YYYYMMDDHHmm');
                        if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                            cfmNoticeAreaHtml.callbackCampaignPopup(type, target, resultData);
    
                            //노출우선순위
                            PisCampShow = true;
                            if(kt_common.isNull(resultData.showPrist) != ''){
                                PshowPrist = parseInt(resultData.showPrist);
                            }
    
                            //노출통계
                            PcampId = resultData.caVal1;
                            PcampName = resultData.caVal2;
                            if(kt_common.isNull(resultData.multiYn) == "Y"){ //멀티체크
                                try {
                                    PcampStatCd = resultData.statCd.split(',')[0];
                                    PexeType = resultData.caVal3.split(',')[0];
                                } catch(e) {
                                    common_log.log('kt_offer.js campaignPopup() [' + e.message + ']');
                                }
                            }else{                            
                                PcampStatCd = resultData.statCd;
                                PexeType = resultData.caVal3;
                            }
                        }
                    }
                }
            } catch (e) {
                common_log.log('kt_offer.js campaignPopup [' + e.message + ']');
            }
        },
        'complete' : function(){
           campaignFloating(); //플로팅 배너(온마시)
        }
    });
}

// 챗봇 캠페인 조회(공통)
var campaignChatbot = function(){
    kt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/kt/chatbot',
        'cookie' : true,
        'type' : 'post',
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var snc_camp = kt_common.getArrayCookie('snc_camp', resultData.caVal1); //노출 쿠키        
                    if(snc_camp === ''){
                        var nTime = kt_common.dateFormat('YYYYMMDDHHmm');
                        if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                    
                            cfmFooterAreaHtml.callbackCampaignChatbot(type, resultData);
    
                            //노출통계
                            CBcampId = resultData.caVal1;
                            CBcampStatCd = resultData.statCd;
                            CBcampName = resultData.caVal2;
                            CBexeType = resultData.caVal3;
                            campaignStat('cb');
                        }
                    }
                }
            } catch (e) {
                common_log.log('kt_offer.js campaignChatbot [' + e.message + ']');
            }
        }
    });
}

// 플로팅 캠페인 조회(공통)
var campaignFloating = function(){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    data.muCd = menuCd; // 페이지코드

    kt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/kt/floating',
        'cookie' : true,
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = kt_common.dateFormat('YYYYMMDDHHmm');
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){                                 
                        cfmNoticeAreaHtml.callbackCampaignFloating(type, resultData);
    
                        //노출여부
                        FisCampShow = true;
                        if (kt_common.isNull(resultData.showPrist != '')){
                            FshowPrist = parseInt(resultData.showPrist);
                        }
    
                        //노출통계
                        FcampId = resultData.caVal1;
                        FcampStatCd = resultData.statCd;
                        FcampName = resultData.caVal2;
                        FexeType = resultData.caVal3;   
                    }
                }
            } catch (e) {
                common_log.log('kt_offer.js campaignFloating [' + e.message + ']');
            }
        },
        'complete' : function(){
           campaignDisplayCheck(); //노출우선순위(팝업,플로팅배너)
        }
    });
}

// 메인 빅배너 캠페인 조회(메인) 
var campaignBigBanner = function(target, order){
    kt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/kt/bigbanner',
        'cookie' : true,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = kt_common.dateFormat('YYYYMMDDHHmm');       
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                        mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
        
                        //노출통계
                        MBcampId = resultData.caVal1;
                        MBcampStatCd = resultData.statCd;
                        MBcampName = resultData.caVal2;
                        MBexeType = resultData.caVal3;
                        campaignStat('mb');
                    }
                }
            } catch (e) {
                common_log.log('kt_offer.js campaignBigBanner [' + e.message + ']');
            }
        }
    });
}

// 메인 빅배너 캠페인 조회(메인 22.03.17) 
// mtype : pop (파라미터 muCd 추가 그외win 안함)
var campaignBigBannerNew = function(target, mtype, order, zcode){
    var menuCd = '';
    try {
        menuCd = ktMenuCd;
    } catch (e){
        menuCd = 'XXXXXX';
    }

    var data = {};
    if (mtype == 'pop') {
        data.muCd = menuCd; // 페이지코드
    }
    data.zoneCode = zcode;

    kt_common.callAjax({
        'url' : omsoffer_domain + '/offer/v1.0/common/getBanner',
        'cookie' : true,
        'type' : 'post',
        'data' : data,
        'timeout' : 5000,
        'callback' : function(type, result){
            try {
                if(type == 'success'){
                    var resultData = result.data;
                    var nTime = kt_common.dateFormat('YYYYMMDDHHmm');       
                    if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
                        resultData.zcode = zcode;
                        mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
        
                        //노출통계
                        if (zcode == 'OFFERAREA090') { //B호출
                            MBcampId_B = resultData.caVal1;
                            MBcampStatCd_B = resultData.statCd;
                            MBcampName_B = resultData.caVal2;
                            MBexeType_B = resultData.caVal3;
                            campaignStat('mb_b');
                        } else {
                            MBcampId = resultData.caVal1;
                            MBcampStatCd = resultData.statCd;
                            MBcampName = resultData.caVal2;
                            MBexeType = resultData.caVal3;
                            campaignStat('mb');
                        }
                    } else {}
                }else{
                    mainAreaHtml.callbackCampaignBigBanner(type, target, resultData, order);
                }
            } catch (e) {
                common_log.log('kt_offer.js campaignBigBannerNew [' + e.message + ']');
            }
        }
    });
}