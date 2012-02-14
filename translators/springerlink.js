url=document.getElementById('varUrl').textContent;

var urlReg = /(https?:\/\/[^\/]+\/content\/[^\/]+)\//,
	adres = urlReg.exec(url)[0] + "about/",
	sayfa = sayfaAl(adres),
	text = sayfa.replace(/<\/?[^>]+>/g, ""),
	sText = /title="Link to the Journal of this Article">(.*)<\/a>/;

sayfa.match(sText);
var sonuclar= '{"dergi": \"' + RegExp.$1.replace(/<\/?[^>]+>/g, "");

sText = /<p class="authors">(.*)<\/p>/;

sonuclar += '","yazarlar": "' + sText.exec(sayfa)[1].replace(/<\/?[^>]+>/g, "").split(' and ').join(' ,');

sText = /<dt>Title<\/dt><dd>(.*)<\/dd>/;
sayfa.match(sText);
sonuclar += '","baslik": "' + RegExp.$1.replace(/<\/?[^>]+>/g, "");

sText = /DOI: (10\.[0-9]+\/[a-zA-Z0-9\-]+\S*)/;
text.match(sText);
sonuclar += '","doi": "' + RegExp.$1.replace('Online','');

sText = /Volume ([0-9]+), Number ([0-9]+), ([0-9]+)-([0-9]+)/;
if(sText.exec(text)){

sonuclar+= '","cilt": "' + RegExp.$1;
sonuclar+= '","sayi": "' + RegExp.$2;
sonuclar+= '","ilkSayfa": "' + RegExp.$3;
sonuclar+= '","sonSayfa": "' + RegExp.$4 + '\"}';
}
document.getElementById("0").textContent=sonuclar;
