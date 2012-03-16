function translate () {
	url=document.getElementById('varUrl').textContent;
	
	var uReg = /(https?:\/\/[^\/]+\/content\/[^\/]+)\//,
		adres = uReg.exec(url)[0] + "about/",
		sayfa = sayfaAl(adres),
		text = sayfa.replace(/<\/?[^>]+>/g, " "),
	// sayfa.match(sText);
	// var sonuclar= '{"journal": \"' + RegExp.$1.replace(/<\/?[^>]+>/g, "");
	
	// sText = /<p class="authors">(.*)<\/p>/;
	
	// sonuclar += '","authors": "' + sText.exec(sayfa)[1].replace(/<\/?[^>]+>/g, "").split(' and ').join(' ,');
	
	// sText = /<dt>Title<\/dt><dd>(.*)<\/dd>/;
	// sayfa.match(sText);
	// sonuclar += '","title": "' + RegExp.$1.replace(/<\/?[^>]+>/g, "");
	
		sText = /DOI:\s*(10\.[0-9]+\/[a-zA-Z0-9\-]+\S*)/;
	doiParser(sText.exec(text)[1]);
	// sonuclar += '","doi": "' + RegExp.$1.replace('Online','');
	
	// sText = /Volume ([0-9]+), Number ([0-9]+), ([0-9]+)-([0-9]+)/;
	// if(sText.exec(text)){
	
	// sonuclar+= '","volume": "' + RegExp.$1;
	// sonuclar+= '","issue": "' + RegExp.$2;
	// sonuclar+= '","firstPage": "' + RegExp.$3;
	// sonuclar+= '","lastPage": "' + RegExp.$4 + '\"}';
	// }
	// document.getElementById("0").textContent=sonuclar;

}

translate();
