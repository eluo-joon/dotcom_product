//adobe cashing 해결을 위한 버전 추가
var adobeVersion = '?version=22112401';

// 개발 환경에 따른 URL 설정
var adobeProperties = 'prd';
var adobePluginUrl = '';

switch (adobeProperties){
    case 'tb' :  // tb
        adobePluginUrl = '3212917f397b/b0cc8b10bf00/launch-0846e6de913d-development.min.js' + adobeVersion;
        break;

    default :   // 기본
        adobePluginUrl = '3212917f397b/b0cc8b10bf00/launch-4cdb9870e1a0.min.js' + adobeVersion;
        break;
}

// 구버전 adobe _satellite.pageBottom 호출 여부 (Y: 미호출)
var kt_adobeLaunch = 'Y';

//CMS adobe 연동여부 체크-2차
try {
    if(cfmAdobeUseYn != 'N') cfmAdobeUseYn = 'Y';
} catch (error) {
    cfmAdobeUseYn = 'Y';
}

document.write('<script type="text/javascript" src="https://cfm.kt.com/js/adobe/s_codeLaunch.js' + adobeVersion + '"></script>');

if(cfmAdobeUseYn != 'N'){
    document.write('<script type="text/javascript" src="https://cfm.kt.com/js/adobe/'+ adobePluginUrl + '" async></script>');
}