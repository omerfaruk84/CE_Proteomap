function doiParser (doi) {
	var oRequest = new XMLHttpRequest(),
	    adres='http://www.crossref.org/openurl/?pid=zter:zter321&url_ver=Z39.88-2004&ctx_ver=Z39.88-2004&rfr_id=info:sid/zotero.org:2&rft_id=info:doi/' + doi + '&genre=article&noredirect=true&format=unixref',
	    sonuclar={"authors": []};
	oRequest.open("GET", adres, false);
	oRequest.setRequestHeader("User-Agent", navigator.userAgent);
	oRequest.send(null);
	if (oRequest.status == 200) aXML=oRequest.responseXML;
	else return aXML=null;
	sonuclar.journal=aXML.getElementsByTagName('full_title')[0].textContent;
	sonuclar.title=aXML.getElementsByTagName('title')[0].textContent;
	sonuclar.doi=doi;
	for (var i = 0; i < aXML.getElementsByTagName('surname').length; i++) {
		sonuclar.authors.push(aXML.getElementsByTagName('given_name')[i].textContent + ' ' + aXML.getElementsByTagName('surname')[i].textContent)
	};
	document.getElementById('0').textContent=JSON.stringify(sonuclar)


}

