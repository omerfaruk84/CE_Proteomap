function guncelle(){
    	//div#0 translatorun yazdigi yer. eger doluysa orayi temizliyoruz
	document.getElementById('0').textContent='';
	chrome.browserAction.setIcon({path: "images/icon1.png"});
	chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
	chrome.browserAction.setBadgeText({text:"x"});	
	chrome.browserAction.setTitle({"title": "Not translatable!"});
	//acik sitenin urlsi aliniyor, urlReg'den hangi translatorun
	//kullanilacagina karar verilip sayfaya o translator yukleniyor
	chrome.tabs.getSelected(null, function(tab) {
		var i,url=tab.url;
		document.getElementById('varUrl').textContent=url;
		for(i=0;i<urlReg.length;i++){
			if (url.match(urlReg[i][0])){ 
				chrome.browserAction.setIcon({path: "images/icon2.png"});
				chrome.browserAction.setBadgeBackgroundColor({color:[180, 50, 20, 230]});
				chrome.browserAction.setBadgeText({text:"+"});
				chrome.browserAction.setTitle({"title": "Translator: " + urlReg[i][1]});
				document.getElementById('hata').textContent='{"error": {"translator": \"' + urlReg[i][1] + '", "adres": "' + url + '\"}}';
				loadTranslator(urlReg[i][1],urlReg[i][2]);
				break
			}
		}
	});
}

function loadTranslator(translatorAdi,bool){
	if (bool) {
		if (x=document.getElementById('translator')) 
			x.parentNode.removeChild(x);
		var translator=document.createElement('script');
		translator.id='translator';
		translator.type = 'text/javascript';
		translator.src='translators/' + translatorAdi + '.js?r=' +(new Date()).getTime();
		document.head.appendChild(translator)	
	}
	else{
		chrome.tabs.executeScript(null,{file: 'translators/' + translatorAdi+ '.js'});
	}

}        
