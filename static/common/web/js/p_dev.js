//document.domain='kt.com';

var plink_type = "";
var plink_url = "";
var psoc_code = "";
var pitemCode = "";

// KTGlobal.js 에서 환경 구분하는 변수 properties 이용하여 설정
var omsOfferDomain = (properties == 'tb' ? "https://tb.offer.onmas.kt.com" : "https://offer.onmas.kt.com");
var _dl = {};

$j = jQuery.noConflict();

$j(document).ready(function() {
    try {
        Kakao.init('18c956f1625219f72c615b19f3931357');
    } catch (e) {}

    // 서브 메인 요금제 제안 미노출 처리 -s
    if (location.pathname == '/' || location.pathname == '/wDic/main.do') {
        var ppArea = $j('.product-price-area .column .inner');
        if (typeof(ppArea) != 'undefined' && ppArea.length > 0) {
            $j(ppArea).find('h3').remove();
            $j(ppArea).find('.box_price').remove();
        }
    }
    // 서브 메인 요금제 제안 미노출 처리 -e

    // 모바일 요금제 카테고리의 내게 맞는 모바일 요금제 찾기 임시 미노출 처리 -s
    if (location.pathname == '/wDic/index.do' && (location.search).indexOf('?CateCode=6002') >= 0) {
        $j('#Laypop').remove();
    }
    // 모바일 요금제 카테고리의 내게 맞는 모바일 요금제 찾기 임시 미노출 처리 -e
});
// 내게 맞는 모바일 요금제 찾기 임시 미노출 처리 -s
if (location.pathname == '/wDic/myPriceType.do') {
    location.href = location.origin;
}
// 내게 맞는 모바일 요금제 찾기 임시 미노출 처리 -e




var wDicProd = {
    /* ctn 이 없는 유저 */
    fn_no_user: function() {
        alert("KT 모바일 상품에 가입된 정보가 없거나 입력된 정보가 정확하지 않습니다. 고객센터(국번없이 100)로 문의해주세요.");
    },

    // simpleJoin errMsg
    fn_error_msg: function() {
        alert("새로고침 후 다시 이용해 주세요.");
    },

    // 신청하기 link_type2(신청하기/팝업) 오픈
    wrapApplyPopOpen: function(n) {
        // 팝업 close시 저장된 target 있을때 focus 주기 20150608 2차 add
        //_focusTg = $j('.pro_btn').find('a:first');
        var obj = $j('#' + n);
        var ww = 600;
        obj.css({
            'width': (ww + 'px'),
            'display': 'block',
            'top': (($j(window).height() / 2) - (obj.outerHeight() / 2)) + 'px',
            'left': (($j(window).width() / 2) - (ww / 2)) + 'px'
        });
        return false;
    },

    /* 간편 가입 팝업*/
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
        var popWidth = 840;
        var popHeight = 860;
        var monScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var monScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var browWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var browHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var cfmLeft = ((browWidth / 2) - (popWidth / 2)) + monScreenLeft;
        var cfmTop = ((browHeight / 2) - (popHeight / 2)) + monScreenTop;
        window.open('/wDic/simple/productJoin.do?soc_code=' + soc_code + '&item_code=' + item_code + '&url_code=PDIC01&pro_d=' + pro_d + '&url_ht_yn=' + url_ht_yn, '_blank', 'width=640px , height=860px , left=' + cfmLeft + ', top=' + cfmTop + ', location=no , toolbar=no ,status=no , resizable=no , menubar=no , scrollbars=yes'); //0430 scrollbars 속성 수정
    },
    //상품 관련 링크 버튼별 액션(새창, 팝업, 기타)
    lnkBtn: function(sUrl, sTarget) {

        if (sTarget == "_blank") {
            window.open(sUrl);
            /*} else if (sTarget == "popup") {
                window.open(sUrl, 'popupProduct', 'scrollbars=yes, top=100px, left=100px, width=770px, height=800px'); */
        } else if (sTarget == "_popup") {

            var cw = screen.availWidth;
            var ch = screen.availHeight;

            var sw = 860;
            var sh = 800;
            //간편가입 디자인 개선 04.12
            //var sw = 634;
            //var sh = 786;
            ml = (cw - sw) / 2;
            mt = (ch - sh) / 2;

            window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');
        } else if (sTarget == "_self") {
            document.location.href = sUrl;
        }
    },
    //상품 관련 전화상담 팝업 버튼 액션(팝업) : 2018/08/09 배포 예정
    lnkPhonePopBtn: function(sUrl) {

        var cw = screen.availWidth;
        var ch = screen.availHeight;

        var sw = 640;
        var sh = 854; //220324 수정
        ml = (cw - sw) / 2;
        mt = (ch - sh) / 2;

        window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');
    },
    //SHOP 전화연결 레이어 제어
    fn_shopfClose: function() {
        $j('#layerCall').hide();
    },
    //상품 관련 링크 버튼별 액션(새창, 팝업, 기타) 마케팅 리스트 페이지
    lnkBtnMaketingList: function(sUrl, sTarget) {

        if (sTarget == "_blank") {
            window.open(sUrl);
            /*} else if (sTarget == "popup") {
                window.open(sUrl, 'popupProduct', 'scrollbars=yes, top=100px, left=100px, width=770px, height=800px'); */
        } else if (sTarget == "_popup") {

            var cw = screen.availWidth;
            var ch = screen.availHeight;

            //var sw = 860;
            //var sh = 800;
            //간편가입 디자인 개선 04.12
            var sw = 634;
            var sh = 786;
            ml = (cw - sw) / 2;
            mt = (ch - sh) / 2;

            window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');
        } else if (sTarget == "_self") {
            document.location.href = sUrl;
        }
    },
    // 그룹상품 선택값 변경
    selectGroupItem: function(index, link_type, link_url, soc_code, itemCode, subItemName, price_name, price, price_unit, price_add, fbtn_name) {

        plink_type = link_type;
        plink_url = link_url;
        psoc_code = soc_code;
        pitemCode = itemCode;

        $j('#selLinkType').val(link_type);
        $j('#selLinkUrl').val(link_url);
        $j('#selSocCode').val(soc_code);
        $j('#selItemCode').val(itemCode);
        $j('#selItemInfo').html("<strong class='pd-tit'>" + subItemName + "</strong>" + price_name + " " + price + " " + price_unit + "<span class='pd-tax'>" + price_add + "</span>");

        // 선택후 자동 닫힘 처리
        var self = this,
            $jself = $j('.inner'),
            $jbtn = $jself.find('.pd-list-btn'),
            $jpdbox = $jself.find('.pd-box'),
            $jpdcover = $jself.find('.pd-cover'),
            $jpdlist = $jself.find('.pd-list'),
            $jpditems = $jpdlist.find('li'),
            $jtit = $jpditems.find('.tit'),
            maxW = 0,
            maxHcss = $jpdcover.css('max-height'),
            maxHsplit = typeof maxHcss === "undefined" ? 0 : maxHcss.split('px'),
            maxH = Number(maxHsplit[0]);

        // 20190122 이동
        $jpditems.find('button').attr('tabindex', -1);

        $jpdbox.animate({
            top: 0
        }, 500, function() {
            $jpdbox.removeClass('pd-open');
            $jbtn.removeClass('open');
            $jbtn.text('상품목록 열기');
        });

        // 포커스 추가
        var selIi = ':eq(' + index + ')';
        /* 상품 하단 퀵메뉴 검증(1019805) 20190122 수정 */
        $jpdlist.find('li.selected').removeClass('selected'); // 기존 포커스 제거
        $jtit.removeAttr('title', '선택됨');
        $jpditems.filter(selIi).addClass('selected'); // 선택값 Class 삽입
        $jtit.filter(selIi).attr('title', '선택됨'); // 선택값 문구 삽입
        /* // 상품 하단 퀵메뉴 검증(1019805) 20190122 수정 */
        /* 케이티닷컴_개인채널_웹접근성_VOS결함내역 미조치 추가 */
        $jbtn.focus();
        /* // 케이티닷컴_개인채널_웹접근성_VOS결함내역 미조치 추가 */
        if (link_type == 'A' || link_type == 'D') {
            $j('#proFbtn_popup').removeAttr('title'); // 신청버튼 타이틀 변경
        } else if (link_type == 'C' || link_type == 'B') {
            $j('#proFbtn_popup').attr('title', "새창 열림"); // 신청버튼 타이틀 변경    
        }

        if (link_type == 'D') {
            $j('#fbtn_name').html('신청안내'); // 신청버튼 이름 변경
        } else {
            $j('#fbtn_name').html(fbtn_name); // 신청버튼 이름 변경    
        }

        $j('#proFbtn_popup').show(); // 일단 버튼 보이기

        if ((link_type == 'A' || link_type == 'C') && link_url == '') { // 링크 타입이 URL 링크 이거나 전화상담 인데 URL 주소가 없으면 Hide 처리
            $j('#proFbtn_popup').hide();
        }
    },
    // 그룹상품 선택값에 따른 버튼 이벤트
    openGroupItemLink: function() {

        if (plink_type != "") {
            if ('A' == plink_type) { // URL 링크 
                document.location.href = plink_url;
            } else if ('B' == plink_type) { // 간편가입
                wDicProd.fn_simple_join_popup(psoc_code, pitemCode, 'Y');
            } else if ('C' == plink_type) { // 전화 상담
                wDicProd.lnkPhonePopBtn(plink_url);
            } else if ('D' == plink_type) { // 상담 안내
                $j.ajax({
                    dataType: "html",
                    url: '/wDic/reqInfoPopup.ajax',
                    data: {
                        "socCode": psoc_code,
                        "itemCode": pitemCode
                    },
                    success: function(data) {
                        $j("#reqInfoPopup").html(data);
                    }
                });
            }
        } else {
            if ('A' == $j('#selLinkType').val()) { // URL 링크 
                document.location.href = $j('#selLinkUrl').val();
            } else if ('B' == $j('#selLinkType').val()) { // 간편가입
                wDicProd.fn_simple_join_popup($j('#selSocCode').val(), $j('#selItemCode').val(), 'Y');
            } else if ('C' == $j('#selLinkType').val()) { // 전화 상담
                wDicProd.lnkPhonePopBtn($j('#selLinkUrl').val());
            } else if ('D' == $j('#selLinkType').val()) { // 상담 안내			   
                $j.ajax({
                    dataType: "html",
                    url: '/wDic/reqInfoPopup.ajax',
                    data: {
                        "socCode": $j('#selSocCode').val(),
                        "itemCode": $j('#selItemCode').val()
                    },
                    success: function(data) {
                        $j("#reqInfoPopup").html(data);
                    }
                });
            }
        }
    },
    //소상공인 상담신청/팝업 20210818
    bizConReqPopup: function(item_code) {

        var bUrl = '/wDic/bizConsultingRequest.do?item_code=' + item_code;
        //var bUrl = '/wDic/bizConsultingRequest.do?';

        var cw = screen.availWidth;
        var ch = screen.availHeight;

        var sw = 1077;
        var sh = 800;

        ml = (cw - sw) / 2;
        mt = (ch - sh) / 2;

        window.open(bUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');

    }

};



var compareBox = {
    setScroll: function() {
        var viewScrollTop = $j(window).scrollTop();
        var fareLlistTop = $j(".detail-plan-area").offset().top - 100;
        var fareLlistHeight = $j(".detail-plan-area").outerHeight();
        var floatingClass = $j('.floating-compare');
        var offSet = 100;
        if (viewScrollTop > fareLlistTop && viewScrollTop < fareLlistTop + fareLlistHeight - offSet) {
            floatingClass.stop().animate({
                top: viewScrollTop - fareLlistTop + offSet
            }, 500, 'easeOutExpo');
        } else {
            floatingClass.stop().animate({
                top: 0
            }, 500);
        }
    },

    // 쿠키 가져오기
    getCookie: function(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if (start != -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },

    attr: function(item_disptype, link_type) {
        // 비교함
        if (item_disptype == "A") {
            //비교함
            var index = 0;
            var cookie_soc_code_array = this.getCookie('soc_code_array');

            if (cookie_soc_code_array != '') {
                index = cookie_soc_code_array.split(',').length;
            }
            $j('.floating-compare .num').text(index);
        } else {
            $j('.floating-compare').remove();
        }
    }
};

var sns = {

    // 카카오톡 연동
    gokakao: function(item_code, item_name) {

        var weburl = "https://product.kt.com/wDic/productDetail.do?ItemCode=" + item_code;
        var mobileAppUrl = "https://product.kt.com/mDic/productAppGo.do?ItemCode=" + item_code;
        var mobileUrl = "https://product.kt.com/mDic/productDetail.do?ItemCode=" + item_code;
        var title = item_name;
        var pTitle = title.replace('<br />', '');

        Kakao.Link.sendDefault({ // createDefault : 이벤트함수, createDefaultButton : 버튼생성함수
            objectType: 'feed',
            content: {
                title: pTitle,
                description: '',
                imageUrl: 'https://product.kt.com/static/common/mobile/img/prodetail/sns/KT_SNS_Banner.jpg',
                imageWidth: 800,
                imageHeight: 400,
                link: {
                    mobileWebUrl: mobileUrl,
                    webUrl: weburl
                }
            },
            buttons: [{
                title: '마이 케이티 앱으로 열기',
                link: {
                    mobileWebUrl: mobileAppUrl,
                    webUrl: weburl
                }
            }]
        });

    },

    // 페이스북 연동
    goFaceBook: function(msg, url) {
        var href = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent(msg);
        var fb = window.open(href, 'facebook', '');
        if (fb) {
            fb.focus();
        }
    },
    // 트위터 연동
    goTwitter: function(msg, url) {
        var href = "http://twitter.com/share?text=" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(url);
        var twt = window.open(href, 'twitter', '');
        if (twt) {
            twt.focus();
        }
    },
    // 라인 연동
    goLine: function(msg, url) {
        //var href = "http://line.me/R/msg/text/?" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(url);
        var href = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(url);
        var line = window.open(href, 'line', '');
        if (line) {
            line.focus();
        }
    }
};

var loadHtml = {
    // 아코디언 클릭 이벤트
    fn_getItemAccordionInfo: function(path, html_file_name, index) {
        if (html_file_name != null || html_file_name != "") {
            $j("#accordion" + index).load(path + html_file_name);
        }
    },

    // 요금계산기
    loadCalculator: function(path, html_file_name) {
        if (html_file_name != null || html_file_name != "") {
            $j(".appendCalculator").load(path + html_file_name);
        }
    },

    commDraw: function(forte_path, forte_File, accordion_path, accordion_File) {
        // 상품 특장점 영역
        if (forte_File != null || forte_File != "") {
            $j(".forte-area").load(forte_path + forte_File);
        }

        // 아코디언 영역
        if (accordion_File != null || accordion_File != "") {
            $j("#appendPriceDiv").load(accordion_path + accordion_File);
        }
    }
};

var detailClickStatistics = {
    click: function(cate_str1, cate_str2, btn_title) {
        var appendStr = cate_str2 + btn_title;
        KT_trackClicks(cate_str1, appendStr);
    }
};

//메인 스크립트
var mainScript = {

    // 가입된 상품 목록
    getSubscriptionProductList: function() {
        $j.ajax({
            dataType: "html",
            url: '/wDic/getSubscriptionProuctList.ajax',
            success: function(data) {
                $j(".subscriptionProduct").empty();
                $j(".subscriptionProduct").html(data);
                mainScript.getCurretSubscriptionProduct();

                // 가입된 상품이 있을경우 요청
                if ($j("div .tab-area").length != 0) {

                    var zoneCode = "OFFERAREA175";

                    // OMS 배너 호출 요청 (영역코드, 콜백함수)
                    mainScript.getBanner(zoneCode, function(flag, result) {
                        if (flag == "success" && result.returnCode == "OK") {
                            var resultData = result.data;

                            // 클릭 이벤트 추가 및 html 반영
                            var html = $j(resultData.html);
                            html.find('a').on('click', function(e) {
                                trgt.campaignClickLog(resultData.caVal1, resultData.caVal2, resultData.caVal3, 'CL', '^KT-개인_상품서비스_메인^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
                                KT_trackClicks(s.pageName, '^KT-개인_상품서비스_메인^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
                            });
                            $j(html).insertAfter(".bottom-area");

                            //노출통계
                            var nTime = kt_common.dateFormat('YYYYMMDDHHmm');
                            if (resultData.bnStDt <= nTime && nTime <= resultData.bnFnsDt) {
                                trgt.campaignViewLog(resultData.caVal1, resultData.caVal2, resultData.caVal3);
                                // KT_trackClicks(s.pageName, '^KT-개인_상품서비스_메인^맞춤메뉴^타겟오퍼' + resultData.statCd + '^노출'); // 20230914 adobe통계 사용량 증가에 따른 'PSM 배너 노출' 수집 중단
                            }
                        } else if (flag == "error") {}
                    });
                }

            }
        });
    },

    // 현재 상품
    getCurretSubscriptionProduct: function() {
        $j('.tab-area li').each(function() {
            if ($j(this).attr('class') == 'current') {
                subScpnCode = $j(this).children().attr('class').split(' ')[1];
                mainScript.getSubscriptionProductInfo();
            }
        });
    },

    // 현재상품 정보
    getSubscriptionProductInfo: function(idx) {
        $j.ajax({
            dataType: "html",
            url: '/wDic/getSubscriptionProuctInfo.ajax',
            data: {
                "idx": idx,
                "subScpnCode": subScpnCode
            },
            success: function(data) {
                $j(".bottom-area").empty();
                $j(".bottom-area").html(data);

                /* 1087022 케이티닷컴_온경혁프로젝트_접근성결함_211203_상품_V.0.3 2021-12-06 추가 */
                if (typeof idx != 'undefined') {
                    $j('.bottom-area .sel').eq(0).attr('id', 'bottom-sel-line');
                    $j('.bottom-area #bottom-sel-line').attr('tabindex', 0).focus();
                }
                /* // 1087022 케이티닷컴_온경혁프로젝트_접근성결함_211203_상품_V.0.3 2021-12-06 추가  */

                mainScript.getRecommProduct(idx);
            }
        });
    },
    // 추천상품 정보
    getRecommProduct: function(idx) {
        $j.ajax({
            dataType: "html",
            url: '/wDic/getRecommProductInfo.ajax',
            data: {
                "idx": idx,
                "subScpnCode": subScpnCode
            },
            success: function(data) {
                $j(".user-recommend-area").empty();
                $j(".user-recommend-area").html(data);
            }
        });
    },

    // 링투유 조회
    getRingToYouList: function() {
        $j.ajax({
            dataType: "html",
            url: '/wDic/getRingToYouListAjax.ajax',
            data: {},
            success: function(data) {
                $j('a.ringtoyou tbody').html(data);
            }
        });
    },

    // 로그인전 메인비주얼 html load
    setMainVisualHtml: function(obj, path) {
        $j("#" + obj).load(path);
    },

    // 간편가입 팝업open
    openSimpleJoin: function() {
        KT_trackClicks('KT-개인_상품서비스_메인', '^KT-개인_상품서비스_메인^인기부가서비스^간편가입하기');
        //wDicProd.lnkBtn('/wDic/simple/productJoinEvent.do?category_code=M1006', '_popup');
        wDicProd.lnkBtnMaketingList('/wDic/simple/productJoinEvent.do?category_code=M1006', '_popup');
    },

    // 카테고리 마우스 이벤트
    categoryMouseEvent: function() {
        $j(".product-find li a").mouseenter(function() {
            $j(this).find(".categoryOut").hide();
            $j(this).find(".categoryOn").show();
        }).mouseleave(function() {
            $j(this).find(".categoryOut").show();
            $j(this).find(".categoryOn").hide();
        });
    },
    //메인 화면 내게 맞는 요금제 조회하기
    mainMyPriceSearch: function() {
        var dataObj = {
            age: Number($j('.setup input[type="range"]').val()),
            datas: Number($j('#element_data input[type="range"]').val()),
            voice: Number($j('#element_voice input[type="range"]').val()),
            ppCode: $j('#ppCode').val()
        }
        $j.ajax({
            url: "/wDic/myPriceType/getMyPriceTypeListAjax.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(data) {
                if (data != null) {
                    $j('.box_intro').hide();
                    $j("#my_payment_result").html(data);
                    $j('.my_payment_result').show();
                    /*내게맞는요금제 현행화*/
                    $j('.data_info').find('.tit').each(function() {
                        var title = $j(this).text();
                        if (title == '5G 슬림 7GB' || title == '5G 시니어 베이직') {
                            var kind = $j(this).closest('.data_info').siblings('.txt_tip');
                            $j(kind).text('5G');
                            $j(kind).addClass('bg-red');
                        }
                    });
                    //hover
                    $j(".element  li ").hover(function() {
                        $j(this).addClass("hover")
                        $j(".element  li li").removeClass("hover");
                    }, function() {
                        $j(this).removeClass("hover")
                    });
                    //tooltip
                    $j('.element .cont').tipBill();
                } else {
                    $j('.box_intro').show();
                }

            }
        });


    },
    //유선 결합 혜택 조회하기 (최초 화면로딩시 internet , tv로 셋팅되어 조회된 화면이 나오도록 처리)
    getWebJoinProductOnLoad: function() {

        //최초 화면로딩시 internet , tv로 셋팅되어 조회된 화면이 나오도록 처리
        $j("#internet").prop("checked", true);
        $j("#tv").prop("checked", true);
        $j("#tel").prop("checked", false);

        $j("#label_internet").parent().addClass('on');
        $j("#label_tv").parent().addClass('on');

        var checkLenth = $j("input:checkbox[name='prod']:checked").length;

        if (checkLenth == 0 || checkLenth == 1) {
            alert('두개 이상의 관심 상품을 선택해주세요.');
            return;
        }

        var internet = $j("#internet").is(":checked") == true ? $j("#internet").val() : "";
        var tv = $j("#tv").is(":checked") == true ? $j("#tv").val() : "";
        var tel = $j("#tel").is(":checked") == true ? $j("#tel").val() : "";
        var joinType = internet + tv + tel;
        var dataObj = {
            choice_type: joinType
        }

        $j.ajax({
            url: "/wDic/myPriceType/getWebJoinProuctAjax.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(data) {

                if (data.indexOf("tbl_combine") < 0) {
                    alert("조회 결과가 존재하지 않습니다.");
                    $j("#combine_table").html("");
                } else {
                    $j("#combine_table").html(data);
                }

            }
        });
        $j('.combine_table').show();
    },
    //유선 결합 혜택 조회하기
    getWebJoinProduct: function() {

        //본창으로 다른 서비스 전환 후 뒤로가기하면 checkbox 와 화면 ui 불일치 현상 처리

        var internetClassNm = $j("#label_internet").parent().attr("class");
        var tvClassNm = $j("#label_tv").parent().attr("class");
        var telClassNm = $j("#label_tel").parent().attr("class");

        //internet
        if (internetClassNm.indexOf("on") > 0) {
            $j("#internet").prop("checked", true);
        } else {
            $j("#internet").prop("checked", false);
        }
        //tv
        if (tvClassNm.indexOf("on") > 0) {
            $j("#tv").prop("checked", true);
        } else {
            $j("#tv").prop("checked", false);
        }
        //tel
        if (telClassNm.indexOf("on") > 0) {
            $j("#tel").prop("checked", true);
        } else {
            $j("#tel").prop("checked", false);
        }

        var checkLenth = $j("input:checkbox[name='prod']:checked").length;
        if (checkLenth == 0 || checkLenth == 1) {
            alert('두개 이상의 관심 상품을 선택해주세요.');
            return;
        }

        var internet = $j("#internet").is(":checked") == true ? $j("#internet").val() : "";
        var tv = $j("#tv").is(":checked") == true ? $j("#tv").val() : "";
        var tel = $j("#tel").is(":checked") == true ? $j("#tel").val() : "";
        var joinType = internet + tv + tel;
        var dataObj = {
            choice_type: joinType
        }
        $j.ajax({
            url: "/wDic/myPriceType/getWebJoinProuctAjax.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(data) {

                if (data.indexOf("tbl_combine") < 0) {
                    alert("조회 결과가 존재하지 않습니다.");
                    $j("#combine_table").html("");
                } else {
                    $j("#combine_table").html(data);
                }

            }
        });
        $j('.combine_table').show();
    },
    //초기화
    reSet: function() {

        var $inputRange = $j('.setup input[type="range"]');
        value = 0;
        $inputRange.val(value).change();

        $j('.setup input[type="range"]').val(11);

        $j('#element_data input[type="range"]').val(0);
        $j('#element_voice input[type="range"]').val(0);
        $j('.element').eq(0).find('.result em').text(12);
        $j('.element').eq(0).find('.result span').text('세 미만');
        $j('.element').eq(1).find('.result em').text(0);
        $j('.element').eq(2).find('.result em').text(0);

        //List
        $j('.list').hide();
        $j('.box_intro').show();

    },

    // OMS 배너 호출 요청
    // zoneCode : 영역 코드 
    getBanner: function(zoneCode, callbackFn) {
        var dataObj = {
            zoneCode: zoneCode
        };

        $j.ajax({
            url: omsOfferDomain + '/offer/v1.0/common/getBanner',
            type: "post",
            data: dataObj,
            dataType: "json",
            timeout: 10000,
            xhrFields: {
                withCredentials: true
            },
            cache: false,
            crossDomain: true,
            cookie: true,
            success: function(data) {
                callbackFn("success", data);
            },
            error: function(request, status, error) {
                callbackFn("error", error);
            }
        });
    },

    getBannerClick: function(resultData) {
        if (resultData != null) {
            trgt.campaignClickLog(resultData.caVal1, resultData.caVal2, resultData.caVal3, 'CL', '^KT-개인_상품서비스_메인^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
            KT_trackClicks(s.pageName, '^KT-개인_상품서비스_메인^맞춤메뉴^타겟오퍼' + resultData.statCd + '^클릭');
        }
    },

};

var planBox = {
    initialize: function() {
        // 비교함 셀렉트 박스 함수
        $j('#subItem-compare').on('click', '.planbox-area .selected', function(e) {

            var selected = $j('.planbox-area .selected');

            selected.closest('th').find('.planbox-area').removeClass('active');
            $j(this).parent().addClass('active');
            e.preventDefault();

            var itemClick = $j(this).next().find('a');

            itemClick.on('click', function(e) {
                e.preventDefault();
                $j('.planbox-area.active').removeClass('active');
            });

            if ($j('.planbox-area.active .select-planlist ul').mouseleave(function() {
                    $j('.planbox-area.active').removeClass('active');
                }));

        });

        $j('.planbox-area').not('active').focusin(function() {
            selected.closest('th').find('.planbox-area').removeClass('active');
            $j(this).parent().find('.planbox-area').addClass('active');
        });

        $j('.layer-close, .layers .btns a').focusin(function() {
            selected.closest('th').find('.planbox-area').removeClass('active');
        });
    }
};

//인덱스 스크립트
var indexScript = {

    //요금제 비교하기 레이어
    subItemLayer: function(obj) {
        var self = $j(obj);
        var target = $j($j(obj).attr("href"));
        $j('.layers[id*="subItem-"]').hide();

        $j.ajax({
            url: '/wDic/getItemPriceCompareInfoAjax.ajax',
            dataType: 'html',
            data: {
                'soc_code_array': indexScript.getCookie('soc_code_array')
            },
            success: function(data) {
                $j('#subItem-compare').empty();
                $j('#subItem-compare').html(data);
                target.attr("tabindex", "0").stop().fadeIn(500).focus();

                /* [심사페이지 71] WAC_ER_케이티닷컴 개인_1st 추가 */
                if ($j('#subItem-compare .table-area thead th a.selected')) {
                    const $thEl = $j('#subItem-compare .table-area thead th a.selected');
                    const $btnEl = $j('#subItem-compare .btns li');
                    $thEl.each(function(index) {
                        $thEl.attr('title', '다른 요금제 선택하기')
                        $btnEl.slice(1).find('a').eq(index).attr('title', $j(this).text() + ' 상세보기');
                    })
                }
                // 로그인 케이스
                if ($j('.myplan .login').hasClass('deactive')) {
                    const $firstThEl = $j('#subItem-compare .table-area thead .myplan-title p').text();
                    if ($firstThEl !== "" || typeof $firstThEl !== undefined || typeof $firstThEl !== null) {
                        $j('#subItem-compare .btns li').find('a').eq(0).attr('title', $firstThEl + " 상세보기")
                    }
                }
                /* // [심사페이지 71] WAC_ER_케이티닷컴 개인_1st 추가 */
            }
        });

        target.on('click', '.layer-close button, .btn-cancel', function() {
            target.stop().fadeOut(500);
            self.focus();
        });

        planBox.initialize();
    },

    //옵션상품 전체 개수 가져오기
    getOptionItemTotalCountAjax: function(callback) {
        var filter_type = $j('#filter_type').val();

        var totalCount = 0;
        var filter_code = $j('#filter_code').val();
        var option_code = $j('#option_code').val();

        // 옵션상품 전체 개수 가져오기
        $j.ajax({
            dataType: "json",
            url: '/wDic/getOptionItemTotalCountAjax.ajax',
            data: {
                "filter_code": filter_code,
                "option_code": option_code
            },
            success: function(data) {
                if (data.data.code == '0000') {
                    totalCount = parseInt(data.data.totalCount);
                    $j('div.search-result > strong').text('총 ' + totalCount + '건');
                    if (totalCount <= 0) {
                        $j('a.btn-more').hide();
                    }
                    indexScript.getOptionItemListAjax(totalCount, callback);
                } else {
                    alert(data.data.message);
                }
            }

        });
    },

    //옵션상품 리스트 가져오기
    getOptionItemListAjax: function(totalCount, callback) {
        var cate_code = $j('#cate_code').val();

        var filter_type = $j('#filter_type').val();

        var filter_code = $j('#filter_code').val();
        var option_code = $j('#option_code').val();

        var pageNo = parseInt($j("#pageNo").val()) + 1;
        var listSize = parseInt($j("#listSize").val());

        //옵션상품 리스트
        $j.ajax({
            url: '/wDic/getOptionItemListAjax.ajax',
            dataType: 'html',
            data: {
                "cate_code": cate_code,
                "pageNo": pageNo,
                "listSize": listSize,
                "filter_code": filter_code,
                "option_code": option_code
            },
            success: function(data) {
                $j('div.plan-list-area').append(data);

                if (totalCount > parseInt(pageNo * listSize)) {
                    $j('#pageNo').val(pageNo);
                    $j('a.btn-more > span').text('더보기(' + (totalCount - $j('table.plan-list').length) + ')');
                    $j('a.btn-more').show();
                } else {
                    $j('a.btn-more').hide();
                }

                if (typeof callback === "function") callback();
            }
        });
    },

    fn_phone_req_popup: function(sUrl) { //상품 관련 전화상담 팝업 버튼 액션(팝업) : 2018/08/09 배포 예정 
        var cw = screen.availWidth;
        var ch = screen.availHeight;

        var sw = 640;
        var sh = 854; //220324 수정
        ml = (cw - sw) / 2;
        mt = (ch - sh) / 2;

        window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=no');
    },

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
        var url_ht_yn = "";
        if (s_url_s == "https") {
            url_ht_yn = "Y";
        } else {
            url_ht_yn = "N";
        }
        var popWidth = 770;
        var popHeight = 800;
        var monScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var monScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var browWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var browHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var cfmLeft = ((browWidth / 2) - (popWidth / 2)) + monScreenLeft;
        var cfmTop = ((browHeight / 2) - (popHeight / 2)) + monScreenTop;
        window.open('/wDic/simple/productJoin.do?soc_code=' + soc_code + '&item_code=' + item_code + '&url_code=PDIC01&pro_d=' + pro_d + '&url_ht_yn=' + url_ht_yn, '_blank', 'width=634px , height=786px , left=' + cfmLeft + ', top=' + cfmTop + ', location=no , toolbar=no ,status=no , resizable=no , menubar=no , scrollbars=yes'); //0430 scrollbars 속성 수정
    },

    fn_openPopup: function(itemCode, file) {
        var popWidth = 860;
        var popHeight = 800;
        var monScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var monScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var browWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var browHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var cfmLeft = ((browWidth / 2) - (popWidth / 2)) + monScreenLeft;
        var cfmTop = ((browHeight / 2) - (popHeight / 2)) + monScreenTop;
        if ($j.trim(file) != '') {
            wDicProd.lnkBtn('/wDic/productBundlePop.do?itemCode=' + itemCode, '_popup');
        } else {
            wDicProd.lnkBtn('/wDic/productDetail.do?ItemCode=' + itemCode + '#prdCmsDetailTabCon_0', '_popup');
        }
    },

    regInfoPop_poppup: function(SocCode, itemCode) { //상품 관련 전화상담 팝업 버튼 액션(팝업) : 2018/08/09 배포 예정 

        var socCode = SocCode;
        var itemCode = itemCode;

        $j.ajax({
            dataType: "html",
            url: "/wDic/regInfoPopup.ajax",
            data: {
                "socCode": socCode,
                "itemCode": itemCode
            },
            success: function(data) {
                $j("#preViewPopup").html(data);
                $j('#popupPosition').attr('tabindex', 0).focus();

            }
        });

    },


    // 쿠키 생성
    setCookie: function(cName, cValue) {
        var expire = new Date();
        expire.setDate(expire.getDate());
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        document.cookie = cookies;
    },

    // 쿠키 가져오기
    getCookie: function(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if (start != -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }
};
/**
 * Util
 * */
var myPriceType = {

    initialize: function(bgData) {

        //기본값 세팅
        var data = bgData.data_average;
        var monthPrice = bgData.monthPrice;
        var fgArraycheck = bgData.fgArraycheck;

        if (fgArraycheck == "5G") {
            $j("#fg-use").attr('title', '선택됨');
            $j("#lte-use").removeAttr('title');
            $j("#5gDiv").css("display", "block");
            $j("#lteDiv").css("display", "none");

            if (data > 9) {
                $j("#fg-fixed2").prop("checked", true);
            } else {
                $j("#fg-fixed1").prop("checked", true);
            }

            if (monthPrice == 11) {
                $j("#fg-price3").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#fg-price1").prop("checked", true);
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", false);
                $j('#fg-benefit2').attr("disabled", true);
                $j('#fg-benefit3').attr("disabled", true);
                $j('#fg-benefit4').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
                $j('#fg-benefit6').attr("disabled", true);
            } else {
                $j("#fg-price2").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit2').attr("disabled", true);
            }


            $j('input[name="lte-age"]').prop("checked", false);
            $j('input[name="lte-fixed"]').prop("checked", false);
            $j('input[name="lte-price"]').prop("checked", false);
            $j('input[name="lte-benefit"]').prop("checked", false);
            $j('input[name="lte-benefit"]').attr("disabled", false);
        } else if (fgArraycheck == "LTE") {

            $j("#lte-use").attr('title', '선택됨');
            $j("#fg-use").removeAttr('title');
            $j("#lte-use").prop("checked", true);
            $j("#5gDiv").css("display", "none");
            $j("#lteDiv").css("display", "block");

            if (data < 3) {
                $j("#lte-fixed1").prop("checked", true);
            } else if (data < 7) {
                $j("#lte-fixed2").prop("checked", true);
            } else {
                $j("#lte-fixed3").prop("checked", true);
            }


            if (monthPrice == 8) {
                $j("#lte-price3").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#lte-price2").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit2').attr("disabled", true);
                $j('#lte-benefit3').attr("disabled", true);
                $j('#lte-benefit4').attr("disabled", true);
            } else {
                $j("#lte-price1").prop("checked", true);
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('input[name="lte-benefit"]').attr("disabled", true);
            }

            $j('input[name="fg-benefit"]').prop("checked", false);
            $j('input[name="fg-benefit"]').attr("disabled", false);
            $j('input[name="fg-data-use"]').prop("checked", false);
            $j('input[name="fg-price"]').prop("checked", false);

        };


    },

    //로그인 후 3개월 체크
    average_use: function() {

        /* WAC_ER_케이티닷컴 개인_1st 수정  */
        $j('#average_use').addClass("active").attr('title', '선택됨');
        $j("#max_use").removeClass("active").removeAttr('title');
        /* // WAC_ER_케이티닷컴 개인_1st 수정  */

        var data = $j('#data_average').val();
        var fgArraycheck = $j('#fgArraycheck').val();
        var monthPrice = $j('#monthPrice').val();

        if (fgArraycheck == '5G') {

            $j("#5gDiv").css("display", "block");
            $j("#lteDiv").css("display", "none");

            if (data > 9) {
                $j("#fg-fixed2").prop("checked", true);
            } else {
                $j("#fg-fixed1").prop("checked", true);
            }

            if (monthPrice == 11) {
                $j("#fg-price3").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#fg-price1").prop("checked", true);
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", false);
                $j('#fg-benefit2').attr("disabled", true);
                $j('#fg-benefit3').attr("disabled", true);
                $j('#fg-benefit4').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
                $j('#fg-benefit6').attr("disabled", true);
            } else {
                $j("#fg-price2").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit2').attr("disabled", true);
            }

            $j('input[name="lte-age"]').prop("checked", false);
            $j('input[name="lte-fixed"]').prop("checked", false);
            $j('input[name="lte-price"]').prop("checked", false);
            $j('input[name="lte-benefit"]').prop("checked", false);
            $j('input[name="lte-benefit"]').attr("disabled", false);


        } else if (fgArraycheck == 'LTE') {

            $j("#lte-use").prop("checked", true);
            $j("#5gDiv").css("display", "none");
            $j("#lteDiv").css("display", "block");

            if (data < 3) {
                $j("#lte-fixed1").prop("checked", true);
            } else if (data < 7) {
                $j("#lte-fixed2").prop("checked", true);
            } else {
                $j("#lte-fixed3").prop("checked", true);
            }


            /*if(monthPrice == ""){
            	$j('input[name="fg-fixed"]').prop("checked",false);
            	$j('input[name="lte-fixed"]').prop("checked",false);
            	$j('input[name="fg-price"]').prop("checked",false);
            	$j('input[name="lte-price"]').prop("checked",false);
            	$j('input[name="lte-benefit"]').attr("disabled",false);
            }else */
            if (monthPrice == 8) {
                $j("#lte-price3").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#lte-price2").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit2').attr("disabled", true);
                $j('#lte-benefit3').attr("disabled", true);
                $j('#lte-benefit4').attr("disabled", true);
            } else {
                $j("#lte-price1").prop("checked", true);
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('input[name="lte-benefit"]').attr("disabled", true);
            }

            $j('input[name="fg-benefit"]').prop("checked", false);
            $j('input[name="fg-benefit"]').attr("disabled", false);
            $j('input[name="fg-data-use"]').prop("checked", false);
            $j('input[name="fg-price"]').prop("checked", false);


        }
    },

    max_use: function() {

        /* WAC_ER_케이티닷컴 개인_1st 수정  */
        $j('#max_use').addClass("active").attr('title', '선택됨');
        $j("#average_use").removeClass("active").removeAttr('title');
        /* // WAC_ER_케이티닷컴 개인_1st 수정  */

        var data = $j('#data_max').val();
        var fgArraycheck = $j('#fgArraycheck').val();
        var monthPrice = $j('#monthPrice').val();

        if (fgArraycheck == '5G') {

            $j("#5gDiv").css("display", "block");
            $j("#lteDiv").css("display", "none");

            if (data > 9) {
                $j("#fg-fixed2").prop("checked", true);
            } else {
                $j("#fg-fixed1").prop("checked", true);
            }

            if (monthPrice == 11) {
                $j("#fg-price3").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#fg-price1").prop("checked", true);
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit1').attr("disabled", false);
                $j('#fg-benefit2').attr("disabled", true);
                $j('#fg-benefit3').attr("disabled", true);
                $j('#fg-benefit4').attr("disabled", true);
                $j('#fg-benefit5').attr("disabled", true);
                $j('#fg-benefit6').attr("disabled", true);
            } else {
                $j("#fg-price2").prop("checked", true);
                $j('input[name="fg-benefit"]').removeAttr("disabled");
                $j('input[name="fg-benefit"]').prop("checked", false);
                $j('#fg-benefit2').attr("disabled", true);
            }

            $j('input[name="lte-age"]').prop("checked", false);
            $j('input[name="lte-fixed"]').prop("checked", false);
            $j('input[name="lte-price"]').prop("checked", false);
            $j('input[name="lte-benefit"]').prop("checked", false);
            $j('input[name="lte-benefit"]').attr("disabled", false);


        } else if (fgArraycheck == 'LTE') {

            $j("#lte-use").prop("checked", true);
            $j("#5gDiv").css("display", "none");
            $j("#lteDiv").css("display", "block");

            if (data < 3) {
                $j("#lte-fixed1").prop("checked", true);
            } else if (data < 7) {
                $j("#lte-fixed2").prop("checked", true);
            } else {
                $j("#lte-fixed3").prop("checked", true);
            }


            /*if(monthPrice == ""){
            	$j('input[name="fg-fixed"]').prop("checked",false);
            	$j('input[name="lte-fixed"]').prop("checked",false);
            	$j('input[name="fg-price"]').prop("checked",false);
            	$j('input[name="lte-price"]').prop("checked",false);
            	$j('input[name="lte-benefit"]').attr("disabled",false);
            }else */
            if (monthPrice == 8) {
                $j("#lte-price3").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit5').attr("disabled", true);
            } else if (monthPrice == 5) {
                $j("#lte-price2").prop("checked", true);
                $j('input[name="lte-benefit"]').removeAttr("disabled");
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('#lte-benefit2').attr("disabled", true);
                $j('#lte-benefit3').attr("disabled", true);
                $j('#lte-benefit4').attr("disabled", true);
            } else {
                $j("#lte-price1").prop("checked", true);
                $j('input[name="lte-benefit"]').prop("checked", false);
                $j('input[name="lte-benefit"]').attr("disabled", true);
            }
            $j('input[name="fg-benefit"]').prop("checked", false);
            $j('input[name="fg-benefit"]').attr("disabled", false);
            $j('input[name="fg-data-use"]').prop("checked", false);
            $j('input[name="fg-price"]').prop("checked", false);


        }
    },

    //초기화
    reSet: function() {

        //5g
        //데이터 이용량 초기화
        $j('input[name="fg-data-use"]').removeAttr('checked');
        $j('input[name="fg-data-use"]').prop("checked", false);
        //월 요금 초기화
        $j('input[name="fg-price"]').removeAttr('checked');
        $j('input[name="fg-price"]').prop("checked", false);
        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="fg-benefit"]').removeAttr('checked');
        $j('input[name="fg-benefit"]').prop("checked", false);
        $j('input[name="fg-benefit"]').attr('disabled', false);


        //lte
        //나이 초기화
        $j('input[name="lte-age"]').removeAttr('checked');
        $j('input[name="lte-age"]').prop("checked", false);
        //데이터 이용량 초기화
        $j('input[name="lte-fixed"]').removeAttr('checked');
        $j('input[name="lte-fixed"]').prop("checked", false);
        //월 요금 초기화
        $j('input[name="lte-price"]').removeAttr('checked');
        $j('input[name="lte-price"]').prop("checked", false);

        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="lte-benefit"]').removeAttr('checked');
        $j('input[name="lte-benefit"]').prop("checked", false);
        $j('input[name="lte-benefit"]').attr('disabled', false);
        $j("#fare_list").html('');
    },

    //조회하기

    search: function() {

        var kind_use = $j('input[name="kind-use"]:checked').val();

        if (kind_use == "5G") {

            var benefits = "";
            var age = "";
            var fg_data_use = $j('input[name="fg-data-use"]:checked').val();
            var fg_price = $j('input[name="fg-price"]:checked').val();
            var fg_benefit1 = $j('input[id="fg-benefit1"]:checked').val();
            if (fg_benefit1 == undefined) {
                fg_benefit1 = "";
            };
            var fg_benefit2 = $j('input[id="fg-benefit2"]:checked').val();
            if (fg_benefit2 == undefined) {
                fg_benefit2 = "";
            };
            var fg_benefit3 = $j('input[id="fg-benefit3"]:checked').val();
            if (fg_benefit3 == undefined) {
                fg_benefit3 = "";
            };
            var fg_benefit4 = $j('input[id="fg-benefit4"]:checked').val();
            if (fg_benefit4 == undefined) {
                fg_benefit4 = "";
            };
            var fg_benefit5 = $j('input[id="fg-benefit5"]:checked').val();
            if (fg_benefit5 == undefined) {
                fg_benefit5 = "";
            };
            var fg_benefit6 = $j('input[id="fg-benefit6"]:checked').val();
            if (fg_benefit6 == undefined) {
                fg_benefit6 = "";
            };



            if (fg_data_use == undefined || fg_data_use == "") {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }
            if (fg_price == undefined || fg_price == "") {
                alert("월 요금을 선택해주세요.");
                return;
            }

            if (kind_use = "5G") {
                age = '0';
            }

            var dataObj = {
                kind: kind_use,
                datas: fg_data_use,
                age: age,
                price: fg_price,
                benefits1: fg_benefit1,
                benefits2: fg_benefit2,
                benefits3: fg_benefit3,
                benefits4: fg_benefit4,
                benefits5: fg_benefit5,
                benefits6: fg_benefit6,
                ppCode: $j('#ppCode').val()
            }

        } else if (kind_use == "LTE") {

            var benefits = "";
            var age = $j('input[name="lte-age"]:checked').val();
            var datas = $j('input[name="lte-fixed"]:checked').val();
            var price = $j('input[name="lte-price"]:checked').val();

            var lte_benefit1 = $j('input[id="lte-benefit1"]:checked').val();
            if (lte_benefit1 == undefined) {
                lte_benefit1 = "";
            };
            var lte_benefit2 = $j('input[id="lte-benefit2"]:checked').val();
            if (lte_benefit2 == undefined) {
                lte_benefit2 = "";
            };
            var lte_benefit3 = $j('input[id="lte-benefit3"]:checked').val();
            if (lte_benefit3 == undefined) {
                lte_benefit3 = "";
            };
            var lte_benefit4 = $j('input[id="lte-benefit4"]:checked').val();
            if (lte_benefit4 == undefined) {
                lte_benefit4 = "";
            };
            var lte_benefit5 = $j('input[id="lte-benefit5"]:checked').val();
            if (lte_benefit5 == undefined) {
                lte_benefit5 = "";
            };

            if (age == undefined || age == "") {
                alert("연령대를 선택해주세요.");
                return;
            }
            if (datas == undefined || datas == "") {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }

            if (price == undefined || price == "") {
                alert("월 요금을 선택해주세요.");
                return;
            }


            var dataObj = {
                kind: kind_use,
                datas: datas,
                age: age,
                price: price,
                benefits1: lte_benefit1,
                benefits2: lte_benefit2,
                benefits3: lte_benefit3,
                benefits4: lte_benefit4,
                benefits5: lte_benefit5,
                ppCode: $j('#ppCode').val()
            }

        }
        //추천요금제 영역 초기화
        $j("#fare_list").html('');

        $j.ajax({
            url: $j("#pageConId").val() + "/myPriceType/list.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#fare_list").html(rv);
            },
            error: function() {
                //얼럿문구
                alert('일시적으로 연결이 지연되고 있습니다.\n새로고침 후 다시 시도해 주세요.');
            },
            complete: function() {
                var top = $j(".btn-chage-center").offset().top;
                $j('body, html').scrollTop(top - 80);


            }
        });

        $j('.fare-list-area').show();
    },

    goUser: function(idx) {

        $j.ajax({
            url: $j("#pageConId").val() + "/newThreeMonthDataTelAverageMaxInfo.ajax",
            type: "post",
            data: {
                "idx": idx
            },
            timeout: 10000,
            success: function(rv) {
                var inputData = rv.data;

                if (inputData.resultCode == "0000") {

                    var fgArraycheck = inputData.fgArraycheck;
                    var data = inputData.user.data_average;
                    var monthPrice = inputData.monthPrice;

                    $j('#monthPrice').val(inputData.monthPrice);
                    $j('#fgArraycheck').val(inputData.fgArraycheck);
                    $j('#data_average').val(inputData.user.data_average);
                    $j('#data_max').val(inputData.user.data_max);

                    $j('.bottom-area .sel span').html(inputData.userName);
                    $j('.ppName').text(inputData.ppName);
                    $j('#ppCode').val(inputData.ppCode);

                    $j('#max_use').removeClass('active');
                    $j('#average_use').addClass('active');

                    if (fgArraycheck == "5G") {
                        $j("#fg-use").attr('title', '선택됨');
                        $j("#lte-use").removeAttr('title');
                        $j("#5gDiv").css("display", "block");
                        $j("#lteDiv").css("display", "none");

                        if (data > 9) {
                            $j("#fg-fixed2").prop("checked", true);
                        } else {
                            $j("#fg-fixed1").prop("checked", true);
                        }

                        if (monthPrice == 11) {
                            $j("#fg-price3").prop("checked", true);
                            $j('input[name="fg-benefit"]').removeAttr("disabled");
                            $j('input[name="fg-benefit"]').prop("checked", false);
                            $j('#fg-benefit1').attr("disabled", true);
                            $j('#fg-benefit5').attr("disabled", true);
                        } else if (monthPrice == 5) {
                            $j("#fg-price1").prop("checked", true);
                            $j('input[name="fg-benefit"]').prop("checked", false);
                            $j('#fg-benefit1').attr("disabled", false);
                            $j('#fg-benefit2').attr("disabled", true);
                            $j('#fg-benefit3').attr("disabled", true);
                            $j('#fg-benefit4').attr("disabled", true);
                            $j('#fg-benefit5').attr("disabled", true);
                            $j('#fg-benefit6').attr("disabled", true);
                        } else {
                            $j("#fg-price2").prop("checked", true);
                            $j('input[name="fg-benefit"]').removeAttr("disabled");
                            $j('input[name="fg-benefit"]').prop("checked", false);
                            $j('#fg-benefit2').attr("disabled", true);
                        }


                        $j('input[name="lte-age"]').prop("checked", false);
                        $j('input[name="lte-fixed"]').prop("checked", false);
                        $j('input[name="lte-price"]').prop("checked", false);
                        $j('input[name="lte-benefit"]').prop("checked", false);
                        $j('input[name="lte-benefit"]').attr("disabled", false);
                    } else if (fgArraycheck == "LTE") {

                        $j("#lte-use").attr('title', '선택됨');
                        $j("#fg-use").removeAttr('title');
                        $j("#lte-use").prop("checked", true);
                        $j("#5gDiv").css("display", "none");
                        $j("#lteDiv").css("display", "block");

                        if (data < 3) {
                            $j("#lte-fixed1").prop("checked", true);
                        } else if (data < 7) {
                            $j("#lte-fixed2").prop("checked", true);
                        } else {
                            $j("#lte-fixed3").prop("checked", true);
                        }

                        /*if(monthPrice == ""){
                        	$j('input[name="fg-fixed"]').prop("checked",false);
                        	$j('input[name="lte-fixed"]').prop("checked",false);
                        	$j('input[name="fg-price"]').prop("checked",false);
                        	$j('input[name="lte-price"]').prop("checked",false);
                        	$j('input[name="lte-benefit"]').attr("disabled",false);
					
                        }else */
                        if (monthPrice == 8) {
                            $j("#lte-price3").prop("checked", true);
                            $j('input[name="lte-benefit"]').removeAttr("disabled");
                            $j('input[name="lte-benefit"]').prop("checked", false);
                            $j('#lte-benefit5').attr("disabled", true);
                        } else if (monthPrice == 5) {
                            $j("#lte-price2").prop("checked", true);
                            $j('input[name="lte-benefit"]').removeAttr("disabled");
                            $j('input[name="lte-benefit"]').prop("checked", false);
                            $j('#lte-benefit2').attr("disabled", true);
                            $j('#lte-benefit3').attr("disabled", true);
                            $j('#lte-benefit4').attr("disabled", true);
                        } else {
                            $j("#lte-price1").prop("checked", true);
                            $j('input[name="lte-benefit"]').prop("checked", false);
                            $j('input[name="lte-benefit"]').attr("disabled", true);
                        }

                        $j('input[name="fg-benefit"]').prop("checked", false);
                        $j('input[name="fg-benefit"]').attr("disabled", false);
                        $j('input[name="fg-data-use"]').prop("checked", false);
                        $j('input[name="fg-price"]').prop("checked", false);
                    };

                    $j('.selbox').hide();
                    $j("#fare_list").empty();

                } else if (inputData.resultCode == "9998") {
                    alert("로그인후 다시 이용해주세요.");
                    return;
                } else {
                    alert("데이터 정보 조회에 실패 하였습니다. 다시 시도해 주세요.");
                    return;
                }
            }
        });
    }
};

var mobileDCProgram = {
    initialize: function(bgData) {
        $j(function() {
            $j(".visual ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");
        });
    }
};

var newRegLimitProgram = {
    initialize: function(utilCode, codeObj, bgData) {
        $j(function() {
            $j(".visual ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");

            var mobileCatecode = codeObj.mobileCatecode;
            var internetCatecode = codeObj.internetCatecode;
            var serviceCatecode = codeObj.serviceCatecode;
            /**
             * 카테고리 초기 세팅
             * */
            var changeCateCode = $j("#hiddenCataCode").val();

            if (changeCateCode != '') {
                $j("#hiddenCataCode").val(changeCateCode);

                if (changeCateCode == '6032,6033') {
                    $j("#title_menu3").addClass("active");
                } else if (changeCateCode == '6005,6006') {
                    $j("#title_menu2").addClass("active");
                } else {
                    $j("#title_menu1").addClass("active");
                }
                newRegLimitProgram.getNewRegLimitProductList(changeCateCode, utilCode);
            } else {
                $j("#hiddenCataCode").val(mobileCatecode);
                $j("#title_menu1").addClass("active");
                newRegLimitProgram.getNewRegLimitProductList(mobileCatecode, utilCode);
            }


            $j(".only").on("click", "li", function() {
                $j(".only li").removeClass("active");
                $j(this).addClass("active");

            });

            //더보기
            $j("#btn_more").css('cursor', 'pointer');
            $j("#btn_more").click(function() {

                var returnpageNum = $j("#pageNum").val();
                $j("#pageNum").val(Number(returnpageNum) + 1);
                $j("#flag").val('');
                newRegLimitProgram.getNewRegLimitProductList($j("#hiddenCataCode").val(), utilCode);
            });

            /**
             * 카테고리 메뉴
             * */
            $j("#title_menu li:nth-child(1)").click(function() {
                $j("#fare-list").html("");
                $j("#pageNum").val('');
                $j("#hiddenCataCode").val(mobileCatecode);
                newRegLimitProgram.getNewRegLimitProductList(mobileCatecode, utilCode);
            });
            $j("#title_menu li:nth-child(2)").click(function() {
                $j("#pageNum").val('');
                $j("#fare-list").html("");
                $j("#hiddenCataCode").val(internetCatecode);
                newRegLimitProgram.getNewRegLimitProductList(internetCatecode, utilCode);
            });
            $j("#title_menu li:nth-child(3)").click(function() {
                $j("#pageNum").val('');
                $j("#fare-list").html("");
                $j("#hiddenCataCode").val(serviceCatecode);
                newRegLimitProgram.getNewRegLimitProductList(serviceCatecode, utilCode);
            });

        });
    },

    getNewRegLimitProductList: function(cateCode, utilCode) {

        var pageNum = $j("#pageNum").val();

        var flag = $j("#flag").val();

        if (pageNum == undefined || pageNum == "") {

            pageNum = $j("#pageNum").val(1);

        } else {
            pageNum = $j("#pageNum").val();


        }

        var ItemCode = $j("#ItemCode").val();

        var pageNum = $j("#pageNum").val();

        var objData = {

            utilCode: utilCode,
            CardCnt: 0,
            cateCode: cateCode,
            pageNum: pageNum,
            flag: flag,
            ItemCode: ItemCode
        };

        $j.ajax({
            url: $j("#pageConId").val() + '/newRegLimitProgram/listCount.ajax',
            type: "POST",
            dataType: 'json',
            timeout: 10000,
            data: objData,
            success: function(rv) {
                var data = rv.data;
                var pageMod = data.pageMod;
                var page = data.page;
                $j("#totalPage").val(page);

                if (Number($j("#totalPage").val()) == Number($j("#pageNum").val())) {
                    $j("#btn_more").hide();
                } else {
                    $j("#btn_more").show();
                }

                var cntMod = data.cntMod;
                $j("#btn_title").html("더보기(" + cntMod + ")");
            }
        });

        $j.ajax({
            url: $j("#pageConId").val() + '/newRegLimitProgram/list.ajax',
            type: "POST",
            dataType: 'html',
            timeout: 10000,
            data: objData,
            success: function(rv) {
                var testval = $j("#hiddenCataCode").val();
                $j('#fare-list').html($j('#fare-list').html() + rv);
                if (ItemCode != '') {
                    if (flag != '') {
                        callbackItem();
                    }
                }
            }
        });
    }
};

var mvno = {
    initialize: function(utilCode, bgData) {
        $j(function() {
            $j(".visual ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");
        });

        //최초 데이
        mvno.getNewMvnoList(utilCode);

        //더보기
        $j("#btn_more").css('cursor', 'pointer');
        $j("#btn_more").click(function() {
            mvno.getNewMvnoList(utilCode);
        });
    },

    getNewMvnoList: function(utilCode) {
        var pageNum = $j("#pageNum").val();

        if (pageNum == undefined) {
            pageNum = 1;
        } else {
            $j("#pageNum").val(Number(pageNum) + 1);

        }

        var pageNum = $j("#pageNum").val();
        $j.ajax({
            url: $j("#pageConId").val() + '/mvno/list.ajax',
            dataType: 'html',
            timeout: 10000,
            data: {
                "pageNum": pageNum,
                "utilCode": utilCode
            },
            success: function(data) {
                $j("#fare-list").append(data);

            }
        });
    },

    morePriceInfo: function(id, htmlUrl, altText) {
        var selectedId;
        var feeInfoAttr;
        var readmoreAttr = "detailClickStatistics.click('KT-개인_상품서비스_모바일_요금제', '^KT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^요금정보 더보기^자세히 보기');";
        selectedId = id;
        if (selectedId == id) {
            if ($j("#text" + selectedId).hasClass('active')) {
                feeInfoAttr = "javascript:mvno.morePriceInfo(" + id + ",'" + htmlUrl + "','" + altText + "'); detailClickStatistics.click('KT-개인_상품서비스_모바일_요금제', '^KT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^요금정보 더보기');";
                $j("#item" + selectedId).hide();
                $j("#text" + selectedId).find('i').text("요금정보 더보기");
                $j("#text" + selectedId).attr("onclick", feeInfoAttr);
                $j("#text" + selectedId).removeClass('active');

                $j.ajax({
                    url: htmlUrl,
                    dataType: 'html',
                    type: 'GET',
                    success: function(data) {
                        $j("#item" + id).html(data);
                    }
                });

            } else {
                feeInfoAttr = "javascript:mvno.morePriceInfo(" + id + ",'" + htmlUrl + "','" + altText + "'); detailClickStatistics.click('KT-개인_상품서비스_모바일_요금제', '^KT-개인_상품서비스_모바일_요금제^KT 알뜰폰 프렌즈^" + altText + "^목록닫기');";
                $j("#text" + selectedId).find('i').text('목록닫기');
                $j("#text" + selectedId).attr("onclick", feeInfoAttr);
                $j("#item" + selectedId).show();
                $j("#text" + selectedId).addClass('active');


                $j.ajax({
                    url: htmlUrl,
                    dataType: 'html',
                    type: 'GET',
                    success: function(data) {
                        $j("#item" + id).html(data);
                        $j(".pointer").find('a.is-line-lightgray').attr("onclick", readmoreAttr);
                    }
                });
            }
        }
    }
};

var myTvPriceType = {
    initialize: function(bgData) {
        $j(function() {
            $j(".visual ").css("background-image", "url('" + bgData.utilityImgPathUtil + bgData.img_over_name + "')");
        });
    },

    //초기화
    reSet: function() {
        $j("input:radio[name=options1]").prop('checked', false);
        $j("input:radio[name=options2]").prop('checked', false);
        $j("input:checkbox[name=options3]").prop('checked', false);
        $j("input:radio[name=options4]").prop('checked', false);
        $j("input:radio[name=options5]").prop('checked', false);
        $j("#input-age").val("");
        $j('div.fare-list-area').empty();
    },

    //조회하기
    search: function() {
        var count = 0;
        var q3 = 0;
        if ($j("#survey-box input:radio[name='options1']").is(':checked') == false) {
            alert('1번 항목을 선택해 주세요.');
            $j("#survey-box input:radio[name='options1']").first().focus();
            return;
        }
        if ($j("#survey-box input:radio[name='options2']").is(':checked') == false) {
            alert('2번 항목을 선택해 주세요.');
            $j("#survey-box input:radio[name='options2']").first().focus();
            return;
        }

        var Q3Val = [];
        for (var i = 0; i < $j("#survey-box input:checkbox[name=options3]").length; i++) {

            if ($j("#survey-box input:checkbox[name=options3]")[i].checked == true) {
                count++;
                Q3Val[i] = $j("#survey-box input:checkbox[name=options3]")[i].value;
            }
        }

        if (count < 2) {
            alert('2개 이상 선택 가능 합니다.');
            return;
        }

        //성인 1, 키즈/교육/다큐교양/글로벌 2, 드라마,스포츠,예능 3
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

        if ($j("#survey-box input:radio[name='options4']").is(':checked') == false) {
            alert('4번 항목을 선택해 주세요.');
            $j("#survey-box input:radio[name='options4']").first().focus();
            return;
        }
        if ($j("#survey-box input:radio[name='options5']").is(':checked') == false) {
            alert('5번 항목을 선택해 주세요.');
            $j("#survey-box input:radio[name='options5']").first().focus();
            return;
        }

        if ($j("#survey-box input:radio[name='options5']:checked").val() == "Y") {
            if ($j("#input-age").val() == "") {
                alert('나이를 적어 주세요.');
                return;
            }
        } else if ($j("#survey-box input:radio[name='options5']:checked").val() == "N") {
            $j("#input-age").val("");
        }

        $j.ajax({
            url: $j("#pageConId").val() + '/myTvPriceType/list.ajax',
            type: "post",
            dataType: "html",
            timeout: 10000,
            data: {
                "q1": $j("input:radio[name=options1]:checked").val(),
                "q2": $j("input:radio[name=options2]:checked").val(),
                "q3": q3,
                "q4": $j("input:radio[name=options4]:checked").val(),
                "q5": $j("input:radio[name=options5]:checked").val(),
                "age": $j("#input-age").val()
            },
            success: function(data) {
                $j('div.fare-list-area').html(data);
            }
        });
    },
};

/*230307 내게 맞는 국제전화 요금제 찾기 메뉴삭제 관련 주석조치*/
/*var international_find = {
	initialize : function(bgData){
		$j(".visual ").css("background-image","url('"+ bgData.utilityImgPathUtil + bgData.img_over_name +"')");

		international_find.searchNational('ㄱ');
		
		//STEP1 국가 선택
		
		$j(".select-country .sorting ").on('click','button', function(){

				$j(".sorting button").removeClass('active').removeAttr('title');
				$j(this).addClass("active").attr('title', '선택됨');
				
                

		});

		//초성선택

		$j(".sorting button").click(function(){

			$j("#sortingList").html('');
			international_find.searchNational($j(this).attr("data-chosung"));
		});

		
		//국가선택 파라미터
		
		$j("#sortingList").on('click','span',function(){

			$j("#sortingList span").css("color","#666");
			$j(this).css("color","red");
			$j("#nationInput").val($j(this).attr("data-target"));
		});




	},

	
	//내게 맞는 국제전화 요금제 조회하기
	
	//초기화
	reSetSearch : function(){
		international_find.reSet();
	},

	//조회하기
	search : function(){
		international_find.getNewInternationalFind();
	},

	searchNational : function(initials){
		$j.ajax({
			url:$j("#pageConId").val() + '/international_find/searchNational.ajax'
			,type:"post"
			,data: {"initials" : initials}
			,timeout: 10000
			,success:function(data) {
				$j("#sortingList").append(data);
			}
		});
	},

	getNewInternationalFind : function(){
		if($j("#nationInput").val() == ""){
			alert("국가를 선택해 주세요");
			return;
		}
		if($j("#use_average").val() == ""){
			alert("월평균 통화 횟수를 입력해 주세요");
			return;
		}
		if($j("#min_average").val() == ""){
			alert("1회 평균 통화시간을 분단위로 입력해 주세요");
			return;
		}

		var dataObj = {
				"nationName" : $j("#nationInput").val()
		}
		$j.ajax({
			url:$j("#pageConId").val() + '/international_find/new_international_findList.ajax'
			,type:"post"
			,dataType : 'json'
			,data : dataObj
			,timeout: 10000
			,success:function(data) {


				var newNationExpectPriceInfo = data.data.newNationExpectPriceInfo;

				if(newNationExpectPriceInfo == 0){
					alert("해당 국가 데이터가 없습니다");
					$j("#box-area").hide();
					$j("#fare-list-area").hide()
					return;
				}

				var naName =  '국가번호 <strong>'+newNationExpectPriceInfo.nation_num+'</strong>';
				var nTime =  '현지시간 <strong>'+data.data.strDate+'</strong>';
				var nDate =  '시차 <strong>'+newNationExpectPriceInfo.time_diff + "시간"+'</strong>';

				$j("#result_nation").html(newNationExpectPriceInfo.nation_name);
				$j("#result_country-info1").html(naName);
				$j("#result_country-info2").html(nTime);
				$j("#result_country-info3").html(nDate);

				international_find.getNationCash(newNationExpectPriceInfo.first,newNationExpectPriceInfo.second,newNationExpectPriceInfo.third,newNationExpectPriceInfo.alzza)


				international_find.showNationExpectPriceInfo(newNationExpectPriceInfo);

				$j("#box-area").show();
				$j("#fare-list-area").show()

			}
		});
	},

	reSet : function(){
		$j("#sortingList span").css("color","#666");

		$j("#use_average").val('')
		$j("#min_average").val('')
		$j("#box-area").hide();
		$j("#fare-list-area").hide()
	},

	showNationExpectPriceInfo : function(price){
		if(price == null || price == "undefined" || price.nation_name == null || price.nation_name == "undefined"){
			alert("존재하지 않는 국가입니다 다시 입력해주세요.");
			$j("#search_nation").focus();
			$j("#search_nation").val("");
			return;
		}
		var nationA = ["미국","중국","일본","캐나다","홍콩","태국","러시아","싱가포르"];
		var nationB = ["베트남","말레이시아","대만","인도네시아","인도","필리핀"];
		var nationC = ["호주","뉴질랜드","영국","독일","프랑스","이탈리아"];
		var freeMinA = [30, 50, 100, 330, 650, 1000];
		var freeMinB = [13, 25, 50, 160, 300, 480];
		var freeMinC = [13, 25, 60, 200, 350, 550];
		var nationList = ["미국","중국","일본","캐나다","홍콩","태국","러시아","싱가포르","베트남","말레이시아","대만","인도네시아","인도","필리핀","호주","뉴질랜드","영국","독일","프랑스","이탈리아"];
		var nationFlag = 0;// 0:미대상국, 1:대상국
		for(var i = 0;i<nationList.length;i++) {
			if(nationList[i] == price.nation_name) {
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
		for(var i = 0;i<nationA.length;i++) {
			if(nationA[i] == price.nation_name) {
				freeMin3000 = freeMinA[0];
				freeMin5000 = freeMinA[1];
				freeMin1 = freeMinA[2];
				freeMin3 = freeMinA[3];
				freeMin5 = freeMinA[4];
				freeMin7 = freeMinA[5];
			}
		}
		for(var i = 0;i<nationB.length;i++) {
			if(nationB[i] == price.nation_name) {
				freeMin3000 = freeMinB[0];
				freeMin5000 = freeMinB[1];
				freeMin1 = freeMinB[2];
				freeMin3 = freeMinB[3];
				freeMin5 = freeMinB[4];
				freeMin7 = freeMinB[5];
			}
		}
		for(var i = 0;i<nationC.length;i++) {
			if(nationC[i] == price.nation_name) {
				freeMin3000 = freeMinC[0];
				freeMin5000 = freeMinC[1];
				freeMin1 = freeMinC[2];
				freeMin3 = freeMinC[3];
				freeMin5 = freeMinC[4];
				freeMin7 = freeMinC[5];
			}
		}

		$j("#diff_dt").val(international_find.getDiffTime(price.time_diff));
		$j("#diff_week").val("");

		var tong_tmp_min = Number($j("#min_average").val()) * Number($j("#use_average").val());
		var	tmp_standard		= Number(price.standard) * tong_tmp_min * 1.1;
		var	tmp_mobile_tel      = Number(price.mobile_tel) * tong_tmp_min * 1.1;
		var	tmp_mobile_mob      = Number(price.mobile_mob) * tong_tmp_min * 1.1;
		var	tmp_alzza			= Number(price.alzza) * tong_tmp_min * 1.1;

		//스페셜DC 요금제(249) DB에 부가세로직까지 적용되어 들어가 있는 상태므로 하기 부가세로직 제외시킴
		//var	tmp_sp_special		= Number(price.sp_special) * tong_tmp_min * 1.1;
		//var	tmp_sp_asia			= Number(price.sp_asia) * tong_tmp_min * 1.1;
		//var	tmp_sp_america		= Number(price.sp_america) * tong_tmp_min * 1.1;
		//var	tmp_sp_europe		= Number(price.sp_europe) * tong_tmp_min * 1.1;
		
		var	tmp_sp_special		= Number((price.sp_special).replace(",","")) * tong_tmp_min;
		var	tmp_sp_asia			= Number((price.sp_asia).replace(",","")) * tong_tmp_min;
		var	tmp_sp_america		= Number((price.sp_america).replace(",","")) * tong_tmp_min;
		var	tmp_sp_europe		= Number((price.sp_europe).replace(",","")) * tong_tmp_min;

		var	tmp_biz_basic		= Number(price.biz_basic) * tong_tmp_min * 1.1;
		var	tmp_biz_asia		= Number(price.biz_asia) * tong_tmp_min * 1.1;
		var	tmp_biz_america		= Number(price.biz_america) * tong_tmp_min * 1.1;
		var	tmp_biz_europe		= Number(price.biz_europe) * tong_tmp_min * 1.1;
		var	tmp_other_002		= Number(price.other_002) * tong_tmp_min * 1.1;
		var	tmp_other_00700		= Number(price.other_00700) * tong_tmp_min * 1.1;

		var value = "tong_tmp_min " + tong_tmp_min +"<br>";
		value = value + "tmp_standard " + tmp_standard +"<br>";
		value = value + "tmp_mobile_tel " + tmp_mobile_tel +"<br>";
		value = value + "tmp_mobile_mob " + tmp_mobile_mob +"<br>";
		value = value + "tmp_alzza " + tmp_alzza +"<br>";
		value = value + "tmp_sp_special " + tmp_sp_special +"<br>";
		value = value + "tmp_sp_asia " + tmp_sp_asia +"<br>";
		value = value + "tmp_sp_america " + tmp_sp_america +"<br>";
		value = value + "tmp_sp_europe " + tmp_sp_europe +"<br>";
		value = value + "tmp_biz_basic " + tmp_biz_basic +"<br>";
		value = value + "tmp_biz_asia " + tmp_biz_asia +"<br>";
		value = value + "tmp_biz_america " + tmp_biz_america +"<br>";
		value = value + "tmp_biz_europe " + tmp_biz_europe +"<br>";
		value = value + "tmp_other_002 " + tmp_other_002 +"<br>";
		value = value + "tmp_other_00700 " + tmp_other_00700 +"<br>";

		$j("#standard").html(international_find.setNumber(tmp_standard));
		$j("#mobile_tel").html(international_find.setNumber(tmp_mobile_tel));
		$j("#mobile_mob").html(international_find.setNumber(tmp_mobile_mob));
		$j("#alzza").html(international_find.setNumber(tmp_alzza));
		$j("#sp_special").html(international_find.setNumber(tmp_sp_special));
		$j("#sp_asia").html(international_find.setNumber(tmp_sp_asia));
		$j("#sp_america").html(international_find.setNumber(tmp_sp_america));
		$j("#sp_europe").html(international_find.setNumber(tmp_sp_europe));
		$j("#biz_basic").html(international_find.setNumber(tmp_biz_basic));
		$j("#biz_asia").html(international_find.setNumber(tmp_biz_asia));
		$j("#biz_america").html(international_find.setNumber(tmp_biz_america));
		$j("#biz_europe").html(international_find.setNumber(tmp_biz_europe));
		$j("#other_002").html(international_find.setNumber(tmp_other_002));
		$j("#other_00700").html(international_find.setNumber(tmp_other_00700));
		var	result_tong3000 = "";
		var	result_tong5000 = "";
		var	result_tong1 = "";
		var	result_tong3 = "";
		var	result_tong5 = "";
		var	result_tong7 = "";
		var	result_tong_memo3000 = "";
		var	result_tong_memo5000 = "";
		var	result_tong_memo1 = "";
		var	result_tong_memo3 = "";
		var	result_tong_memo5 = "";
		var	result_tong_memo7 = "";
		var	dbTong3000 = Number(price.tong3000) * tong_tmp_min * 1.1;
		var	dbTong5000 = Number(price.tong5000) * tong_tmp_min * 1.1;
		var	dbTong1 = price.tong10000;
		var	dbTong3 = Number(price.tong30000) * tong_tmp_min * 1.1;
		var	dbTong5 = Number(price.tong50000) * tong_tmp_min * 1.1;
		var	dbTong7 = Number(price.tong70000) * tong_tmp_min * 1.1;
		if(dbTong1.replace(/^\s+|\s+$j/g,'') == "-") {
			result_tong3000 = "-";
			result_tong5000 = "-";
			result_tong1 = "-";
			result_tong3 = "-";
			result_tong5 = "-";
			result_tong7 = "-";
			result_tong_memo3000 = "<a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
			result_tong_memo5000 = result_tong_memo3000;
			result_tong_memo1 = result_tong_memo3000;
			result_tong_memo3 = result_tong_memo3000;
			result_tong_memo5 = "<a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=245' target='_blank'>알짜요금</a>이 적용됩니다.";
			result_tong_memo7 = result_tong_memo5;
		}else dbTong1 = Number(price.tong10000) * tong_tmp_min * 1.1;


		if(price.nation_name != '일본') {

			if(freeMin3000 != 0){
				if(dbTong3000 < 3300) {
					//무조건 월정액 표시
					result_tong3000 = international_find.setNumber('3300');
					result_tong_memo3000 = freeMin3000 + "분 무료통화 월정액 3,300원 기준입니다.";
				} else {
					result_tong3000 = international_find.setNumber(dbTong3000);
					result_tong_memo3000 = freeMin3000 + "분 무료통화 월정액 3,300원 기준입니다.";
				}
			}else{
				result_tong3000 = international_find.setNumber('0');
				result_tong_memo3000 = notTongMsg;
			}
		} else {
			result_tong3000 = "-";
			result_tong_memo3000 = "<a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
		}

		if(price.nation_name != '일본') {

			if(freeMin5000 != 0){
				if(dbTong5000 < 5500) {
					// 무조건 월정액 표시
					result_tong5000 = international_find.setNumber('5500');
					result_tong_memo5000 = freeMin5000 + "분 무료통화 월정액 5,500원 기준입니다.";
				} else {
					result_tong5000 = international_find.setNumber(dbTong5000);
					result_tong_memo5000 = freeMin5000 + "분 무료통화 월정액 5,500원 기준입니다.";
				}
			}else{
				result_tong5000 = international_find.setNumber('0');
				result_tong_memo5000 = notTongMsg;
			}
		} else {
			result_tong5000 = "-";
			result_tong_memo5000 = "<a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=244' target='_blank'>대상 국가</a>가 아니며 <a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
		}
		if(freeMin1 != 0 || freeMin3 != 0 || freeMin5 != 0 || freeMin7 != 0){
			if(dbTong1 < 11000) {
				//무조건 월정액 표시
				result_tong1 = international_find.setNumber('11000');
				result_tong_memo1 = freeMin1 + "분 무료통화 월정액 11,000원 기준입니다.";
			} else {
				result_tong1 = international_find.setNumber(dbTong1);
				result_tong_memo1 = freeMin1 + "분 무료통화 월정액 11,000원 기준입니다."
			}
			if(dbTong3 < 33000) {
				//무조건 월정액 표시
				result_tong3 = international_find.setNumber('33000');
				result_tong_memo3 = freeMin3 + "분 무료통화 월정액 33,000원 기준입니다.";
			} else {
				result_tong3 = international_find.setNumber(dbTong3);
				result_tong_memo3 = freeMin3 + "분 무료통화 월정액 33,000원 기준입니다.";
			}
			if(dbTong5 < 55000) {
				// 무조건 월정액 표시
				result_tong5 = international_find.setNumber('55000');
				result_tong_memo5 = freeMin5 + "분 무료통화 월정액 55,000원 기준입니다.";
			} else {
				result_tong5 = international_find.setNumber(dbTong5);
				result_tong_memo5 = freeMin5 + "분 무료통화 월정액 55,000원 기준입니다.";
			}
			if(dbTong7 < 77000) {
				//무조건 월정액 표시
				result_tong7 = international_find.setNumber('77000');
				result_tong_memo7 = freeMin7 + "분 무료통화 월정액77,000원 기준입니다.";
			} else {
				result_tong7 = international_find.setNumber(dbTong7);
				result_tong_memo7 = freeMin7 + "분 무료통화 월정액77,000원 기준입니다."
			}
		}else{
			result_tong1 = international_find.setNumber('0');
			result_tong_memo1 = notTongMsg;
			result_tong3 = international_find.setNumber('0');
			result_tong_memo3 = notTongMsg;
			result_tong5 = international_find.setNumber('0');
			result_tong_memo5 = notTongMsg;
			result_tong7 = international_find.setNumber('0');
			result_tong_memo7 = notTongMsg;
		}

		var monthPay = $j("#monthPay").val();
		if(monthPay == "3300") {
			$j("#tong").text(result_tong3000);
			$j("#tong_memo").html(result_tong_memo3000);
		} else if(monthPay == "5500") {
			$j("#tong").text(result_tong5000);
			$j("#tong_memo").html(result_tong_memo5000);
		} else if(monthPay == "11000") {
			$j("#tong").text(result_tong1);
			$j("#tong_memo").html(result_tong_memo1);
		} else if(monthPay == "33000") {
			$j("#tong").text(result_tong3);
			$j("#tong_memo").html(result_tong_memo3);
		} else if(monthPay == "55000") {
			$j("#tong").text(result_tong5);
			$j("#tong_memo").html(result_tong_memo5);
		} else if(monthPay == "77000") {
			$j("#tong").text(result_tong7);
			$j("#tong_memo").html(result_tong_memo7);
		}
		document.form1.tongArrPrice[0].value=result_tong3000;
		document.form1.tongArrPrice[1].value=result_tong5000;
		document.form1.tongArrPrice[2].value=result_tong1;
		document.form1.tongArrPrice[3].value=result_tong3;
		document.form1.tongArrPrice[4].value=result_tong5;
		document.form1.tongArrPrice[5].value=result_tong7;
		document.form1.tongArrMemo[0].value=result_tong_memo3000;
		document.form1.tongArrMemo[1].value=result_tong_memo5000;
		document.form1.tongArrMemo[2].value=result_tong_memo1;
		document.form1.tongArrMemo[3].value=result_tong_memo3;
		document.form1.tongArrMemo[4].value=result_tong_memo5;
		document.form1.tongArrMemo[5].value=result_tong_memo7;
		var student = price.student;
		if(student == "-") {
			var	tmp_str = "<a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=247' target='_blank'>대상 국가</a>가 아니며 <a href="+ $j("#pageConId").val() + "/productDetail.do?ItemCode=249' target='_blank'>스페셜 DC 플러스</a> 스페셜 요금이 적용됩니다.";
			$j('#student').text('-');
			$j('#student_memo').html(tmp_str);
		} else {
			var	tmp_student = student * tong_tmp_min * 1.1;
			$j('#student').text(international_find.setNumber(tmp_student));
			$j('#student_memo').text('');
		}
	},

	getDiffTime : function(diff){
		if(isNaN(diff)) {
			diff = 0;
		}

		var gab = 1000 * 60 * (Number(diff) * 60);
		var loadDt = new Date();
		var time_t  =  new Date(Date.parse(loadDt) - gab);
		var s = international_find.set_standard(time_t .getFullYear(), 4)+'-'+
		international_find.set_standard(time_t .getMonth() + 1, 2)+'-'+
		international_find.set_standard(time_t .getDate(), 2)+'-'+
		international_find.set_standard(time_t .getHours(), 2)+'-'+
		international_find.set_standard(time_t .getMinutes(), 2)+'-'+
		international_find.set_standard(time_t .getSeconds(), 2);
		return s;
	},

	set_standard : function(time, digits){
		var zero = '';
		  time = time.toString();
		  if (time.length < digits) {
			for (i = 0; i < digits - time.length; i++)
			  zero += '0';
		  }
		  return zero + time;
	},

	searchNation : function(){
		var nation_name = $j("#nation_name").val();
		$j("#search_nation").val(nation_name);
	},

	setNumber : function(value){
		var val = value.toString();
		 if(val.indexOf('.') != -1){
			var v_length = val.substring(val.indexOf('.')+1).length;
			var chklast = val.charAt(val.length-1);
			if(v_length == 1){
				if(chklast == '0'){
					return $j.number(val);
				}else return $j.number(val,1);
			}
			 if(v_length > 2){

				var result = $j.number(val, 1);
				var chklast = result.charAt(result.length-1);
				if(chklast == '0'){
					return $j.number(val);
				}else return $j.number(val,1);
			}
		}else{
			return $j.number(val);
		}
	},

	getNationCash : function(a,b,c,price){
		var first = a;
		var second = b;
		var third = c;
//	 	if(flag_pc == "1" && first.indexOf("biz") >= 0) {
//	 		first = second;
//	 		second = third;
//	 	} else if(flag_pc == "1" && second.indexOf("biz") >= 0) {
//	 		second = third;
//	 	}
		if(first.indexOf("모바일파워") >= 0) {
			first = "모바일파워요금제"
		}
		if(second.indexOf("모바일파워") >= 0) {
			second = "모바일파워요금제"
			third = "모바일파워요금제"
		}
		if(second.indexOf("스페셜DC플러스") >= 0) {
			second = "스페셜DC플러스"
		}
		if(first == "biz아메리카 요금제" || first == "biz아시아 요금제" || first == "biz유럽 요금제") {
			first_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=250";
			first_name = "biz 요금제";
		} else if(first == "모바일파워요금제") {
			first_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=246";
			first_name = "모바일 파워 요금제";
		} else if(first == "알짜 요금제") {
			first_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=245";
			first_name = "알짜 요금제";
		} else if(first == "통큰 요금제") {
			first_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=244";
			first_name = "통큰 요금제";
		} else if(first == "뉴유학생") {
			first_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=247";
			first_name = "new 유학생 요금제";
		}
		if(second == "biz베이직 요금제" || second == "biz아메리카 요금제" || second == "biz아시아 요금제" || second == "biz유럽 요금제") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=250";
			second_name = "biz 요금제";
		} else if(second == "모바일파워요금제") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=246";
			second_name = "모바일 파워 요금제";
		} else if(second == "알짜 요금제") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=245";
			second_name = "알짜 요금제";
		} else if(second == "통큰 요금제") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=244";
			second_name = "통큰 요금제";
		} else if(second == "뉴유학생") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=247";
			second_name = "new 유학생 요금제";
		}  else if(second == "스페셜DC플러스") {
			second_url =  $j("#pageConId").val() + "/productDetail.do?ItemCode=249";
			second_name = "스페셜 DC 플러스";
		}

		var first_name_html = "";
		first_name_html = first_name_html + "<div class=\"title\">"+first_name+"</div>";
		first_name_html = first_name_html + "<div class=\"join-end\">대륙별 할인</div>";
		first_name_html = first_name_html + "<p class=\"detail-btn\"><a href=\""+first_url+"\" class=\"btn regular is-line-navygray\" target=\"_blank\" title=\"새창열림\">자세히 보기</a></p>";
		var second_name_html = "";
		second_name_html = second_name_html + "<div class=\"title\">"+second_name+"</div>";
		second_name_html = second_name_html + "<div class=\"price\">";
// 		second_name_html = second_name_html + "월 <strong>"+price+"</strong>원<br /> <span>(부가세 포함/할인 후)</span>";
		second_name_html = second_name_html + "</div>";
		second_name_html = second_name_html + "<p class=\"detail-btn\"><a href=\""+second_url+"\" class=\"btn regular is-line-navygray\" target=\"_blank\" title=\"새창열림\">자세히 보기</a></p>";

		$j("#titleNameFirst").html(first_name_html);
		$j("#titleNameSecond").html(second_name_html);
	},

};*/
/*!230307 내게 맞는 국제전화 요금제 찾기 메뉴삭제 관련 주석조치*/

var shopMyPriceType = {

    initialize: function() {},
    //초기화
    reSet: function() {

        //5g
        //데이터 이용량 초기화
        $j('input[name="fg-data-use"]').removeAttr('checked');
        //월 요금 초기화
        $j('input[name="fg-price"]').removeAttr('checked');
        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="fg-benefit"]').removeAttr('checked');
        $j('input[name="fg-benefit"]').attr('disabled', false);


        //lte
        //나이 초기화
        $j('input[name="lte-age"]').removeAttr('checked');
        //데이터 이용량 초기화
        $j('input[name="lte-fixed"]').removeAttr('checked');
        //월 요금 초기화
        $j('input[name="lte-price"]').removeAttr('checked');

        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="lte-benefit"]').removeAttr('checked');
        $j('input[name="lte-benefit"]').attr('disabled', false);
        $j("#fare_list").html('');

    },

    //조회하기
    search: function() {

        var kind_use = $j('input[name="kind-use"]:checked').val();
        var selectView = $j('#selectView').val();

        if (kind_use == "5G") {

            var benefits = "";
            var age = "";
            var fg_data_use = $j('input[name="fg-data-use"]:checked').val();
            var fg_price = $j('input[name="fg-price"]:checked').val();
            var fg_benefit1 = $j('input[id="fg-benefit1"]:checked').val();
            if (fg_benefit1 == undefined) {
                fg_benefit1 = "";
            };
            var fg_benefit2 = $j('input[id="fg-benefit2"]:checked').val();
            if (fg_benefit2 == undefined) {
                fg_benefit2 = "";
            };
            var fg_benefit3 = $j('input[id="fg-benefit3"]:checked').val();
            if (fg_benefit3 == undefined) {
                fg_benefit3 = "";
            };
            var fg_benefit4 = $j('input[id="fg-benefit4"]:checked').val();
            if (fg_benefit4 == undefined) {
                fg_benefit4 = "";
            };
            var fg_benefit5 = $j('input[id="fg-benefit5"]:checked').val();
            if (fg_benefit5 == undefined) {
                fg_benefit5 = "";
            };
            var fg_benefit6 = $j('input[id="fg-benefit6"]:checked').val();
            if (fg_benefit6 == undefined) {
                fg_benefit6 = "";
            };



            if (fg_data_use == undefined) {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }
            if (fg_price == undefined) {
                alert("월 요금을 선택해주세요.");
                return;
            }

            if (kind_use = "5G") {
                age = '0';
            }

            var dataObj = {
                kind: kind_use,
                datas: fg_data_use,
                age: age,
                price: fg_price,
                benefits1: fg_benefit1,
                benefits2: fg_benefit2,
                benefits3: fg_benefit3,
                benefits4: fg_benefit4,
                benefits5: fg_benefit5,
                benefits6: fg_benefit6
            }


        } else if (kind_use == "LTE") {

            var benefits = "";
            var age = $j('input[name="lte-age"]:checked').val();
            var datas = $j('input[name="lte-fixed"]:checked').val();
            var price = $j('input[name="lte-price"]:checked').val();

            var lte_benefit1 = $j('input[id="lte-benefit1"]:checked').val();
            if (lte_benefit1 == undefined) {
                lte_benefit1 = "";
            };
            var lte_benefit2 = $j('input[id="lte-benefit2"]:checked').val();
            if (lte_benefit2 == undefined) {
                lte_benefit2 = "";
            };
            var lte_benefit3 = $j('input[id="lte-benefit3"]:checked').val();
            if (lte_benefit3 == undefined) {
                lte_benefit3 = "";
            };
            var lte_benefit4 = $j('input[id="lte-benefit4"]:checked').val();
            if (lte_benefit4 == undefined) {
                lte_benefit4 = "";
            };
            var lte_benefit5 = $j('input[id="lte-benefit5"]:checked').val();
            if (lte_benefit5 == undefined) {
                lte_benefit5 = "";
            };

            if (age == undefined) {
                alert("연령대를 선택해주세요.");
                return;
            }
            if (datas == undefined) {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }

            if (price == undefined) {
                alert("월 요금을 선택해주세요.");
                return;
            }


            var dataObj = {
                kind: kind_use,
                datas: datas,
                age: age,
                price: price,
                benefits1: lte_benefit1,
                benefits2: lte_benefit2,
                benefits3: lte_benefit3,
                benefits4: lte_benefit4,
                benefits5: lte_benefit5,
                selectView: selectView
            }

        }



        $j.ajax({
            url: '/wDic/shop/myPriceType/list.ajax',
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#fare_list").html(rv);
            },
            complete: function() {
                $j("#fare_list")[0].scrollIntoView();
            }
        });

    }
};

var popMyPriceType = {
    initialize: function() {},


    //초기화
    reSet: function() {

        //5g
        //데이터 이용량 초기화
        $j('input[name="fg-data-use"]').removeAttr('checked');
        //월 요금 초기화
        $j('input[name="fg-price"]').removeAttr('checked');
        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="fg-benefit"]').removeAttr('checked');
        $j('input[name="fg-benefit"]').attr('disabled', false);


        //lte
        //나이 초기화
        $j('input[name="lte-age"]').removeAttr('checked');
        //데이터 이용량 초기화
        $j('input[name="lte-fixed"]').removeAttr('checked');
        //월 요금 초기화
        $j('input[name="lte-price"]').removeAttr('checked');

        //혜택 초기화 및 모두 활성화 처리 
        $j('input[name="lte-benefit"]').removeAttr('checked');
        $j('input[name="lte-benefit"]').attr('disabled', false);
        $j("#fare_list").html('');
    },

    //조회하기

    search: function() {

        var kind_use = $j('input[name="kind-use"]:checked').val();

        if (kind_use == "5G") {

            var benefits = "";
            var age = "";
            var fg_data_use = $j('input[name="fg-data-use"]:checked').val();
            var fg_price = $j('input[name="fg-price"]:checked').val();
            var fg_benefit1 = $j('input[id="fg-benefit1"]:checked').val();
            if (fg_benefit1 == undefined) {
                fg_benefit1 = "";
            };
            var fg_benefit2 = $j('input[id="fg-benefit2"]:checked').val();
            if (fg_benefit2 == undefined) {
                fg_benefit2 = "";
            };
            var fg_benefit3 = $j('input[id="fg-benefit3"]:checked').val();
            if (fg_benefit3 == undefined) {
                fg_benefit3 = "";
            };
            var fg_benefit4 = $j('input[id="fg-benefit4"]:checked').val();
            if (fg_benefit4 == undefined) {
                fg_benefit4 = "";
            };
            var fg_benefit5 = $j('input[id="fg-benefit5"]:checked').val();
            if (fg_benefit5 == undefined) {
                fg_benefit5 = "";
            };
            var fg_benefit6 = $j('input[id="fg-benefit6"]:checked').val();
            if (fg_benefit6 == undefined) {
                fg_benefit6 = "";
            };



            if (fg_data_use == undefined) {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }
            if (fg_price == undefined) {
                alert("월 요금을 선택해주세요.");
                return;
            }

            if (kind_use = "5G") {
                age = '0';
            }

            var dataObj = {
                kind: kind_use,
                datas: fg_data_use,
                age: age,
                price: fg_price,
                benefits1: fg_benefit1,
                benefits2: fg_benefit2,
                benefits3: fg_benefit3,
                benefits4: fg_benefit4,
                benefits5: fg_benefit5,
                benefits6: fg_benefit6,
                ppCode: ''
            }

        } else if (kind_use == "LTE") {

            var benefits = "";
            var age = $j('input[name="lte-age"]:checked').val();
            var datas = $j('input[name="lte-fixed"]:checked').val();
            var price = $j('input[name="lte-price"]:checked').val();

            var lte_benefit1 = $j('input[id="lte-benefit1"]:checked').val();
            if (lte_benefit1 == undefined) {
                lte_benefit1 = "";
            };
            var lte_benefit2 = $j('input[id="lte-benefit2"]:checked').val();
            if (lte_benefit2 == undefined) {
                lte_benefit2 = "";
            };
            var lte_benefit3 = $j('input[id="lte-benefit3"]:checked').val();
            if (lte_benefit3 == undefined) {
                lte_benefit3 = "";
            };
            var lte_benefit4 = $j('input[id="lte-benefit4"]:checked').val();
            if (lte_benefit4 == undefined) {
                lte_benefit4 = "";
            };
            var lte_benefit5 = $j('input[id="lte-benefit5"]:checked').val();
            if (lte_benefit5 == undefined) {
                lte_benefit5 = "";
            };

            if (age == undefined) {
                alert("연령대를 선택해주세요.");
                return;
            }
            if (datas == undefined) {
                alert("데이터 이용량을 선택해주세요.");
                return;
            }

            if (price == undefined) {
                alert("월 요금을 선택해주세요.");
                return;
            }


            var dataObj = {
                kind: kind_use,
                datas: datas,
                age: age,
                price: price,
                benefits1: lte_benefit1,
                benefits2: lte_benefit2,
                benefits3: lte_benefit3,
                benefits4: lte_benefit4,
                benefits5: lte_benefit5,
                ppCode: ''
            }

        }
        $j.ajax({
            url: '/wDic/myPriceType/popList.ajax',
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#fare_list").html(rv);
            },
            complete: function() {
                if (kind_use == "LTE") {
                    $j("html,body").animate({
                        scrollTop: 800
                    });
                } else {
                    $j("html,body").animate({
                        scrollTop: 700
                    });
                }
            }
        });

        $j('.fare-list-area').show();
    },
};

var testZone = {
    // 구분 변경
    gbnTypeChange: function(gbnType) {
        $j('#gbnType').val(gbnType);

        var dataObj = {
            gbnType: $j('#gbnType').val()
        }
        $j.ajax({
            url: $j("#pageConId").val() + "/testZoneList.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#testZoneList").html(rv);
            },
            complete: function() {
                $j("select[name=addressType1]").val("");
                $j("select[name=addressType2]").val("");
                $j('#addressText').val("");
                $j("select[name=addressType2]").attr("disabled", "disabled"); //시/구/군 정보 없을떄 구 선택 비활성화
            }
        });
    },
    // 시/도 값 변경에 따른 구정보 갱신
    addressTypeChange: function() {
        var addressType1 = $j("select[name=addressType1]").val();

        var html = "<option value=\"\" selected=selected>구</option>";

        if (addressType1 != '') {
            $j.ajax({
                url: $j("#pageConId").val() + "/addressType2List.ajax",
                dataType: "json",
                timeout: 10000,
                data: {
                    gbnType: $j('#gbnType').val(),
                    addressType1: addressType1
                },
                success: function(data) {
                    $j.each(data.addressType2List, function(index, item) {
                        html += '<option value="' + item.addressType2 + '">' + item.addressType2 + '</option>';
                    });
                },
                complete: function() {
                    $j('#addressType2').html(html);
                    $j("select[name=addressType2]").removeAttr("disabled"); //시/구/군 정보 있을떄 구 선택 활성화 
                }
            });
        } else {
            $j('#addressType2').html(html);
            $j("select[name=addressType2]").attr("disabled", "disabled"); //시/구/군 정보 없을떄 구 선택 비활성화
        }
    },
    //시도/구 정보로 조회하기
    areaSearch: function() {
        var addressType1 = $j("select[name=addressType1]").val();
        var addressType2 = $j("select[name=addressType2]").val();

        if (addressType1 == "") {
            alert("시/도를 선택해주세요.");
            $j("#addressType1").focus();
            return;
        }

        if (addressType2 == "") {
            alert("구를 선택해주세요.");
            $j("#addressType2").focus();
            return;
        }

        var dataObj = {
            gbnType: $j('#gbnType').val(),
            addressType1: addressType1,
            addressType2: addressType2
        }
        $j.ajax({
            url: $j("#pageConId").val() + "/testZoneList.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#testZoneList").html(rv);
            },
            complete: function() {
                $j('#addressText').val("");
                $j("#focusPlace")[0].scrollIntoView();
                $j("#areaSearch").focus();
            }
        });
    },
    // 주소로 찾기
    adressSearch: function() {

        var addressText = $j('#addressText').val();

        if (addressText == "") {
            alert("주소를 입력해주세요.");
            $j("#addressText").focus();
            return;
        }

        var dataObj = {
            gbnType: $j('#gbnType').val(),
            addressText: addressText
        }
        $j.ajax({
            url: $j("#pageConId").val() + "/testZoneList.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#testZoneList").html(rv);
            },
            complete: function() {
                $j("select[name=addressType1]").val("");
                $j("select[name=addressType2]").val("");
                $j("select[name=addressType2]").attr("disabled", "disabled"); //시/구/군 정보 없을떄 구 선택 비활성화
                $j("#focusPlace")[0].scrollIntoView();
                $j("#adressSearch").focus();
            }
        });
    },
    // 전체 검색
    allSearch: function() {

        var dataObj = {
            gbnType: $j('#gbnType').val()
        }
        $j.ajax({
            url: $j("#pageConId").val() + "/testZoneList.ajax",
            type: "post",
            timeout: 10000,
            data: dataObj,
            success: function(rv) {
                $j("#testZoneList").html(rv);
            },
            complete: function() {
                $j("select[name=addressType1]").val("");
                $j("select[name=addressType2]").val("");
                $j("select[name=addressType2]").attr("disabled", "disabled"); //시/구/군 정보 없을떄 구 선택 비활성화
                $j('#addressText').val("");
                $j("#focusPlace")[0].scrollIntoView();
                $j("#allSearch").focus();
            }
        });
    }
};