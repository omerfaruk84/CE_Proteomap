function guncelle(){
	var urlReg = [[/https?:\/\/www\.springerlink\.com\/content\/([^\/]+)/,"springerlink"],
	    [/https?:\/\/www\.sciencedirect\.com\/science\/.*/,"scdirect"]	  			
		    ];
	temizle();
	chrome.tabs.getSelected(null, function(tab) {
		var i,url=tab.url;
		document.getElementById('varUrl').textContent=url;
		for(i=0;i<urlReg.length;i++){
			if (url.match(urlReg[i][0])){ 
				loadTranslator(urlReg[i][1]);
				break;}}
	});
}

function loadTranslator(translatorAdi){
	if (x=document.getElementById('translator')) 
		x.parentNode.removeChild(x);
	var translator=document.createElement('script');
	translator.id='translator';
	translator.type = 'text/javascript';
	translator.src='translators/' + translatorAdi + '.js';
	document.head.appendChild(translator)	
}        

function temizle(){
	if (document.getElementById('0').textContent != "") {
	kaydir(4);
	document.getElementById('0').textContent="";
	}
}

function kaydir(sec){
	var elmnt=document.body.getElementsByClassName('gecmis');
	if (elmnt[0].textContent == "") {
		for ( i = 0; i < elmnt.length-1; i++) 
			elmnt[i].textContent=elmnt[i+1].textContent;
		elmnt[elmnt.length-1].textContent="";
		sec=sec-1
	}

	var tmp=elmnt[sec].textContent;
	for(i=sec;i>0;i--){
		elmnt[i].textContent=elmnt[i-1].textContent;
	}
	elmnt[0].textContent=tmp;
}


