var xhr = new XMLHttpRequest();
xhr.open("GET", encodeURI("https://rdi.kt.com/biz/systems/v1.0/ip"), true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
        var result = JSON.parse(xhr.responseText);
        var myIp = result["data"].split(".");

        myIp = checkIpLength(myIp[0])+checkIpLength(myIp[1])+checkIpLength(myIp[2])+checkIpLength(myIp[3]);

        readJsonFile(function(text){
            var ipArray = JSON.parse(text);
            var ipIsKr = "N";
            for(var i=0; i<ipArray.ips.length; i++){
                for (key in ipArray.ips[i]){
                    if(myIp >= key && myIp <= ipArray.ips[i][key]){
                        ipIsKr = "Y";
                    }
                }
            }
            if(ipIsKr == "N"){
                window.location = "http://m.ktroaming.kt.com";
            }
        });
    }
}
xhr.onerror = function(){
}
xhr.send();

function readJsonFile(callback){
    var rawFile = new XMLHttpRequest();
    //rawFile.overrideMimeType("application/json");
    rawFile.open("Get", "https://m.kt.com/js/common/krIpArr.json", true);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState == 4 && rawFile.status == "200"){
            callback(rawFile.responseText);
        }
    }
    xhr.onerror = function(){
    }
    rawFile.send();
}

function checkIpLength(ipVal){
    var ipValLength = ipVal.length;
    var ipValue = "";
    switch (ipValLength){
        case 3 : ipValue = ipVal;
            break;
        case 2 : ipValue = "0"+ipVal;
            break;
        case 1 : ipValue = "00"+ipVal;
            break;
    }
    return ipValue;
}

/*
*
* 2020.8.21_22 KOS 작업 버튼 미노출
*
*/
 $j(document).ready(function(){
	
	if(new Date() >= new Date('2020-10-23 23:00:00')
		&& new Date() < new Date('2020-10-24 07:00:00')){
			$j("#btnCreate").hide();
			$j("#btnFind").hide();
			$j("#btnCancel").hide();
	}	
	
});
	