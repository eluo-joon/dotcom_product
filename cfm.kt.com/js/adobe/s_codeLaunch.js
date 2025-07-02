/* 
   KT.com version 1.0
  
   Copyright ⓒ 2017 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
*/

function scode_log(message) {
    //console.log(message);
}

var s = {
    t: function(){
        scode_log('s.t();');
    },

    tl: function(){
        scode_log('s.tl();');
    }
};


function trackClicks(ClickCatName,ClickName) {
    //Adobe launch
    KT_launchClicks(ClickCatName,ClickName);
}

function KT_trackClicks(Click_Category,Click_Name) {
    var gaClick = gaSplitClickName(Click_Name);
    gaEventTracker(true,gaClick["Click_Set1"],gaClick["Click_Set2"],gaClick["Click_Set3"]);

    //Adobe launch
    KT_launchClicks(Click_Category,Click_Name);
}

//Adobe Layer popup
function KT_tracklayerPg(pgTagName) {
	
	
    try {
        _satellite.track('layered_page', {page_name : pgTagName});
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_tracklayerPg 연동 오류 : ' + e.message + ')');
    }    
}

/*Adobe Multi View
arrTagName : [{ClickCatName :'테스트1', ClickName: '클릭명칭1'}, {ClickCatName :'테스트2', ClickName: '클릭명칭2'}]
*/
function KT_trackMutiView(arrTagName) {
	
    try {
        _satellite.track("banner_exposed", {banner :arrTagName});        
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_trackMutiView 연동 오류 : ' + e.message + ')');        
    }
}

//Adobe Launch Click
function KT_launchClicks(Click_Category,Click_Name) {
	
	
    try {
        _satellite.track("click links", {ClickCatName : Click_Category, ClickName : Click_Name});        
    } catch (e) {
        scode_log('adobe 연동 오류 (KT_launchClicks 연동 오류 : ' + e.message + ')');
    }
}



// 2017.11.02 추가 : Google - CID 수집 관련 코드 ... Start
function GAgetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// ... End

try {
    if(gtmLogUseYn != 'N') gtmLogUseYn = 'Y';
} catch (error) {
	gtmLogUseYn = 'Y';
}



if ( gtmLogUseYn == 'Y' )
{
	/*
	  GA 코드 추가
	*/
	// Start
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-100874847-2', 'auto');
	ga('create', 'UA-100874847-1', 'auto', 'rollup');
	ga('require', 'GTM-KZPKL2N');
	
    // TB인 경우(GTM-NDJMG7C), 상용인 경우(GTM-N5ZFLBW)
    if ( adobeProperties == 'tb' )
    {
        // TB인 경우
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NDJMG7C');

        var googleTagBody = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDJMG7C" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
    }
    else
    {
        // 상용일 경우에는 prd로 하지 않고 그냥 else로 처리하여 처리
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N5ZFLBW');

        var googleTagBody = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N5ZFLBW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
    }
}
else
{
    var googleTagBody = '';
    function ga(e){
    	
    }
}
// End Google Tag Manager 

function MyPage_DMC(Cate,SOName,Lable) { 
    //adobe Tag
    try {
        _satellite.track("service_order", {
            so_category : Cate, // 발생 카테고리, 예시) 마이_상품, 마이_기타 등
            so_name : SOName,  // 발생 서비스명,  예시) 부가서비스, 즉시납부  등
            so_type : Lable // 예시) 신청, 변경, 해지, 정지
            });      
    } catch (e) {
        scode_log('adobe 연동 오류 (MyPage_DMC 연동 오류 : ' + e.message + ')');
    }
        
    // GA Tag
    ga('send', 'event', Cate, SOName, Lable);
}

function ProductService_DMC(Productcode) {
    // GA Tagg
    ga('set', 'dimension6', Productcode);
}

function gaEventTracker(flag,category,action,label,cd){
    //flag True: 롤업속성에도 데이터 전송
    //flag False: 롤업속성에는 데이터 전송하지 않음
    ga('send', 'event', category, action, label, {'dimension19':cd});
    if(flag == true){ga('rollup.send', 'event', category, action, label, {'dimension19':cd});}
}

function gaSplitClickName(Click_Name){
    var Click_Set1 = "";
    var Click_Set2 = "";
    var Click_Set3 = "";
    try {
        var splitText = Click_Name.split('^');
        if(splitText.length <= 4){
            Click_Set1 = splitText[1] ? splitText[1] : '';
            Click_Set2 = splitText[2] ? splitText[2] : '';
            Click_Set3 = splitText[3] ? splitText[3] : Click_Set2;
        } else if(splitText.length > 4){
            Click_Set1 = splitText[1];
            Click_Set3 = splitText[splitText.length-1];
            for(i = 2; i<splitText.length-1; i++){
                Click_Set2 += "^"+splitText[i];
            }
            Click_Set2 = Click_Set2.substring(1, Click_Set2.length);
        }
    } catch(e) {
        Click_Set1 = "";
        Click_Set2 = "";
        Click_Set3 = "";
    }
    return {"Click_Set1":Click_Set1, "Click_Set2":Click_Set2, "Click_Set3":Click_Set3};
}

// End