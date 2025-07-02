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

//메인/입점팝업
var cfmPopupHtml = '';
cfmPopupHtml += '<div>';
cfmPopupHtml += ' <div class="cfm-layers layer-notice" style="height: auto;">';
cfmPopupHtml += '     <div class="layer-contents"></div>';
cfmPopupHtml += '     <div class="layer-close"><button type="button">레이어 닫기</button></div>';
cfmPopupHtml += '     <div class="layer-footer layer-footer-close">';
cfmPopupHtml += '         <button type="button" class="layer-stop-btn">오늘 하루 보지 않기</button>';
cfmPopupHtml += '         <button type="button" class="layer-close-btn">닫기</button>';
cfmPopupHtml += '     </div>';
cfmPopupHtml += ' </div>';
cfmPopupHtml += '</div>';

//영문팝업
var cfmEngPopupHtml = '';
cfmEngPopupHtml += '<div class="eng-site-pop">';
cfmEngPopupHtml += '    <div class="cfm-layers layer-notice" style="width:440px;height:280px;">';
cfmEngPopupHtml += '        <div class="layer-contents">';
cfmEngPopupHtml += '            <div class="layer-header"><strong><em><img src="'+ cfm_domain +'/images/v2/layout/gnb-ktlogo.png" alt="KT"></em></strong></div>';
cfmEngPopupHtml += '            <div class="layer-contents">';
cfmEngPopupHtml += '                <div class="layer-contents-inner">';
cfmEngPopupHtml += '                    <p class="info-txt">Would you like to be redirected to<br>KT corporate’s English site?</p>';
cfmEngPopupHtml += '                    <div class="btn-wrap">';
cfmEngPopupHtml += '                        <button type="button" id="btnYes"><span class="btn medium is-red">YES</span></button>';
cfmEngPopupHtml += '                        <button type="button" id="btnNo"><span class="btn medium is-line-red">NO</span></button>';
cfmEngPopupHtml += '                    </div>';
cfmEngPopupHtml += '                </div>';
cfmEngPopupHtml += '            </div>';
cfmEngPopupHtml += '        </div>';
cfmEngPopupHtml += '        <div class="layer-close"><button type="button">레이어 닫기</button></div>';
cfmEngPopupHtml += '        <div class="layer-today-close">';
cfmEngPopupHtml += '            <span class="option-area dir-flow">';
cfmEngPopupHtml += '                <input type="checkbox" id="checkbox-lang" name="checkbox-lang" class="invisible" value=""><label for="checkbox-lang">Do not show me this message again</label>';
cfmEngPopupHtml += '            </span>';
cfmEngPopupHtml += '        </div>';
cfmEngPopupHtml += '    </div>';
cfmEngPopupHtml += '</div>';

var cfmNoticeNow = new Date();
var cfmNoticeVersion = '?version=' + cfmNoticeNow.getFullYear() +''+ (cfmNoticeNow.getMonth()+1) +''+ cfmNoticeNow.getDate() +''+ cfmNoticeNow.getHours();

var cfmNoticeNowDate;
var cfmNoticeAreaHtml = {

    //초기화 & 세팅
    init: function(){
        if(kt_common.pageType() != 'shop'){ //Shop페이지 아닌경우만-2차     
            if($j('#ktMainYn').length){  
                cfmNoticeAreaHtml.mainNotice();        
            }else{
                cfmNoticeAreaHtml.subNotice();
            }
        }
    },

    //팝업 그만보기 설정
    setStopPopup: function(target, name, data){
        if(kt_common.isNull(data.popupStopType) !== ''){
            target.find('.layer-close').hide();
            target.find('.layer-footer-close').show();

            //텍스트
            if(kt_common.isNull(data.subTitle) !== ''){
                target.find('.layer-stop-btn').text(data.subTitle);
            }

            //쿠키설정
            var period = parseInt(data.popupStopType);
            target.on('click', '.layer-stop-btn', function() {
                if(name == 'snc_camp_p'){ //온마시 팝업
                    $j('#checkbox_snc_p').data('campperiod', data.popupStopType);
                    $j('#checkbox_snc_p').prop('checked', true);
                    campaignClose('p');
                }else{
                    kt.setComCookie(name, new Date().toString(), period);                    
                }   
                
                target.find(".layer-notice").stop().fadeOut(500).parent().hide();
            });

            //닫기
            target.on('click', '.layer-close-btn', function(){
                target.find(".layer-notice").stop().fadeOut(500).parent().hide();
            });
        }else{ //설정없음
            target.find('.layer-close').show();
            target.find('.layer-footer-close').hide();
            target.addClass('cfm-nonfooter');

            //닫기
            target.on('click', '.layer-close', function(){
                target.find(".layer-notice").stop().fadeOut(500).parent().hide();
            });
        }
    },

    //메인-비상,통합(일반,온마시),슬라이드공지
    mainNotice: function(){
        cfmNoticeAreaHtml.mainDirectPopup(); //개별(긴급) 공지팝업
        //cfmNoticeAreaHtml.mainEngPopup(); //개별(영문) 공지팝업
        
        kt_common.callAjax({
            'url' : cl_domain + '/js/json/notice.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                if(type == 'success'){
                    if (result.returnCode == "OK"){
                        $j.each(result.data, function(i, areaData){
                            if ((areaData.showYn == 'Y' && areaData.showPerdType == '01') || (areaData.showYn == 'Y' && (cfmNoticeNowDate >= areaData.showSdate && cfmNoticeNowDate <= areaData.showEdate))){ //영역노출여부
                                if(areaData.areaScrnType == '13'){ //슬라이드공지
                                    cfmNoticeAreaHtml.slideBanner(areaData);
                                }else{
                                    cfmNoticeAreaHtml.mainPopup(areaData);
                                }
                            }                          
                        });
                    }
                }
            },
            'complete' : function(){            
                campaignPopup(); //온마시 팝업
            }
        });
    },

    //서브-통합(입점,온마시)
    subNotice: function(){
        kt_common.callAjax({
            'url' : cl_domain + '/js/json/popup_ALL.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                if(type == 'success'){
                    if (result.returnCode == "OK"){
                        $j.each(result.data.popupList, function(i, item) {
                            if (item == ktMenuCd){
                                cfmNoticeAreaHtml.subMenuNotice(); //입점-개별
                                return false;
                            }
                        });
                    }
                }
            },
            'complete' : function(){   
                campaignPopup(); //온마시 팝업
            }
        });
    },

    //서브-통합(입점)
    subMenuNotice: function(){
        kt_common.callAjax({
            'url' : cl_domain + '/js/json/popup_'+ ktMenuCd +'.json' + cfmNoticeVersion,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                if(type == 'success'){
                    if (result.returnCode == "OK"){
                        cfmNoticeAreaHtml.subPopup(result.data);
                    }
                }
            }
        });
    },

    //개별(메인-긴급) 공지팝업(수동)
    mainDirectPopup: function(){
        $j.ajax({
            url: cl_domain + '/html/pc_code.html',
            type: "get",
            timeout: 500,
            cache : false,
            error : function(xhr, option, error){
            }
        }).done(function(html){
            $j("body").prepend(html);

			var $layer = $j('#popups-emgc');
			// 배너닫기
			$layer.find('button').on('click', function() {
				$j(this).closest('.layers').stop().fadeOut(500);
			});
        });
    },

    //개별(메인-영문) 공지팝업
    mainEngPopup: function(){
        if(document.location.href.indexOf(corp_eng_domain) === -1){
            var cookieValue = kt.getComCookie('ir_lang');
            if(cookieValue === 'eng'){
                var html = $j(cfmEngPopupHtml);

                html.on('click', '#btnYes', function(){
                    if($j('#checkbox-lang').is(':checked')) {
                        kt.setComCookie('ir_lang', 'eng_chk', 365);
                    }
                    location.href = corp_eng_domain;
                });
                html.on('click', '#btnNo', function(){
                    if($j('#checkbox-lang').is(':checked')) {
                        kt.setComCookie('ir_lang', 'eng_chk', 365);
                    }
                    html.hide();
                });
                html.on('click', '.layer-close button', function(){
                    if($j('#checkbox-lang').is(':checked')) {
                        kt.setComCookie('ir_lang', 'eng_chk', 365);
                    }
                    html.hide();
                });

                $j('#cfm' + ktChannel + 'Wrapper').prepend(html);
            }
        }
    },

    //개별(메인-비상/일반) 공지팝업
    mainPopup: function(areaData){
        //컨텐츠-CMS(html,이미지,이미지맵)
        $j.each(areaData.areaSetList[0].areaContsList, function(i, item){
        	if(item.popupType=='01'){
	            if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
	                var cookieName = 'popup_'+ item.areaContsId;
	                var cookieValue = kt.getComCookie(cookieName);                
	
	                //그만보기
	                if(kt_common.isNull(cookieValue) != ''){
	                }else{
	                    var html = $j(cfmPopupHtml);
	                    if(areaData.areaId == "A000000272"){ //비상
	                        html.addClass('ermgy-popup-dim');
	                    }else{
	                        html.addClass('cfmmainpops');
	                    }
	
	                    html.find('.layer-notice').attr('id', 'popup-'+ item.areaContsId);                    
	                    kt_common.contsViewType('common', html.find('.layer-contents'), areaData, item);
	
	                    //사이즈조정
	                    item.popupWdth = kt_common.isNull(item.popupWdth) == '' ? 0 : item.popupWdth;
	                    item.popupVrtc = kt_common.isNull(item.popupVrtc) == '' ? 0 : item.popupVrtc;
	                    if(item.popupWdth > 0 && item.popupVrtc > 0){
	                        html.find('.layer-notice').attr('style', 'width:'+ item.popupWdth +'px !important;height:'+ item.popupVrtc +'px !important;');
	                    }
	
	                    //위치조정
	                    if(kt_common.isNull(item.popupXcrd) !== '') {
	                        html.find('.layer-notice').css('left', item.popupXcrd + 'px');
	                    }
	                    if(kt_common.isNull(item.popupYcrd) !== '') {
	                        html.find('.layer-notice').css('top', item.popupYcrd + 'px');
	                    }
	
	                    //그만보기설정
	                    cfmNoticeAreaHtml.setStopPopup(html, cookieName, item);
	
	                    $j('#cfm' + ktChannel + 'Wrapper').prepend(html);
	                }
	            }
        	}else if(item.popupType=='02'){
        		$j("body").prepend(item.htmlInfo);
        	}
        });
    },

    //개별(서브-입점) 공지팝업
    subPopup: function(areaData){
        //컨텐츠-CMS
        $j.each(areaData.detailList, function(i, item){                                                   
            if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                var cookieName = 'popup_'+ item.gnbContsId;
                var cookieValue = kt.getComCookie(cookieName);                

                //그만보기
                if(kt_common.isNull(cookieValue) != ''){
                }else{
                    var html = $j(cfmPopupHtml);
                    html.addClass('cfmmainpops');
                    html.find('.layer-notice').attr('id', 'popup-'+ item.gnbContsId);                   
                    html.find('.layer-contents').append(item.htmlInfo);

                    //사이즈 조정
                    item.popupWdth = kt_common.isNull(item.popupWdth) == '' ? 0 : item.popupWdth;
                    item.popupVrtc = kt_common.isNull(item.popupVrtc) == '' ? 0 : item.popupVrtc;
                    if(item.popupWdth > 0 && item.popupVrtc > 0){
                        html.find('.layer-notice').attr('style', 'width:'+ item.popupWdth +'px !important;height:'+ item.popupVrtc +'px !important;');
                    }

                    //위치조정
                    if(kt_common.isNull(item.popupXcrd) !== '') {
                        html.find('.layer-notice').css('left', item.popupXcrd + 'px');
                    }
                    if(kt_common.isNull(item.popupYcrd) !== '') {
                        html.find('.layer-notice').css('top', item.popupYcrd + 'px');
                    }

                    //그만보기설정
                    cfmNoticeAreaHtml.setStopPopup(html, cookieName, item); 
 
                    $j('#cfm' + ktChannel + 'Wrapper').prepend(html);
                }
            }
        });
    },

    //통합(온마시) 공지팝업 callback
    callbackCampaignPopup: function(type, target, result){
        if(type == 'success'){
            var cookieName = 'snc_camp_p';
            var html = $j(result.html);
            html.find('.layer-notice').attr('id', 'popup-'+ result.caVal1);
            html.hide(); //팝업,플로팅 노출 순서 확인 후 show

            //그만보기설정
            result.popupStopType = kt_common.isNull(result.hiddDays) == '' ? 1 : result.hiddDays;
            if(kt_common.isNull(result.popupStopType) !== ''){
                if(result.popupStopType == 1){
                    result.subTitle = '하루 동안 보지 않기';
                }else{
                    result.subTitle = result.popupStopType + '일간 보지 않기';
                }
            }            
            cfmNoticeAreaHtml.setStopPopup(html, cookieName, result); 

            $j('#cfm' + ktChannel + 'Wrapper').prepend(html);
        }    
    },

    //플로팅 배너(온마시) callback
    callbackCampaignFloating: function(type, result){
        if(type == 'success'){
            $j('#cfm' + ktChannel + 'Wrapper').append(result.html);
            cfmUi.COMMON.floatingBanner(); //ui 처리 kt_ui.js 호출
        }
    },

    //슬라이드(CMS)
    slideBanner: function(areaData){
        //컨텐츠-CMS(html)
        $j.each(areaData.areaSetList[0].areaContsList, function(i, item){                 
            if ((item.showYn == "Y" && item.showPerdType=="01") || (item.showYn == "Y" && ( cfmNoticeNowDate >= item.showSdate && cfmNoticeNowDate <= item.showEdate))){
                if(kt.getComCookie(item.areaContsId) === ''){
                    $j('#cfm' + ktChannel + 'Header').before(item.htmlInfo);
                    cfmUi.COMMON.clickBanner(); //ui 처리 kt_ui.js 호출
                }
            }
        });
    }
}

$j(document).ready(function(){
    function loadScreenChk(){
        if(cfmloadScreen){	//screen API 로드 true  
            cfmNoticeNowDate = kt_common.dateFormat('YYYY.MM.DD HH:mm:ss');
            cfmNoticeAreaHtml.init();
        }else{
            setTimeout(function(){ loadScreenChk();}, 200);
        }
    }

    loadScreenChk();
});