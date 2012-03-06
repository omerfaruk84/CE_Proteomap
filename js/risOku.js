function risOku(risMetin) {
	var parsed = risMetin.trim().split("\n"),
	    parsed2,i,authors=[],gecici="{",sonuclar={},j=0,author_s="AU,A1";

	for (i = 0; i < parsed.length; i++) {
		try{
		parsed2 = parsed[i].split("-");
		if (author_s.indexOf(parsed2[0].trim())>-1) {authors.push(parsed2[1].trim())}
		else {gecici+='\"' + parsed2[0].trim() + '": "' + parsed2[1].trim() + '\", '}}
		catch(err){}
	}
	gecici+= '"authors" :' + JSON.stringify(authors) + "}";
	gecici=JSON.parse(gecici);

	sonuclar.title=gecici.T1 ? gecici.T1 : gecici.TI;
	sonuclar.journal=gecici.JO ? gecici.JO : gecici.JA;
	sonuclar.doi=gecici.M3 ? gecici.M3 : gecici.N1;
	sonuclar.volume=gecici.VL;
	sonuclar.issue=gecici.IS;
	sonuclar.startPage=gecici.SP;
	sonuclar.endPage=gecici.EP;
	sonuclar.authors=gecici.authors;
	return JSON.stringify(sonuclar);

}
