chrome.tabs.executeScript(null,{code:"var sText = /<input.*type.?=.?\"hidden\".?name.?=.?\"art_citation\".?value.?=.?\"([^\"]+)/;\
	var a=sText.exec(document.body.innerHTML)[1];\
	chrome.extension.sendRequest(a);"
});

chrome.extension.onRequest.addListener(function(request){ 

	var bolunmus=request.split('\n'),
	sonuclar= '{"dergi": \"' + bolunmus[3] + '", "yazarlar": "' + bolunmus[1] + '", "baslik": "' + bolunmus[0], 
		sText=/Volume\s*([0-9]+)/;

		if (sText.exec(request)) {
			sonuclar+= '","cilt": "' + RegExp.$1;
		}

		sText=/Issues?\s*([^,]+)/;
		if (sText.exec(request)) {
			sonuclar+= '","sayi": "' + RegExp.$1;
		}

		sText=/Pages?\s*([0-9]+)-([0-9]+)/;
		if (sText.exec(request)) {
			sonuclar+= '","ilkSayfa": "' + RegExp.$1;
			sonuclar+= '","sonSayfa": "' + RegExp.$2; 
		}

		sText=/doi\s*:\s*(.*)/;
		if(sText.exec(request)){
			sonuclar+='", "doi": "' + RegExp.$1 + '\"}';
		}

		document.getElementById("0").textContent=sonuclar;
});

