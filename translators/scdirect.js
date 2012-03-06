// this translator should be called with inject.js
// 
function translate () {
	var ref=document.getElementsByName('art_citation')[0].getAttribute('value'),
	    // var ref=$('[name=art_citation]').val(),
	    bolunmus=ref.split('\n'),
	    sonuclar= '\{"journal": \"' + bolunmus[3] + '", "authors": "' + bolunmus[1] + '", "title": "' + bolunmus[0],
	    sText; 


	sText=/Volume\s*([0-9]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","volume": "' + RegExp.$1
	}

	sText=/Issues?\s*([^,]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","issue": "' + RegExp.$1
	}

	sText=/Pages?\s*([0-9]+)-([0-9]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","firstPage": "' + RegExp.$1;
		sonuclar+= '","lastPage": "' + RegExp.$2 
	}

	sText=/doi\s*:\s*(.*)/;
	if(sText.exec(ref)){
		sonuclar+='", "doi": "' + RegExp.$1
	}

	sonuclar+= '\"\}';

	chrome.extension.sendRequest(sonuclar);
}

translate();
