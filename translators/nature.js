function translate () {
	var urlReg = /(https?:\/\/[^\/]+\/[^\/]+\/journal\/v[^\/]+\/n[^\/]+\/)(full|abs)(\/.+)\.html/,
	    url=document.getElementById('varUrl').textContent,
	    m = urlReg.exec(url),
	    sayfa = sayfaAl(m[1] + "ris" + m[3] + ".ris"),
	    sonuclar = risOku(sayfa);
	document.getElementById("0").textContent=sonuclar
}
translate();
