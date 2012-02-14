chrome.tabs.executeScript(null,{code:"var sText = /<input.*type.?=.?\"hidden\".?name.?=.?\"art_citation\".?value.?=.?\"([^\"]+)/;\
	var a=sText.exec(document.body.innerHTML)[1].split(\"\\n\");\
	chrome.extension.sendRequest(a);"
});

chrome.extension.onRequest.addListener(function(request){ 
	var sonuclar= '{"dergi": \"' + request[3] + '", "yazarlar": "' + request[1] + '", "baslik": "' + request[0]; 
	for (var i = 0; i < request.length; i++) {
		var sText=/Volume ([0-9]+), Issues? (.*), .*, Pages ([0-9]+)-([0-9]+)/;
		if(sText.exec(request[i])){
			sonuclar+= '","cilt": "' + RegExp.$1;
			sonuclar+= '","sayi": "' + RegExp.$2;
			sonuclar+= '","ilkSayfa": "' + RegExp.$3;
			sonuclar+= '","sonSayfa": "' + RegExp.$4; 
		}
            	sText=/doi: (.*)/;
		if(sText.exec(request[i])){
			sonuclar+='", "doi": "' + RegExp.$1 + '\"}';
		}
	};
	document.getElementById("0").textContent=sonuclar;
});

