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

var kt_api = {
    // screen API
    statsScreen: function(){
        var channelCd = '01';
        kt_common.api({
            'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode +'/stats/screen',
            'type' : 'get',
            'timeout' : 5000, //5초
            'callback' : function(type, result){
                cfmloadScreen = true; //screen API 로드 true

                try {
                    if(type === 'success'){
                        if (kt_adobeLaunch !== 'Y') {
                            kt_common.sendStatis(result, s.pageName); //통계
                        } else {
                            kt_common.sendStatisLaunch(result, adobePageName); //통계
                        }
                        loadFintShopChk = result.data.storeFindYn; //매장찾기
                        loadStsfcSurveyChk = result.data.stsfcSurveyYn;//만족도조사
                        loadServerTime = result.serverTime; //서버시간
                    }                    
                } catch (e) {
                    common_log.log('kt_api.js statsScreen [' + e.message + ']');
                }
            }
        });
    },

    // location - 해당메뉴 검색
    locationMenu: function(){
        var channelCd = '01';
        kt_common.api({
            'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode,
            'type' : 'get',
            'timeout' : 5000, //5초
            'callback' : function(type, result){
                try {
                    if(type === 'success'){
                        cfmGnbAreaHtml.callBackLocationMenu(type, result);
                    }                    
                } catch (e) {
                    common_log.log('kt_api.js locationMenu [' + e.message + ']');
                }
            }
        });
    },
    breadcrumb: function(sParams){
    	var channelCd = '01';
    	kt_common.api({
    		'url' : '/kt/menuinfo/v1.0/channels/'+ channelCd +'/menus/'+ ktMenuCode,
    		'type' : 'get',
    		'timeout' : 5000, //5초
    		'callback' : function(type, result){
    			try {
    				if(type === 'success'){
    					
    					var scriptText = "";
    					scriptText+= '{\n';
    					scriptText+= '"@context" : "https://schema.org",\n';
    					scriptText+= '"@type" : "BreadcrumbList",\n';
    					scriptText+= '	"itemListElement" : [\n';
						scriptText+= '		{\n';
    					scriptText+= '			"@type" : "ListItem",\n';
    					scriptText+= '			"position" : 1,\n';
    					scriptText+= '			"name" : "홈",\n';
    					scriptText+= '			"item" : "https://www.kt.com"\n';
    					scriptText+= '		},';
    		
    					
    					 $j.each(result.data, function(i, item){
                            var positionNum = i+2;
                            var itemSvcUrl = kt_common.isNull(item.svcUrl);
                            if(positionNum > 3 && itemSvcUrl == '' && sParams !== '') {//예시:이벤트상세
                                itemSvcUrl = `https://${window.location.host+window.location.pathname}?${sParams}`;
                            }
                            scriptText+= '		{\n';
                            scriptText+= '			"@type" : "ListItem",\n';
                            scriptText+= '			"position" : '+positionNum+',\n';
                            scriptText+= '			"name" : "'+item.gnbMenuNm+'",\n';
                            scriptText+= '			"item" : "'+itemSvcUrl+'"\n';
                            scriptText+= '		},';
		                });
    					scriptText = scriptText.substring(0,scriptText.length -1);
    					scriptText+= '\n';
    					scriptText+= '	]\n';
        				scriptText+= '}';
        				
        				var breadcrumbScript = document.createElement('script');
        				breadcrumbScript.type = 'application/ld+json';
        				breadcrumbScript.text = scriptText;
        				
    					document.getElementsByTagName('head')[0].prepend(breadcrumbScript);
    					
    				}                    
    			} catch (e) {
    				common_log.log('kt_api.js locationMenu [' + e.message + ']');
    			}
    		}
    	});
    },

    // 사용자 기본정보조회(CTN)
    infosBasic: function(){
        if(gnbInfoName == ''){
            kt_common.api({
                'url' : '/kt/members/v1.0/infos/basic',	
                'cookie' : true,
                'type' : 'get',
                'callback' : function(type, result){
                    try {
                        if(type === 'success'){
                            $j('.mintpointtxt').text(result.data.info.name);
                            gnbInfoName = result.data.info.name; //mKTGlobal.js 선언
                        }                        
                    } catch (e) {
                        common_log.log('kt_api.js infosBasic [' + e.message + ']');
                    }
                }
            });
        }else{
            $j('.mintpointtxt').text(gnbInfoName);
        }
    },

    // 최근본메뉴
    targetMenu: function(){
        kt_common.api({
            'url' : '/kt/targetmenu/v1.0/pc',
            'cookie' : true,
            'type' : 'get',
            'callback' : function(type, result){
                cfmFloatingAreaHtml.callBackTargetMenu(type, result);
            }
        });
    },

    // MOBILE link
    mobileLink: function(code){
        kt_common.callAjax({
            'url' : api_mobile_domain + '/kt/links/v1.0/devices/MOBILE/links/'+code,
            'type' : 'get',
            'timeout' : 5000,
            'callback' : function(type, result){
                kt_common.callbackMobileLinks(type, result);
            }
        });
    },

    // 통합검색-추천검색어-2차
    searchRecommend: function(){
        var areaId = 'A000000053';

        if(kt_common.pageType() == 'shop'){ //Shop
            areaId = 'A000000776';
        }

        kt_common.api({
            'url' : '/kt/screens/v1.0/areas/'+ areaId,
            'type' : 'get',
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchRecommend(type, result);
            }
        });
    },

    // 통합검색-인기검색어-2차
    searchPopkeywords: function(mode){
        var brand = 'OLE';
        var statscode = 'KTC';

        if(mode == undefined) mode = kt_common.pageType();

        if(mode == 'shop'){ //Shop
            brand = 'SHO';
            statscode = 'SHO';
        }

        kt_common.api({
            'url' : '/kt/integratedSearch/v1.0/'+ brand +'/'+ statscode +'/popkeywords',
            'data' : { rows : 10 },
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchPopkeywords(type, result, mode);
            }
        });
    },

    // 통합검색-자동완성-2차
    searchAutowords: function(word){
        var rows = 10;
        var domain = 'OLE';
        var collection = 'OLE_UTIL';

        if(kt_common.pageType() == 'shop'){ //Shop
            domain = 'SHO';
            collection = 'SHO_UTIL';
            rows = 5;
        }

        // word 치환작업
        word = word.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("(", "&#40;").replaceAll(")", "&#41;").replaceAll("'", "&#39;"); 

        kt_common.api({
            'url' : '/kt/integratedSearch/v1.0/'+ domain +'/'+ collection +'/autowords',
            'data' : { 
                word : word,
                rows : rows
            },
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchAutowords(type, result, word);
            }
        });
    },

    // 통합검색-메뉴바로가기(닷컴),기획전(Shop)-2차
    searchwords: function(mode, word){
        var rows = 3;
        var domain = 'OLE';
        var collection = 'OLE_J01';
       
        if(mode == 'shop'){ //Shop(기획전)
            domain = 'SHO';
            collection = 'SHO_E01';
            rows = 1;
        }

        // word 치환작업
        word = word.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("(", "&#40;").replaceAll(")", "&#41;").replaceAll("'", "&#39;"); 

        kt_common.api({
            'url' : '/kt/integratedSearch/v1.0/search/types/'+ domain +'/'+ collection +'/searchwords',
            'data' : { 
                word : word,
                rows : rows 
            },
            'callback' : function(type, result){
                if(mode == 'shop'){
                    cfmSearchAreaHtml.callbackSearchSpecial(type, result, word);
                }else{
                    cfmSearchAreaHtml.callbackSearchwords(type, result, word);
                }
            }
        });
    },

    // 통합검색-연관상품-2차
    searchRelatedProduct: function(word){
        var rows = 3;
        var domain = 'SHO';
        var collection = 'SHO_A00';

        kt_common.api({
            'url' : '/kt/integratedSearch/v1.0/search/types/'+ domain +'/'+ collection +'/relatedProduct',
            'data' : { 
                word : word,
                rows : rows 
            },
            'callback' : function(type, result){
                cfmSearchAreaHtml.callbackSearchRelatedProduct(type, result, word);                
            }
        });
    },

    // GNB Banner
    gnbBanner: function(){
        kt_common.api({
            'url' : '/kt/banners/v1.0/gnbbanner',
            'type' : 'get',
            'callback' : function(type, result){
                cfmGnbAreaHtml.callbackGnbBanner(type, result);
            }
        });
    }, 

    // 이벤트 (메인 카테고리)
    mainEventCate: function(target, areaData) {
        // 이벤트 카테고리 (명칭, class name / KT_EVENT 동일 코드 존재함 세트작업 필요)
        var arrEvtCate = {};
        arrEvtCate['00'] = '기타';
        arrEvtCate['class00'] = 'evnet-etc';

        kt_common.api({
            'url' : '/kt/codes/v1.0/channels/01/cdgroups/evt_svc_ch_type',
            'type' : 'get',
            'callback' : function(type, result){
                try {
                    var resultList = result.data[0].codeDetailList;
                    if(type === 'success'){
                        $j.each(resultList, function(idx, data) {      
                            arrEvtCate[data.dtlCd] = data.dtlCdNm;
                            arrEvtCate["class"+data.dtlCd] = data.dtlCdDesc;
                        });
                    }
                } catch (e) {
                    common_log.log('kt_api.js kt_api.mainEventCate() [' + e.message + ']');
                }

                kt_api.mainEvent(arrEvtCate, target, areaData);
            }
        });	
    },

    // 이벤트(메인)
    mainEvent: function(arrEvtCate, target, areaData){
        var data = {
            limit:6, //글수
            offset:1, //시작글 인덱스
            order:'evtPstngDate:DESC'
        };

        kt_common.api({
            'url' : '/kt/events/v1.0/types/P/sections/ALL',
            'type' : 'get',
            'data' : data,
            'callback' : function(type, result){
                mainAreaHtml.callbackMainEvent(type, result, arrEvtCate, target, areaData);
            }
        });
    },

    // 간편조회 Banner
    simpleBanner: function(){
        kt_common.api({
            'url' : '/kt/screens/v1.0/areas/A000000022',
            'type' : 'get',
            'callback' : function(type, result){
                banner.callbackSimple(type, result);
            }
        });
    },
    
    // Shop(장바구니개수)-2차
    cartCount: function(){
        kt_common.api({
            'url' : '/kt/cart/v1.0/cartCnt',
            'cookie' : true,
            'type' : 'get',
            'callback' : function(type, result){
                try {
                    if(type === 'success'){
                        if(kt_common.isNull(result.data.resultData) != ''){
                            var cfmCartCount = result.data.resultData.cartCnt;
                            cfmGnbAreaHtml.cartHtml(cfmCartCount);
                        }
                    }                    
                } catch (e) {
                    common_log.log('kt_api.js cartCount() [' + e.message + ']');
                }
            }
        });
    },
    
    // 인기상품 (메인 카테고리)
    mainShopHot: function(target, areaData) {
        kt_common.api({
            'url' : '/kt/shop/v1.0/main',
            'type' : 'get',
            'callback' : function(type, result){
                mainAreaHtml.callbackShopHot(type, result, target, areaData);
            }
        });	
    },
}