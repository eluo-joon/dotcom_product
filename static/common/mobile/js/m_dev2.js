document.domain = 'kt.com';

// 내게 맞는 모바일 요금제 찾기 임시 미노출 처리
if(location.pathname == '/mDic/myPriceType.do') {
	location.href = location.origin;
}

// mKTGlobal.js 에서 환경 구분하는 변수 properties 이용하여 설정
var omsOfferDomain = (properties == 'tb' ?  "https://tb.offer.onmas.kt.com" : "https://offer.onmas.kt.com");
var _dl = {};

$(document).ready(function(){
$(".btn-big-red-line-round,.myring").removeAttr('target');
	try{
			Kakao.init('18c956f1625219f72c615b19f3931357');	  
		}catch(e){
	}

});

var mDicProd = {

    // 신청하기 link_type2(신청하기/팝업) 오픈
    wrapApplyPopOpen: function(n) {
        var obj = $('#' + n);
        var ww = 600;
        obj.css({
            'width': (ww + 'px'),
            'display': 'block',
            'top': (($(window).height() / 2) - (obj.outerHeight() / 2)) + 'px',
            'left': (($(window).width() / 2) - (ww / 2)) + 'px'
        });
        return false;
        return false;
    },

	// 상품 관련 링크 버튼별 액션(새창, 팝업, 기타)
    lnkBtn: function(sUrl, sTarget) {
        if (isAppCheck()) {
            document.location.href = sUrl;
        } else {
            if (sTarget == "_blank") {
                window.open(sUrl);
            } else if (sTarget == "_popup") {
                window.open(sUrl);
            } else if (sTarget == "_self") {
                document.location.href = sUrl;
            }
        }
    },
    // 상품안내 POPUP 2019.6.21 추가
    regInfoPop_popup: function(soc_code, item_code){
    	
    	// 상품안내 팝업 정보 가져오기
        $.ajax({
            dataType:"html",
            url: '/mDic/getRegInfoPopAjax.ajax',
            data: {
                "soc_code": soc_code,
                "item_code": item_code
            },
            success: function(data) {
                 $("#preViewPopup").html(data);
				 $("#preViewPopup").css("display","block");
			
        
            }
        });
    },
    // 간편가입 POPUP
    fn_simple_join_popup: function(soc_code, item_code, pro_d) {

        if (typeof(pro_d) == 'undefined') {
            pro_d = 'Y';
        }

        try {
            var strContOllehUrl = loginRealUrl;
            if (strContOllehUrl == "") {
                strContOllehUrl = location.href;
            }
        } catch (e) {
            var strContOllehUrl = location.href;
        }
        strContOllehUrl = strContOllehUrl.split('#')[0];
        strContOllehUrl = escape(strContOllehUrl);
        var s_url_s = strContOllehUrl.substring(0, 5);
        var url_ht_yn = "Y";
        var sUrl = '/mDic/simple/productJoin.do?soc_code=' + soc_code + '&item_code=' + item_code + '&url_code=PDIC01&pro_d=' + pro_d + '&url_ht_yn=' + url_ht_yn;

        if (isAppCheck()) {
            document.location.href = sUrl;
        } else {
            window.open(sUrl);
        }
    },
    // 소상공인 상담신청/팝업 20210818
    bizConReqPopup: function(item_code){
      
      var bUrl = '/mDic/bizConsultingRequest.do?item_code=' + item_code;

      if (isAppCheck()) {
          document.location.href = bUrl;
      } else {
          window.open(bUrl);
      }
    }  
};


var detailClickStatistics = {
    click: function(cate_str1, cate_str2, btn_title) {
        var appendStr = cate_str2 + btn_title;
        KT_trackClicks(cate_str1, appendStr);
    }
};
var prodDetail = {
    nextPreClick: function(itemCode, cateCode, filterCode, optionCode, pageSize){
    	location.href="/mDic/productDetail.do?ItemCode="+itemCode+"&CateCode="+cateCode+"&filter_code="+filterCode+"&option_code="+optionCode+"&pageSize="+pageSize;
    }
};

var indexScript = {
	scrollPaging : false
	,
	// 옵션 클릭
	eventOptionClick : function(v){
		var option_code = $(v).attr('id');
		$('#option_code').val(option_code);

		// 초기화
		$('#pageNo').val(0);
		$('div.prd-list-wrap > ul.js-tree').empty();
		
		indexScript.getOptionItemTotalCountAjax();
	},

	// 필터 클릭
	eventFilterClick : function(){
		
		$('#cateFilterDiv li.tab-title').on('click', function() {
			
			// 초기화
			$('#pageNo').val(0);
			$('.prd-list-wrap>ul').empty();
			$('.prd-list-wrap>.btn-list-more-wrap').hide();
			
			var filter_type = $('#filter_type').val();
			var filter_code = $(this).attr('id');
			$('#filter_code').val(filter_code);
			
			if(filter_type == 'A') { // '필터+옵션' 형 일때 옵션 조회
				
				$.ajax({
					url:'/mDic/getFilterOptionListAjax_v2.ajax',
					dataType:'json',
					data: { 
						'filter_code' : filter_code
					},
					success: function(data) {
						// console.log(data);
						
						if(data != undefined && data != null 
								&& data.hasOwnProperty('filterOptionVoList') && data.filterOptionVoList.length > 0){
							
							var html ="";
							html += '<strong>옵션</strong>';
							html += '<ul aria-label="">';
							$.each(data.filterOptionVoList, function(i, v){
								html += '<li ';
								if(i == 0) html += 'class="active" '; 
								html += 'id="'+v.option_code+'" onClick="indexScript.eventOptionClick(this)">'
								html += '<a href="javascript:void(0);" '
								if(i == 0) html += 'title="선택함"';
								html += ' >'+v.title+'</a></li>';
							})
							html += '</ul>';
							
							// $('#cateOptionDiv').empty();
							$('#cateOptionDiv').html(html);
							$('#cateOptionDiv').css('display','flex');
							$('#option_code').val($('#cateOptionDiv li.active').attr('id'));
						}else{
							$('#cateOptionDiv').empty();
							$('#cateOptionDiv').css('display','none');
							$('#option_code').val('');
						}
						indexScript.getOptionItemTotalCountAjax();
						// console.log('indexScript.getOptionItemTotalCountAjax()
						// A 호출');
					}
				});
			} else {
				$('#option_code').val('');
				indexScript.getOptionItemTotalCountAjax();
				// console.log('indexScript.getOptionItemTotalCountAjax() BCD
				// 호출');
			}
            
		});
		
	},
	
    // 옵션상품 전체 개수 가져오기
    getOptionItemTotalCountAjax: function(callback) {
		var filter_type = $('#filter_type').val();

        var totalCount = 0;
        var filter_code = $('#filter_code').val();
        var option_code = $('#option_code').val();
        
        // 옵션상품 전체 개수 가져오기
        $.ajax({
            dataType: "json",
            url: '/mDic/getOptionItemTotalCountAjax.ajax',
            async : false,
            data: {
                "filter_code": filter_code,
                "option_code": option_code
            },
            success: function(data) {
            	if (data.data.code == '0000') {
                    totalCount = parseInt(data.data.totalCount);
                    // $('div.choice-result-count > strong').text('총 ' +
					// totalCount + '건');
                    if (totalCount <= 0) {
                    	$('.prd-list-wrap>.btn-list-more-wrap').hide();
                    }
                    indexScript.getOptionItemListAjax(totalCount, callback);
                } else {
                    alert(data.data.message);
                }
            }
        });
    },

    // 옵션상품 리스트 가져오기
    getOptionItemListAjax: function(totalCount, callback) {
        var cate_code = $('#cate_code').val();

        var filter_type = $('#filter_type').val();

        var filter_code = $('#filter_code').val();
        var option_code = $('#option_code').val();
        var itemMappType = $('#itemMappType').val(); // 전체보기형 - 상품(I),
														// 하위요금제(S) 구분 정보
        
        var pageNo = parseInt($("#pageNo").val()) + 1;
        var listSize = parseInt($("#listSize").val());

        var subScpnCode = $('#subScpnCode').val();
        var idx = $("#idx").val();

        // 옵션상품 리스트
        $.ajax({
            url: '/mDic/getOptionItemListAjax_v2.ajax',
            dataType: 'html',
            async : false,
            data: {
                "cate_code": cate_code,
                "pageNo": pageNo,
                "listSize": listSize,
                "filter_code": filter_code,
                "option_code": option_code,
                "subScpnCode": subScpnCode,
                "idx": idx
            },
            success: function(data) {
            	// console.log(data);
            	
                $('div.prd-list-wrap > ul.js-tree').append(data);
				/* 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가 */ 
				$('.prd-list-wrap .js-tree-btn-toggle').each(function(){
					if ( $(this).hasClass('active')){
						$(this).attr('aria-expanded','true');
					}else {
						$(this).attr('aria-expanded','false');
					}
				});
				/* // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가 */
                if (totalCount > parseInt(pageNo * listSize)) {
                    $('#pageNo').val(pageNo);
                    $('.prd-list-wrap>.btn-list-more-wrap').show();
                    indexScript.scrollPaging = true;
                } else {
                	$('.prd-list-wrap>.btn-list-more-wrap').hide();
                	indexScript.scrollPaging = false;
                }
                
                if(typeof callback === "function") callback();
                
                
                // 상품리스트 버튼 클릭 시 명칭 변경 처리
            	$('.prd-list-wrap .js-tree-btn-toggle').off('click').on('click', function(e) {
            		
            		// 공통영역 event off //-- 2021-06-21 웹접근성 조치 '닫기' 버튼과 동일한 내용은
					// title 사용하지 않음.
            		core.$body.off('click', '.js-tree .js-tree-btn-toggle');
            		
            		var thSs = $(this).closest('.js-tree-group').hasClass('active');
            		// 리스르를 열 때
            		if (!thSs) {
            			$(this).children('.btn-arrow-more').text('닫기');
            			
            			// -- 2021-06-21 웹접근성 조치 '닫기' 버튼과 동일한 내용은 title 사용하지 않음.
            			$(this).closest('.js-tree-group').addClass('active');
            			$(this).attr('title', '').attr('aria-expanded','true'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
            			$(this).closest('div').siblings('.js-tree-sub').slideDown(400);
            			console.log('test tree open after1');
            			$(this).parent().prev('.js-tree-sub').find('.prd-list').children('div:first-child').find('.title-area strong').attr('tabindex', '0');// 0729test
            			$(this).parent().prev('.js-tree-sub').find('.prd-list').children('div:first-child').find('.title-area strong').focus();// 0728test
            		// 리스트를 닫을 때
            		} else {
            			$(this).children('.btn-arrow-more').text('상품리스트');
            			
            			// -- 2021-06-21 웹접근성 조치 '닫기' 버튼과 동일한 내용은 title 사용하지 않음.
            			$(this).closest('.js-tree-group').removeClass('active');
            			$(this).attr('title', '열기').attr('aria-expanded','false'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
            			$(this).closest('div').siblings('.js-tree-sub').slideUp(400);
            		}
            	});
            }
        });
    },
    
    // 전체보기
    getAllItemListAjax: function(cate_code) {
        // console.log(cate_code);
        
        // 하단 탭바 영역 - 숨김
        cfmLayers('subpopup', 'on');
        
        var pageNo = parseInt($("#pageNo").val()) + 1;
        var listSize = parseInt($("#listSize").val());

        var subScpnCode = $('#subScpnCode').val();
        var idx = $("#idx").val();

        // 옵션상품 리스트
        $.ajax({
            url: '/mDic/getAllItemListAjax.ajax',
            dataType: 'html',
            data: {
                "cate_code": cate_code,
                "pageNo": pageNo,
                "listSize": listSize,
                "subScpnCode": subScpnCode,
                "idx": idx
            },
            success: function(data) {
				/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 수정 */
				var chargeListAllEl = $("#chargeListAll").clone();

				$("#chargeListAll").remove();
				$('body').append(chargeListAllEl.html(data));
				$('#chargeListAll .js-popup-header').focus();
				uiDialog('.ui-dialog', 'N');
				/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 수정 */
            }
        });
        

    },
    // 전체보기 레이어 팝업 닫기
    getAllItemListClose : function(){
		/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */
    	uiDialog('.ui-dialog', 'Y');
		/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */

    	// 하단 탭바 영역 - 노출
    	cfmLayers('subpopup', 'off');
    },
    
    

    // 요금제, 가입일, 부가서비스 정보 조회
    getJoinPriceInfo: function(idx) {
        $('#info-myservice-p').hide(); // 요금제
        $('#info-myservice-s').hide(); // 부가서비스
        // $('#info-myservice-d').hide(); //개통일

        var subScpnCode = $('#subScpnCode').val();
        $.ajax({
            url: '/mDic/getJoinPriceInfoAjax_v2.ajax',
            dataType: 'html',
            data: {
                "subScpnCode": subScpnCode,
                "idx": idx
            },
            success: function(data) {
            	
            	var data = JSON.parse(data);
            	// console.log(data);
            	if(data != undefined && data != null && data.hasOwnProperty('mainPersonalVo')){
            		var subScpnCode = data.mainPersonalVo.subScpnCode;
            		var subScpnName = (subScpnCode=='24'?'요금제':'가입상품');
            		var subScpnVal  = data.mainPersonalVo.usedPlan; 
            		var subDateName = (subScpnCode=='24'?'개통일':'가입일');
            		var subDateVal  = data.mainPersonalVo.openDate;
            		var subService  = data.mainPersonalVo.delegateUsedExService;
            		var usedExService  = data.mainPersonalVo.usedExService
            		
            		// 요금제
            		$('#info-myservice-p').find('.title').html(subScpnName);
                	$('#info-myservice-p').find('strong').html(subScpnVal);
                	// 개통일
                	if(subDateVal != undefined && subDateVal != ''){
                		$('#info-myservice-p').find('.date').html("(개통일: "+subDateVal+")");
                	}
                	
                	// 부가서비스
                	if( $.trim(subService) == "" || subService == "없음"){
                		$('#info-myservice-s').find('.user-select').find('span').empty();
                		$('#info-myservice-s').find('.user-select').append('<span>없음</span>');
                		$('#info-myservice-s').find('.ui-tooltip').hide();
                	}else{
                		$('#info-myservice-s').find('.user-select').find('span').empty();
                		$('#info-myservice-s').find('.ui-tooltip').show();
                		$('#info-myservice-s').find('#selectExService').html(subService);
                	}
                	
                	var html = "";
                	$.each(usedExService, function(i,v){
                		html += "<li>"+v+"</li>";
                	});
                	$('#info-myservice-s').find('.tt-content>ul').html(html);
                	                	               	
                	$('#info-myservice-p').show();
                	$('#info-myservice-s').show();
            	}
            	
            	// 회선 변경일경우 UI 정리
            	if ($(".prd-login-wrap").children().length > 1) {
					$(".prd-login-wrap").children().last().remove();
				}
            	
            	// 가입 상품 구분
            	var zoneCode = "";
            	var name = "";
            	// 카테고리 코드
            	var cateCode = $('#cate_code').val();
            	
            	if (subScpnCode == "24") {
            		zoneCode = "OFFERAREA176";
            		name = "모바일";
				} else if (subScpnCode == "09") {
					zoneCode = "OFFERAREA177";
					name = "인터넷";
				} else if (subScpnCode == "19") {
					zoneCode = "OFFERAREA178";
					name = "TV";
				}
            	
               // 가입된 상품이 있을경우 및 요금제 카테고리 일경우만 호출 (모바일, 인터넷, TV)
               if (zoneCode != "" && (cateCode == '6041' || cateCode == '6044' || cateCode == '6008')) {
            	   // OMS 배너 호출 요청 (영역코드, 콜백함수)
            	   indexScript.getBanner(zoneCode, function(flag, result){
            		   if (flag == "success" && result.returnCode == "OK") {
            			   var resultData = result.data;
            			   
            			   // 클릭 이벤트 추가 및 html 반영
            			   var html = $j(resultData.html);
            			   html.find('a').on('click', function (e) {
            				   trgt.campaignClickLog(resultData.caVal1, resultData.caVal2, resultData.caVal3, 'CL', '^m^KT-개인_상품서비스_' + name + '_요금제리스트^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
            				   KT_trackClicks(s.pageName, '^m^KT-개인_상품서비스_' + name + '_요금제리스트^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
            			   });
            			   $j(html).insertAfter(".prd-login");
            			   
            			   // 노출통계
            			   var nTime = mKt_common.dateFormat('YYYYMMDDHHmm');       
            			   if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt){
            				   trgt.campaignViewLog(resultData.caVal1, resultData.caVal2, resultData.caVal3);
            				   // KT_trackClicks(s.pageName, '^m^KT-개인_상품서비스_' + name + '_요금제리스트^맞춤메뉴^타겟오퍼' + resultData.statCd + '^노출'); // 20230914 adobe통계 사용량 증가에 따른 'PSM 배너 노출' 수집 중단
            			   }
            			   
            		   } else if (flag == "error") {}
            	   });
               }
            	
                // TODO : 추천상품 조회 현재 없는 UI
                // indexScript.getRecommItemInfo(idx);
            },
			complete : function() {
				$('.tt-close').find('.hidetxt').html("닫기");
		    }
        });
    },

    // 추천 상품 조회
    getRecommItemInfo: function(idx) {
        $('.recommend-product').hide();

        var subScpnCode = $('#subScpnCode').val();

        $.ajax({
            url: '/mDic/getRecommItemInfoAjax.ajax',
            dataType: 'html',
            data: {
                "subScpnCode": subScpnCode,
                "idx": idx,
                "cate_code": $('#cate_code').val()
            },
            success: function(data) {
                $('.recommend-product').empty();
                $('.recommend-product').html(data);

            }
        });
    },

    // 간편가입 팝업open
    /*
	 * openSimpleJoin: function() {
	 * mDicProd.lnkBtn('/mDic/simple/productJoinEvent.do', '_popup'); }
	 */
    
	// OMS 배너 호출 요청
	// zoneCode : 영역 코드
	getBanner : function(zoneCode ,callbackFn){
		var dataObj = {
				zoneCode : zoneCode
		};
		
        $j.ajax({
        	url : omsOfferDomain + '/offer/v1.0/common/getBanner',
        	type : "post",
        	data : dataObj,
            dataType: "json",
            timeout : 10000,
            xhrFields : { withCredentials : true },
			cache : false,
			crossDomain : true,
            cookie : true,
            success: function(data) {
            	callbackFn("success", data);
            },
			error : function(request, status, error){
				callbackFn("error", error);
			}
        });
	},
	
	getBannerClick : function(resultData){
		if (resultData != null) {
			trgt.campaignClickLog(resultData.caVal1, resultData.caVal2, resultData.caVal3, 'CL', '^m^KT-개인_상품서비스_모바일_요금제리스트^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
            KT_trackClicks(s.pageName, '^m^KT-개인_상품서비스_모바일_요금제리스트^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
		}
	},
};



var sns = {
		gokakao: function(item_code,item_name){

		var weburl ="https://product.kt.com/wDic/productDetail.do?ItemCode="+item_code;
		var mobileAppUrl ="https://product.kt.com/mDic/productAppGo.do?ItemCode="+item_code;
		var mobileUrl ="https://product.kt.com/mDic/productDetail.do?ItemCode="+item_code;
		var title = item_name;
		var pTitle = title.replace('<br />','');
		
        Kakao.Link.sendDefault({  // createDefault : 이벤트함수,
									// createDefaultButton : 버튼생성함수
									objectType: 'feed',
									  installTalk:true,									  
									  content:{
                                                 title: pTitle,
                                                 description: '',
												 imageUrl:'https://product.kt.com/static/common/mobile/img/prodetail/sns/KT_SNS_Banner.jpg',
												 imageWidth : 800,
												 imageHeight: 400,
												link:{
                                                       mobileWebUrl: mobileUrl,
													   webUrl: weburl
                                                      }
                                                },
                                       buttons:[
												 {
                                                   title: '마이 케이티 앱으로 열기',
                                                    link: {
													        mobileWebUrl: mobileAppUrl,
															webUrl:weburl
														   }
                                                  }
                                                ]
                                        });
	
	},
	
    // 페이스북 연동
    goFaceBook: function(msg, url) {
	 
		if(!isAppCheck()){
        var href = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent(msg);
        var fb = window.open(href, 'facebook', '');
        if (fb) {
            fb.focus();
        }
		}else{
			doKtcsNativeIf({ifName : 'executeExternalApp', ifData : JSON.stringify({mimeType : "text/html", url :"http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent(msg)})});
		}
	
	},
    // 트위터 연동
    goTwitter: function(msg, url) {
       
	   if(!isAppCheck()){
		var href = "http://twitter.com/share?text=" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(url);
        var twt = window.open(href, 'twitter', '');
        if (twt) {
            twt.focus();
		 }
        }else{
			doKtcsNativeIf({ifName : 'executeExternalApp', ifData : JSON.stringify({mimeType : "text/html", url :"http://twitter.com/share?text=" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(url)})});
		}
	  },
	  
    // 라인 연동
    goLine: function(msg, url) {
	 if(!isAppCheck()){
    	// var href = "http://line.me/R/msg/text/?" + encodeURIComponent(msg) +
		// "&url=" + encodeURIComponent(url);
		var href = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
		var line = window.open(href, 'line', '');
        if (line) {
        	line.focus();
        }
	 }else{
	 	   doKtcsNativeIf({ifName : 'executeExternalApp', ifData : JSON.stringify({mimeType : "text/html", url :"https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url)})});
		}
	}
};


function doKtcsNativeIf(param) {

	var agent = navigator.userAgent.toLowerCase();
	var isIOS = (agent.indexOf("iphone")>-1||agent.indexOf("ipad")>-1||agent.indexOf("ipod")>-1);
	var isAndroid = (agent.match('android') != null);
	var ifName = param.ifName;
	var ifDataJsonString = param.ifData;
	 
	try{
		if (isAndroid) { // AND
			if (ifDataJsonString != null) {
				eval("window.ktCsNative." + ifName + "('" + ifDataJsonString + "');");
			}else{
				eval("window.ktCsNative." + ifName + "();");
			}
		}else if(isIOS) { // IOS
			if(ifDataJsonString != null) {
				eval("window.webkit.messageHandlers." + ifName + ".postMessage" + "('" + ifDataJsonString + "');");
			}else{
				ifDataJsonString = JSON.stringify({viewYn : 'Y'});
				eval("window.webkit.messageHandlers." + ifName + ".postMessage" + "('" + ifDataJsonString + "');");
			}
		}
	}catch(e){

	}
}



var shopMyPriceType = {
	initialize: function() {
		$(function() {
			// 초기화
		    $('.main-btns').on('click', '#is-line-red', function() {
				$('.drag-area').attr('tabindex','0');// 0321

		        var $inputRange = $('.setup input[type="range"]');
		        value = 0;
		        $inputRange.val(value).change();

		        $('.setup input[type="range"]').val(11);

		        $('#element_data input[type="range"]').val(0);
		        $('#element_voice input[type="range"]').val(0);
		        $('.element').eq(0).find('.result em').text(12);
		        $('.element').eq(0).find('.result span').text('세 미만');
		        $('.element').eq(1).find('.result em').text(0);
		        $('.element').eq(2).find('.result em').text(0);

		        // List
		        $('.fare-list-area').hide();
				$('.drag-area').focus();// 0321
		    });

			// 조회하기
		    $('.main-btns').on('click', '#is-red', function() {
		    	// $(".check-result").attr('tabindex','0');//0321 // 20181008 :
				// jsp 에서 지정하는것으로 업무 변경
		        var dataObj = {
		            age: Number($('.setup input[type="range"]').val()),
		            datas: Number($('#element_data input[type="range"]').val()),
		            voice: Number($('#element_voice input[type="range"]').val()),
		            selectView : $('#selectView').val()
		        }
		        $.ajax({
		            url: "/mDic/shop/myPriceType/list.ajax",
		            type: "post",
		            timeout: 10000,
		            data: dataObj,
		            success: function(rv) {
		                $(".check-result").html(rv);
		            },
                    complete: function() {
                        $(".check-result").focus();
                    }
		        });

		        $('.fare-list-area').show();
		        // $(".check-result").focus();//0321
				document.documentElement.scrollTop = 867;// 0321
		    });
		});
	}
};

var myPriceType = {
    initialize: function(bgData) {
    	$(function() {
	        var data = bgData.data_average;
			var monthPrice = bgData.monthPrice;
			var fgArraycheck = bgData.fgArraycheck;
			
			// lnput, labal 초기화
			$(".charge-wrap").find(".input").removeAttr('title');
			$(".charge-wrap").find(".input").prop("checked",false);
			$(".charge-wrap").find(".input").removeAttr('checked');

			$(".charge-wrap").find(".input").removeAttr("disabled");  // 230216 disabled 초점 결함 건
			$(".charge-wrap").find(".input").removeAttr("readonly").removeClass('disa');
			
			// 3개월 기본 선택
			$('#average_use').prop('title', '선택됨');
			$('#average_use').prop("checked",true);
			
			if(fgArraycheck == "5G" ){
				$("#5gDiv").css("display","block");
				$("#lteDiv").css("display","none");
				
				$("#fg-use").prop('title', '선택됨');
				$('#fg-use').prop("checked",true);
				
				if(data > 9){
					$("#fg-fixed2").prop('title', '선택됨');
					$("#fg-fixed2").prop("checked",true);
				}else{
					$("#fg-fixed1").prop('title', '선택됨');
					$("#fg-fixed1").prop("checked",true);
				}
				
				if( monthPrice == 11){
					$("#fg-price3").prop('title', '선택됨');
					$("#fg-price3").prop("checked",true);
					
					$('#fg-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}else if(monthPrice == 5){
					$("#fg-price1").prop('title', '선택됨');
					$("#fg-price1").prop("checked",true);
					
					$('#fg-benefit1').prop("readonly",false).removeClass('disa').removeAttr("disabled"); // 230216 disabled 초점 결함 건
					
					$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#fg-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#fg-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#fg-benefit6').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}else{
					$("#fg-price2").prop('title', '선택됨');
					$("#fg-price2").prop("checked",true);
					
					$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}
			
			} else if (fgArraycheck == "LTE"){
				$("#5gDiv").css("display","none");
				$("#lteDiv").css("display","block");
				
				$("#lte-use").prop('title', '선택됨');
				$('#lte-use').prop("checked",true);
				
				
				if(data < 3){
					$("#lte-fixed1").prop('title', '선택됨');
					$("#lte-fixed1").prop("checked",true);
					
				}else if (data < 7){
					$("#lte-fixed2").prop('title', '선택됨');
					$("#lte-fixed2").prop("checked",true);
					
				}else{
					$("#lte-fixed3").prop('title', '선택됨');
					$("#lte-fixed3").prop("checked",true);
					
				}
				
				if( monthPrice == 8){
					$("#lte-price3").prop('title', '선택됨');
					$("#lte-price3").prop("checked",true);
					
					$('#lte-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}else if(monthPrice == 5){
					$("#lte-price2").prop('title', '선택됨');
					$("#lte-price2").prop("checked",true);
					
					$('#lte-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#lte-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
					$('#lte-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}else{
					$("#lte-price1").prop('title', '선택됨');
					$("#lte-price1").prop("checked",true);
					
					$('input[name="lte-benefit"]').prop("readonly",true).prop('disabled',true); // 230216 disabled 초점 결함 건
					
				}
				
			}else {
				// 미 로그인 시 초기 화면
				$("#5gDiv").css("display","block");
				$("#lteDiv").css("display","none");
				
				$("#fg-use").prop('title', '선택됨');
				$('#fg-use').prop("checked",true);
				
			}
	
	          // 초기화
			$('#blRefresh').on('click',function() {
				
				/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품_V.0.2 2021-11-26 수정 */
				var kind_use = $('input[name="kind-use"]:checked').val(),
					threem_use = $('input[name="3m_use"]:checked').val();
				/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품_V.0.2 2021-11-26 수정 */
				
				// 검색 영역 초기화
				$('#searchDiv').html("");
				
				// 5G, LTE 영역 lnput, labal 초기화
				$("#5gDiv,#lteDiv").find(".input").removeAttr('title');
				$("#5gDiv,#lteDiv").find(".input").prop("checked",false);
				$("#5gDiv,#lteDiv").find(".input").removeAttr('checked');
				

				$("#5gDiv,#lteDiv").find(".input").removeAttr("disabled"); // 230216 disabled 초점 결함 건
				$("#5gDiv,#lteDiv").find(".input").removeAttr("readonly").removeClass('disa');
				

				/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품_V.0.2 2021-11-26 수정 */
				if(mkt.isLoginStatus() == 'Y') {
					threem_use == '3mAverage' ? $("#average_use").focus() : $("#max_use").focus();
				} else {
					kind_use == "5G" ? $("#fg-use").focus() : $("#lte-use").focus();
				}
				/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품_V.0.2 2021-11-26 수정 */
			});
	
			// 조회하기
			$('#blSearch').on('click',function(e) {
	            
				var kind_use = $('input[name="kind-use"]:checked').val();
				if(kind_use == "5G"){
			
					var benefits = "";
					var age = "";
					var fg_data_use = $('input[name="fg-data-use"]:checked').val();
					var fg_price = $('input[name="fg-price"]:checked').val();
					var fg_benefit1 = $('input[id="fg-benefit1"]:checked').val();
					if(fg_benefit1 == undefined){fg_benefit1 = "";};
					var fg_benefit2 = $('input[id="fg-benefit2"]:checked').val();
					if(fg_benefit2 == undefined){fg_benefit2 = "";};
					var	fg_benefit3 = $('input[id="fg-benefit3"]:checked').val();
					if(fg_benefit3 == undefined){fg_benefit3 = "";};
					var fg_benefit4 = $('input[id="fg-benefit4"]:checked').val();
					if(fg_benefit4 == undefined){fg_benefit4 = "";};
					var fg_benefit5 = $('input[id="fg-benefit5"]:checked').val();
					if(fg_benefit5 == undefined){fg_benefit5 = "";};
					var fg_benefit6 = $('input[id="fg-benefit6"]:checked').val();
					if(fg_benefit6 == undefined){fg_benefit6 = "";};
					var fg_benefit7 = $('input[id="fg-benefit7"]:checked').val();
					if(fg_benefit7 == undefined){fg_benefit7 = "";};
					var fg_benefit8 = $('input[id="fg-benefit8"]:checked').val();
					if(fg_benefit8 == undefined){fg_benefit8 = "";};
					var fg_benefit9 = $('input[id="fg-benefit9"]:checked').val();
					if(fg_benefit9 == undefined){fg_benefit9 = "";};
					var fg_benefit10 = $('input[id="fg-benefit10"]:checked').val();
					if(fg_benefit10 == undefined){fg_benefit10 = "";};
	
					// 선택 없음 처리
					if($("input[name='fg-benefit']:checked").length == 0){
						fg_benefit1 = 'N', fg_benefit2  = 'N';
						fg_benefit3 = 'N', fg_benefit4  = 'N';
						fg_benefit5 = 'N', fg_benefit6  = 'N';
						fg_benefit7 = 'N', fg_benefit8  = 'N';
						fg_benefit9 = 'N', fg_benefit10 = 'N';
					}
					
					if(fg_data_use == undefined || fg_data_use == "" ){
						alert("데이터 이용량을 선택해주세요.");
						$("#fg-fixed1").focus();
						return;
					}
					if(fg_price == undefined || fg_price == ""){
						alert("월 요금을 선택해주세요.");
						$("#fg-price1").focus();
						return;
					}
						
					if(kind_use = "5G"){
						age ='0';
					}
	
					var dataObj = {
						kind : kind_use
						,datas : fg_data_use
						,age   : age
						,price : fg_price
						,benefits1 : fg_benefit1
						,benefits2 : fg_benefit2
						,benefits3 : fg_benefit3
						,benefits4 : fg_benefit4
						,benefits5 : fg_benefit5
						,benefits6 : fg_benefit6
						,benefits7 : fg_benefit7
						,benefits8 : fg_benefit8
						,benefits9 : fg_benefit9
						,benefits10 : fg_benefit10
						,ppCode : $('#ppCode').val()
					}	
				
				}else if (kind_use == "LTE"){
					var benefits = "";
					var age = $('input[name="lte-age"]:checked').val();
					var datas =  $('input[name="lte-fixed"]:checked').val();
					var price = $('input[name="lte-price"]:checked').val();
					
					var lte_benefit1 = $('input[id="lte-benefit1"]:checked').val();
					if(lte_benefit1 == undefined){lte_benefit1 = "";};
					var lte_benefit2 = $('input[id="lte-benefit2"]:checked').val();
					if(lte_benefit2 == undefined){lte_benefit2 = "";};
					var	lte_benefit3 = $('input[id="lte-benefit3"]:checked').val();
					if(lte_benefit3 == undefined){lte_benefit3 = "";};
					var lte_benefit4 = $('input[id="lte-benefit4"]:checked').val();
					if(lte_benefit4 == undefined){lte_benefit4 = "";};
					var lte_benefit5 = $('input[id="lte-benefit5"]:checked').val();
					if(lte_benefit5 == undefined){lte_benefit5 = "";};
					
					// 선택 없음 처리
					if($("input[name='lte-benefit']:checked").length == 0){
						lte_benefit1 = 'N';
						lte_benefit2 = 'N';
						lte_benefit3 = 'N';
						lte_benefit4 = 'N';
						lte_benefit5 = 'N';
					}
							
					if(age == undefined || age == "" ){
						alert("연령대를 선택해주세요.");
						$("#lte-age1").focus();
						return;
					}
					if(datas == undefined || datas == "" ){
						alert("데이터 이용량을 선택해주세요.");
						$("#lte-fixed1").focus();
						return;
					}
							
					if(price == undefined || price == ""){
						alert("월 요금을 선택해주세요.");
						$("#lte-price1").focus();
						return;
					}
					
					var dataObj = {
						kind : kind_use
						,datas : datas
						,age   : age
						,price : price
						,benefits1 : lte_benefit1
						,benefits2 : lte_benefit2
						,benefits3 : lte_benefit3
						,benefits4 : lte_benefit4
						,benefits5 : lte_benefit5
						,ppCode : $('#ppCode').val()
					}
					
				}
				//추천요금제 영역 초기화
				$(".check-result").html('');
	          
	            $.ajax({
	                url: $("#pageConId").val() + "/myPriceType/list.ajax",
	                type: "post",
	                timeout: 10000,
	                data: dataObj,
	                success: function(rv) {
	                    $(".check-result").html(rv);
						$(".btn-red").removeAttr('target');
						
						// 툴팁 스크립트 추가
						$('.tooltip-area > button').on('click', function(){
							
							if ($(this).parent().find('.tooltip').hasClass('active')) {
								$(this).parent().find('.tooltip').removeClass('active');
								$(this).attr('title', '툴팁 닫힘');
							}
							else{
								$(this).parent().find('.tooltip').addClass('active').attr('tabindex', '-1').focus();
								$(this).attr('title', '툴팁 열림');
							}
						});
						/* 230216 툴팁 닫기 추가 */
						/*$('.tooltip').on('mouseout blur', function(){
							$(this).removeClass('active');
							$(this).prev('button').focus().attr('title', '툴팁 닫힘');
						}); */
						$('.tooltip-close').on('click',  function(){
							$(this).parent().removeClass('active');
							$(this).parent().prev('button').focus().attr('title', '툴팁 닫힘');
						});
						/* // 230216 툴팁 닫기 추가 */
						// // 툴팁 스크립트 추가
					},error:function() {
	    				//얼럿문구
	                	alert('일시적으로 연결이 지연되고 있습니다.\n새로고침 후 다시 시도해 주세요.');
	                },complete: function() {
	                	// $(".check-result").focus();//0321
						// $(".btn-charge-center")[0].scrollIntoView();
						var top = $(".btn-charge-center").offset().top;
						$('body, html').scrollTop(top-69);
						
						e.preventDefault(); 
	                }
	            });
	
	            $('.fare-list-area').show();
	            
	        	document.documentElement.scrollTop = 867;// 0321
			});
	
	        // 3개월 사용량 체크
	        $('#average_use').click(function(e) {
				var data = $('#data_average').val();
				var fgArraycheck = $('#fgArraycheck').val();
				var monthPrice = $('#monthPrice').val();
				
				// 5G, LTE 영역 lnput, labal 초기화
				$("#5gDiv,#lteDiv").find(".input").removeAttr('title');
				$("#5gDiv,#lteDiv").find(".input").prop("checked",false);
				$("#5gDiv,#lteDiv").find(".input").removeAttr('checked');

				$("#5gDiv,#lteDiv").find(".input").removeAttr("disabled"); // 230216 disabled 초점 결함 건
				$("#5gDiv,#lteDiv").find(".input").removeAttr("readonly").removeClass('disa');
				
				if(fgArraycheck == '5G'){
					$("#5gDiv").css("display","block");
					$("#lteDiv").css("display","none");
					
					$("#fg-use").prop('title', '선택됨');
					$("#fg-use").prop("checked",true);
					
					if(data > 9){
						$("#fg-fixed2").prop('title', '선택됨');
						$("#fg-fixed2").prop("checked",true);
					}else{
						$("#fg-fixed1").prop('title', '선택됨');
						$("#fg-fixed1").prop("checked",true);
					}
					
					if( monthPrice == 11){
						$("#fg-price3").prop('title', '선택됨');
						$("#fg-price3").prop("checked",true);
						
						$('#fg-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit7').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit9').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else if(monthPrice == 5){
						$("#fg-price1").prop('title', '선택됨');
						$("#fg-price1").prop("checked",true);
						
						$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					
						$('#fg-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit6').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit8').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit9').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else{
						$("#fg-price2").prop('title', '선택됨');
						$("#fg-price2").prop("checked",true);
						
						$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						$('#fg-benefit8').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					}
					
				} else if(fgArraycheck == 'LTE'){
					$("#5gDiv").css("display","none");
					$("#lteDiv").css("display","block");
					
					$("#lte-use").prop('title', '선택됨');
					$("#lte-use").prop("checked",true);
					
					if(data < 3){
						$("#lte-fixed1").prop('title', '선택됨');
						$("#lte-fixed1").prop("checked",true);
					}else if (data < 7){
						$("#lte-fixed2").prop('title', '선택됨');
						$("#lte-fixed2").prop("checked",true);
					}else{
						$("#lte-fixed3").prop('title', '선택됨');
						$("#lte-fixed3").prop("checked",true);
					}
				
					//if(monthPrice == ""){
					//}else
						if( monthPrice == 8){
						$("#lte-price3").prop('title', '선택됨');
						$("#lte-price3").prop("checked",true);
						
						$('#lte-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					}else if(monthPrice == 5){
						$("#lte-price2").prop('title', '선택됨');
						$("#lte-price2").prop("checked",true);
						
						$('#lte-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#lte-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#lte-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else{
						$("#lte-price1").prop('title', '선택됨');
						$("#lte-price1").prop("checked",true);
						
						$('input[name="lte-benefit"]').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					}
					
				}
	        });
	
	        $('#max_use').click(function(e) {
	        	var data = $('#data_max').val();
				var fgArraycheck = $('#fgArraycheck').val();
				var monthPrice = $('#monthPrice').val();
				
				// 5G, LTE 영역 lnput, labal 초기화
				$("#5gDiv,#lteDiv").find(".input").removeAttr('title');
				$("#5gDiv,#lteDiv").find(".input").prop("checked",false);
				$("#5gDiv,#lteDiv").find(".input").removeAttr('checked');

				$("#5gDiv,#lteDiv").find(".input").removeAttr("disabled"); // 230216 disabled 초점 결함 건
				$("#5gDiv,#lteDiv").find(".input").removeAttr("readonly").removeClass('disa');
				
				if(fgArraycheck == '5G'){
					$("#5gDiv").css("display","block");
					$("#lteDiv").css("display","none");
					
					$("#fg-use").prop('title', '선택됨');
					$("#fg-use").prop("checked",true);
					
					if(data > 9){
						$("#fg-fixed2").prop('title', '선택됨');
						$("#fg-fixed2").prop("checked",true);
					}else{
						$("#fg-fixed1").prop('title', '선택됨');
						$("#fg-fixed1").prop("checked",true);
					}
				
					if( monthPrice == 11){
						$("#fg-price3").prop('title', '선택됨');
						$("#fg-price3").prop("checked",true);
						
						$('#fg-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건

					}else if(monthPrice == 5){
						$("#fg-price1").prop('title', '선택됨');
						$("#fg-price1").prop("checked",true);
						
						$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#fg-benefit6').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else{
						$("#fg-price2").prop('title', '선택됨');
						$("#fg-price2").prop("checked",true);
						
						$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
					}
				
				}else if(fgArraycheck == 'LTE'){	
					$("#5gDiv").css("display","none");
					$("#lteDiv").css("display","block");
					
					$("#lte-use").prop('title', '선택됨');
					$("#lte-use").prop("checked",true);
					
				
					if(data < 3){
						$("#lte-fixed1").prop('title', '선택됨');
						$("#lte-fixed1").prop("checked",true);
						
					}else if (data < 7){
						$("#lte-fixed2").prop('title', '선택됨');
						$("#lte-fixed2").prop("checked",true);
						
					}else{
						$("#lte-fixed3").prop('title', '선택됨');
						$("#lte-fixed3").prop("checked",true);
						
					}
	
					//if(monthPrice == ""){
					//}else 
						if( monthPrice == 8){
						$("#lte-price3").prop('title', '선택됨');
						$("#lte-price3").prop("checked",true);
						
						$('#lte-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else if(monthPrice == 5){
						$("#lte-price2").prop('title', '선택됨');
						$("#lte-price2").prop("checked",true);
						
						$('#lte-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#lte-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
						$('#lte-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}else{
						$("#lte-price1").prop('title', '선택됨');
						$("#lte-price1").prop("checked",true);
						
						$('input[name="lte-benefit"]').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
						
					}
				}
	        });
	
	    });
	},
    goUser: function(idx) {
        // 유저 아이디 정보 가져오기
        $.ajax({
            url: $("#pageConId").val() + "/newThreeMonthDataTelAverageMaxInfo.ajax",
            type: "post",
            data: { "idx": idx },
            timeout: 10000,
            success: function(rv) {
                var inputData = rv.data;
                if (inputData.resultCode == "0000") {

					var fgArraycheck = inputData.fgArraycheck;
					var data = inputData.user.data_average;
					var monthPrice = inputData.monthPrice;
						
				    $('#monthPrice').val(inputData.monthPrice);
					$('#fgArraycheck').val(inputData.fgArraycheck);
					$('#data_average').val(inputData.user.data_average);
					$('#data_max').val(inputData.user.data_max);

                    $("#delegateNumber").text(inputData.userName);
                    $('#my-date-tit').text(inputData.ppName);
                    $('#ppCode').val(inputData.ppCode);
 
        			// lnput, labal 초기화
        			$(".charge-wrap").find(".input").removeAttr('title');
        			$(".charge-wrap").find(".input").prop("checked",false);
        			$(".charge-wrap").find(".input").removeAttr('checked');

        			$(".charge-wrap").find(".input").removeAttr("disabled"); // 230216 disabled 초점 결함 건
        			$(".charge-wrap").find(".input").removeAttr("readonly").removeClass('disa');
        			
        			// 3개월 기본 선택
        			$('#average_use').prop('title', '선택됨');
        			$('#average_use').attr("aria-checked", true);
        			
        			if(fgArraycheck == "5G" ){
        				$("#5gDiv").css("display","block");
        				$("#lteDiv").css("display","none");
        				
        				$("#fg-use").prop('title', '선택됨');
        				$('#fg-use').prop("checked",true);
        				
        				if(data > 9){
        					$("#fg-fixed2").prop('title', '선택됨');
        					$("#fg-fixed2").prop("checked",true);
        					
        				}else{
        					$("#fg-fixed1").prop('title', '선택됨');
        					$("#fg-fixed1").prop("checked",true);
        					
        				}
        				
        				if( monthPrice == 11){
        					$("#fg-price3").prop('title', '선택됨');
        					$("#fg-price3").prop("checked",true);
        					
        					
        					$('#fg-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        				}else if(monthPrice == 5){
        					$("#fg-price1").prop('title', '선택됨');
        					$("#fg-price1").prop("checked",true);
        					
        					$('#fg-benefit1').prop("readonly",false).removeClass('disa').removeAttr("disabled"); // 230216 disabled 초점 결함 건;
        					
        					$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#fg-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#fg-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#fg-benefit5').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#fg-benefit6').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        	
        				}else{
        					$("#fg-price2").prop('title', '선택됨');
        					$("#fg-price2").prop("checked",true);
        					
        					$('#fg-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        				}
        			
        			} else if (fgArraycheck == "LTE"){
        				$("#5gDiv").css("display","none");
        				$("#lteDiv").css("display","block");
        				
        				$("#lte-use").prop('title', '선택됨');
        				$('#lte-use').prop("checked",true);
        				
        				
        				if(data < 3){
        					$("#lte-fixed1").prop('title', '선택됨');
        					$("#lte-fixed1").prop("checked",true);
        					
        				}else if (data < 7){
        					$("#lte-fixed2").prop('title', '선택됨');
        					$("#lte-fixed2").prop("checked",true);
        					
        				}else{
        					$("#lte-fixed3").prop('title', '선택됨');
        					$("#lte-fixed3").prop("checked",true);
        					
        				}
        				
        				if( monthPrice == 8){
        					$("#lte-price3").prop('title', '선택됨');
        					$("#lte-price3").prop("checked",true);
        					
        					$('#lte-benefit1').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        				}else if(monthPrice == 5){
        					$("#lte-price2").prop('title', '선택됨');
        					$("#lte-price2").prop("checked",true);
        					
        					$('#lte-benefit2').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#lte-benefit3').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        					$('#lte-benefit4').prop("readonly",true).addClass('disa').prop('disabled',true); // 230216 disabled 초점 결함 건
        					
        				}else{
        					$("#lte-price1").prop('title', '선택됨');
        					$("#lte-price1").prop("checked",true);
        					
        				}
        				
        			}
					
                    $('.box-number').removeClass("on");

                    $(".check-result").empty();

					$('#delegateNumber').focus();
                } else if (inputData.resultCode == "9998") {
                    alert("로그인후 다시 이용해주세요.");
                    return;
                } else {
                    alert("데이터 정보 조회에 실패 하였습니다. 다시 시도해 주세요.");
                    return;
                }
            }
        });
        
        $(".tt-close").click();
    }
};

var mobileDCProgram = {
    initialize: function(bgData) {
        $(function() {
            $(".service-title ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");
        });
    }
};


var newRegLimitProgram = {
	scrollPaging : false,
    initialize: function(utilCode, codeObj, bgData) {

        var mobileCatecode = codeObj.mobileCatecode;
        var internetCatecode = codeObj.internetCatecode;
        var serviceCatecode = codeObj.serviceCatecode;

		/**
		 * 카테고리 초기 세팅
		 */
		var changeCateCode = $("#hiddenCataCode").val();
			
		if(changeCateCode !=''){
			$("#hiddenCataCode").val(changeCateCode);
			newRegLimitProgram.getNewRegLimitProductList(utilCode, changeCateCode);
		}else{
	        // 카테고리 초기 세팅
	        $("#hiddenCataCode").val(mobileCatecode);
			$("#title_menu1").addClass("active");
	        newRegLimitProgram.getNewRegLimitProductList(utilCode, mobileCatecode);
		}
		
		// 더보기
        $("#btn_more").css('cursor', 'pointer');
        $("#btn_more").click(function() {
			var returnpageNum = $("#pageNum").val();
			$("#pageNum").val(Number(returnpageNum) + 1);
			$("#flag").val('');
            newRegLimitProgram.getNewRegLimitProductList(utilCode, $("#hiddenCataCode").val());
        });
        
        // 스크롤 페이징
    	$(window).scroll(function(){
    	    // console.log('scroll');
    	    // console.log( $(window).scrollTop() + '>=' + (
			// $('.mobile-product-list').height() - $(window).height()) );
    	    if($(window).scrollTop() >= ( $('.mobile-product-list').height() - $(window).height() ) ){
    	        if(newRegLimitProgram.scrollPaging){
    	        	// console.log('paging ..');
    	        	newRegLimitProgram.scrollPaging = false;
    	        	var returnpageNum = $("#pageNum").val();
    				$("#pageNum").val(Number(returnpageNum) + 1);
    				$("#flag").val('');
    	        	newRegLimitProgram.getNewRegLimitProductList(utilCode, $("#hiddenCataCode").val());
    	        }
    	    }
    	});
        
        var title = "";
        
		$("#title_menu1").click(function() {
            title = "모바일 요금제 상품이";
            $("#fare-list").html("");
            $("#pageNum").val('');
            $("#hiddenCataCode").val(mobileCatecode);
            newRegLimitProgram.getNewRegLimitProductList(utilCode, mobileCatecode);
        });
        $("#title_menu2").click(function() {
            title = "인터넷 요금제 상품이";
            $("#pageNum").val('');
            $("#fare-list").html("");
            $("#hiddenCataCode").val(internetCatecode);
			newRegLimitProgram.getNewRegLimitProductList(utilCode, internetCatecode);
        });
        $("#title_menu3").click(function() {
            title = "서비스 요금제 상품이";
            $("#pageNum").val('');
            $("#fare-list").html("");
            $("#hiddenCataCode").val(serviceCatecode);
            newRegLimitProgram.getNewRegLimitProductList(utilCode, serviceCatecode);
        });
    },

    // 상품 가져오기
    getListTotalCount: function(utilCode, cateCode, title) {
        var objData = {
            "cateCode": cateCode,
            "utilCode": utilCode
        }
        $.ajax({
            url: $("#pageConId").val() + '/newRegLimitProgram/tCount.ajax',
            type: "POST",
            dataType: 'json',
            data: objData,
            success: function(data) {
                var mv = data.data;
                var cnt = mv.total;
                var result = title + "<span> 총 " + cnt + "건</span> 있습니다.";
                $(".njoin-product-count div").html(result);
            }
        });
    },

    getNewRegLimitProductList: function(utilCode, cateCode) {
       
		var pageNum = $("#pageNum").val();
		
		var flag = $("#flag").val();
		
		if (pageNum == undefined || pageNum == "") {
			pageNum = $("#pageNum").val(1);
		} else {
			pageNum = $("#pageNum").val();
		}
		
		var ItemCode = $("#ItemCode").val();
	
		var pageNum = $("#pageNum").val();
        			
		var objData = {
            utilCode: utilCode,
            CardCnt: 0,
            cateCode: cateCode,
            pageNum: pageNum,
			flag : flag,
			ItemCode : ItemCode
        }

        $.ajax({
            url: $("#pageConId").val() + '/newRegLimitProgram/list.ajax',
            type: "POST",
            dataType: 'html',
            data: objData,
            success: function(rv) {
			    $("#fare-list").append(rv);
			if(ItemCode !=''){
				if(flag !=''){
				callbackItem();
				 }
				}
            }
        });
    },
};
var mvno = {
	scrollPaging : false,
    initialize: function(utilCode, bgData) {
        // 최초 데이터
        mvno.getNewMvnoList(utilCode);

        // 더보기
        $("#btn_more").css('cursor', 'pointer');
        $("#btn_more").click(function() {
            mvno.getNewMvnoList(utilCode);
        });
        
    	// 스크롤 페이징
    	$(window).scroll(function(){
    	    // console.log('scroll');
    	    // console.log( $(window).scrollTop() + '>=' + (
			// $('.mobile-product-list').height() - $(window).height()) );
    	    if($(window).scrollTop() >= ( $('.mobile-product-list').height() - $(window).height() ) ){
    	        if(mvno.scrollPaging){
    	        	// console.log('paging ..');
    	            mvno.scrollPaging = false;
    	            mvno.getNewMvnoList(utilCode);
    	        }
    	    }
    	});
    },

    getNewMvnoList: function(utilCode) {
        var pageNum = $("#pageNum").val();

        if (pageNum == undefined) {
            pageNum = 1;
        } else {
            $("#pageNum").val(Number(pageNum) + 1);

        }

        var pageNum = $("#pageNum").val();
        $.ajax({
            url: $("#pageConId").val() + '/mvno/list.ajax',
            type: 'post',
            dataType: 'html',
            timeout: 10000,
            data: {
                "pageNum": pageNum,
                "utilCode": utilCode
            },
            success: function(data) {
                $("#fare-list").append(data);
            }
        });
    },

    morePriceInfo: function(id, htmlUrl, altText) {
      var feeInfoAttr;
		  var readmoreAttr = "detailClickStatistics.click('mKT-개인_상품서비스_모바일_요금제', '^mKT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^요금정보 더보기^자세히 보기');";
		
      if ($j("#text"+id).hasClass('active')) {
        feeInfoAttr = "javascript:mvno.morePriceInfo(" + id + ",'" + htmlUrl + "','" + altText + "'); detailClickStatistics.click('mKT-개인_상품서비스_모바일_요금제', '^mKT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^요금정보 더보기');";
        $j("#text"+id).removeClass('active');
        $j("#more-info"+id).hide();
        $j("#text"+id).text("요금정보 더보기");
        $j("#text"+id).attr("onclick", feeInfoAttr);
        
        $.ajax({
            url: htmlUrl,
            dataType: 'html',
            type: 'GET',
            success: function(data) {
                $("#more-info" + id).html(data);
            }
        });
      } else {
        feeInfoAttr = "javascript:mvno.morePriceInfo(" + id + ",'" + htmlUrl + "','" + altText + "'); detailClickStatistics.click('mKT-개인_상품서비스_모바일_요금제', '^mKT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^요금정보 닫기');";
        $j("#more-info"+id).show();
        $j("#text"+id).addClass('active');
        $j("#text"+id).text("요금정보 닫기");
        $j("#text"+id).attr("onclick", feeInfoAttr);

            $.ajax({
            url: htmlUrl,
            dataType: 'html',
            type: 'GET',
            success: function(data) {
                $("#more-info" + id).html(data);
                $j(".pointer").find('a.is-line-lightgray').attr("onclick", readmoreAttr);
            }
        });
      }
      
    }
};

var myTvPriceType = {
    initialize: function(bgData) {
        $(function() {
            $(".service-title ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");

            // 초기화
            $('.reset').on('click', function() {
                $("input:radio[name=movie]").prop('checked', false);
                $("input:radio[name=quality]").prop('checked', false);
                $("input:checkbox[name=options3]").prop('checked', false);
                $("input:radio[name=smart]").prop('checked', false);
                $("input:radio[name=child]").prop('checked', false);
                $(".child-age input").val("");
            });

            // 조회하기
            $('.btn_getTvPriceType').click(function() {

                var count = 0;
                var q3 = 0;
                if ($("#check-box input:radio[name='movie']").is(':checked') == false) {
                    alert('1번 항목을 선택해 주세요.');
                    $("#check-box input:radio[name='movie']").first().focus();
                    return;
                }
                if ($("#check-box input:radio[name='quality']").is(':checked') == false) {
                    alert('2번 항목을 선택해 주세요.');
                    $("#check-box input:radio[name='quality']").first().focus();
                    return;
                }

                var Q3Val = [];
                for (var i = 0; i < $("#check-box input:checkbox[name=options3]").length; i++) {

                    if ($("#check-box input:checkbox[name=options3]")[i].checked == true) {
                        count++;
                        Q3Val[i] = $("#check-box input:checkbox[name=options3]")[i].value;
                    }
                }

                if (count < 2) {
                    alert('2개 이상 선택 가능 합니다.');
                    return;
                }

                // 성인 1, 키즈/교육/다큐교양/글로벌 2, 드라마,스포츠,예능 3
                for (var i = 0; i < Q3Val.length; i++) {
                    if (Q3Val[i] == "1") {
                        q3 = "1";
                        break;
                    }

                    if (Q3Val[i] == "2") {
                        q3 = "2";
                    }

                    if (Q3Val[i] == "3") {
                        if (q3 != "2") {
                            q3 = "3";
                        }
                    }
                }

                if ($("#check-box input:radio[name='smart']").is(':checked') == false) {
                    alert('4번 항목을 선택해 주세요.');
                    $("#check-box input:radio[name='smart']").first().focus();
                    return;
                }

                if ($("#check-box input:radio[name='child']").is(':checked') == false) {
                    alert('5번 항목을 선택해 주세요.');
                    $("#check-box input:radio[name='child']").first().focus();
                    return;
                }

                if ($("#check-box input:radio[name='child']:checked").val() == "Y") {
                    if ($(".child-age input").val() == "") {
                        alert('나이를 적어 주세요.');
                        return;
                    }
                } else if ($("#check-box input:radio[name='child']:checked").val() == "N") {
                    $(".child-age input").val("");
                }

                var dataObj = {
                    "q1": $("input:radio[name=movie]:checked").val(),
                    "q2": $("input:radio[name=quality]:checked").val(),
                    "q3": q3,
                    "q4": $("input:radio[name=smart]:checked").val(),
                    "q5": $("input:radio[name=child]:checked").val(),
                    "age": $(".child-age input").val()
                }

                $.ajax({
                    url: $("#pageConId").val() + '/myTvPriceType/list.ajax',
                    type: 'post',
                    dataType: 'html',
                    timeout: 10000,
                    data: dataObj,
                    success: function(data) {
                        $('.fare-list-area').html(data);
                    }
                });
            });
        });
    }
};

/*230307 내게 맞는 국제전화 요금제 찾기 메뉴삭제 관련 주석조치 */
/*var international_find = {
    initialize: function(bgData) {
        $(function() {

            $(".service-title ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");

            international_find.searchNational('ㄱ');

            // STEP1 국가 선택
			//케이티닷컴_개인채널_웹접근성_VOS결함내역_201116 수정
            $(".nation-list-type .category-scroll ").on('click', '.consonant', function() {

                $(".category-scroll .consonant").removeClass('active').removeAttr('title');
                $(this).addClass("active").attr('title', '선택됨');

                $(".name-category ul").html('');
                international_find.searchNational($(this).attr("data-chosung"));
            });
			// 케이티닷컴_개인채널_웹접근성_VOS결함내역_201116 수정 


            // 국가선택 파라미터
			//케이티닷컴_개인채널_웹접근성_VOS결함내역_201116 수정
            $(".name-category ul").on('click', 'li', function(e) {
                $("#nationInput").val($(this).attr("data-target"));
				//추가 
				$(this).addClass('active').siblings('li').removeClass('active');
				$(this).find('.country').attr('title', '선택됨')
				$(this).siblings('li').find('.country').removeAttr('title'); 
				// 추가 

				e.preventDefault();
            });
			// 케이티닷컴_개인채널_웹접근성_VOS결함내역_201116 수정 

            // 내게 맞는 국제전화 요금제 조회하기
            $(".getInfo").click(function() {
                international_find.getNewInternationalFind();
            });

            $(".reSet").click(function() {
                international_find.reSet();
            });
        });
    },

    // 국가 검색
    searchNational: function(initials) {
		
        var hostName =  window.location.hostname;
	
		var dataObj = {
            "initials": initials
        }
				
        $.ajax({
            url: 'https://'+hostName+'/mDic/international_find/searchNational.ajax',
            type: "post",
            data: dataObj,
            timeout: 10000,
            success: function(data) {
                $(".name-category ul").append(data);
            }
        });
    },

    // 국가 요금 조회
    getNewInternationalFind: function() {
		
		 var hostName =  window.location.hostname;
		
        if ($("#nationInput").val() == "") {
            alert("국가를 선택해 주세요");
            return;
        }
        if ($("#use_average").val() == "") {
            alert("월평균 통화 횟수를 입력해 주세요");
            return;
        }
        if ($("#min_average").val() == "") {
            alert("월평균 시간을 입력해 주세요");
            return;
        }

        var dataObj = {
            "nationName": $("#nationInput").val()
        };

        $.ajax({
			url: 'https://'+hostName+'/mDic/international_find/new_international_findList.ajax',
            type: "post",
            dataType: 'json',
            data: dataObj,
            timeout: 10000,
            success: function(data) {

                var newNationExpectPriceInfo = data.data.newNationExpectPriceInfo;
                if (newNationExpectPriceInfo == 0) {
                    alert("해당 국가 데이터가 없습니다");
                    return;
                }
                var naName = '<strong>' + newNationExpectPriceInfo.nation_num + '</strong>';
                var nTime = '<strong>' + data.data.strDate + '</strong>';
                var nDate = '<strong>' + newNationExpectPriceInfo.time_diff + '</strong>';
                $("#result_nation").html(newNationExpectPriceInfo.nation_name);
                $("#result_country-info1").html(naName);
                $("#result_country-info2").html(nTime);
                $("#result_country-info3").html(nDate);

                international_find.getNationCash(newNationExpectPriceInfo.first, newNationExpectPriceInfo.second, newNationExpectPriceInfo.third)
                $("#itemPrice").html(newNationExpectPriceInfo.alzza);

                international_find.showNationExpectPriceInfo(newNationExpectPriceInfo);
            }
        });
    },

    // 초기화
    reSet: function() {
        $("#sortingList span").css("color", "#666");

        $("#use_average").val('')
        $("#min_average").val('')
    },

    showNationExpectPriceInfo: function(price) {
        if (price == null || price == "undefined" || price.nation_name == null || price.nation_name == "undefined") {
            alert("존재하지 않는 국가입니다 다시 입력해주세요.");
            $("#search_nation").focus();
            $("#search_nation").val("");
            return;
        }
        var nationA = ["미국", "중국", "일본", "캐나다", "홍콩", "태국", "러시아", "싱가포르"];
        var nationB = ["베트남", "말레이시아", "대만", "인도네시아", "인도", "필리핀"];
        var nationC = ["호주", "뉴질랜드", "영국", "독일", "프랑스", "이탈리아"];
        var freeMinA = [30, 50, 100, 330, 650, 1000];
        var freeMinB = [13, 25, 50, 160, 300, 480];
        var freeMinC = [13, 25, 60, 200, 350, 550];
        var nationList = ["미국", "중국", "일본", "캐나다", "홍콩", "태국", "러시아", "싱가포르", "베트남", "말레이시아", "대만", "인도네시아", "인도", "필리핀", "호주", "뉴질랜드", "영국", "독일", "프랑스", "이탈리아"];
        var nationFlag = 0; // 0:미대상국, 1:대상국 
        for (var i = 0; i < nationList.length; i++) {
            if (nationList[i] == price.nation_name) {
                nationFlag = 1;
                break;
            }
        }
        var notTongMsg = "통큰 요금제 대상 국가가 아니며, 스페셜 DC 플러스 스페셜 요금이 적용됩니다";
        var freeMin3000 = 0;
        var freeMin5000 = 0;
        var freeMin1 = 0;
        var freeMin3 = 0;
        var freeMin5 = 0;
        var freeMin7 = 0;
        for (var i = 0; i < nationA.length; i++) {
            if (nationA[i] == price.nation_name) {
                freeMin3000 = freeMinA[0];
                freeMin5000 = freeMinA[1];
                freeMin1 = freeMinA[2];
                freeMin3 = freeMinA[3];
                freeMin5 = freeMinA[4];
                freeMin7 = freeMinA[5];
            }
        }
        for (var i = 0; i < nationB.length; i++) {
            if (nationB[i] == price.nation_name) {
                freeMin3000 = freeMinB[0];
                freeMin5000 = freeMinB[1];
                freeMin1 = freeMinB[2];
                freeMin3 = freeMinB[3];
                freeMin5 = freeMinB[4];
                freeMin7 = freeMinB[5];
            }
        }
        for (var i = 0; i < nationC.length; i++) {
            if (nationC[i] == price.nation_name) {
                freeMin3000 = freeMinC[0];
                freeMin5000 = freeMinC[1];
                freeMin1 = freeMinC[2];
                freeMin3 = freeMinC[3];
                freeMin5 = freeMinC[4];
                freeMin7 = freeMinC[5];
            }
        }

        $("#diff_dt").val(international_find.getDiffTime(price.time_diff));
        $("#diff_week").val("");

        var tong_tmp_min = Number($("#min_average").val()) * Number($("#use_average").val());
        var tmp_standard = Number(price.standard) * tong_tmp_min * 1.1;
        var tmp_mobile_tel = Number(price.mobile_tel) * tong_tmp_min * 1.1;
        var tmp_mobile_mob = Number(price.mobile_mob) * tong_tmp_min * 1.1;
        var tmp_alzza = Number(price.alzza) * tong_tmp_min * 1.1;

        
		 //* 스페셜DC 요금제(249) DB에 부가세로직까지 적용되어 들어가 있는 상태므로 하기 부가세로직 제외시킴 var
		 //* tmp_sp_special = Number(price.sp_special) * tong_tmp_min * 1.1; var
		 //* tmp_sp_asia = Number(price.sp_asia) * tong_tmp_min * 1.1; var
		 //* tmp_sp_america = Number(price.sp_america) * tong_tmp_min * 1.1; var
		 //* tmp_sp_europe = Number(price.sp_europe) * tong_tmp_min * 1.1;
		 
        var	tmp_sp_special		= Number((price.sp_special).replace(",","")) * tong_tmp_min;
		var	tmp_sp_asia			= Number((price.sp_asia).replace(",","")) * tong_tmp_min;
		var	tmp_sp_america		= Number((price.sp_america).replace(",","")) * tong_tmp_min;
		var	tmp_sp_europe		= Number((price.sp_europe).replace(",","")) * tong_tmp_min;

        var tmp_biz_basic = Number(price.biz_basic) * tong_tmp_min * 1.1;
        var tmp_biz_asia = Number(price.biz_asia) * tong_tmp_min * 1.1;
        var tmp_biz_america = Number(price.biz_america) * tong_tmp_min * 1.1;
        var tmp_biz_europe = Number(price.biz_europe) * tong_tmp_min * 1.1;
        var tmp_other_002 = Number(price.other_002) * tong_tmp_min * 1.1;
        var tmp_other_00700 = Number(price.other_00700) * tong_tmp_min * 1.1;

        var value = "tong_tmp_min " + tong_tmp_min + "\n";
        value = value + "tmp_standard " + tmp_standard + "\n";
        value = value + "tmp_mobile_tel " + tmp_mobile_tel + "\n";
        value = value + "tmp_mobile_mob " + tmp_mobile_mob + "\n";
        value = value + "tmp_alzza " + tmp_alzza + "\n";
        value = value + "tmp_sp_special " + tmp_sp_special + "\n";
        value = value + "tmp_sp_asia " + tmp_sp_asia + "\n";
        value = value + "tmp_sp_america " + tmp_sp_america + "\n";
        value = value + "tmp_sp_europe " + tmp_sp_europe + "\n";
        value = value + "tmp_biz_basic " + tmp_biz_basic + "\n";
        value = value + "tmp_biz_asia " + tmp_biz_asia + "\n";
        value = value + "tmp_biz_america " + tmp_biz_america + "\n";
        value = value + "tmp_biz_europe " + tmp_biz_europe + "\n";
        value = value + "tmp_other_002 " + tmp_other_002 + "\n";
        value = value + "tmp_other_00700 " + tmp_other_00700 + "\n";

        $("#standard").html(international_find.setNumber(tmp_standard));
        $("#mobile_tel").html(international_find.setNumber(tmp_mobile_tel));
        $("#mobile_mob").html(international_find.setNumber(tmp_mobile_mob));
        $("#alzza").html(international_find.setNumber(tmp_alzza));
        $("#sp_special").html(international_find.setNumber(tmp_sp_special));
        $("#sp_asia").html(international_find.setNumber(tmp_sp_asia));
        $("#sp_america").html(international_find.setNumber(tmp_sp_america));
        $("#sp_europe").html(international_find.setNumber(tmp_sp_europe));
        $("#biz_basic").html(international_find.setNumber(tmp_biz_basic));
        $("#biz_asia").html(international_find.setNumber(tmp_biz_asia));
        $("#biz_america").html(international_find.setNumber(tmp_biz_america));
        $("#biz_europe").html(international_find.setNumber(tmp_biz_europe));
        $("#other_002").html(international_find.setNumber(tmp_other_002));
        $("#other_00700").html(international_find.setNumber(tmp_other_00700));
        var result_tong3000 = "";
        var result_tong5000 = "";
        var result_tong1 = "";
        var result_tong3 = "";
        var result_tong5 = "";
        var result_tong7 = "";
        var result_tong_memo3000 = "";
        var result_tong_memo5000 = "";
        var result_tong_memo1 = "";
        var result_tong_memo3 = "";
        var result_tong_memo5 = "";
        var result_tong_memo7 = "";
        var dbTong3000 = Number(price.tong3000) * tong_tmp_min * 1.1;
        var dbTong5000 = Number(price.tong5000) * tong_tmp_min * 1.1;
        var dbTong1 = price.tong10000;
        var dbTong3 = Number(price.tong30000) * tong_tmp_min * 1.1;
        var dbTong5 = Number(price.tong50000) * tong_tmp_min * 1.1;
        var dbTong7 = Number(price.tong70000) * tong_tmp_min * 1.1;
        if (dbTong1.replace(/^\s+|\s+$/g, '') == "-") {
            result_tong3000 = "-";
            result_tong5000 = "-";
            result_tong1 = "-";
            result_tong3 = "-";
            result_tong5 = "-";
            result_tong7 = "-";
            result_tong_memo3000 = "<a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
            result_tong_memo5000 = result_tong_memo3000;
            result_tong_memo1 = result_tong_memo3000;
            result_tong_memo3 = result_tong_memo3000;
            result_tong_memo5 = "<a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=245' target='_blank'>알짜요금</a>이 적용됩니다.";
            result_tong_memo7 = result_tong_memo5;
        } else dbTong1 = Number(price.tong10000) * tong_tmp_min * 1.1;

        if (price.nation_name != '일본') {
            if (freeMin3000 != 0) {
                if (dbTong3000 < 3300) {
                    // 무조건 월정액 표시
                    result_tong3000 = international_find.setNumber('3300');
                    result_tong_memo3000 = freeMin3000 + "분 무료통화 월정액 3,300원 기준입니다.";
                } else {
                    result_tong3000 = international_find.setNumber(dbTong3000);
                    result_tong_memo3000 = freeMin3000 + "분 무료통화 월정액 3,300원 기준입니다.";
                }
            } else {
                result_tong3000 = international_find.setNumber('0');
                result_tong_memo3000 = notTongMsg;
            }
        } else {
            result_tong3000 = "-";
            result_tong_memo3000 = "<a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
        }

        if (price.nation_name != '일본') {
            if (freeMin5000 != 0) {
                if (dbTong5000 < 5500) {
                    // 무조건 월정액 표시
                    result_tong5000 = international_find.setNumber('5500');
                    result_tong_memo5000 = freeMin5000 + "분 무료통화 월정액 5,500원 기준입니다.";
                } else {
                    result_tong5000 = international_find.setNumber(dbTong5000);
                    result_tong_memo5000 = freeMin5000 + "분 무료통화 월정액 5,500원 기준입니다.";
                }
            } else {
                result_tong5000 = international_find.setNumber('0');
                result_tong_memo5000 = notTongMsg;
            }
        } else {
            result_tong5000 = "-";
            result_tong_memo5000 = "<a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
        }
        if (freeMin1 != 0 || freeMin3 != 0 || freeMin5 != 0 || freeMin7 != 0) {
            if (dbTong1 < 11000) {
                // 무조건 월정액 표시
                result_tong1 = international_find.setNumber('11000');
                result_tong_memo1 = freeMin1 + "분 무료통화 월정액 11,000원 기준입니다.";
            } else {
                result_tong1 = international_find.setNumber(dbTong1);
                result_tong_memo1 = freeMin1 + "분 무료통화 월정액 11,000원 기준입니다."
            }
            if (dbTong3 < 33000) {
                // 무조건 월정액 표시
                result_tong3 = international_find.setNumber('33000');
                result_tong_memo3 = freeMin3 + "분 무료통화 월정액 33,000원 기준입니다.";
            } else {
                result_tong3 = international_find.setNumber(dbTong3);
                result_tong_memo3 = freeMin3 + "분 무료통화 월정액 33,000원 기준입니다.";
            }
            if (dbTong5 < 55000) {
                // 무조건 월정액 표시
                result_tong5 = international_find.setNumber('55000');
                result_tong_memo5 = freeMin5 + "분 무료통화 월정액 55,000원 기준입니다.";
            } else {
                result_tong5 = international_find.setNumber(dbTong5);
                result_tong_memo5 = freeMin5 + "분 무료통화 월정액 55,000원 기준입니다.";
            }
            if (dbTong7 < 77000) {
                // 무조건 월정액 표시
                result_tong7 = international_find.setNumber('77000');
                result_tong_memo7 = freeMin7 + "분 무료통화 월정액77,000원 기준입니다.";
            } else {
                result_tong7 = international_find.setNumber(dbTong7);
                result_tong_memo7 = freeMin7 + "분 무료통화 월정액77,000원 기준입니다."
            }
        } else {
            result_tong1 = international_find.setNumber('0');
            result_tong_memo1 = notTongMsg;
            result_tong3 = international_find.setNumber('0');
            result_tong_memo3 = notTongMsg;
            result_tong5 = international_find.setNumber('0');
            result_tong_memo5 = notTongMsg;
            result_tong7 = international_find.setNumber('0');
            result_tong_memo7 = notTongMsg;
        }

        var monthPay = $("#monthPay").val();
        if (monthPay == "3300") {
            $("#tong").text(result_tong3000);
            $("#tong_memo").html(result_tong_memo3000);
        } else if (monthPay == "5500") {
            $("#tong").text(result_tong5000);
            $("#tong_memo").html(result_tong_memo5000);
        } else if (monthPay == "11000") {
            $("#tong").text(result_tong1);
            $("#tong_memo").html(result_tong_memo1);
        } else if (monthPay == "33000") {
            $("#tong").text(result_tong3);
            $("#tong_memo").html(result_tong_memo3);
        } else if (monthPay == "55000") {
            $("#tong").text(result_tong5);
            $("#tong_memo").html(result_tong_memo5);
        } else if (monthPay == "77000") {
            $("#tong").text(result_tong7);
            $("#tong_memo").html(result_tong_memo7);
        }
        document.form1.tongArrPrice[0].value = result_tong3000;
        document.form1.tongArrPrice[1].value = result_tong5000;
        document.form1.tongArrPrice[2].value = result_tong1;
        document.form1.tongArrPrice[3].value = result_tong3;
        document.form1.tongArrPrice[4].value = result_tong5;
        document.form1.tongArrPrice[5].value = result_tong7;
        document.form1.tongArrMemo[0].value = result_tong_memo3000;
        document.form1.tongArrMemo[1].value = result_tong_memo5000;
        document.form1.tongArrMemo[2].value = result_tong_memo1;
        document.form1.tongArrMemo[3].value = result_tong_memo3;
        document.form1.tongArrMemo[4].value = result_tong_memo5;
        document.form1.tongArrMemo[5].value = result_tong_memo7;
        var student = price.student;
        if (student == "-") {
            var tmp_str = "<a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=247' target='_blank'>대상 국가</a>가 아니며 <a href=" + $("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
            $('#student').text('-');
            $('#student_memo').html(tmp_str);
        } else {
            var tmp_student = student * tong_tmp_min * 1.1;
            $('#student').text(international_find.setNumber(tmp_student));
            $('#student_memo').text('');
        }
    },

    getDiffTime: function(diff) {
        if (isNaN(diff)) {
            diff = 0;
        }

        var gab = 1000 * 60 * (Number(diff) * 60);
        var loadDt = new Date();
        var time_t = new Date(Date.parse(loadDt) - gab);
        var s = international_find.set_standard(time_t.getFullYear(), 4) + '-' +
            international_find.set_standard(time_t.getMonth() + 1, 2) + '-' +
            international_find.set_standard(time_t.getDate(), 2) + '-' +
            international_find.set_standard(time_t.getHours(), 2) + '-' +
            international_find.set_standard(time_t.getMinutes(), 2) + '-' +
            international_find.set_standard(time_t.getSeconds(), 2);
        return s;
    },

    set_standard: function(time, digits) {
        var zero = '';
        time = time.toString();
        if (time.length < digits) {
            for (i = 0; i < digits - time.length; i++)
                zero += '0';
        }
        return zero + time;
    },

    searchNation: function() {
        var nation_name = $("#nation_name").val();
        $("#search_nation").val(nation_name);
    },

    setNumber: function(value) {
        var val = value.toString();
        if (val.indexOf('.') != -1) {
            var v_length = val.substring(val.indexOf('.') + 1).length;
            var chklast = val.charAt(val.length - 1);
            if (v_length == 1) {
                if (chklast == '0') {
                    return $.number(val);
                } else return $.number(val, 1);
            }
            if (v_length > 2) {

                var result = $.number(val, 1);
                var chklast = result.charAt(result.length - 1);
                if (chklast == '0') {
                    return $.number(val);
                } else return $.number(val, 1);
            }
        } else {
            return $.number(val);
        }
    },

    getNationCash : function(a, b, c, price) {
        var first = a;
        var second = b;
        var third = c;

        if (first.indexOf("모바일파워") >= 0) {
            first = "모바일파워요금제"
        }
        if (second.indexOf("모바일파워") >= 0) {
            second = "모바일파워요금제"
            third = "모바일파워요금제"
        }
        if (second.indexOf("스페셜DC플러스") >= 0) {
            second = "스페셜DC플러스"
        }
        if (first == "biz아메리카 요금제" || first == "biz아시아 요금제" || first == "biz유럽 요금제") {
            first_url = $("#pageConId").val() + "/productDetail.do?ItemCode=250";
            first_name = "biz 요금제";
        } else if (first == "모바일파워요금제") {
            first_url = $("#pageConId").val() + "/productDetail.do?ItemCode=246";
            first_name = "모바일 파워 요금제";
        } else if (first == "알짜 요금제") {
            first_url = $("#pageConId").val() + "/productDetail.do?ItemCode=245";
            first_name = "알짜 요금제";
        } else if (first == "통큰 요금제") {
            first_url = $("#pageConId").val() + "/productDetail.do?ItemCode=244";
            first_name = "통큰 요금제";
        } else if (first == "뉴유학생") {
            first_url = $("#pageConId").val() + "/productDetail.do?ItemCode=247";
            first_name = "new 유학생 요금제";
        }
        if (second == "biz베이직 요금제" || second == "biz아메리카 요금제" || second == "biz아시아 요금제" || second == "biz유럽 요금제") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=250";
            second_name = "biz 요금제";
        } else if (second == "모바일파워요금제") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=246";
            second_name = "모바일 파워 요금제";
        } else if (second == "알짜 요금제") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=245";
            second_name = "알짜 요금제";
        } else if (second == "통큰 요금제") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=244";
            second_name = "통큰 요금제";
        } else if (second == "뉴유학생") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=247";
            second_name = "new 유학생 요금제";
        } else if (second == "스페셜DC플러스") {
            second_url = $("#pageConId").val() + "/productDetail.do?ItemCode=249";
            second_name = "스페셜 DC 플러스";
        }

        var first_name_html = "";
        var newOpen = " target='_blank' title='새창열림'";
        first_name_html = first_name_html + '<li>';
        first_name_html = first_name_html + '<a href=' + first_url +newOpen+ '>';
        first_name_html = first_name_html + '<div class="tit">' + first_name + '</div>';
        first_name_html = first_name_html + '<div class="stt"><span class="txt-red">대륙별 할인</span></div>';
        first_name_html = first_name_html + '</a>';
        first_name_html = first_name_html + '<li>';
        var second_name_html = "";
        second_name_html = second_name_html + '<li>';
        second_name_html = second_name_html + '<a href=' + second_url +newOpen+ '>';
        second_name_html = second_name_html + '<div class="tit">' + second_name + '</div>';
        second_name_html = second_name_html + '</a>';
        second_name_html = second_name_html + '<li>';
        $("#titleNameFirst").html(first_name_html);
        $("#titleNameSecond").html(second_name_html);
    }
};*/
/*!230307 내게 맞는 국제전화 요금제 찾기 메뉴삭제 관련 주석조치 */

var testZone = {
		// 구분 변경
		gbnTypeChange : function(gbnType){
			$('#gbnType').val(gbnType);
			
			var dataObj = {
					gbnType :  $('#gbnType').val()
			}
			$.ajax({
				url:$("#pageConId").val() + "/testZoneList.ajax"
				,type: "post"
				,timeout: 10000
				,data:dataObj
				,success:function(rv) {
					$("#testZoneList").html(rv);	
				},complete: function() {
					$("select[name=addressType1]").val("");
					$("select[name=addressType2]").val("");
					$('#addressText').val("");
					$("select[name=addressType2]").attr("disabled" ,"disabled"); // 시/구/군
																					// 정보
																					// 없을떄
																					// 구 선택
																					// 비활성화
				}
			});
		},
		// 시/도 값 변경에 따른 구정보 갱신
		addressTypeChange : function(){
			var addressType1 = $("select[name=addressType1]").val();
			
			var html = "<option value=\"\" selected=selected>구</option>";
			if(addressType1 != ''){
				$.ajax({
					 url:$("#pageConId").val() + "/addressType2List.ajax"
					,dataType:"json"
					,timeout: 10000
					,data: { 
						 gbnType :  $('#gbnType').val()
						,addressType1 : addressType1
					 },
					 success: function(data) {
						$.each(data.addressType2List, function(index, item) {
							html += '<option value="'+item.addressType2+'">'+item.addressType2+'</option>';
						});
					 },complete: function() {
							$('#addressType2').html(html);
							$("select[name=addressType2]").removeAttr("disabled" ); // 시/구/군
																					// 정보
																					// 있을떄
																					// 구 선택
																					// 활성화
					 }
				});
			}else{
				$('#addressType2').html(html);
				$("select[name=addressType2]").attr("disabled" ,"disabled"); // 시/구/군
																				// 정보
																				// 없을떄
																				// 구 선택
																				// 비활성화
			}
		},
		// 시도/구 정보로 조회하기
		areaSearch : function(){
			var addressType1 = $("select[name=addressType1]").val();
			var addressType2 = $("select[name=addressType2]").val();
			
			if (addressType1 == "") {
				alert("시/도를 선택해주세요.");
				$("#addressType1").focus();
				return;
			}
			
			if (addressType2 == "") {
				alert("구를 선택해주세요.");
				$("#addressType2").focus();
				return;
			}
			
			var dataObj = {
					gbnType :  $('#gbnType').val()
				   ,addressType1 : addressType1
				   ,addressType2 : addressType2
			}
			$.ajax({
				url:$("#pageConId").val() + "/testZoneList.ajax"
				,type: "post"
				,timeout: 10000
				,data:dataObj
				,success:function(rv) {
					$("#testZoneList").html(rv);	
				},complete: function() {
					$('#addressText').val("");
					$("#focusPlace")[0].scrollIntoView();
					$("#areaSearch").focus();
				}
			});
		},
		// 주소로 찾기
		adressSearch : function(){
			
			var addressText = $('#addressText').val();
			
			if (addressText == "") {

				$(".addressTextNone").attr("style","display");				
				$("#addressText").focus();

				return;
			}else{
				
				$(".addressTextNone").attr("style","display:none");
			}
			
			var dataObj = {
					gbnType :  $('#gbnType').val()
				   ,addressText :  addressText
			}
			$.ajax({
				url:$("#pageConId").val() + "/testZoneList.ajax"
				,type: "post"
				,timeout: 10000
				,data:dataObj
				,success:function(rv) {
					$("#testZoneList").html(rv);
				},complete: function() {
					$("select[name=addressType1]").val("");
					$("select[name=addressType2]").val("");
					$("select[name=addressType2]").attr("disabled" ,"disabled"); // 시/구/군
																					// 정보
																					// 없을떄
																					// 구 선택
																					// 비활성화
					$("#focusPlace")[0].scrollIntoView();
					$("#adressSearch").focus();
				}
			});
		},
		// 전체 검색
		allSearch : function(){
			
			var dataObj = {
					gbnType :  $('#gbnType').val()
			}
			$.ajax({
				url:$("#pageConId").val() + "/testZoneList.ajax"
				,type: "post"
				,timeout: 10000
				,data:dataObj
				,success:function(rv) {
					$("#testZoneList").html(rv);	
				},complete: function() {
					$("select[name=addressType1]").val("");
					$("select[name=addressType2]").val("");
					$("select[name=addressType2]").attr("disabled" ,"disabled"); // 시/구/군
																					// 정보
																					// 없을떄
																					// 구 선택
																					// 비활성화
					$('#addressText').val("");
					$("#focusPlace")[0].scrollIntoView();
					$("#allSearch").focus();
				}
			});
		}				
	};
	
function firstMyApp(){
	var item_code = $("#item_code").val();
	var appSchem = "ollehcs://start?pUrl=https://product.kt.com/mDic/productDetail.do?ItemCode="+item_code+"#Intent;scheme=ollehcs;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.ktshow.cs;end;";
	var marketAndroid = "market://details?id=com.ktshow.cs"
	var userAgent = navigator.userAgent.toUpperCase();
	var regIos = /IPHONE|IPOD|IPAD/;
	var regAnd = /ANDROID/;
	var isAndroid = regAnd.test(userAgent);
	var isIos = regIos.test(userAgent);
	if (isAndroid) {
		isMyApp();
		location.href = appSchem;
    } else if (isIos) {
    	browserCallApp();
    }
}
	
function isMyApp(){
	var marketAndroid = "market://details?id=com.ktshow.cs"
	function clearTimers(){
		clearInterval(heartbeat);
		clearTimeout(timer);
	}
	function intervalHeartbeat(){
		if(document.webkitHidden || document.hidden){
			clearTimers();
		}
	}
	heartbeat = setInterval(intervalHeartbeat, 200);
	var deLay = 500;
	timer = setTimeout(function() {
		var marketAndroid = "market://details?id=com.ktshow.cs"
		window.open(marketAndroid);
	}, deLay);
	
	setTimeout(function() {
		location.href="kakaotalk://inappbrowser/close"
	}, 600);
}
		
function  browserCallApp() {
	var item_code = $("#item_code").val();
	var openAt = (new Date()).getTime();
	var marketIos = "http://itunes.apple.com/kr/app/id355838434?mt=8";
    var iosApp = "showcsAppLink://start?pUrl=https://product.kt.com/mDic/productDetail.do?ItemCode="+item_code ;	
    location.href = iosApp;
    setTimeout( function() {
        if ((new Date() - openAt) < 500) {
                location.href = marketIos;
        } 
    }, 100);
	setTimeout( function() {
		location.href="kakaoweb://closeBrowser"		
	}, 500);
}



/*
 * ==== 내게 맞는 인터넷 요금제 ==== #가족수 1~2인 : 1, 3인 : 3, 4인 : 4
 * 
 * #자녀유무 상관없음 : 9, 있음 : 1, 없음 : 0
 */
var internetMyPriceType = {
	
	step1 : function(){
		// 초기화
		$('#itnRdoFmlyCnt1').prop('checked', false);
		$('#itnRdoFmlyCnt3').prop('checked', false);
		$('#itnRdoFmlyCnt4').prop('checked', false);
		$('#itnRdoChildYN_N').prop('checked', false);
		$('#itnRdoChildYN_Y').prop('checked', false);
		$('#itnChkType1').prop('checked', false);
		$('#itnChkType2').prop('checked', false);
		$('#itnChkType3').prop('checked', false);
		$("#itnStep2ReturnBtn").hide();
		
		// 단계별 노출 처리
		/* 1087376 케이티닷컴_온경혁프로젝트_접근성결함_211203_상품_V.0.3 2021-12-07 수정 */
		setTimeout(function() {
			$("#internetMyPrice_Step1").show();
			$("#internetMyPrice_Step2").hide();
			$("#internetMyPrice_Step3").hide();
		}, 300);

		$(".fit-charge-search .js-tree-btn-toggle").focus();
		/* // 1087376 케이티닷컴_온경혁프로젝트_접근성결함_211203_상품_V.0.3 2021-12-07 수정 */
	},
	step2 : function(){
		if($('input[name="itnRdoFmlyCnt"]:checked').length == 0){
			alert('요금제 추천을 위한 답변을 선택해주세요.');
			return false;
		}
		
		if($('input[name="itnRdoChildYN"]:checked').length == 0){
			alert('요금제 추천을 위한 답변을 선택해주세요.');
			return false;
		}

		// 선택 항목 조회
		$.ajax({
            url: '/mDic/getMyPriceTypeOptionText.ajax',
            type: 'post',
            dataType: 'json',
            data: {
            	pageType : "I"
            },
            success: function(data) {
				// console.log(data);
				if(data != undefined && data != null ){
					console.log(data.hasOwnProperty('internet_type1'));
					if(data.hasOwnProperty('internet_type1')){
						$('#itnChkType1').siblings('span').html(data.internet_type1);
					}
					if(data.hasOwnProperty('internet_type2')){
						$('#itnChkType2').siblings('span').html(data.internet_type2);
					}
					if(data.hasOwnProperty('internet_type3')){
						$('#itnChkType3').siblings('span').html(data.internet_type3);
					}
				}

				/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */
				 setTimeout(function() {
					$("#internetMyPrice_Step2 .q-title strong:first").attr('tabindex', '0').focus();
				}, 300);
				/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */
            }
        });
		
		$("#internetMyPrice_Step1").hide();
		$("#internetMyPrice_Step2").show();
		/*
		 * 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 삭제 $("#tvMyPrice_Step2
		 * .q-title").focus();//0721 vos 1087376 포커스를 '원하는 인터넷을 선택해주세요'로 되돌림 //
		 * 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 삭제
		 */
		$("#internetMyPrice_Step3").hide();
	},
	search : function(){
		
		if($('input[name^="itnChkType"]:checked').length == 0){
			alert('요금제 추천을 위한 답변을 선택해주세요.');
			return false;
		}
		
		var family_count = $('input[name="itnRdoFmlyCnt"]:checked').val()
		var children_yn = $('input[name="itnRdoChildYN"]:checked').val()
		var internet_type_result1 = $('input[name="itnChkType1"]:checked').val();
		var internet_type_result2 = $('input[name="itnChkType2"]:checked').val();
		var internet_type_result3 = $('input[name="itnChkType3"]:checked').val();
		
		if(internet_type_result1 == undefined){
			internet_type_result1 = "N";
		}
		if(internet_type_result2 == undefined){
			internet_type_result2 = "N";
		}
		if(internet_type_result3 == undefined){
			internet_type_result3 = "N";
		}
		var dataObj = {
			 family_count : family_count
			,children_yn : children_yn
			,internet_type_result1 : internet_type_result1
			,internet_type_result2 : internet_type_result2
			,internet_type_result3 : internet_type_result3
		}
		// console.log(dataObj);
		var noData = true;
		
		// 상품 조회
		$.ajax({
            url: '/mDic/internetMyPriceType/list.ajax',
            type: 'post',
            dataType: 'html',
            timeout: 10000,
            data: dataObj,
            success: function(res) {
				// console.log(res);
				
				$("#internetMyPrice_Step3").find(".prd-round-box").html(res);
				$("#internetMyPrice_Step3 .icon-chage-srch").attr("tabindex", "0").focus();// 0721
																							// vos
																							// 1087376
																							// 포커스를
																							// '강력추천'
																							// 라벨로
																							// 되돌림
				
            },
            error : function(){
            	alert("선택하신 조건에 맞는 요금제가 없습니다.");
        		
            	// 다시선택하기 버튼 활성화
        		$("#itnStep2ReturnBtn").show();
        		$("#internetMyPrice_Step1").hide();
        		$("#internetMyPrice_Step2").show();
        		$("#internetMyPrice_Step3").hide();
            },
            complete: function() {
				
			}
        });
		
	}
}



var tvMyPriceType = {
		
	step1 : function(){
		// 초기화
		$('#tvRdoChild_Y').prop('checked', false);
		$('#tvRdoChild_N').prop('checked', false);
		$('#tvRdoOption1').prop('checked', false);
		$('#tvRdoOption2').prop('checked', false);
		$('#tvRdoOption3').prop('checked', false);
		$('#tvRdoOption4').prop('checked', false);
		$("#tvStep2ReturnBtn").hide();
		
		// 단계별 노출 처리
		$("#tvMyPrice_Step1").show();
		$(".fit-charge-search .js-tree-btn-toggle").focus();// 0721 vos 1087376
															// 포커스를 '내게 맞는 요금제
															// 찾기'로 되돌림
		$("#tvMyPrice_Step2").hide();
		$("#tvMyPrice_Step3").hide();
	},
	step2 : function(){
		
		if($('input[name="tvRdoChild"]:checked').length == 0){
			alert('요금제 추천을 위한 답변을 선택해주세요.');
			return false;
		}
		
		var age_max_ten_yn = $('input[name="tvRdoChild"]:checked').val();
		// console.log('pre checked val: ' + age_max_ten_yn);
		$('#tvRdoOption1').closest('li').hide();
		$('#tvRdoOption2').closest('li').hide();
		$('#tvRdoOption3').closest('li').hide();
		$('#tvRdoOption4').closest('li').hide();
		
		if(age_max_ten_yn == 0){
			// 선택 항목 조회
			$.ajax({
	            url: '/mDic/getMyPriceTypeOptionText.ajax',
	            type: 'post',
	            dataType: 'json',
	            data: {
	            	pageType : "T"
	            },
	            success: function(data) {
					// console.log(data);
					// console.log(data != undefined && data != null);
					if(data != undefined && data != null ){
						if(data.hasOwnProperty('contents_type_result1')){
							$('#tvRdoOption1').siblings('span').html(data.contents_type_result1);
							$('#tvRdoOption1').closest('li').show();
						}
						if(data.hasOwnProperty('contents_type_result2')){
							$('#tvRdoOption2').siblings('span').html(data.contents_type_result2);
							$('#tvRdoOption2').closest('li').show();
						}
						if(data.hasOwnProperty('contents_type_result3')){
							$('#tvRdoOption3').siblings('span').html(data.contents_type_result3);
							$('#tvRdoOption3').closest('li').show();
						}
						if(data.hasOwnProperty('contents_type_result4')){
							$('#tvRdoOption4').siblings('span').html(data.contents_type_result4);
							$('#tvRdoOption4').closest('li').show();
						}
					}

					/* 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */
					 setTimeout(function() {
						$("#tvMyPrice_Step2 .q-title strong:first").attr('tabindex', '0').focus();
					}, 300);
					/* // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 추가 */
	            }
	        });
			
			$("#tvMyPrice_Step1").hide();
			$("#tvMyPrice_Step2").show();
			/*
			 * 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 삭제 $("#tvMyPrice_Step2
			 * .q-title").focus();//0721 vos 1087376 포커스를 '선호하는 tv 콘텐츠 유형을 선택해
			 * 주세요'로 되돌림 // 케이티닷컴_온경혁프로젝트_접근성결함_211122_상품 2021-11-25 삭제
			 */
			$("#tvMyPrice_Step3").hide();
		}else{
			// step1 선택에서 있음 선택 시 바로 검색.
			$('#tvRdoOption1').prop('checked', false);
			$('#tvRdoOption2').prop('checked', false);
			$('#tvRdoOption3').prop('checked', false);
			$('#tvRdoOption4').prop('checked', false);
			tvMyPriceType.search();
		}
	},
	search : function(){
		
		var age_max_ten_yn = $('input[name="tvRdoChild"]:checked').val();
		// step1 항목이 없음 이고, step2 항목이 아무것도 선택 안되어있으면
		if(age_max_ten_yn == 0 && $('input[name="tvRdoOption"]:checked').length == 0){
			alert('요금제 추천을 위한 답변을 선택해주세요.');
			return false;
		}
		
		var age_max_ten_yn = $('input[name="tvRdoChild"]:checked').val()
		var contents_type_result1 = $('input[id="tvRdoOption1"]:checked').val()
		var contents_type_result2 = $('input[id="tvRdoOption2"]:checked').val()
		var contents_type_result3 = $('input[id="tvRdoOption3"]:checked').val()
		var contents_type_result4 = $('input[id="tvRdoOption4"]:checked').val()
		
		if(contents_type_result1 == undefined){
			contents_type_result1 = "N";
		}
		if(contents_type_result2 == undefined){
			contents_type_result2 = "N";
		}
		if(contents_type_result3 == undefined){
			contents_type_result3 = "N";
		}
		if(contents_type_result4 == undefined){
			contents_type_result4 = "N";
		}
		var dataObj = {
			 age_max_ten_yn        : age_max_ten_yn
			,contents_type_result1 : contents_type_result1
			,contents_type_result2 : contents_type_result2
			,contents_type_result3 : contents_type_result3
			,contents_type_result4 : contents_type_result4
		}
		// console.log(dataObj);
		
		// 요금제 조회
		$.ajax({
            url: '/mDic/tvMyPriceType/list.ajax',
            type: 'post',
            dataType: 'html',
            data: dataObj,
            success: function(res) {
				// console.log(res);
				
				$("#tvMyPrice_Step3").find("#searchDiv").html(res);
				$("#internetMyPrice_Step3 .icon-recom").attr("tabindex", "0").focus();// 0721
																						// vos
																						// 1087376
																						// 포커스를
																						// '강력추천'
																						// 라벨로
																						// 되돌림
				
            },
            error : function(){
            	console.log('error');
            	/*
				 * alert("선택하신 조건에 맞는 요금제가 없습니다.."); // 다시선택하기 버튼 활성화
				 * $("#tvStep2ReturnBtn").show(); $("#tvMyPrice_Step1").hide();
				 * $("#tvMyPrice_Step2").show(); $("#tvMyPrice_Step3").hide();
				 */
            },
            complete: function() {
				console.log('compleat');
			}
        });
	}
}