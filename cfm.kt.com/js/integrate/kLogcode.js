/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/ 

/* v.0.0.1 for KT 2017-05-18 */
var klog = new klog();

function klog() {    
    var gv = {            
        
        menu : function(pageName, serviceName, code) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            // 2차 개발건
            localfn.logTrace({l:'m', c:code}, false);
        },
            
        banner : function(pageName, serviceName, code) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            // 2차 개발건
            localfn.logTrace({l:'b', c:code}, false);
        },
            
        search : function(keyword, notkeyword) {
            localfn.logTrace({l:'s', c:keyword});
        },
            
        snc : function(pageName, serviceName, code, exeType, sgnlType, rtdEvtId, evSorcId) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            localfn.logTrace({l:'c', c:code, et:exeType, st:sgnlType, ri:rtdEvtId, ei:evSorcId});
        },
            
        sncview : function(pageName, serviceName, code, exeType, sgnlTyle, rtdEvtId, evSorcId) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            localfn.logTrace({l:'v', c:code, et:exeType, st:sgnlType, ri:rtdEvtId, ei:evSorcId});
        },
        // RTD연동 개발건(닫기)
        sncclose : function(pageName, serviceName, code, exeType, sgnlTyle, rtdEvtId, evSorcId) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            localfn.logTrace({l:'x', c:code, et:exeType, st:sgnlType, ri:rtdEvtId, ei:evSorcId});
        },
        // RTD연동 개발건(다시보지않기)
        sncneverclose : function(pageName, serviceName, code, exeType, sgnlTyle, rtdEvtId, evSorcId) {
        	if (typeof code == 'undefined' || code == null || code == '') {
        		return;
        	}
            localfn.logTrace({l:'nl', c:code, et:exeType, st:sgnlType, ri:rtdEvtId, ei:evSorcId});
        }

        // 2차개발건
        ,
        cookietrace : function(pageName, serviceName, code) {
            localfn.logTrace({l:'p', c:code});
        }
    };

    var localfn = {
        
        // 통합 로그 전송     
        logTrace : function(param, sync) {   // 2차 개발건         
        	var url = logapi_domain + '/v1.0/log/trace'; //'https://logapi.kt.com/v1.0/log/trace';

            // 2차 개발건
        	if (typeof sync != "undefined" && sync == true) {
            	localfn.sendSyncPostAjax(url, param);
            } else {
            	localfn.sendPostAjax(url, param);
            } 

        },
        
        // Http POST Send
        sendPostAjax : function(url, param) {
        	$j.ajax({
                url : url,
                type : 'POST',
                xhrFields : {
                    withCredentials: true
                },
                crossDomain: true,
                data : param,
                contentType : 'application/x-www-form-urlencoded; charset=utf-8',
                error : function() {
                    // console.log('ajax POST Send Error');
                },
                success : function() {
                    // console.log('ajax POST Send Success');
                }
            });
        },

        // 2차 개발건
        // Http POST Sync Send
        sendSyncPostAjax : function(url, param) {
        	$j.ajax({
                url : url,
                type : 'POST',
                async: false , 
                timeout : 100, 
                xhrFields : {
                    withCredentials: true
                },
                crossDomain: true,
                data : param,
                contentType : 'application/x-www-form-urlencoded; charset=utf-8',
                error : function() {
                    console.log('ajax POST Send Error');
                },
                success : function() {
                    console.log('ajax POST Send Success');
                }
            })
        }

    };
            
    return gv;
}