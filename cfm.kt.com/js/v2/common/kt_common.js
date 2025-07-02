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

var kt_common = {
	// Mobile Link URL
	goMobileLink : function(){
		KT_trackClicks('KT-개인_공통', '^KT-개인_공통^푸터^모바일 버전');

		var rtValue = '';
		try {
			if (mKt_common.isNull(ktSmartGWURL) != ''){
				rtValue = ktSmartGWURL;
			}
		} catch (e){
			rtValue = '';
		}

		if(kt_common.isNull(rtValue) == ''){
			var code = ktMenuCd;				
			if(kt_common.isNull(code) === ''){			
				top.location.href = cl_mobile_domain;
			}else{
				kt_api.mobileLink(code);
			}
		}else{
			top.location.href = rtValue;
		}		
	},

	// Mobile Link URL callback
	callbackMobileLinks : function(type, result){
		try {
			if(type === 'success'){
				var resultData = result.data.mblLinkInfo;
				top.location.href = resultData.svcUrl;
			} else {
				top.location.href = cl_mobile_domain;
			}
			
			//모바일 버전으로 이동 시 PC 버전 쿠키 삭제
			kt_common.rtdTodayClose('mobileverview', 'kt_rd', -1);
		} catch(exception){
			top.location.href = cl_mobile_domain;
		}		
	},

	/*
		MenuLink
			linkUrl : 링크 정보
			adobeStat : 통계명
			linktarget : 
				_blank : 새창
				빈값 or _self : 현재창
			code : 메뉴코드
			... 메뉴(페이지) 통합 로그 호출됨.			
	*/ 
	ktMenuLinkStat : function(linkUrl, adobeStat, linktarget, code){
		var titleName = 'KT-개인_공통';

		klog.menu(titleName, adobeStat, code); //kLogcode.js
		KT_trackClicks(titleName, adobeStat); //s_code.js

		var oLinkUrl = linkUrl;
		if (oLinkUrl !== ''){
			setTimeout(function(){
				if(linktarget === '' || linktarget === '_self'){
					top.location.href=linkUrl;
				} else if (linktarget.substring(0, 4) === '_pop'){
					try {
						var pw = linktarget.split('|')[1];
						var ph = linktarget.split('|')[2];
						kt_common.popLink(linkUrl, code, pw,  ph);
					} catch(e){
						common_log.log('kt_common.js ktMenuLinkStat() [팝업사이즈 오류]');
					}
				} else {
					window.open(oLinkUrl,linktarget);
				}
			}, 100);
		}
	},

	/*
		메인 AOT 화면에서 배너 영역의 클릭 시 사용되는 함수. ( ktMenuLinkStat 함수와 동일.. 통합로그 호출 부분만 차이남. )

		Link
			linkUrl : 링크 정보
			adobeStat : 통계명
			linktarget : 
				_blank : 새창
				빈값 or _self : 현재창
			code : 메뉴코드
			areaCode : 영역코드
			type : bann...(Banner 통합log) 
			       그 외에는 메뉴 통합로그 호출됨.			
	*/ 
	ktLinkStat : function(linkUrl, adobeStat, linktarget, code, areaCode, type, omsBannerName){
		var titleName = 'KT-개인_메인';

		//빅배너 
		if (type === 'omsbann'){	
			// 온라인마케팅시스템 oms		
			try {
				if(kt_common.isNull(omsBannerName) == ''){
					omsBannerName = adobeStat;
				}
				omsf.bannerClickLog(areaCode, omsBannerName, 'CL', adobeStat);
			} catch(e){
				common_log.log('kt_common.js omsf.bannerClickLog() [' + e.message + ']');
			}

			klog.banner(titleName, adobeStat, areaCode);
		}
			
		KT_trackClicks(titleName, adobeStat);

		var oLinkUrl = linkUrl;
		if (oLinkUrl !== ''){
			setTimeout(function(){
				if(linktarget === '' || linktarget === '_self'){
					top.location.href=linkUrl;
				} else if (linktarget.substring(0, 4) === '_pop'){
					try {
						var pw = linktarget.split('|')[1];
						var ph = linktarget.split('|')[2];
						kt_common.popLink(linkUrl, code, pw,  ph);
					} catch(e){
						common_log.log('kt_common.js ktLinkStat() [팝업사이즈 오류]');
					}
				} else {
					window.open(oLinkUrl,linktarget);
				}
			}, 100);
		}
	},

	ktLinkStatWithOMS : function(titleName, adobeStat){
		//omsf.clickLog('CL', adobeStat);
		KT_trackClicks(titleName, adobeStat);
	},

	/**
	 * 링크
	 * 	url : url주소
	 * 	linkTarget : 링크타겟
	 * 		_blank : 새창
	 * 		_pop : 팝업(구분자 : |)
	 * 			_pop|팝업명|가로길이|세로길이
	 * 		빈값 or _self : 현재창
	 */
	link : function(url, linkTarget, titleName, adobeStat){		
		if(kt_common.isNull(url) !== ''){
			if(kt_common.isNull(linkTarget) === ''){
				location.href = url;
			} else if (linkTarget.indexOf('_pop') !== -1){
				try {
					var popInfo = linkTarget.split('|');
					var pn = popInfo.length > 1 ? linkTarget.split('|')[1] : 'newWindow';
					var pw = popInfo.length > 2 ? parseInt(linkTarget.split('|')[2]) : 820;
					var ph = popInfo.length > 3 ? parseInt(linkTarget.split('|')[3]) : 700;

					kt_common.popLink(url, pn, pw, ph);
				} catch(e){
					common_log.log('kt_common.js link() [팝업사이즈 오류]');
				}
			} else {
				window.open(url, linkTarget);
			}
		}

		if(kt_common.isNull(titleName) !== '' && kt_common.isNull(adobeStat) !== ''){
			KT_trackClicks(titleName, adobeStat);
		}
	},

	menuChk : function (code){
		var rtCode = '';
		try
		{
			if (kt_common.isNull(code) === ''){
				rtCode = 'XXXXXX';
			} 
			else {
				if (code.length > 6){
					var strCnt = 6;
					if (code.length === 7){
						strCnt = 7;
					} 
					rtCode = code.substring(0, strCnt);
				} else {
					rtCode = code;
				}
			}
		}catch(e)
		{
			rtCode = 'XXXXXX';
		}
		
		return rtCode.substring(0, 1);
	},

	// 숫자 콤마 삽입
	setComma : function(input){
		input = String(input);
		return input.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	},

	// 숫자 콤마 제거
	removeComma : function(input){
		input = String(input);
		input.value.replace(/,/gi,'');
	},

	// 창닫기
	close : function(){
		window.open('', '_self');
		window.close();
	},

	// api호출
	api : function(args){
		if(args.url.indexOf('http') === -1 && args.url.indexOf(api_domain) === -1){
			if(args.url.indexOf('/') > 0){
				args.url = '/' + args.url;
			}

			args.url = api_domain + args.url;
		}

		this.callAjax(args);
	},
	
	/**
	 * ajax 호출
	 * 	args
	 * 		- url : URL
	 * 		- type : 전송방식(default : post)
	 * 		- data : 전송값
	 * 		- callback : 콜백함수
	 * 		- cookie : true 일경우 cookie정보 보냄(생략가능)
	 * 		- beforeSend : 전송전 실행함수(생략가능)
	 * 		- complete : 전송완료후 실행함수(생략가능)
	 * 		- enctype : 전송인코딩타입(생략가능)
	 */
	callAjax : function(args){
		var ajaxArgs = {
			url : args.url,
			type : args.type !== undefined ? args.type : 'post',
			data : args.data !== undefined ? args.data : '',
			dataType : 'json',
			cache : false,
			crossDomain : true,
			success : function(data){
				common_log.log('kt_common.js callAjax('+ args.url +') [success]');
				process();

				function process(){
					if(document.readyState === 'interactive' || document.readyState === 'complete'){
						var returnCode = data.returnCode || data.responseCode;
						if(returnCode !== undefined){
							// returnCode : OK(성공), NG(실패)
							if(returnCode.toLowerCase() === 'ok'){
								if(args.callback){
									args.callback('success', data);
								}
							} else {
								common_log.log('kt_common.js callAjax('+ args.url +') [returnCode : '+ returnCode +']');

								if(args.callback){
									args.callback('fail', data);
								}
							}
						} else {
							if(args.callback){
								args.callback('success', data);
							}
						}
					} else {
						setTimeout(function(){
							process();
						}, 100);
					}
				}

				return data;
			},
			error : function(request, status, error){
				common_log.log('kt_common.js callAjax('+ args.url +') ['+ error +']');

				if(args.callback){
					args.callback('error', error);
				}
			}
		};

		// 컨텍트타입
		if(args.type === 'get'){
			//ajaxArgs.contentType = 'text/plain; charset=utf-8';
		}

		// 동기/비동기
		if(args.async !== undefined){
			ajaxArgs.async = args.async;
		}
		
		// 타임아웃
		if(args.timeout !== undefined){
			ajaxArgs.timeout = args.timeout;
		}

		// 쿠키
		if(args.cookie === true){
			ajaxArgs.xhrFields = { withCredentials:true };
		}

		// ajax 시작전 콜함수
		if(args.beforeSend !== undefined){
			ajaxArgs.beforeSend = args.beforeSend;
		}

		// ajax 성공후 콜함수
		if(args.complete !== undefined){
			ajaxArgs.complete = args.complete;
		}

		// 파일업로드
		if(args.enctype === 'multipart/form-data'){
			ajaxArgs.processData = false;
			ajaxArgs.contentType = false;
		}

		$j.ajax(ajaxArgs);
	},

	/**
	 * 쿼리스트링을 오브젝트로 변환
	 * 	key1=value1&key2=value2 -> {key1 : value1, key2 : value2}
	 */
	queryToObject : function(){
		var obj = {};
		window.location.search.substring(1).replace(/([^=&]+)=?([^&]*)/g, function(m, key, value){
			obj[key] = decodeURIComponent(value);
		});
		return obj;
	},

	/**
	 * 오브젝트를 쿼리스트링으로 변환
	 * 	{key1 : value1, key2 : value2} -> key1=value1&key2=value2
	 */
	objectToQuery : function(obj){
		return $j.param(obj).replace(/\+/g, '%20');
	},

	/*
	** 입력값이 특정 문자만으로 되어 있는지 체크하며
	** 특정 문자만을 허용하려 할때 사용한다.
	*/
	containsCharsOnly : function(input, chars){
		var val = input;
		if(typeof input === 'object') {
			val = input.value;
		}

		for (var i=0; i<val.length; i++)
		{
			if (chars.indexOf(val.charAt(i)) === -1)
			{
				return false;
			}
		}
		return true;
	},

	// 입력값이 알파벳인지 체크
	isAlphabet : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳 대문자인지 체크한다
	isUpperCase : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳 소문자인지 체크한다
	isLowerCase : function(input){
		var chars = 'abcdefghijklmnopqrstuvwxyz';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자만 있는지 체크한다
	isNumber : function(input){
		var chars = '0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 알파벳, 숫자로 되어 있는지 체크한다.
	isAlphaNum : function(input){
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자, 대시'-' 로 되어 있는지 체크한다.
	// 전화번호나 우편번호, 계좌번호에 - 체크할때 유용하다.
	isNumDash : function(input){
		var chars = '-0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 숫자, 콤마',' 로 되어있는지 체크한다.
	isNumComma : function(input){
		var chars = ',0123456789';
		return this.containsCharsOnly(input, chars);
	},

	// 입력값이 사용자가 정의한 포맷 형식인지 체크
	isValidFormat : function(input, format){
		var val = input;
		if(typeof input === 'object'){
			val = input.value;
		}

		if (val.search(format) !== -1)
		{
			return true;//올바른 포멧형식
		}

		return false;
	},

	// 입력값이 이메일 형식인지 체크한다.
	isValidEmail : function(input){
		var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;

		return this.isValidFormat(input, format);
	},

	// 입력값이 전화번호 형식(숫자-숫자-숫자) 인지 체크한다.
	isValidPhone : function(input){
		var format = /^(\d+)-(\d+)-(\d+)$/;

		return this.isValidFormat(input, format);
	},

	//입력값의 바이트 길이를 리턴한다.
	//getByteLength : function(input)
	getByteLength : function(source){
		var byteLength = 0;

		for (var i=0; i<source.length; i++)
		{
			var input = source.substr(i, i+1);
			var oneChar = escape(input.charAt(0));

			if (oneChar.length === 1)
			{
				byteLength++;
			}else if (oneChar.indexOf('%u') !== -1)
			{
				byteLength += 2;
			}else if (oneChar.indexOf('%') !== -1)
			{
				byteLength += oneChar.length / 3;
			}
		}

		return byteLength;
	},

	/**
	 * 팝업 링크
	 * 	linkUrl : 팝업URL
	 * 	popName : 팝업명
	 * 	pw : 너비
	 * 	ph : 높이
	 * 	pt : top(생략시 가운데)
	 * 	pl : left(생략시 가운데)
	 */
	popLink : function(linkUrl, popName, pw, ph, pt, pl){
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		if(kt_common.isNull(pt) === ''){
			pt = ((height / 2) - (ph / 2)) + dualScreenTop;
		}

		if(kt_common.isNull(pl) === ''){
			pl = ((width / 2) - (pw / 2)) + dualScreenLeft;
		}

		var newWindow = window.open(linkUrl, popName, 'width=' + pw + ', height=' + ph + ', top=' + pt + ', left=' + pl + ', status=no, scrollbars=yes');
		if (window.focus){
			newWindow.focus();
		}
	},

	/**
	 * 레이어팝업
	 * 	$target : 레이어타겟
	 * 	pw : 너비
	 * 	ph : 높이
	 * 	pt : top(생략시 가운데)
	 * 	pl : left(생략시 가운데)
	 */
	showLayer : function($target, lw, lh, lt, ll){
		var $p = $target.closest('.layers');
		if($p.length === 0){
			var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
			var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

			if(kt_common.isNull(lt) === ''){
				lt = (height / 2) - (lh / 2);
			}

			if(kt_common.isNull(ll) === ''){
				ll = (width / 2) - (lw / 2);
			}
		} else {
			if(kt_common.isNull(lt) === ''){
				lt = (($p.height() - $target.outerHeight()) / 2 + $p.scrollTop()) + 'px';
			}

			if(kt_common.isNull(ll) === ''){
				ll = (($p.width() - $target.outerWidth()) / 2 + $p.scrollLeft()) + 'px';
			}
		}

		$target.css('position', 'absolute');
		$target.css('width', lw);
		$target.css('height', lh);
		$target.css('top', lt);
		$target.css('left', ll);
		$target.css('z-index', 100);
	},

	// Object check
	isNull : function(obj){
		var rtValue = '';

		try 
		{
			if (obj === undefined || obj === null || obj === ''){
				rtValue = '';
			} else {
				rtValue = obj;
			}
		}catch(e){
			rtValue = '';
		}

		return rtValue;
	},

	/**
	 * 페이징
	 * 	$pagination : 페이징 Jquery Obejct
	 * 	callback : 콜백함수
	 * 	total : 전체글수
	 * 	currentPage : 현재페이지번호
	 * 	recordByPage : 페이지당 글수
	 * 	pageByBlock : 블럭당 페이지수
	 */
	setPagination : function($pagination, callback, total, currentPage, recordByPage, pageByBlock){
		var textFirstPage = '첫 페이지로 이동';
		var textPrevPage = '이전 페이지로 이동';
		var textCurrPage = '현재위치';
		var textNextPage = '다음 페이지로 이동';
		var textLastPage = '마지막 페이지로 이동';
		var language = $j('html').attr('lang');
		if(language.indexOf('en') >= 0){
			textFirstPage = 'Go to the first Page';
			textPrevPage = 'Go to the previous Page';
			textCurrPage = 'Current page';
			textNextPage = 'Go to the next Page';
			textLastPage = 'Go to the last Page';
		}
		
		if(total !== 0){
			var pageHtml = '<div class="scope">';

			// 기본값세팅
			if(currentPage === undefined){
				currentPage = 1;
			}

			if(recordByPage === undefined){
				recordByPage = 10;
			}

			if(pageByBlock === undefined){
				pageByBlock = 10;
			}

			// 전체페이지수
			var numOfPage = Math.ceil(total / recordByPage);

			if(numOfPage > 1){
				var disabled = '';
				if(currentPage === 1){	// 첫페이지
					disabled = 'disabled';
				}
				pageHtml += '<a href="javascript:;" class="dir first ' + disabled + '">' + textFirstPage + '</a><a href="javascript:;" class="dir prev ' + disabled + '">' + textPrevPage + '</a>';
			}

			var firstPage = Math.floor((currentPage - 1) / pageByBlock) * pageByBlock + 1;	// 현재블럭의 첫페이지
			var lastPage = numOfPage > firstPage + pageByBlock - 1 ? firstPage + pageByBlock - 1 : numOfPage;	// 현재블럭의 마지막페이지
			for(var page = firstPage; page <= lastPage; page++){
				if(page === currentPage){
					pageHtml += '<span title="' + textCurrPage + '">' + page + '</span>';
				} else {
					pageHtml += '<a href="javascript:;" data-page="' + page + '">' + page + '</a>';
				}
			}

			if(numOfPage > 1){
				var disabled = '';
				if(currentPage === numOfPage){	// 마지막페이지
					disabled = 'disabled';
				}
				pageHtml += '<a href="javascript:;" class="dir next ' + disabled + '">' + textNextPage + '</a><a href="javascript:;" class="dir last ' + disabled + '">' + textLastPage + '</a>';
			}

			pageHtml += '</div>';

			$pagination.html(pageHtml);

			$pagination.find('a').on('click', function (event){
				event.preventDefault();

				if($j(this).hasClass('disabled') === false){
					if(callback){
						if($j(this).hasClass('first')){	// 첫페이지
							callback(1);
				            setTimeout(function(){ $pagination.find('a.first').focus();}, 400);//vos 결함아이디 1073742 : 초점유지
						} else if($j(this).hasClass('prev')){	// 이전페이지
							callback(currentPage - 1);
				            setTimeout(function(){ $pagination.find('a.prev').focus();}, 400);//vos 결함아이디 1073742 : 초점유지
						} else if($j(this).hasClass('next')){	// 다음페이지
							callback(currentPage + 1);
				            setTimeout(function(){ $pagination.find('a.next').focus();}, 400);//vos 결함아이디 1073742 : 초점유지
						} else if($j(this).hasClass('last')){	// 마지막페이지
							callback(numOfPage);
				            setTimeout(function(){ $pagination.find('a.last').focus();}, 400);//vos 결함아이디 1073742 : 초점유지
						} else {
							callback(parseInt($j(this).data('page')));	// 페이지
				            setTimeout(function(){ $pagination.find('span').attr('tabindex', '0').focus();}, 400);//vos 결함아이디 1073742 : 초점유지
						}
					}
				}
			});
		}
	},

	// 로컬스토리지에 데이터 저장
	setLocalStorage : function(key, data){
		var value = {};

		value.timestamp = new Date().getTime();	// 데이터생성날짜
		value.data = data;

		localStorage.setItem(key, JSON.stringify(value));
	},
	
	// 로컬스토리지에서 데이터 조회
	getLocalStorage : function(key){
		this.removeLocalStorage(key);	// 데이터 삭제

		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			return value.data;
		}

		return null;
	},
	
	// 로컬스토리지에서 데이터 조회 (데이터 삭제 안함)
	getLocalStorageNotDel : function(key){
		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			return value.data;
		}

		return null;
	},

	// 로컬스토리지에서 데이터 삭제
	removeLocalStorage : function(key){
		var value = JSON.parse(localStorage.getItem(key));
		if(value !== null){
			var saveTime = value.timestamp;
			var nowTime = new Date().getTime().toString();

			// 5초가 지났으면 데이터삭제
			var timePeriod = this.compareTime(saveTime, nowTime, 'S');
			if(timePeriod > 5){
				localStorage.removeItem(key);
			}
		}
	},

	// 현재시간 yyyy-mm-dd hh:mi:ss
	dateToStr : function(t){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if(month < 10){
			month = '0' + month;
		}
		if(day < 10){
			day = '0' + day;
		}
		if(hour < 10){
			hour = '0' + hour;
		}
		if(minute < 10){
			minute = '0' + minute;
		}
		if(second < 10){
			second = '0' + second;
		}
		if (t=='N'){
			return year + '' + month + '' + day + '' + hour + '' + minute + '' + second;
		}else{
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		}
	},

	// 시간비교
	compareTime : function(source, target, type){
		var t = 1;
		switch(type){
			case 'S' :
				t = 1000;
				break;
			case 'M' :
				t = 1000 * 60;
				break;
			case 'H' :
				t = 1000 * 60 * 60;
				break;
			case 'D' :
				t = 1000 * 60 * 60 * 24;
				break;
			default :
				break;
		}
		return Math.floor((target - source) / t);
	},

	// 시간계산
	addDays : function(date, days){
		if(kt_common.isNull(date) !== ''){
			if(kt_common.isNull(days) === ''){
				days = 1;
			}
			var today = new Date();
			if(typeof date === 'string'){
				date = date.replace(/[^(0-9)]/gi, '');

				today.setFullYear(date.substring(0, 4));
				today.setMonth(parseInt(date.substring(4, 6)) - 1);
				today.setDate(date.substring(6, 8));
			} else if(typeof date === 'object'){
				today = date;
			}
			today.setDate(today.getDate() + days);
			return today;
		}
	},

	// 접근페이지확인
	checkedReferrer : function(url){
		var isPossibled  = false;

		if(/MSIE (\d+\.\d+);/.test(navigator.userAgent) || getIEVersion() !== 'N/A'){	// IE
			isPossibled = true;
		} else {
			var referrerUrl = document.referrer;
			var indexQueryStr = referrerUrl.indexOf('?');
			if(indexQueryStr !== -1){
				referrerUrl = referrerUrl.substring(0, indexQueryStr);
			}

			if(referrerUrl === url){
				isPossibled = true;
			}
		}
		
		return isPossibled;
	},

	/* 
		통합kt.com에서 개발되는 page. 에서는 배너 클릭시 호출되는 함수
		adobe 통계 + GA 통계 + 통합Log
	*/ 
	KT_trackClicksNkLog : function (ClickCatName, ClickName, code){
  		KT_trackClicks(ClickCatName, ClickName);
  		klog.banner(ClickCatName, ClickName, code);
	},

	/*
		검색어 
			... 검색어 통합 로그 호출됨.
	*/	
	KT_trackClicksSearchkLog : function (existSch, notExistSch){
  		klog.search(existSch, notExistSch);
	},

	/*
		See&Click Banner Click
			... 캠페인(See&Click) 통합 로그 호출됨.
	*/	
	KT_trackClicksSNCkLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.snc(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.snc(ClickCatName, ClickName, code);
                break;
        }
    },

	/*
		See&Click Banner View
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksViewkLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncview(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncview(ClickCatName, ClickName, code);
                break;
        }
    },

	/*
		See&Click Banner Close
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksClosekLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncclose(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncclose(ClickCatName, ClickName, code);
                break;
        }
        
    },

	/*
		See&Click Banner Close
			... 노출 통합 로그 호출됨.
	*/	
	KT_trackClicksNeverClosekLog : function (ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId){
        KT_trackClicks(ClickCatName, ClickName);
        switch(ktChannel){
            case 'Cl' :
                klog.sncneverclose(ClickCatName, ClickName, code, exeType, sgnlType, rtdEvtId, evSorcId);
                break;
            case 'Bz' :
                klog.sncneverclose(ClickCatName, ClickName, code);
                break;
        }
    },

	callRtdTodayClose : function(cookieType, cookieName, period){
		$j("#checkbox-"+cookieName).prop('checked', true);
		kt_common.rtdTodayClose(cookieType, cookieName, period);
	},

	/*
		오늘 닫기 기능 ( 일정기간 보지않기 체크시에는 쿠키 관리 필요 )
		cookieName : 쿠키명
	*/
	rtdTodayClose : function(cookieType, cookieName, period){
		if(typeof period === 'string'){
			period = parseInt(period);
		}

		// 0기간동안 열지않기 check box 확인
		if(cookieType === 'snc'){
			if($j('#checkbox_snc').is(':checked') === true || $j('#checkbox_snc_fold').is(':checked') === true){
				kt_common.setArrayCookie('snc_menu', ktMenuCd, period);
				kt_common.setArrayCookie('snc_camp', cookieName, period);
			}
		} else {
			var isCookie = false;
			if($j('#checkbox-' + cookieName).length){
				if($j('#checkbox-' + cookieName).is(':checked') === true){
					isCookie = true;
				}
			} else {
				isCookie = true;
			}

			if(isCookie){
				kt.setComCookie(cookieName, new Date().toString(), period);
			}
		}
	},

	/*
		쿠키세팅 - 배열
	*/
	setArrayCookie : function(cookieName, code, period){
		var val = kt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}

		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					obj.splice(i, 1);
					break;
				}
			}
		}

		var expire = new Date();
		expire.setSeconds(0);
		expire.setMinutes(0)
		expire.setHours(0);

		var value = {};
		value[key] = code;
		value['expire'] = kt_common.addDays(expire, period).getTime();
		obj.push(value);

		kt.setComCookie(cookieName, JSON.stringify(obj), 365);	// 365일 저장
	},

	/*
		쿠키조회 - 배열
	*/
	getArrayCookie : function(cookieName, code){
		var returnValue = '';
		var val = kt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}
		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			var nowTime = new Date().getTime().toString();

			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					if(kt_common.compareTime(nowTime, obj[i]['expire'], 'S') > 0){
						returnValue = obj[i];
					} else {
						kt_common.removeArrayCookie(cookieName, code);
					}

					break;
				}
			}
		}

		return returnValue;
	},

	/*
		쿠키삭제 - 배열
	*/
	removeArrayCookie : function(cookieName, code){
		var val = kt.getComCookie(cookieName);
		var obj = [];
		if(val !== ''){
			obj = JSON.parse(val);
		}

		var key = 'code';
		if(cookieName === 'snc_menu'){
			key = 'menuCd';
		} else if(cookieName === 'snc_camp'){
			key = 'campId';
		}

		if(obj.length > 0){
			for(var i = 0; i < obj.length; i++){
				if(obj[i][key] === code){
					obj.splice(i, 1);
					break;
				}
			}
		}

		kt.setComCookie(cookieName, JSON.stringify(obj), 365);	// 365일 저장
	},

	// 태그제거
	removeTag : function(str){
		return kt_common.isNull(str).replace(/(<([^>]+)>)/gi, '');
	},

	tagReplaceAll : function(str){
		return kt_common.isNull(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, '\'').replace(/&#34;/g, '"').replace(/inside\/01\//g, 'inside/');
	},

	txtReplaceAll : function(str){
		return kt_common.isNull(str).replace(/\r\n/g, '<br />').replace(/\n/g,'<br />').replace(/inside\/01\//g, 'inside/');
	},	

	// Path 끝 '/' 붙히기
	addLastSlash : function(path){
		var path = kt_common.isNull(path);
		if(path.lastIndexOf('/')  !== path.length - 1){
			path = path + '/';
		}
		return path;
	},

	// 말줄임
	ellipsis : function(str, limit, letter){
		if(kt_common.isNull(letter) === ''){
			letter = '...';
		}

		var cutStr = kt_common.cutStr(str, limit);
		if(str !== cutStr){
			cutStr += letter;
		}
		
		return cutStr;
	},

	// Byte수 만큼 글자 자르기
	cutStr : function(str, limit){
		var str = kt_common.isNull(str);
		if(str === ''){
			return 0;
		}

		var len = str.length;
		var size = 0;
		var cutIndex = len;
		for(var i = 0; i < len; i++){
			size += kt_common.charByteSize(str.charAt(i));
			if(size === limit){
				cutIndex = i + 1;
				break;
			} else if(size > limit){
				cutIndex = i;
				break;
			}
		}

		return str.substring(0, cutIndex);
	},

	// Byte 크기 구하기
	charByteSize : function(ch){
		if(kt_common.isNull(ch) === ''){
			return 0;
		}

		var charCode = ch.charCodeAt(0);
		if(charCode <= 0x00007F){
			return 1;
		} else if(charCode <= 0x0007FF){
			return 2;
		} else if(charCode <= 0x00FFFF){
			return 3;
		} else {
			return 4;
		}
	},

	ranDateNum : function(s){
		var d1 = new Date().getTime().toString();
		var d2 = parseInt(d1) % s;

		return d2;
	},

	//통계
	sendStatis : function(data, pageName){
		var result = data;
		var apiPageName = '';
	
		if(pageName !== undefined && pageName !== '' && pageName !== null){
			if(ktChannel === 'Cl'){
				apiPageName = pageName;
			}else{
				if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
					apiPageName = result.data.scrnStatInfo;
				}else{
					apiPageName = '통계용 페이지명 없음';
				}
			}
		}else{
			if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
				apiPageName = result.data.scrnStatInfo;
			}else{
				apiPageName = '통계용 페이지명 없음';
			}
		}
		// GA용 통계 스크립트 호출
		ga('set', 'title', apiPageName); //GA용, adobe 통계 pageName을 그대로 호출
		ga('rollup.set', 'title', apiPageName); //Adobe s.pageName
		if(kt.isLogin() === 'Y'){
			s.eVar11='Y';
			ga('set','dimension1','Y');
			ga('rollup.set','dimension1','Y');
		}else{
			s.eVar11='N';
			ga('set','dimension1','N');
			ga('rollup.set','dimension1','N');
		}
		
		try{
			var GAcid = GAgetCookie('_ga').split('.');
			ga('set', 'dimension20', GAcid[2]+'.'+GAcid[3]); 
			ga('rollup.set', 'dimension20', GAcid[2]+'.'+GAcid[3]);
		} catch(e){
			common_log.log('kt_common.js sendStatis() [' + e.message + ']');
		}
	
		ga('send', 'pageview'); // GA용, 통계 전송
		ga('rollup.send', 'pageview');
		s.pageName = apiPageName;
		
		loadAdobeChk();
	},
	
	//통계 Launch
	sendStatisLaunch : function(data, pageName){
		var result = data;
		var apiPageName = '';
		var logPageName = ''
		var rtUrl = document.location;
	
		if(pageName !== undefined && pageName !== '' && pageName !== null){
			if(ktChannel === 'Cl'){
				apiPageName = pageName;
				logPageName = pageName;
			}else{
				if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
					apiPageName = result.data.scrnStatInfo;
					logPageName = result.data.scrnStatInfo;
				}else{
					apiPageName = rtUrl;
				}
			}
		}else{
			if(result.returnCode === 'ok' && result.data.scrnStatInfo !== '' && result.data.scrnStatInfo !== null){	
				apiPageName = result.data.scrnStatInfo;
				logPageName = result.data.scrnStatInfo;
			}else{
				apiPageName = rtUrl;
			}
		}

		// GA용 통계 스크립트 호출
		ga('set', 'title', apiPageName); //GA용, adobe 통계 pageName을 그대로 호출
		ga('rollup.set', 'title', apiPageName); //Adobe s.pageName
		
		//Adobe launch
		_commonDL = {
			pageInfo :{
				page_name : apiPageName, //각 페이지명, 페이지명은 별도의 엑셀파일 참조, 페이지 depth 구분은 "^"로 구분
				page_url : rtUrl,
				channel : "PC", //예시) pc web : PC, mobile web : Mobile, App : App
				login_status : "N", // 예시) "Y"(로그인),  "N"(비로그인)
				login_type : "", // 예시) ID 로그인 : normal, 소셜로그인 : facelook, kakaotalk, 자동로그인 : auto
			}
		};


		if(kt.isLogin() === 'Y'){
			_commonDL.pageInfo.login_status = 'Y';
			ga('set','dimension1','Y');
			ga('rollup.set','dimension1','Y');
		}else{
			_commonDL.pageInfo.login_status = 'N';
			ga('set','dimension1','N');
			ga('rollup.set','dimension1','N');
		}
		
		try{
			var GAcid = GAgetCookie('_ga').split('.');
			ga('set', 'dimension20', GAcid[2]+'.'+GAcid[3]); 
			ga('rollup.set', 'dimension20', GAcid[2]+'.'+GAcid[3]);
		} catch(e){
			common_log.log('kt_common.js sendStatis() [' + e.message + ']');
		}
	
		ga('send', 'pageview'); // GA용, 통계 전송
		ga('rollup.send', 'pageview');

		cfmFooterAreaHtml.statPageLaunch(logPageName);  //페이지통계
	},

	//날짜포멧
	dateFormat: function(type, date){
		var format = '';
		if(kt_common.isNull(date) != ''){
			date = new Date(date);
		}else{
			date = new Date();
		}

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		month = month > 9 ? month : '0'+ month;
		day = day > 9 ? day : '0'+ day;
		hour = hour > 9 ? hour : '0'+ hour;
		minute = minute > 9 ? minute : '0'+ minute;
		second = second > 9 ? second : '0'+ second;

		format = type;
		format = format.replace('YYYY', year);
		format = format.replace('MM', month);
		format = format.replace('DD', day);
		format = format.replace('HH', hour);
		format = format.replace('mm', minute);
		format = format.replace('ss', second);

		common_log.log('kt_common.js dateFormat() [loadServerTime:'+ loadServerTime +', date:'+ format +']');

		return format;
	},
	
	//컨텐츠 타입
    contsViewType: function(mode, target, areaData, conts){
        var html;
        if(conts.areaContsType == "01"){ //html
            html = $j(conts.htmlInfo);
            target.append(html);
        }else if(conts.areaContsType == "02"){ //이미지
            html = $j('<a href="#"><img src="#"/></a>');
            html.find('img').attr('alt', kt_common.removeTag(conts.altText));

			if(mode == 'common'){
				html.find('img').attr('src', cfm_domain + conts.saveImgPath + conts.saveImgNm);
			}else{
				html.find('img').attr('src', cl_domain + conts.saveImgPath + conts.saveImgNm);
			}

            conts.statInfo = areaData.statInfo + conts.statInfo;			
			conts.omsBannerName = conts.statInfo;
            kt_common.linkInfo(mode, 'img', html, conts, conts.floatTrgtType, conts.popupWdth, conts.popupVrtc);

			target.append(html);
        }else if(conts.areaContsType == "03"){ //이미지맵
            html = $j('<img src="#">');
			html.attr('alt', kt_common.removeTag(conts.altText));
            html.attr('usemap', '#'+ conts.areaContsId);

			if(mode == 'common'){
				html.attr('src', cfm_domain + conts.saveImgPath + conts.saveImgNm);
			}else{
				html.attr('src', cl_domain + conts.saveImgPath + conts.saveImgNm);
			}

            target.append(html);
            target.append('<map name="'+ conts.areaContsId +'"></map>');
            
            $j.each(conts.areaContsImgMapList, function(i, map){
                var area = $j('<area>');
                var imgMapType = "";
                if (map.imgmapType == "01"){ //사각형
                    imgMapType = "rect";
                }else if (map.imgmapType == "02"){ //원형
                    imgMapType = "circle";
                }else if (map.imgmapType == "03"){ //다각형
                    imgMapType = "poly";
                }

                map.statInfo = areaData.statInfo + map.imgmapStatInfo;
                map.areaId = map.areaContsId;
                map.omsBannerType = conts.omsBannerType;
                map.omsBannerName = areaData.statInfo + map.imgmapStatInfo;

                area.attr('alt', kt_common.removeTag(map.altText));
                area.attr('coords', map.imgmapCrd);
                area.attr('shape', imgMapType);                
                target.find('map').append(area);
				kt_common.linkInfo(mode, 'imgMap', area, map, map.popupTrgtType, map.popupWdth, map.popupVrtc);
            });
        }

        return html;
    },

	//링크정보
	linkInfo: function(mode, type, traget, item, linkType, linkPopW, linkPopH){
		var linkTarget = '', titleName = '';

        linkType = parseInt(linkType);
        if(linkType == '3'){
            linkTarget = '_pop|'+ linkPopW +'|'+ linkPopH;
            traget.attr('title', '새창열림');
        }else if(linkType == '2'){
            linkTarget = '_blank';
            traget.attr('title', '새창열림');
        }else{			
            linkTarget = '_self';
        }
		
		if(kt_common.isNull(item.menuCd) == '') item.menuCd = '';
        if(kt_common.isNull(item.areaId) == '') item.areaId = '';
        if(kt_common.isNull(item.omsBannerType) == '') item.omsBannerType = '';
        if(kt_common.isNull(item.omsBannerName) == '') item.omsBannerName = '';

		if(mode == 'common'){ //공통
			titleName = 'KT-개인_공통';

			if(type == 'click'){
				traget.on('click', function(e){
					if(item.svcUrl == 'login'){ //로그인
						KT_trackClicks(titleName, item.statInfo);
						kt.popupLogin(location.href);
						return false;
					}else if(item.svcUrl == 'logout'){ //로그아웃
						KT_trackClicks(titleName, item.statInfo);
						kt.goLogout();
						return false;
					}else if(item.svcUrl == 'stsfcSurvey'){ //만족도 조사
						KT_trackClicks(titleName, item.statInfo);
						kt_common.standAlone();
                		return false;
					}else if(item.svcUrl == 'cfmSmartTalkLink'){ //케이톡
						if($j(this).attr('id') == 'cfmSmartTalkLink'){
							KT_trackClicks(titleName, item.statInfo);
							cfmFooterAreaHtml.smartTalkPopup(0); //아이콘
						}else{
							cfmFooterAreaHtml.smartTalkPopup(1);
						}
						
                		return false;
					}else{
						if($j(this).attr('id') == 'cfmFloatingInfoBtn'){ //소개
							item.svcUrl = item.urlInfo;
						}

						kt_common.ktMenuLinkStat(item.svcUrl, item.statInfo, linkTarget, item.menuCd);
						if(item.svcUrl != '') return false;
					}
				});
			}else{ //메인						
				if(type == 'all'){
					if(item.statInfo != undefined) item.statInfo = item.statInfo.replace('^GNB', '^전체메뉴'); //통계정보 변경
				}else if(type == 'channel' || type == 'recommend' || type == 'direct' || type == 'img'){
					item.svcUrl = item.urlInfo;
				}else if(type == 'targetMenu'){
					if(item.statInfo != undefined) item.statInfo = item.statInfo.replace('GNB^', '퀵메뉴^최근본메뉴^'); //통계정보 변경
				}
	
				traget.attr('href', 'javascript:kt_common.ktMenuLinkStat(\''+ item.svcUrl +'\',\''+ item.statInfo +'\',\''+ linkTarget +'\',\''+ item.menuCd +'\');');
			}
		}else if(mode == 'main'){ //메인
			titleName = 'KT-개인_메인';

			if(type == 'click'){
				//중복제거
				if(item.statInfo.indexOf('^KT-개인_메인^') > -1){
                    KT_trackClicks(titleName, item.statInfo);
                }else{
					KT_trackClicks(titleName, '^KT-개인_메인^'+ item.statInfo);
				}				
			}else{
				traget.attr('href', 'javascript:kt_common.ktLinkStat(\''+ item.urlInfo +'\',\''+ item.statInfo +'\',\''+ linkTarget +'\',\''+ item.menuCd +'\',\''+ item.areaId +'\',\''+ item.omsBannerType +'\',\''+ item.omsBannerName +'\');');
			}
		}	
	},

	//만족도조사 정보
	standAloneInfo: function() {
		if(properties == 'prd'){ //상용
			sdegWidgetId = 'KT_MAIN_NEW'; //메인
			sdegKey = '88a21276-a85b-4f96-9b8e-41bce6bad571';

			if($j('#ktMainYn').length == 0 && kt_common.isNull(ktMenuCd) != ''){
				if(ktMenuCd.substring(0,1) == 'A'){ //마이
					sdegWidgetId = 'KT_MY_PAGE_NEW';
					sdegKey = '9c27088c-16b7-4644-937a-10af620d4950';
				}else if(ktMenuCd.substring(0,1) == 'B'){ //상품
					sdegWidgetId = 'KT_PRODUCT_NEW';
					sdegKey = '20a41da2-ec18-44ea-bae0-1d08c8ac4cf3';
				}else if(ktMenuCd.substring(0,1) == 'C'){ //혜택
					sdegWidgetId = 'KT_MSHIP_BNFIT_NEW';
					sdegKey = '5a64ddae-a80c-4e77-ae0d-1c306e37c8c9';
				}else if(ktMenuCd.substring(0,1) == 'E'){ //고객지원
					sdegWidgetId = 'KT_CUST_SUPRT_NEW';
					sdegKey = '423af5ce-075a-4610-add7-5825c1637821';
				}
			}
		}else{ //기타
			sdegWidgetId = 'KT_MAIN_NEW'; //메인
			sdegKey = '8fa1d67d-1d43-4952-bcb6-62c6062ae8b0';

			if($j('#ktMainYn').length == 0 && kt_common.isNull(ktMenuCd) != ''){		
				if(ktMenuCd.substring(0,1) == 'A'){ //마이
					sdegWidgetId = 'KT_MY_PAGE_NEW';
					sdegKey = 'ef390078-1528-4e01-93cf-b0ba2663dad2';
				}else if(ktMenuCd.substring(0,1) == 'B'){ //상품
					sdegWidgetId = 'KT_PRODUCT_NEW';
					sdegKey = '5ccab8b1-e6ff-4c76-992b-3681f3c718aa';
				}else if(ktMenuCd.substring(0,1) == 'C'){ //혜택
					sdegWidgetId = 'KT_MSHIP_BNFIT_NEW';
					sdegKey = '693d2100-3360-49c6-ab77-cd76d9aaecd3';
				}else if(ktMenuCd.substring(0,1) == 'E'){ //고객지원
					sdegWidgetId = 'KT_CUST_SUPRT_NEW';
					sdegKey = '32da9696-53b7-4682-bce6-4439c0e130e3';
				}
			}
		}
	},

	//만족도조사 링크
	standAlone: function() {
		kt_common.setArrayCookie('stsfcSurvey', sdegWidgetId, 30); //30일(고정)
		var url = sdeg_domain + '/web/widget/sdeg.html?k='+ sdegKey +'&w='+ sdegWidgetId;
        window.open(url,'SdegPopup','width=460, height=720, toolbar=no, location=no, status=no, menubar=no');
    },

	//페이지구분-2차(배포 DATA url 및 예외처리)
	pageType: function() {
		var str = 'cl';
		try {
			switch (chkMenu.substring(0, 1)) {
				case 'F' :
					str = 'shop';
					break;				
				default :
					str = 'cl';
					break;
			}
		} catch (error) {
			str = 'cl';
		}

		return str;
	}
}

var banner = {
	//간편조회배너
	simple: function(){
		if($j('.simple-banner').length){
			kt_api.simpleBanner();
		}
	},

	//간편조회배너 callback 
    callbackSimple: function(type, result){
		try {
			if(type === 'success') {
				if(kt_common.isNull(result.data) !== '' && result.data.length > 0) {
					var resultList = result.data[0].areaSetList[0].areaContsList;
					if(kt_common.isNull(resultList) !== '' && resultList.length > 0) {
						var resultData = resultList[0];
						var targetType = '_self';	// 기본값 : 본창
						var targetTitle = '';	// 기본값 : 
						if(resultData.trgtType === '02') {	// 새창
							targetType = '_blank';
							targetTitle = ' title="새창열림"';
						}
	
						html = '<a href="' + resultData.urlInfo + '" target="' + targetType + '" '+ targetTitle +'><img src="' + cl_domain + kt_common.addLastSlash(resultData.saveImgPath) + kt_common.isNull(resultData.saveImgNm) + '" alt="' + resultData.altText + '"></a>';
						$j('.simple-banner').html(html);
					}
				}
			}
		} catch (e) {
			common_log.log('kt_common.js callbackSimple() [' + e.message + ']');
		}
	}
}