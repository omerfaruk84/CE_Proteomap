function translate () {

	var urlReg = /https?:\/\/([^\/]+)\.sciencemag.org\//,
	    url=document.getElementById('varUrl').textContent,
	    m = urlReg.exec(url),sURL,sayfa,sonuclar;

	if(m[1]=="stke"){
		urlReg = /https?:\/\/stke.sciencemag.org\/cgi\/(content\/(abstract|full)|reprint)\/(.+)/;
		m = urlReg.exec(url).pop().replace(".pdf","");
		sURL="http://stke.sciencemag.org/cgi/citmgr?type=zotero&gca=" + m

	}

	else if(m[1]=="www"){
		urlReg = /https?:\/\/www.sciencemag.org\/content\/(.*)+/;
		m=urlReg.exec(url)[1].replace(".pdf","").replace(".full","").replace("/suppl","").replace("/DC1","").replace(".abstract","");
		sURL="http://www.sciencemag.org/citmgr?type=refman&gca=sci%3B" + encodeURIComponent(m);
		if(m.substr(0,5)=="early"){
			urlReg = /science\.([0-9]{7})/;
			m=urlReg.exec(url)[1].replace(".pdf","").replace(".full","").replace("/suppl","").replace("/DC1","").replace(".abstract","");
			sURL="http://www.sciencemag.org/citmgr?type=refman&gca=sci%3Bscience." + m;
		}
	}
	sayfa = sayfaAl(sURL);
	sonuclar = risOku(sayfa);
	document.getElementById("0").textContent=sonuclar
}
translate();
