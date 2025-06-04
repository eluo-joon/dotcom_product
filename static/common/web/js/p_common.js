$j(function() {
    /* 공통 start */
    // layers popup
    function popupLayer(obj) {
        var self = $j(obj);
        var target = $j($j(obj).attr("href"));
        //self.attr('title','접기'); // 230224 웹 접근성 추가 결함 조치 건
        $j('.layers[id*="popup-"]').hide();
        target.attr("tabindex", "0").stop().fadeIn(500).focus();

        target.find(".layer-close button, .btn-cancel").click(function() {
            target.stop().fadeOut(500);
            self.focus();
            //self.attr('title','펼치기'); // 230224 웹 접근성 추가 결함 조치 건
        });
    }
    $j(document).on('click', 'a[href*="#popup-"]', function(e) {
        e.preventDefault();
        popupLayer(this);
    });

    // tabs
    function tabs(obj) {
        var self = $j(obj);
        var target = $j($j(obj).attr("href"));
        self.closest('.tabs').find('a[href*="#trigger"]').removeClass('active');
        self.closest('.tabs').find('a[href*="#trigger"]').removeAttr('title');
        self.addClass('active');
        self.attr('title', '선택됨');
        target.closest('.tabs').find('[id*="trigger"]').removeClass('active');
        target.addClass('active');
    }
    $j('.tabs').find('a[href*="#trigger"]').on('click', function(e) {
        e.preventDefault();
        tabs(this);
    });
    // tabs-child
    function tabsChild(obj) {
        var self = $j(obj);
        var target = $j($j(obj).attr("href"));
        self.closest('.tabs').children('ul').children('li').children('a[href*="#trigger"]').removeClass('active');
        self.addClass('active');
        target.closest('.tabs').children('ul').children('li').children('[id*="trigger"]').removeClass('active');
        target.addClass('active');
    }
    $j('.tabs-child').find('a[href*="#trigger"]').on('click', function(e) {
        e.preventDefault();
        tabsChild(this);
    });
    // tab-etc
    function tabsEtc(obj) {
        var self = $j(obj);
        var target = $j($j(obj).attr("href"));
        self.closest('.tabs-etc').find('a[href*="#trigger"]').removeClass('active').attr('title', ''); // 0411
        // title
        target.closest('.tabs-etc-contents').children('div').hide();
        self.addClass('active').attr('title', '선택된 탭'); // 0411 title
        target.attr("tabindex", "0").stop().fadeIn(500).focus();
    }
    $j('.tabs-etc').find('a[href*="#trigger"]').on('click', function(e) {
        e.preventDefault();
        tabsEtc(this);
    });

    $j('.accordions .accordion-trigger').attr('title', '열기');
    $j('.accordions .accordion-trigger').parent().addClass('accordionH');
    $j(document).on('click', '.accordions .accordion-trigger', function(e) {
        e.preventDefault();
        var top = $j(this).offset().top;
        var trigger_height = $j(this).height();
        if ($j(this).hasClass('active')) {
            $j(this).removeClass('active').next('.accordion-contents').stop().slideUp(500, function() {
                $j(this).parent().removeClass('moveH');
            });
            $j(this).attr('title', '열기');
        } else {
            $j(this).closest('.accordions').find('.accordion-trigger').removeClass('active');
            $j(this).closest('.accordions').find('.accordion-trigger').attr('title', '열기');
            $j(this).closest('.accordions').find('.accordion-contents').stop().slideUp(500, function() {
                // $j(this).closest('.accordions').find('.accordion-trigger').parent().removeClass('moveH');
            });
            $j(this).addClass('active').next('.accordion-contents').stop().slideDown(500, function() {
                $j(this).closest('.accordions').find('.accordion-trigger').parent().removeClass('moveH');
                $j(this).parent().addClass('moveH');
            });
            $j(this).animate({
                scrollTop: top + trigger_height
            }, 500);
            $j(this).attr('title', '닫기');
            $j(this).parent().addClass('moveH');
        }

        function tabs(obj) {
            var self = $j(obj);
            var target = $j($j(obj).attr("href"));
            self.closest('.tabs').find('a[href*="#trigger"]').removeClass('active');
            self.addClass('active');
            target.closest('.tabs').find('[id*="trigger"]').removeClass('active');
            target.addClass('active');
        }

        $j('.tabs').not('.tabs-child').find('a[href*="#trigger"]').on('click', function(e) {
            e.preventDefault();
            tabs(this);
        });

    });

    // custom scrollbar
    if ($j('.scrollbar').length) {
        $j('.scrollbar').mCustomScrollbar({
            theme: "dark-2",
            scrollEasing: "easeInOut",
            alwaysShowScrollbar: 0
        });
    }
    /* 공통 end */

    // 20180711 sns 공유하기 width 변경 추가
    var snsWidth = function(object) {
        var $itemWrap = $j(object),
            $items = $itemWrap.find('.btn-sns'),
            $item = $items.find('a');
        sum = 0;

        if ($item.length > 2) {
            $item.each(function() {
                var $this = $j(this);

                sum += $this.outerWidth(true);
            });

            $items.css({
                width: sum + 60,
                marginLeft: -((sum + 60) / 2)
            });
        }
    }

    var snsTimer = setTimeout(function() {
        $j('.sns-area').bind('mouseenter', function() {
            snsWidth(this);
        });
        $j('.sns-area .btn-share').bind('focus', function() {
            snsWidth('.sns-area');
        });
        clearTimeout(snsTimer);
    }, 200);


    // kt.com 고객센터 연결 신규 인벤토리 기획 개발 SB v0.2
    // link List ( 0 : 메인, 1 : 인터넷, 2 : TV, 3 : 결합 )
    var talkLinkList = [
        "https://ibot.kt.com/client/chat.html?channelToken=8b1bb6b635eb4c7faaf35bdbcdc93fb6&chatType=chat",
        "https://ibot.kt.com/client/chat.html?channelToken=088d0c01e3f14aec9813ab903bc4ae61&chatType=chat",
        "https://ibot.kt.com/client/chat.html?channelToken=5f0abd71b08efa6c1975e5b51304dd1e&chatType=chat",
        "https://ibot.kt.com/client/chat.html?channelToken=64db31aec41be3ddd7ecba09b248d2fa&chatType=chat",
    ];
    // 인터넷 대상 상품
    var internetItemList = [
        "1497", // 안심 인터넷 와이드
        "1502", // 안심 인터넷 와이파이
        "1496", // 인터넷 와이드
        "1503", // 인터넷 와이파이
        "1504", // 프리미엄급 인터넷
        "1505", // 인터넷

        // TB 테스트용
        "1391", // 인터넷 프리미엄 와이드

        "1463", // 안심 인터넷 와이드
        "1484", // 안심 인터넷 와이파이
        "1462", // 인터넷 와이드
        "1485", // 인터넷 와이파이
        "1486", // 프리미엄급 인터넷
        "1487", // 인터넷
    ];
    // TB 대상 상품
    var tvItemList = [
        "1515", // TV 초이스 프리미엄
        "1516", // TV 초이스 스페셜
        "1517", // TV 초이스 플러스
        "1518", // TV 일반

        // TB 테스트용
        "1480", // TV 초이스 프리미엄
        "1481", // TV 초이스 스페셜
        "1482", // TV 초이스 플러스
        "1483", // TV 일반
    ];
    // 결합 대상 상품
    var combinationItemList = [
        "1193", // 프리미엄 가족결합 -- 카태고리 없는 상품
    ];


    var talkLink = ""; // kTalk Link
    var category = ""; // 통계 카테고리
    var content = ""; // 통계 내용
    var inven = ""; // 배너 html 내용

    var pathname = window.location.pathname; // URL 구분
    if (pathname == "/wDic/main.do" || pathname == "/") { // 메인 화면

        talkLink = talkLinkList[0];
        category = "KT-개인_상품서비스_메인";
        content = "^KT-개인_상품^메인^채팅 상담하기^띠배너";

        inven += "<div class='inven2022'>";
        inven += "<a class='btn_inven2022_chat' href='javascript:void(0);' onclick=\"window.open('" + talkLink + "', 'chatpop', 'width=420px, height=669px'); KT_trackClicks('" + category + "','" + content + "'); return false;\" >";
        inven += "<span class='hidetxt'>채팅 상담하기</span>";
        inven += "</a>";
        inven += "<img src='https://product.kt.com/static/common/images/util/inventory_220714.png' alt='상품문의 평일 9시부터 18시까지. 전화상담 무료 080-502-0100. 채팅상담하기'>";
        inven += "</div>";

        $j(inven).insertBefore('.product-price-area')

    } else if (pathname == "/wDic/index.do") { // 상품 리스트 화면

        // index.do 화면 경우
        var cCode = $j("#cate_code").val();
        var fCode = $j("#filter_code").val();
        //

        if (cCode == "6005") {
            // 인터넷
            talkLink = talkLinkList[1];
            category = "KT-개인_상품서비스_인터넷^요금제리스트";
            content = "^KT-개인_상품^인터넷^요금제리스트^채팅 상담하기^윙배너";
        } else if (cCode == "6008") {
            // TV
            talkLink = talkLinkList[2];
            category = "KT-개인_상품서비스_TV^요금제리스트";
            content = "^KT-개인_상품^TV^요금제리스트^채팅 상담하기^윙배너";
        } else if (cCode == "6027") {
            // 결합
            talkLink = talkLinkList[3];
            category = "KT-개인_상품서비스_결합상품^요금제리스트";
            content = "^KT-개인_상품^결합^결합상품^요금제리스트^채팅 상담하기^윙배너";
        }

        // 선언된 경우만 UI 구성
        if (talkLink != "") {
            inven += "<div class='inven_wing_2022'>";
            inven += "<img src='https://product.kt.com/static/common/images/util/wingbanner_220714.png' alt='상품문의 평일 9시부터 18시까지. 전화상담 무료 080-502-0100. 채팅상담하기'>";
            inven += "<a class='btn_inven_wing2022_chat' href='javascript:void(0);' title='새창열림' onclick=\"window.open('" + talkLink + "', 'chatpop', 'width=420px, height=669px'); KT_trackClicks('" + category + "','" + content + "'); return false;\" >";
            inven += "<span class='hidetxt'>채팅 상담하기</span>";
            inven += "</a>";
            inven += "</div>";
            $j(inven).insertBefore('.fare-list-area .column')
        }
    } else if (pathname == "/wDic/productDetail.do") { // 상품 상세 화면

        var targetList = []; // 대상 확인 리스트
        // 상품 카테고리별 구분
        if (cateCode == "6004" || cateCode == "6005" || cateCode == "6006" || cateCode == "6040" || cateCode == "6042" || cateCode == "6043" || cateCode == "6044") {
            // 인터넷
            talkLink = talkLinkList[1];
            category = "KT-개인_상품서비스_인터넷^요금제상세";
            content = "^KT-개인_상품^인터넷^요금제^상세^" + itemName + "^스티키배너";

            targetList = internetItemList;

        } else if (cateCode == "6007" || cateCode == "6008" || cateCode == "6009") {
            // TV
            talkLink = talkLinkList[2];
            category = "KT-개인_상품서비스_TV^요금제상세";
            content = "^KT-개인_상품^TV^요금제^상세^" + itemName + "^스티키배너";

            targetList = tvItemList;

        } else if (cateCode == "6026" || cateCode == "6027" || cateCode == "6028" || cateCode == "6029") {
            // 결합
            talkLink = talkLinkList[3];
            category = "KT-개인_상품서비스_결합^요금제상세";
            content = "^KT-개인_상품^결합^요금제^상세^" + itemName + "^스티키배너";

            targetList = combinationItemList;

        } else {
            // cateCode 코드 없는 상품일경우 처리

            // 프리미엄 가족결합
            if (itemCode == "1193") {
                // 결합
                talkLink = talkLinkList[3];
                category = "KT-개인_상품서비스_결합^요금제상세";
                content = "^KT-개인_상품^결합^요금제^상세^" + itemName + "^스티키배너";
                targetList = combinationItemList;
            }

        }

        // 현재 상품 대상 여부 확인
        var flag = false;
        for (var i = 0; i < targetList.length; i++) {
            if (targetList[i] == itemCode) {
                flag = true;
                break;
            }
        }

        // 대상일 경우만 UI 구성
        if (flag) {
            inven += "<div class='inven_sticky_2022 chnopen'>";
            inven += "<div class='inven_sticky_div' id='inven_sticky_div' >";

            inven += "<img src='https://product.kt.com/static/common/images/util/sticky_open_220714.png' alt='전화상담 무료 080-502-0100. 채팅상담하기'>";

            inven += "<a class='btn_inven_sticky2022_chat' href='javascript:void(0);' title='새창열림' onclick=\"window.open('" + talkLink + "', 'chatpop', 'width=420px, height=669px'); KT_trackClicks('" + category + "','" + content + "_채팅 상담'); return false;\" >";
            inven += "<span class='hidetxt'>채팅 상담하기</span>";
            inven += "</a>";

            inven += "<button class='inven_sticky_layer_close' onclick=\"KT_trackClicks('" + category + "','" + content + "_접힘');\" >";
            inven += "<span class='hidetxt'>닫기</span>";
            inven += "</button>";

            inven += "</div>";

            inven += "<a class='inven_sticky_2022_close' href='javascript:void(0);' onclick=\"KT_trackClicks('" + category + "','" + content + "_펼침');\" >";
            inven += "<img src='https://product.kt.com/static/common/images/util/sticky_close_220714.png' alt='상품문의'>";
            inven += "</a>";

            inven += "</div>";

            $j(inven).insertBefore('#cfmClWrapper')
        }
        targetList = [];
    }

    // mouse event
    $j(".inven_sticky_2022").on('mouseenter', function() {
        $j(this).addClass("chnopen");
        clearInterval(repeat);
    });
    $j(".inven_sticky_2022").on('mouseleave', function() {
        $j(this).removeClass("chnopen");
    });

    $j(".inven_sticky_layer_close").click(function() {
        $j(".inven_sticky_2022").removeClass("chnopen");
    });

    // keyboard event
    $j(".inven_sticky_2022_close").click(function() {
        $j(".inven_sticky_2022").addClass("chnopen");
        $j(".btn_inven_sticky2022_chat").focus();
        $j(".inven_sticky_layer_close").click(function() {
            $j(".inven_sticky_2022").removeClass("chnopen");
            $j(".inven_sticky_2022_close").focus();
        });
    });

    // Interval 타이머
    function intervaStickylTimer() {
        // 시간 기본 3초
        var setTime = 3;
        // OTP 타이머
        this.repeat = setInterval(function() {
            setTime--;
            if (setTime == 0) {
                $j(".inven_sticky_2022").removeClass("chnopen");
                // 시간 초과시 타이머 종료
                clearInterval(repeat);
            }
        }, 1000);
    }

    // 
    intervaStickylTimer();

    // //kt.com 고객센터 연결 신규 인벤토리 기획 개발 SB v0.2

});

(function($) {
    var $window = $(window),
        $document = $(document);

    $.fn.comTabs = function() {
        var config = $.extend({
            items: '> li',
            selectIndex: 0,
            tabContent: 'tabContent',
            selectedClass: 'selected',
            comTabNo: 'tabNo'
        });
        return this.each(function() {
            var self = this,
                $self = $(self),
                $items = $self.find(config.items),
                pgcode = getUrlVars();

            if ($.data(self, 'init.comTabs')) {
                destroy();
            }

            $items.each(function(i) {
                var item = this,
                    $item = $(item),
                    anchor = item.getElementsByTagName('a')[0],
                    contnetId = anchor && anchor.getAttribute('href', 2),
                    content = contnetId && (contnetId !== '#') && $document.find(contnetId).addClass(config.tabContent);

                $.data(item, 'content.comTabs', content);
                $.data(item, 'anchor.comTabs', anchor);

                $item.bind('click', function(e) {
                    var index = i;

                    select(index);

                    e.preventDefault();
                });

                if (pgcode[config.comTabNo]) {
                    content.removeClass(config.selectedClass);

                    if (contnetId.split('#')[1].match(pgcode[config.comTabNo]) && contnetId.split('#')[1].length === pgcode[config.comTabNo].length) {
                        $(anchor).parent().addClass(config.selectedClass);
                        $(anchor).attr('title', '선택됨');

                        $(contnetId).addClass(config.selectedClass);
                    }
                }
            });

            $.data(self, 'init.comTabs', true);

            if (!pgcode[config.comTabNo]) {
                select(config.selectIndex);
            }

            function select(index) {
                unselectAll();

                var $item = $items.eq(index),
                    $content = $item.data('content.comTabs'),
                    anchor = $item.data('anchor.comTabs');

                $item.addClass(config.selectedClass);
                $content.addClass(config.selectedClass);
                anchor.setAttribute('title', '선택됨');
            }

            function unselectAll() {
                $items.each(function() {
                    var $item = $(this),
                        $content = $item.data('content.comTabs'),
                        anchor = $item.data('anchor.comTabs');

                    $item.removeClass(config.selectedClass);
                    $content.removeClass(config.selectedClass);
                    anchor.removeAttribute('title');
                });
            }

            function getUrlVars() {
                var vars = [],
                    hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split("=");
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }

            function destroy() {
                $items.each(function() {
                    var $item = $(this),
                        content = $.data(this, 'content.comTabs'),
                        anchor = $.data(this, 'anchor.comTabs');

                    content.removeClass(config.selectedClass);
                    $(anchor).parent().removeClass(config.selectedClass);

                    $.data(this, 'content.comTabs').unbind('.comTabs');
                    $.removeData(this, 'content.comTabs');
                    $.removeData(this, 'anchor.comTabs');
                    $item.unbind('.comTabs');
                });
                $self
                    .removeData('content.comTabs')
                    .removeData('anchor.comTabs');
            }
        });
    };

    $(function() {
        $('.com-tabs').comTabs();
    });
})(jQuery);

var wDicCom = {
    winPopBtn: function(sUrl, sw, sh) {
        var cw = screen.availWidth,
            ch = screen.availHeight,
            sw = !sw ? 640 : sw,
            sh = !sh ? 520 : sh,
            ml = 0
        mt = 0;

        ml = (cw - sw) / 2;
        mt = (ch - sh) / 2;

        window.open(sUrl, 'popupProduct', 'width=' + sw + ',height=' + sh + ',top=' + mt + ',left=' + ml + ',scrollbars=yes');
    }
}