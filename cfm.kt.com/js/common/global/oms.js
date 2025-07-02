if('Y' == omsLogUseYn){
// 온마시 통계 js
	document.write('<script src="' + omslog_domain + '/js/logCollect.js' + version + '"></script>');
	document.write('<script src="' + omslog_domain + '/js/targetOffer.js' + version + '"></script>');
}else{
	document.write('<script src="' + cfm_domain + '/js/common/global/omsNcase.js' + version + '"></script>');
	function omsTfn(){
		var a = {
		  campaignViewLog : function(){}
		 ,campaignClickLog : function(){} 
		}
		, e = {
		  logCollect : function(){}
		 ,sendPostAjax : function(){}
		 ,sendSyncPostAjax :function(){}		
		 ,isNullChk :function(){}		
		 ,getIEVersion :function(){}		
		 ,isSupportBrowser :function(){}		
		 ,getComCookie :function(){}		
		 ,isAppcheck :function(){}		
		 ,isCSAppchk :function(){}		
		 ,getAppver :function(){}		
		}
		
		return a;
	}
	
	function omsfn(){
		var a = {
				 pagelog:function(){}
				,pagePopLog:function(){}
				,clickLog:function(){}
				,clickCompareLog:function(){}
				,bannerClickLog:function(){}
				,searchLog:function(){}
		},
		p ={
				 logCollect:function(){}
				,sendPostAjax:function(){}
				,sendSyncPostAjax:function(){}
				,isNullChk:function(){}
				,getIEVersion :function(){}		
				,isSupportBrowser :function(){}		
				,getComCookie :function(){}		
				,isAppcheck :function(){}		
				,isCSAppchk :function(){}		
				,getAppver :function(){}		
		}
		return a;
	}
	function omsTLog(){
		for( var a=this,e={ktId:"",gaId:""},o={muCd:""},l={pgType:""},t={coVal1:"",coVal2:""},r={caVal1:"",caVal2:"",caVal3:"",exeType:"",sgnlType:"",rtdEvtId:"",evSorcId:""},n={baVal1:"",baVal2:""},c=[],p={apVal1:"W",apVal2:"",apVal3:"",apVal4:"",apVal5:"",apVal6:"",apVal7:"S",apVal8:"S"},s={seVal1:"",seVal2:"",seVal3:"",seVal4:"",seVal5:""},V={cmpId:"",adId:""}, d=0;d<3; d++){
			 var i={prVal1:"",prVal2:"",prVal3:"",prVal4:"",prVal5:"",prVal6:"",prVal7:"",prVal8:""};
		     c.push(i)
		 }
		return a.u=e,a.m=o,a.pg=l,a.co=t,a.ca=r,a.b=n,a.p=c,a.a=p,a.s=s,a.e=V,a
	}
	
	var trgt = new omsTfn , omsf=new omsfn ,ot=new omsTLog;
}