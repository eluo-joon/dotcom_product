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

// 플로팅 영역
var cfmfloatingHtml = '';
cfmfloatingHtml += '<div class="floating-menu" data-nosnippet>';
cfmfloatingHtml += '    <div class="inner">'; //디폴트: 펼침상태, 닫힘일경우(shortstt class 추가)
cfmfloatingHtml += '        <div class="floating-menu-tit-area">';
cfmfloatingHtml += '            <strong class="floating-menu-tit">QUICK MENU</strong>';
cfmfloatingHtml += '            <button type="button" class="floating-menu-btn floating-menu-btn-toggle"><span class="hidetxt">퀵메뉴 접기</span></button>';//2021 웹접근성 : 텍스트 수정//2023 웹접근성 : 텍스트 수정
cfmfloatingHtml += '        </div>';
cfmfloatingHtml += '        <div class="floating-menu-list-area floating-recommend-list"></div>';
cfmfloatingHtml += '		<div class="floating-menu-list-area floating-popular-list"></div>';
cfmfloatingHtml += '    </div>';
cfmfloatingHtml += '</div>';

// DATA - 배포파일(cashing)
var cfmFloatingNow = new Date();
var cfmFloatingVersion = '?version=' + cfmFloatingNow.getFullYear() +''+ (cfmFloatingNow.getMonth()+1) +''+ cfmFloatingNow.getDate() +''+ cfmFloatingNow.getHours();

if(kt.isLogin() == 'Y'){
    document.write('<script src="' + cfm_domain + '/js/json/'+ kt_common.pageType() +'_gnb_direct_after.js' + cfmFloatingVersion + '" charset="UTF-8"></script>'); //로그인후
}else{
    document.write('<script src="' + cfm_domain + '/js/json/'+ kt_common.pageType() +'_gnb_direct_before.js' + cfmFloatingVersion + '" charset="UTF-8"></script>'); //로그인전
    document.write('<script src="' + cfm_domain + '/js/json/cl_gnb_recommend.js' + cfmFloatingVersion + '" charset="UTF-8"></script>'); //간편서비스    
}

var cfmFloatingAreaTarget = '#cfm'+ ktChannel +'Header ';
var cfmFloatingAreaHtml = {

    //초기화 & 세팅
    init: function(){
        //Html import
        document.writeln(cfmfloatingHtml);

        //간편서비스
        cfmFloatingAreaHtml.recommendMenu();

        //인기서비스
        cfmFloatingAreaHtml.popularMenu();

        //ui 처리 kt_ui.js 호출
        cfmUi.COMMON.floating();
    },

    //간편서비스
    recommendMenu: function(){
        // 로그인여부
        if(kt.isLogin() == 'Y'){
            kt_api.targetMenu();
        }else{
            var isShow = false;
            var html = $j(cfmFloatingAreaTarget + '.floating-recommend-list');
            html.append('<strong class="floating-menu-tit">로그인 없이 간편하게!</strong>'+
                        '<button type="button" id="cfmFloatingInfoBtn" class="floating-menu-btn floating-menu-btn-simplesvc" style="display:none;"><span class="hidetxt">간편서비스 안내 페이지로 이동</span></button>'+
                        '<ul></ul>');

            try {
                $j.each(cfmGnbRecommendJson, function(i, item){
                    if(item.title == '소개'){
                        html.find('.floating-menu-btn').show();
    
                        //메뉴링크
                        kt_common.linkInfo('common', 'click', html.find('.floating-menu-btn'), item, item.floatTrgtType, item.floatPopupWdth, item.floatPopupVrtc);
                    }else{
                        var li = $j('<li><a href="#"><span>'+ item.title +'</span></a></li>');
    
                        //아이콘
                        if(kt_common.isNull(item.imgPath) != ''){
                            li.find('a').attr('style', 'background-image:url(\''+ cfm_domain + item.imgPath +'\');');
                        }
    
                        //메뉴링크
                        kt_common.linkInfo('common', 'recommend', li.find('a'), item, item.floatTrgtType, item.floatPopupWdth, item.floatPopupVrtc);        
    
                        html.find('ul').append(li);
    
                        isShow = true;
                    }                
                });
            } catch (e) {
                common_log.log('kt_floating.js recommendMenu() [' + e.message + ']');
            }            

            //노출
            if(isShow){

                //간편변경 추가
               // var li = $j('<li class="cfmClFloating_new"><a href="#" style="background-image:url(\'https://cfm.kt.com/images/v2/bt/bt_changesimple.png\');" title="새창열림"><span>간편변경<span class="hidetxt">신규메뉴</span></span></a></li>');                
                // var li = $j('<li class="cfmClFloating_new"><a href="#" title="새창열림"><span>납부변경</span></a></li>');                
                // kt_common.linkInfo('common', 'recommend', li.find('a'), {urlInfo:'https://dt.kt.co.kr/fe/chat/bill.do?key=0deae4f4-9cdb-4692-b0fe-c42158dff46b',statInfo:'^KT-개인_공통^퀵메뉴^간편서비스^간편변경'}, '3', 412, 709);
    
                // html.find('ul').append(li);

                // $j(cfmFloatingAreaTarget + '.floating-recommend-list').append(html);
            }
        }
    },

    //최근본메뉴(로그인후) callback
	callBackTargetMenu: function(type, result){
        var html = $j(cfmFloatingAreaTarget + '.floating-recommend-list');
        html.append('<strong class="floating-menu-tit">최근 본 메뉴</strong>'+
                    '<ul><li class="floating-menu-notext">최근 본 메뉴가 없습니다.</li></ul>');

        try {
            if(type === 'success'){            
                if(kt_common.isNull(result.data) != ''){
                    html.find('ul').html('');
    
                    var resultList = result.data.targetGnbMenus;
                    $j.each(resultList, function(i, item){
                        if(i < 4){ //최대4건
                            var li = $j('<li><a href="#"><span>'+ item.gnbMenuNm +'</span></a></li>');
    
                            //아이콘
                            var current = cfmGnbMenuJson.filter(function(element){
                                return element.menuCd == item.menuCd;
                            });                    
                            if(current.length > 0){
                                var path = current[0].path.split(' > ');
                                var img = cfmGnbMenuJson.filter(function(element){
                                    return element.menuCd == path[0]; //1Depth
                                });
    
                                if(img.length > 0){
                                    if(kt_common.isNull(img[0].imgUrl) != ''){
                                        li.find('a').attr('style', 'background-image:url(\''+ img[0].imgUrl +'\');');
                                    }
                                }
                            }
    
                            //메뉴링크
                            kt_common.linkInfo('common', 'targetMenu', li.find('a'), item, item.newWndwType, '500', '500');        
    
                            html.find('ul').append(li);
                        }                    
                    });
                }
            }            
        } catch (e) {
            common_log.log('kt_floating.js callBackTargetMenu() [' + e.message + ']');
        }

    },

    //인기서비스
    popularMenu: function(){      
        var isShow = false;  
        var html = $j(cfmFloatingAreaTarget + '.floating-popular-list');
        html.append('<strong class="floating-menu-tit">인기메뉴</strong>'+
                    '<ul></ul>');

        try {
            $j.each(cfmGnbDirectJson, function(i, item){
                var li = $j('<li><a href="#"><span>'+ item.title +'</span></a></li>');
    
                //아이콘
                if(kt_common.isNull(item.imgPath) != ''){
                    li.find('a').attr('style', 'background-image:url(\''+ cfm_domain + item.imgPath +'\');');
                }
    
                //메뉴링크
                kt_common.linkInfo('common', 'direct', li.find('a'), item, item.floatTrgtType, item.floatPopupWdth, item.floatPopupVrtc);        
    
                html.find('ul').append(li);
    
                isShow = true;
            });
        } catch (e) {
            common_log.log('kt_floating.js popularMenu() [' + e.message + ']');
        }

        //노출
        if(isShow){
            $j(cfmFloatingAreaTarget + '.floating-popular-list').append(html);
        }        
    }
}