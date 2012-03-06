function translate () {
	var urlReg = /.*sciencedirect\.com\/science\?_ob=MiamiImageURL.*&_pii=([^&]+).*/,   
	    url=document.getElementById('varUrl').textContent,
	    sayfa = sayfaAl("http://www.sciencedirect.com/science/article/pii/" + urlReg.exec(url)[1]),
	    sText = /<input.*name.?=.?\"art_citation\".?value.?=.?\"([^\"]+)/,
	    ref,bolunmus,sonuclar;

	ref=sText.exec(sayfa)[1];
	bolunmus=ref.split('\n');

	sonuclar= '\{"journal": \"' + bolunmus[3].trim() + '", "authors": "' + bolunmus[1].trim() + '", "title": "' + bolunmus[0].trim();
	sText=/Volume\s*([0-9]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","volume": "' + RegExp.$1.trim()
	}

	sText=/Issues?\s*([^,]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","issue": "' + RegExp.$1.trim()
	}

	sText=/Pages?\s*([0-9]+)-([0-9]+)/;
	if (sText.exec(ref)) {
		sonuclar+= '","firstPage": "' + RegExp.$1.trim();
		sonuclar+= '","lastPage": "' + RegExp.$2.trim() 
	}

	sText=/doi\s*:\s*(.*)/;
	if(sText.exec(ref)){
		sonuclar+='", "doi": "' + RegExp.$1.trim()
	}

	sonuclar+= '\"\}';


	document.getElementById("0").textContent=sonuclar;
}

translate();
