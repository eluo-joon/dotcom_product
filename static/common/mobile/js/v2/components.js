$(document).ready(function () {
	prdTabScroll();

	$('.prd-list-wrap .js-tree-btn-toggle').on('click', function() {
		var thSs = $(this).closest('.js-tree-group').hasClass('active');
		// 리스르를 열 때
		if (!thSs)		{
			$(this).children('.btn-arrow-more').text('닫기');
		// 리스트를 닫을 때
		} else {
			$(this).children('.btn-arrow-more').text('상품리스트');
		}
	});
	
	
	// kt.com 고객센터 연결 신규 인벤토리 기획 개발 SB v0.2
	// link List ( 0 : 메인, 1 : 인터넷, 2 : TV, 3 : 결합 )
	var talkLinkList = [
		"",
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
		"1505",  // 인터넷
		"1625", // 토탈안심 인터넷
		];
	// TV 대상 상품
	var tvItemList = [
		"1515", // TV 초이스 프리미엄
		"1516", // TV 초이스 스페셜
		"1517", // TV 초이스 플러스
		"1518", // TV 일반
		];
	// 결합 대상 상품
	var combinationItemList = [
		"1193", // 프리미엄 가족결합 -- 카태고리 없는 상품
		];
	
	
	var talkLink = ""; // kTalk Link
	var phoneNumber = "0805020100"; // Phone Number
	var category = ""; // 통계 카테고리
	var content = ""; // 통계 내용
	var inven = ""; // 배너 html 내용
	
	var pathname = window.location.pathname; // URL 구분
	if (pathname == "/mDic/index.do") { // 상품 리스트 화면
		
		// index.do 화면 경우
		var cCode = $j("#cate_code").val();
		var fCode = $j("#filter_code").val();
		//
		
		if (cCode == "6044") {
			// 인터넷
			talkLink = talkLinkList[1];
			category = "mKT-개인_상품서비스_인터넷^요금제리스트";
			content = "^mKT-개인_상품^인터넷^요금제리스트^배너";
		} else if (cCode == "6008") {
			// TV
			talkLink = talkLinkList[2];
			category = "mKT-개인_상품서비스_TV^요금제리스트";
			content = "^mKT-개인_상품^TV^요금제리스트^배너";
		} else if (cCode == "6027") {
			// 결합
			talkLink = talkLinkList[3];
			category = "mKT-개인_상품서비스_결합상품^요금제리스트";
			content = "^mKT-개인_상품^결합상품^요금제리스트^배너";
		}
		
		// 선언된 경우만 UI 구성
		if (talkLink != "") {
			inven += "<div class='inven2022'>";
			inven += "<a class='btn_inven2022_phone' href='tel:" + phoneNumber + "' onclick=\"KT_trackClicks('" + category + "','" + content + "_전화상담(무료)');\" target='_blank' title='전화걸기 앱으로 전환됩니다'>";
			inven += "<span>전화 상담(무료)</span>";
			inven += "</a>";

			/* 웹 접근성 결함 : 웹/앱 제공정보(title값) 구분 */
			// 요금제 상단 채팅 상담 버튼 웹/앱 title값 구분
			if ( isAppCheck() == true ){
				inven += "<a class='btn_inven2022_chat' href='"+ talkLink +"' onclick=\"KT_trackClicks('" + category + "','" + content + "_채팅 상담하기');\" target='_blank' title=''>";
			} else {
				inven += "<a class='btn_inven2022_chat' href='"+ talkLink +"' onclick=\"KT_trackClicks('" + category + "','" + content + "_채팅 상담하기');\" target='_blank' title='새창열림'>";
			}
			/* // 웹 접근성 결함 : 웹/앱 제공정보(title값) 구분 */

			inven += "<span>채팅 상담</span>";
			inven += "</a>";
			inven += "</div>";
			
			$j(inven).insertBefore('.prd-list-wrap')
		}
	} else if (pathname == "/mDic/productDetail.do") { // 상품 상세 화면
		
		var targetList = []; // 대상 확인 리스트
		// 상품 카테고리별 구분
		if (cateCode == "6004" || cateCode == "6005" || cateCode == "6006" || cateCode == "6040" || cateCode == "6042" || cateCode == "6043" || cateCode == "6044") {
			// 인터넷
			talkLink = talkLinkList[1];
			category = "mKT-개인_상품서비스_인터넷^요금제상세";
			content = "^mKT-개인_상품^인터넷^요금제^상세^" + itemName + "^배너";
			targetList = internetItemList;
			
		} else if (cateCode == "6007" || cateCode == "6008" || cateCode == "6009" ) {
			// TV
			talkLink = talkLinkList[2];
			category = "mKT-개인_상품서비스_TV^요금제상세";
			content = "^mKT-개인_상품^TV^요금제^상세^" + itemName + "^배너";
			
			targetList = tvItemList;
			
		} else if (cateCode == "6026" || cateCode == "6027" || cateCode == "6028" || cateCode == "6029") {
			// 결합
			talkLink = talkLinkList[3];
			category = "mKT-개인_상품서비스_결합^요금제상세";
			content = "^mKT-개인_상품^결합^요금제^상세^" + itemName + "^배너";
			
			targetList = combinationItemList;
			
		} else {
			// cateCode 코드 없는 상품일경우 처리
			
			// 프리미엄 가족결합
			if (itemCode == "1193") {
				// 결합
				talkLink = talkLinkList[3];
				category = "mKT-개인_상품서비스_결합^요금제상세";
				content = "^mKT-개인_상품^결합^요금제^상세^" + itemName + "^배너";
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
			inven += "<div class='inven2022'>";
			inven += "<a class='btn_inven2022_phone' href='tel:" + phoneNumber + "' onclick=\"KT_trackClicks('" + category + "','" + content + "_전화상담(무료)');\" target='_blank' title='새창열림'>";
			inven += "<span>전화 상담(무료)</span>";
			inven += "</a>";
			inven += "<a class='btn_inven2022_chat' href='"+ talkLink +"' onclick=\"KT_trackClicks('" + category + "','" + content + "_채팅 상담하기');\" target='_blank' title='새창열림'>";
			inven += "<span>채팅 상담</span>";
			inven += "</a>";
			inven += "</div>";
			
			$j(inven).insertBefore('#mCfmClFooter')
		}
		targetList = [];
	}
	
	// //kt.com 고객센터 연결 신규 인벤토리 기획 개발 SB v0.2
	
	
});

// 더보기 resize
$(window).resize(function () {
	prdTabScroll();
});


// menu scroll 0518: ul 폭이 가로길이보다 작을 때 버튼 숨기기
function prdTabScroll() {
	// window.width 보다 리스트가 작을때(스크롤이 없을때)
	if ($('.prd-tab-menu > ul').length != 0) {
		$('.prd-tab-menu > ul').each(function() {
			var $this = $(this);
			var box = $this.width();
			var $li = $this.find('li.tab-title');
			var child_size = 0;

			$li.each(function(i) {
				child_size += $(this).outerWidth()+5;
			});

			if (child_size < box) {
				$('.prd-tab-menu').addClass('extend');
				$(this).find('.btn-more').hide();
			}else{
				$('.prd-tab-menu').removeClass('extend');
				$(this).find('.btn-more').show();
			}
		});
	}
}