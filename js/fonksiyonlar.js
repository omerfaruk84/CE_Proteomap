function guncelle(){
	var urlReg = [[/https?:\/\/www\.springerlink\.com\/content\/([^\/]+)/,"springerlink"],
	    [/https?:\/\/www\.sciencedirect\.com\/science\/.*/,"scdirect"]	  			
		    ];
	if(!document.getElementById('0').textContent==""){
		kaydir(5);
		document.getElementById('1').textContent=document.getElementById('0').textContent;
		document.getElementById('0').textContent=""}
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


function kaydir(sec){
	var elmnt=document.body.getElementsByClassName('gecmis');
	var tmp=elmnt[sec].textContent;
	for(i=sec;i>1;i--){
		elmnt[i].textContent=elmnt[i-1].textContent;
	}
	elmnt[1].textContent=tmp;
}


