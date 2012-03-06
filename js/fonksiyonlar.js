function guncelle(){
    	//div#0 translatorun yazdigi yer. eger doluysa orayi temizliyoruz
	document.getElementById('0').textContent='';
	//acik sitenin urlsi aliniyor, urlReg'den hangi translatorun
	//kullanilacagina karar verilip sayfaya o translator yukleniyor
	chrome.tabs.getSelected(null, function(tab) {
		var i,url=tab.url;
		document.getElementById('varUrl').textContent=url;
		for(i=0;i<urlReg.length;i++){
			if (url.match(urlReg[i][0])){ 
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
