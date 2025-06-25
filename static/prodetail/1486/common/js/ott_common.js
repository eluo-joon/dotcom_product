'use strict';

$j('#anchor-move').on('click', function(){
	var openAccorTop = $j('#anchor-content').offset().top;
	if(!($j('#anchor-content').hasClass('active'))) {
		$j('#anchor-content').trigger('click');
	}
	$j('html, body').delay(200).animate({scrollTop: openAccorTop}, 500, 'swing');
});

$j('.accordions').find('.accordion-trigger').on('click', function (e) {
	e.preventDefault();
	if ($j(this).hasClass('active')) {
		$j(this).removeClass('active').next('.accordion-contents').hide();
		$j(this).attr('title','닫힘');
	} else {
		$j(this).closest('.accordions').find('.accordion-trigger').removeClass('active').attr('title','닫힘');
		$j(this).closest('.accordions').find('.accordion-contents').hide();
		$j(this).addClass('active').focus().attr('title','열림').next('.accordion-contents').stop().slideDown(500);
		$j('html, body').delay(100).animate({
			'scrollTop': $j(this).offset().top - $('.accordions').innerHeight()
		},200);
	}
});

/* 250625 이전 구독하기 레이어 팝업열기 버전 */
/*
$j('.proBtn_popup').on('click', function(e) {
	var $self = $j(this);
	var thisLayerCk = $j(this).next('.ott-layer-ask').hasClass('active');
	if (thisLayerCk) {
		$j(this).next('.ott-layer-ask').removeClass('active');
		$j(this).attr('title', '펼치기');
	} else {
		$j(this).next('.ott-layer-ask').addClass('active');
		$j(this).attr('title', '접기');
	}
	$j('.ott-layer-btn').on('click', function() {
		$j('.ott-layer-ask').removeClass('active');
		$self.focus().attr('title', '펼치기');
	})
});
*/

/* 250625 이후 구독하기 레이어 팝업열기 신버전 - 웹접근성 강화 */
if ($j('.proBtn_popup').length && $j('.proBtn_popup').next('.ott-layer-ask').length) {
  var $layer = $j('.proBtn_popup').next('.ott-layer-ask');
  $j('.proBtn_popup').attr('title', '펼치기');
  $layer.attr({
    'aria-label': '구독하기 종류별 안내',
    'tabindex': '-1',
    'aria-hidden': 'true'
  });
}

$j('.proBtn_popup').on('click', function(e) {
  var $self = $j(this);
  var $layer = $self.next('.ott-layer-ask');
  var isActive = $layer.hasClass('active');

  if (isActive) {
    $layer.removeClass('active')
          .removeAttr('tabindex')
          .attr('aria-hidden', 'true');
    $self.attr('title', '펼치기').focus();
  } else {
    $layer.addClass('active')
          .attr({
            'tabindex': '-1',
            'aria-hidden': 'false'
          })
          .focus();
    $self.attr('title', '접기');
  }
});

function productOttPopup(self, popupID, keepPreviousPopup) {
	const thisPopupID = document.querySelector(popupID);
	const openBtn = self;
	const closeBtn = thisPopupID ? thisPopupID.querySelectorAll('[data-popup-close]') : [];
	const isUserAgent = isMobile() || isDomainUserAgent();
	const focusitem = 'button:not(:disabled), [type="button"], a:not([data-disabled]), input:not(:disabled), iframe';

	// 팝업 객체에 isOpen 상태를 추가하고 초기값은 false로 설정
	thisPopupID.isOpen = false;

	init();

	function open() {
		// 현재 팝업이 열려 있지 않은 경우에만 실행
		if (!thisPopupID.isOpen) {
			if (!keepPreviousPopup) {
				closeAllPopups(); // keepPreviousPopup이 false인 경우에만 다른 팝업을 닫음
			}

			thisPopupID.classList.add('active');
			thisPopupID.querySelector('[data-popup-focus]').setAttribute('tabindex', 0);
			ottDelay(100).then(function() {
				thisPopupID.querySelector('[data-popup-focus]').focus();
			});

			if(isUserAgent) {
				$j('html, body').css('overflow', 'hidden');
				thisPopupID.removeAttribute('aria-hidden');
				new ComProduct().setWaAriaToggle(thisPopupID.querySelector('[data-popup-focus]'), true);
			} else {
				aria();
			}

			thisPopupID.isOpen = true; // 팝업이 열려 있음을 나타내는 상태를 업데이트
		}
	}

	function close() {
		if(isUserAgent) {
			$j('html, body').css('overflow', '');
			new ComProduct().setWaAriaToggle(thisPopupID.querySelector('[data-popup-focus]'), false);
		}
		thisPopupID.classList.remove('active');
		thisPopupID.style.display = '';

		openBtn.focus();
		thisPopupID.isOpen = false; // 팝업이 닫혔음을 나타내는 상태를 업데이트
	}

	function closeAllPopups() {
		// 모든 팝업을 닫음
		const allPopups = document.querySelectorAll('[data-popup]');
		allPopups.forEach(function(popup) {
			popup.classList.remove('active');
			popup.isOpen = false; // 모든 팝업의 isOpen 상태를 false로 업데이트
		});
	}

	function aria() {
		const elements = thisPopupID.querySelectorAll(focusitem);
		let previousFoucsElement = null;
		let firstElement = null;
		let lastElement = null;

		for(let i=0; i < elements.length; i++) {
			if(i === 0) {
				firstElement = elements[i];
			}
			if(i === elements.length - 1) {
				lastElement = elements[i];
			}
		}

		if(firstElement.tagName.toLowerCase() === 'iframe') {
			thisPopupID.querySelector('[data-popup-focus]').setAttribute('holds', true);
		} else {
			firstElement.setAttribute('holds', true);
			firstElement.setAttribute('tabindex', 0);
		}
		lastElement.setAttribute('holde', true);
		lastElement.setAttribute('tabindex', 0);

		thisPopupID.querySelector('[holds]').addEventListener('keydown', function(e) {
			if(e.shiftKey && e.keyCode === 9) {
				if(firstElement.tagName.toLowerCase() !== 'iframe') {e.preventDefault();}
				thisPopupID.querySelector('[holde]').focus();
			}
		});
	
		thisPopupID.querySelector('[holde]').addEventListener('keydown', function(e) {
			if(!e.shiftKey && e.keyCode === 9) {
				if(firstElement.tagName.toLowerCase() !== 'iframe') {e.preventDefault();}
				thisPopupID.querySelector('[holds]').focus();
			}
		});
	}

	function init() {
		open();

		openBtn.addEventListener('click', function() {
			open();
		});

		closeBtn.forEach(function(btn) {
			btn.addEventListener('click', function() {
				close();
			});
		});
	}
}

function ottDelay(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms);
	});
}

//도메인으로 web, mobile 체크
function isDomainUserAgent() {
	const isHost = window.location.host.split('.')[0];
	let isDomain = null;

	if(isHost === 'm') {
		isDomain = true;
	} else {
		isDomain = false;
	}
	
	return isDomain;
}

function isMobile(){
	var isMobile = false;
	if(navigator.userAgent.indexOf('Mobile') >= 0 && navigator.userAgent.indexOf('iPad') < 0){
		if(navigator.geolocation){
			isMobile = true;
		}
	}
	return isMobile;
}

/*function isAppCheck(){
	var isApp = false;

	var os = kt.getComCookie('os');
	var appVer = kt.getComCookie('appver');

	if (os === undefined || os === null || os === '' || 
		appVer === undefined || appVer === null || appVer === ''){
		return isApp;
	} 

	return true;
}*/