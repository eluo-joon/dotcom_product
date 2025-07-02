var sdpCommonSession_checkUrl = "sdpismweb.kt.com/ssp/session/checkToken.do";
var sdpCommonSession_sso_token = sdpCommonSession_getCookie("kt_sso_token");

if(sdpCommonSession_sso_token.replace(/(^\s*)|(\s*$)/gi, "") != "") {
	var sdpCommonSession_strcode = sdpCommonSession_getCookie("strCode");
	var sdpCommonSession_sso_createdate = sdpCommonSession_getCookie("kt_sso_createdate");
	var sdpCommonSession_sso_userid = sdpCommonSession_getCookie("kt_sso_userid");
	var sdpCommonSession_sso_tokenId = sdpCommonSession_sso_token.substring(0, sdpCommonSession_sso_token.indexOf("|"));
	sdpCommonSession_sso_tokenId = sdpCommonSession_sso_tokenId.replace("kt_sso_token=", "");

	var sdpCommonSession_clientUrl;

	if(location.href.indexOf("?") < 0) {
		sdpCommonSession_clientUrl = location.href;
	} else {
		sdpCommonSession_clientUrl = location.href.substring(0, location.href.indexOf("?"));
	}

	if(location.href.indexOf("https://") < 0) {
		sdpCommonSession_checkUrl = "http://" + sdpCommonSession_checkUrl;
	} else {
		sdpCommonSession_checkUrl = "https://" + sdpCommonSession_checkUrl;
	}

	var sdpCommonSession_sendData = "code=" + sdpCommonSession_strcode;
	sdpCommonSession_sendData += "&client_url=" + escape(encodeURIComponent(sdpCommonSession_clientUrl));
	sdpCommonSession_sendData += "&sso_token_id=" + sdpCommonSession_sso_tokenId;
	sdpCommonSession_sendData += "&sso_create_date=" + sdpCommonSession_sso_createdate;
	sdpCommonSession_sendData += "&sso_user_id=" + sdpCommonSession_sso_userid;

	var sdpCommonSession_httpRequest;
	var sdpCommonSession_xDomainRequest;

	try {
		sdpCommonSession_xDomainRequest = true;

		sdpCommonSession_httpRequest = new XDomainRequest();
	} catch(e) {
		sdpCommonSession_xDomainRequest = false;

		if(XMLHttpRequest) {
			sdpCommonSession_httpRequest = new XMLHttpRequest();
		} else if(ActiveXObject) {
			try {
				sdpCommonSession_httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					sdpCommonSession_httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {common_log.log('Error');}
			}
		}
	}

	if(sdpCommonSession_httpRequest) {
		try {
			if(sdpCommonSession_xDomainRequest) {
				sdpCommonSession_httpRequest.onload = function() {
					sdpCommonSession_getSessionStatusResult(sdpCommonSession_httpRequest.responseText);
				}

				sdpCommonSession_httpRequest.open("get", sdpCommonSession_checkUrl + "?" + sdpCommonSession_sendData);
				sdpCommonSession_httpRequest.send();
			} else {
				sdpCommonSession_httpRequest.onreadystatechange = sdpCommonSession_getSessionStatus;
				sdpCommonSession_httpRequest.open("post", sdpCommonSession_checkUrl, true);
				sdpCommonSession_httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				var sdpCommonSession_sendDataFinal = "";
				sdpCommonSession_sendDataFinal = sdpCommonSession_sendData + "&cookie_data=" + document.cookie;
				sdpCommonSession_httpRequest.send(sdpCommonSession_sendDataFinal);

			}
		} catch(e) {
			document.write("<script taype='text/javascript' src='" + sdpCommonSession_checkUrl + "?callback=sdpCommonSession_getSessionStatusResult&" + sdpCommonSession_sendData + "'></script>");
		}
	}
}

function sdpCommonSession_getSessionStatus() {
	if(sdpCommonSession_httpRequest.readyState == 4) {
		if(sdpCommonSession_httpRequest.status == 200) {
			sdpCommonSession_getSessionStatusResult(sdpCommonSession_httpRequest.responseText);
		}
	}
}

function sdpCommonSession_getSessionStatusResult(sdpCommonSession_result) {
	if(sdpCommonSession_result.toUpperCase() == "FALSE") {
		alert("고객님의 소중한 정보보호를 위해\n2시간 동안 이용이 없는 경우\n로그아웃 됩니다.");

		sdpCommonSession_logOut();
	} else if(sdpCommonSession_result.toUpperCase() == "TRUE"){
		window.setTimeout("sdpCommonSessionTime_getTokenValidTime()",7200000);
	}
}

function sdpCommonSession_logOut() {
	kt.sdpCommonSessionlogOut();
}

function sdpCommonSession_getCookie(sdpCommonSession_name) {
	var sdpCommonSession_cookieName = sdpCommonSession_name + "=";
	var sdpCommonSession_cookieData = document.cookie.split(';');

	for(var i=0; i<sdpCommonSession_cookieData.length; i++) {
		var sdpCommonSession_cookieValue = sdpCommonSession_cookieData[i].replace(/(^\s*)|(\s*$)/gi, "");

		if(sdpCommonSession_cookieValue.indexOf(sdpCommonSession_cookieName) == 0) {
			return sdpCommonSession_cookieValue.substring(sdpCommonSession_cookieName.length, sdpCommonSession_cookieValue.length);
		}
	}
	return "";
}

var sdpCommonSessionTime_httpRequest;

function sdpCommonSessionTime_getTokenValidTime() {
	var sdpCommonSessionTime_checkUrl = "sdpismweb.kt.com/ssp/session/checkTokenValidTime.do";

	var sdpCommonSessionTime_sso_token = sdpCommonSession_getCookie("kt_sso_token");
	
	var sdpCommonSessionTime_sso_tokenId = sdpCommonSessionTime_sso_token.substring(0, sdpCommonSessionTime_sso_token.indexOf("|"));
	sdpCommonSessionTime_sso_tokenId = sdpCommonSessionTime_sso_tokenId.replace("kt_sso_token=", "");
	

    var sdpCommonSessionTime_clientUrl;

	if(location.href.indexOf("?") < 0) {
		sdpCommonSessionTime_clientUrl = location.href;
	} else {
		sdpCommonSessionTime_clientUrl = location.href.substring(0, location.href.indexOf("?"));
	}

	if(location.href.indexOf("https://") < 0) {
		sdpCommonSessionTime_checkUrl = "http://" + sdpCommonSessionTime_checkUrl;
	} else {
		sdpCommonSessionTime_checkUrl = "https://" + sdpCommonSessionTime_checkUrl;
	}
	
	var sdpCommonSessionTime_sendData = "sso_token_id=" + sdpCommonSessionTime_sso_tokenId;
	sdpCommonSessionTime_sendData += "&client_url=" + escape(encodeURIComponent(sdpCommonSessionTime_clientUrl));

	var sdpCommonSessionTime_xDomainRequest;
	
	try {
		sdpCommonSessionTime_xDomainRequest = true;
	
		sdpCommonSessionTime_httpRequest = new XDomainRequest();
	} catch(e) {
		sdpCommonSessionTime_xDomainRequest = false;
	
		if(XMLHttpRequest) {
			sdpCommonSessionTime_httpRequest = new XMLHttpRequest();
		} else if(ActiveXObject) {
			try {
				sdpCommonSessionTime_httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					sdpCommonSessionTime_httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {common_log.log('Error');}
			}
		}
	}
	
	if(sdpCommonSessionTime_httpRequest) {
		try {
			if(sdpCommonSessionTime_xDomainRequest) {
				sdpCommonSessionTime_httpRequest.onload = function() {
					sdpCommonSessionTime_getSessionStatusResult(sdpCommonSessionTime_httpRequest.responseText);
				}
	
				sdpCommonSessionTime_httpRequest.open("get", sdpCommonSessionTime_checkUrl + "?" + sdpCommonSessionTime_sendData);
				sdpCommonSessionTime_httpRequest.send();
			} else {
				sdpCommonSessionTime_httpRequest.onreadystatechange = sdpCommonSessionTime_getSessionStatus;
				sdpCommonSessionTime_httpRequest.open("post", sdpCommonSessionTime_checkUrl, true);
				sdpCommonSessionTime_httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
				sdpCommonSessionTime_httpRequest.send(sdpCommonSessionTime_sendData);
			}
		} catch(e) {
			document.write("<script taype='text/javascript' src='" + sdpCommonSessionTime_checkUrl + "?callback=sdpCommonSessionTime_getSessionStatusResult&" + sdpCommonSessionTime_sendData + "'></script>");
		}
	}
}

function sdpCommonSessionTime_getSessionStatus() {
	if(sdpCommonSessionTime_httpRequest.readyState == 4) {
		if(sdpCommonSessionTime_httpRequest.status == 200) {
			sdpCommonSessionTime_getSessionStatusResult(sdpCommonSessionTime_httpRequest.responseText);
		}
	}
}

function sdpCommonSessionTime_getSessionStatusResult(sdpCommonSessionTime_result) {
	
	if(sdpCommonSessionTime_result.toUpperCase() == "FALSE") {
		sdpCommonSession_logOut();
	}else if(sdpCommonSessionTime_result.substring(0,4) == "true" && sdpCommonSessionTime_result.substring(5) != ""){
		var sdpCommonSessionTime_setTime = sdpCommonSessionTime_result.substring(5);
			
		window.setTimeout("sdpCommonSessionTime_getTokenValidTime()",sdpCommonSessionTime_setTime);
	}
}
