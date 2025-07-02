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

var cfmSearchAreaHtml = {

    //링크정보 
    linkInfo: function(mode, type, traget, item){        
        var linkType = '_self';
        var titleName = 'KT-개인_공통';
        var urlInfo = search_URL +'/?c=OLE000000&r=10&ch=USR000';
        var statInfo = '^KT-개인_공통^GNB^검색레이어^';

        if(kt_common.pageType() == 'shop'){ //Shop
            statInfo = '^KT-개인_공통^GNB^Shop^검색레이어^';
            urlInfo = search_URL +'/?c=SHO000000';
        }

        if(traget != null){
             traget.on('click', function(){
                var keyword = '';
                if(type == 'popular'){
                    var statInfoType = '인기검색어^';
                    if(kt_common.pageType() == 'shop' && $j('.kt_popkeyword').hasClass('active')){ //Shop&KT인기검색어
                        statInfoType += 'KT^';
                    }else if(kt_common.pageType() != 'shop' && $j('.shop_popkeyword').hasClass('active')){ //닷컴&Shop인기검색어
                        statInfoType += 'Shop^';
                    }

                    keyword = $j(this).attr('keyword');
                    urlInfo = urlInfo +'&q='+ encodeURIComponent(keyword);
                    statInfo = statInfo + statInfoType + $j(this).find('.num').text() +'위^'+ keyword;
                }else if(type == 'autowords'){
                    keyword = $j(this).attr('keyword');
                    urlInfo = urlInfo +'&q='+ encodeURIComponent(keyword);
                    statInfo = statInfo + '자동완성^'+ keyword;
                }else if(type == 'autoconts'){
                    keyword = $j(this).attr('keyword');
                    urlInfo = '';
                    statInfo = statInfo + '이미지^'+ keyword;
                }else if(type == 'words'){
                    urlInfo = '';
                    statInfo = statInfo + '메뉴 바로가기^'+ item.MENUNAME;
                }else if(type == 'special'){
                    urlInfo = '';
                    statInfo = statInfo + '기획전^'+ item.TITLE;
                }else if(type == 'related'){
                    urlInfo = '';
                    statInfo = statInfo + '연관상품^'+ item.RELATE_TITLE;
                }

                kt_common.link(urlInfo, linkType, titleName, statInfo);
                if(urlInfo != '') return false;
            });
        }else{
            if(type == 'search'){
                urlInfo = urlInfo +'&q='+ encodeURIComponent(item.keyword);
                statInfo = statInfo + item.keyword +'^검색버튼';           
            }else if(type == 'click'){
                urlInfo = '';
                statInfo = statInfo + '검색필드';
            }else if(type == 'clear'){
                urlInfo = '';
                statInfo = statInfo + '검색어리셋버튼';
            }else if(type == 'close'){
                urlInfo = '';
                statInfo = statInfo + '닫기버튼';
            }

            kt_common.link(urlInfo, linkType, titleName, statInfo);
        }
    },

    //검색어 하이라이팅
    replaceKeyword: function(keyword, resultValue){
        var replaceWord = '';
        cfmKeyword = keyword.replace(/\s/g,''); // 공백 제거

        for (var i = 0 ; i < cfmKeyword.length ; i ++ ) {
            var charStr = cfmKeyword.substr(i,1);
            // 정규식 시작 (
            if (i === 0) replaceWord = '(';
            if (cfmSearchAreaHtml.isSpecialChar(charStr)) {
                // 정규식의 기본 특수문자일경우 일반문자로 치환하기 위해 \ 붙여줌
                replaceWord += '\\' + charStr + '\\s*';
            } else {
                replaceWord += charStr + '\\s*';
            }
            // 정규식 끝 )
            if ( i === cfmKeyword.length-1 ) replaceWord += ')';
        }

        var regex = new RegExp(replaceWord,'gi');
        var repText = resultValue.replace(regex, '<em>$1</em>');

        return repText;
    },

    //특수문자 체크
    isSpecialChar: function(str){
        var spChr = ['.','*','+','?','\\','^','$','[',']','(',')','{','}','|'];
        var rtnVal = false;

        $j(spChr).each(function(k,v){
            if (str === v) rtnVal = true;
        });

        return rtnVal;
    },

    //통합검색-검색어 체크
    searchWordCheck: function(str){
        var result = str;
        /* 검색api(rdi.kt.com) url 검색어 -> 파라미터 검색어로 변경으로 해결-2차
        if(str != ''){
            var regEx = new RegExp('[\#\%\;\.\/\?]', 'g'); //오류나는 특수문자 제거
            result = result.replace(regEx, ''); 
        }
        */
        return result;
    },

    //통합검색-추천검색어 callback
    callbackSearchRecommend: function(type, result){
        try {
            if(type === 'success'){
                if(kt_common.isNull(result.data) !== '' && result.data.length > 0){
                    var resultList = result.data[0].areaSetList[0].areaContsList;
                    if(kt_common.isNull(resultList) !== '' && resultList.length > 0){
                        if(resultList.length > 0){
                            var resultData = resultList[0];
    
                            $j('#total-search input[type=text]').attr('placeholder', resultData.subTitle);
                            $j('#total-search input[type=text]').data('recommend', resultData.title);
                        }
                    }
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchRecommend [' + e.message + ']');
        }
    },

    //통합검색-인기검색어 callback
    callbackSearchPopkeywords: function(type, result, mode){
        if(mode == undefined) mode = kt_common.pageType();

        $j('.cfmCltabs').find('a').removeClass('active').removeAttr('title');

        if(mode == 'shop'){ //Shop
            $j('.shop_popkeyword').addClass('active');
		    $j('.shop_popkeyword').attr('title','선택된 탭');
        }else{
            $j('.kt_popkeyword').addClass('active');
		    $j('.kt_popkeyword').attr('title','선택된 탭');
        }

        try {
            if(type === 'success'){
                $j('#rltmkywd-list').empty(); //초기화
    
                if(kt_common.isNull(result.data) !== ''){
                    if(kt_common.isNull(result.data.response) !== ''){
                        if(kt_common.isNull(result.data.response.docs) !== '' && result.data.response.docs.length > 0){
                            var resultList = result.data.response.docs;
                            $j.each(resultList, function(idx, data){
                                var quick = $j('<li>'+
                                '	<a href="#">'+
                                '		<span class="num">' + data.ranking + '</span>'+
                                '		<em>' + data.keyword + '</em>'+
                                '	</a>'+
                                '</li>');
    
                                if(data.rankarrow === 'U'){
                                    quick.find('a').append('<span class="rankf_U"><span>순위상승</span>' + data.changevlu + '</span>');
                                } else if(data.rankarrow === 'D'){
                                    quick.find('a').append('<span class="rankf_D"><span>순위하락</span>' + data.changevlu + '</span>');
                                } else if(data.rankarrow === 'E'){
                                    quick.find('a').append('<span class="rankf_E"><span>순위변동없음</span></span>');
                                } else {
                                    quick.find('a').append('<span class="rankf_N">NEW</span>');
                                }
    
                                quick.find('a').attr('keyword', data.keyword);
                                cfmSearchAreaHtml.linkInfo('search', 'popular', quick.find('a'));
    
                                $j('#rltmkywd-list').append(quick);
                            });
                        }
                    }
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchPopkeywords [' + e.message + ']');
        }

    },

    //통합검색-자동완성 callback
    callbackSearchAutowords: function(type, result, words){
        var target = $j('.auto-list');

        try {
            if(type === 'success'){      
                target.empty(); //초기화
    
                var resultList = result.data.response.docs;
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var resultValue = data.KEYWORD;

                        resultValue = resultValue.replaceAll("&lt;", "<").replaceAll( "&lt;","<").replaceAll("&gt;",">").replaceAll( "&#40;","(").replaceAll("&#41;",")").replaceAll( "&#39;","'"); 
                        words = words.replaceAll("&lt;", "<").replaceAll( "&lt;","<").replaceAll("&gt;",">").replaceAll( "&#40;","(").replaceAll("&#41;",")").replaceAll( "&#39;","'"); 
                        
                        var highlight = '';
                        if(words.length == 1){
                            if(resultValue.indexOf(words.toUpperCase()) !== -1){
                                highlight = resultValue.replace(words.toUpperCase(), '<em>' + words.toUpperCase() + '</em>');
                            }else{
                                highlight = resultValue.replace(words, '<em>' + words + '</em>');
                            }
                        }else{
                            highlight = cfmSearchAreaHtml.replaceKeyword(words, resultValue);
                        }
    
                        var auto = $j('<li><a href="#" class="cfmautolink" data-index="'+ idx +'">' + highlight + '</a></li>');
    
                        auto.find('a').attr('keyword', resultValue);
                        cfmSearchAreaHtml.linkInfo('search', 'autowords', auto.find('a'));
    
                        target.append(auto);
                    });				                
    
                    //이미지
                    if(kt_common.pageType() != 'shop'){ //Shop 아닌경우만
                        target.find('li:first').append('<div class="summary-banner"></div>');
                        target.find('li a').on('mouseover focus', function(){
                            var idx = $j(this).data('index');
                            var data = resultList[idx];
    
                            if(kt_common.isNull(data.IMG_URL) !== '' && kt_common.isNull(data.LINK_URL) !== ''){
                                var html = $j('<a href="'+ data.LINK_URL +'"><img src="'+ data.IMG_URL +'" alt="'+ kt_common.removeTag(data.IMG_DESC) +'" onerror="this.src=\'' + cfm_domain + '/images/v2/common/KT_summarybanner_noimg.jpg\'"></a>');
                                
                                html.attr('keyword', data.KEYWORD);
                                cfmSearchAreaHtml.linkInfo('search', 'autoconts', html);
    
                                target.find('.summary-banner').html(html);
                            }else{
                                target.find('.summary-banner').html('<img src="' + cfm_domain + '/images/v2/common/KT_summarybanner_noimg.jpg" alt="이미지없음">');
                            }
                        });
                        target.find('li:eq(0) a').mouseover();
                    }
                } else {
                    target.append('<li>해당 검색어에 대한 검색결과가 없습니다.</li>');
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchAutowords [' + e.message + ']');
        }
    },

    //통합검색-바로가기 callback
    callbackSearchwords: function(type, result, words){
        var target = $j('.quick-menu');

        try {
            if(type === 'success'){
                target.empty();
    
                var resultList = result.data.response.docs;
                var searchKeyword = result.data.highlighting;
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var category = '';
                        var menuPathArr = data.MENUPATH.split('^$^');
                        var menuDepth = menuPathArr.length / 2;
                        var menuName = '';
                        var highlightTxt = searchKeyword[data.DOCID].MENUNAME;
    
                        for(var depth = 1; depth <= menuDepth; depth++){
                            if(category !== ''){
                                category += ' > ';
                            }
                        
                            menuName = menuPathArr[(depth - 1) * 2];
                            if(depth === menuDepth){
                                category += highlightTxt;
                            } else {
                                category += menuName;
                            }
                        }
    
                        var link;
                        if(kt_common.isNull(data.URL) !== ''){
                            link = $j('<li><a href="'+ data.URL +'">' + category + '</a></li>');
    
                            link.attr('keyword', category);
                            cfmSearchAreaHtml.linkInfo('search', 'words', link.find('a'), data);
                        } else {
                            link = $j('<li>' + category + '</li>');
                        }
    
                        target.append(link);
                    });                
                    
                    target.find('strong').contents().unwrap().wrap('<em></em>');
                } else {
                    target.append('<li>해당 검색어에 대한 검색결과가 없습니다.</li>');
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchwords [' + e.message + ']');
        }
    },

    //통합검색-기획전(Shop)-2차
    callbackSearchSpecial: function(type, result, words){
        var target = $j('.strategy-lilst');

        try {
            if(type === 'success'){
                target.empty(); //초기화
    
                var resultList = result.data.response.docs;
                var searchKeyword = result.data.highlighting;
    
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var highlightTxt = searchKeyword[data.DOCID].TITLE;
                        var link;
    
                        data.URL = data.LINKURL;
                        if(kt_common.isNull(data.URL) !== ''){
                            link = $j('<p class="tit"><a href="'+ data.URL +'">'+ highlightTxt +'</a></p>');
    
                            cfmSearchAreaHtml.linkInfo('search', 'special', link.find('a'), data);
                        } else {
                            link = $j('<p class="tit">'+ highlightTxt +'</p>');
                        }
    
                        target.append(link);
                    });
    
                    target.find('strong').contents().unwrap().wrap('<em></em>');
                } else {
                    target.append('<p class="tit">해당 검색어에 대한 <br>검색결과가 없습니다.</p>');
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchSpecial [' + e.message + ']');
        }
    },

    //통합검색-연관상품(Shop)-2차
    callbackSearchRelatedProduct: function(type, result, words){
        var target = $j('.relation-list');

        try {
            if(type === 'success'){
                target.empty(); //초기화
    
                var resultList = result.data.response.docs;
    
                if(resultList.length > 0){
                    $j.each(resultList, function(idx, data){
                        var link, info = '';
    
                        if(kt_common.isNull(data.THUMBNAIL) !== ''){
                            info += '<img src="'+ data.THUMBNAIL +'" alt="'+ kt_common.removeTag(data.RELATE_TITLE) +'" onerror="this.src=\'' + cfm_domain + '/images/v2/layout/KT_relatedbanner_noimg.png\'">';
                        }else{
                            info += '<img src="' + cfm_domain + '/images/v2/layout/KT_relatedbanner_noimg.png" alt="이미지없음">';
                        }
    
                        if(kt_common.isNull(data.RELATE_TITLE) !== ''){
                            info += '<span class="prd_name">'+ data.RELATE_TITLE +'</span>';
                        }
    
                        if(kt_common.isNull(data.RELATE_PRICE) !== ''){
                            info += '<span class="prd_price"><span>(월)</span> <strong class="point">'+ kt_common.setComma(data.RELATE_PRICE) +'</strong>원~</span>';
                        }
    
                        data.URL = data.LINKURL;
                        if(kt_common.isNull(data.URL) !== ''){
                            link = $j('<li><a href="'+ data.URL +'">'+ info +'</a></li>');
    
                            cfmSearchAreaHtml.linkInfo('search', 'related', link.find('a'), data);
                        } else {
                            link = $j('<li>'+ info +'</li>');
                        }
    
                        target.append(link);
                    });
                } else {
                    target.append('<li>해당 검색어에 대한 검색결과가 없습니다.</li>');
                }
            }            
        } catch (e) {
            common_log.log('kt_search.js callbackSearchRelatedProduct [' + e.message + ']');
        }
    }
}

$j(document).ready(function(){
    if($j('#total-search').length > 0){
        // 파이어폭스 처리
        var firefoxTimer;
        var firefoxXKeyword;
        var filefoxKeyword;
        var akcDataExist = 'N';
        function firefoxClearInter() {
            clearInterval(firefoxTimer);
        }

        function firefoxSetInter($input) {
            firefoxClearInter();
            var intervalId = setInterval(function(){
                var filefoxKeyword = $input.val().trim();
                if (filefoxKeyword !== firefoxXKeyword){
                    firefoxXKeyword = filefoxKeyword;
                    callSearch($input);
                }
            }, 10);
            firefoxTimer = intervalId;
        }

        var agent = navigator.userAgent.toLowerCase();
        $j('#total-search input[type=text]').on('focus', function(event) {
            if(agent.indexOf('firefox') !== -1) {
                firefoxSetInter($j(this));
                return false;
            }
        });

        $j('#total-search input[type=text]').on('click', function(event){
            cfmSearchAreaHtml.linkInfo('search', 'click', null);

            if($j(this).val().trim() === '') {
                return false;
            } else {
                if(agent.indexOf('firefox') !== -1) {
                    t = 'click';
                    firefoxSetInter($j(this));
                }

                if(akcDataExist === "N") {
                    callSearch($j(this));
                    return false;
                } else {
                    firefoxClearInter();
                    return false;
                }
            }
        });

        //통합검색(상단영역)-검색버튼
        $j('#btn-search').on('click', function(){
            kt_api.searchRecommend(); //추천검색어
            kt_api.searchPopkeywords(); //인기검색어
        });
        
        //통합검색(검색레이어)-인기검색어탭선택-2차
        $j('.kt_popkeyword').on('click', function(){
            $j(this).closest('.cfmCltabs').find('a').removeClass('active').removeAttr('title'); 
		    $j(this).addClass('active');
		    $j(this).attr('title','선택된 탭');

            //인기검색어
            kt_api.searchPopkeywords('cl'); 

            //클릭통계
            if(kt_common.pageType() == 'shop'){ //Shop
                KT_trackClicks('KT-개인_공통', '^KT-개인_공통^GNB^Shop^검색레이어^TAB_KT');
            }else{
                KT_trackClicks('KT-개인_공통', '^KT-개인_공통^GNB^검색레이어^TAB_KT');
            }

            return false;
        });
        $j('.shop_popkeyword').on('click', function(){
            $j(this).closest('.cfmCltabs').find('a').removeClass('active').removeAttr('title'); 
		    $j(this).addClass('active');
		    $j(this).attr('title','선택된 탭');

            //인기검색어
            kt_api.searchPopkeywords('shop'); 

            //클릭통계
            if(kt_common.pageType() == 'shop'){ //Shop
                KT_trackClicks('KT-개인_공통', '^KT-개인_공통^GNB^Shop^검색레이어^TAB_Shop');
            }else{
                KT_trackClicks('KT-개인_공통', '^KT-개인_공통^GNB^검색레이어^TAB_Shop');
            }

            return false;
        });

        //통합검색(검색레이어)-검색영역(닷컴-자동완성&바로가기, Shop-자동완성&기획전&연관상품)-2차
        if(kt_common.pageType() == 'shop'){ //Shop
            $j("#searchWrapAfter").append(''+
                    '<div class="search_word">'+
                    '   <strong class="total-search-tit">자동완성</strong>'+
                    '   <ul class="auto-list"></ul>'+
                    '</div>'+
                    '<div class="strategy">'+
                    '   <strong class="total-search-tit">기획전</strong>'+
                    '   <ol class="strategy-lilst"></ol>'+
                    '</div>'+
                    '<div class="relation">'+
                    '   <strong class="total-search-tit">연관 상품</strong>'+
                    '   <ul class="relation-list"></ul>'+
                    '</div>');
        }else{
            $j("#searchWrapAfter").append(''+
                    '<div class="search_word">'+
                    '   <strong class="total-search-tit">자동완성</strong>'+
                    '   <ul class="auto-list"></ul>'+
                    '</div>'+
                    '<div class="menu-shortcut">'+
                    '   <strong class="total-search-tit">메뉴 바로가기</strong>'+
                    '   <ol class="quick-menu"></ol>'+
                    '</div>');
        }

        //통합검색(검색레이어)-검색입력창
        $j('#total-search .result').hide();
		$j('#total-search input[type=text]').attr('placeholder', '무엇이 궁금하신가요?');
		$j('#total-search input[type=text]').attr('maxlength', 30);

        //통합검색(검색레이어)-자동완성 & 바로가기 검색
        $j('#total-search input[type=text]').val(''); //초기화(뒤로가기)
        $j('#total-search input[type=text]').on(agent.indexOf('firefox') !== -1 ? 'keypress' : 'keyup', function(event){
            if (event.keyCode === 0 || event.keyCode === 8) {
                if(agent.indexOf('firefox') !== -1) {
                    firefoxSetInter($j(this));
                    return;
                }
            } else if(event.keyCode === 13) {
                $j('#total-search .tsearch').trigger('click');
                return false;
            }
            callSearch($j(this));
        });

        //통합검색(검색레이어)-검색어 지우기
        $j('#total-search .searchInput-btn-clear').on('click', function(){
            $j(this).hide();
            $j('#searchWrapBefore').show();
            $j('#searchWrapAfter').hide();
            $j('#searchInput').val('').focus();

            $j('.auto-list').find('ul').empty();
            $j('.quick-menu').find('ul').empty();

            cfmSearchAreaHtml.linkInfo('search', 'clear', null);
        });

        //통합검색(검색레이어)-검색페이지이동
        $j('#total-search .tsearch').on('click', function(){
            var searchWords = $j('#total-search input[type=text]').val();
            var recommendWords = $j('#total-search input[type=text]').data('recommend');

            var words = '';
            if(kt_common.isNull(searchWords) !== ''){ //일반검색어
                words = searchWords;
            } else { //추천검색어
                words = kt_common.isNull(recommendWords);
            }

//            if(words !== ''){
//            	cfmSearchAreaHtml.linkInfo('search', 'search', null, {keyword:words});
//            } else {
//            	alert('검색어를 입력해 주세요.');
//            	setTimeout(function(){
//            		$j('#total-search input[type=text]').focus(); //검색어 미입력 알림 후 검색창으로 포커스 보내기
//            	}, 200);
//            	return false;
//            }
            cfmSearchAreaHtml.linkInfo('search', 'search', null, {keyword:words});
        });
        
        //통합검색(검색레이어)-닫기
        $j('#total-search .close-search').on('click', function(){
            cfmSearchAreaHtml.linkInfo('search', 'close', null);
        });

        function callSearch($input){
            var words = cfmSearchAreaHtml.searchWordCheck($input.val().trim());
            if(words !== ''){
                $j('.searchInput-btn-clear').show();
                $j('#searchWrapBefore').hide();
                $j('#searchWrapAfter').show();
               
                kt_api.searchAutowords(words); //자동완성
                
                //통합검색(검색레이어)-문구변경-2차
                if(kt_common.pageType() == 'shop'){ //Shop
                    $j('#searchWrapAfter .menu-shortcut>strong').text('연관 상품');
                    kt_api.searchRelatedProduct(words); //연관상품
                    kt_api.searchwords('shop', words); //기획전                    
                }else{
                    $j('#searchWrapAfter .menu-shortcut>strong').text('메뉴 바로가기');
                    kt_api.searchwords('search', words);
                }
            }else{
                $j('.searchInput-btn-clear').hide();
                $j('#searchWrapBefore').show();
                $j('#searchWrapAfter').hide();

                $j('.auto-list').find('ul').empty();
                $j('.quick-menu').find('ul').empty();
            }
        }
        
        $j('#searchInput').on('focus', function(){
               $j('#searchInput').attr('placeholder', "");
               $j('#searchInput').data('recommend', "");
        });
           
        // $j('#searchInput').on('blur', function(){
        // 	if($j('#searchInput').val()==''){
        // 		kt_api.searchRecommend();
        // 	}
        // });
    }
});