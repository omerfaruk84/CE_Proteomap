// this translator should be called with inject.js

var ref=document.getElementsByName('art_citation')[0].getAttribute('value'),
    bolunmus=ref.split('\n'),
    sonuclar= '{"dergi": \"' + bolunmus[3] + '", "yazarlar": "' + bolunmus[1] + '", "baslik": "' + bolunmus[0],
    sText; 


sText=/Volume\s*([0-9]+)/;
if (sText.exec(ref)) {
    sonuclar+= '","cilt": "' + RegExp.$1
}

sText=/Issues?\s*([^,]+)/;
if (sText.exec(ref)) {
    sonuclar+= '","sayi": "' + RegExp.$1
}

sText=/Pages?\s*([0-9]+)-([0-9]+)/;
if (sText.exec(ref)) {
    sonuclar+= '","ilkSayfa": "' + RegExp.$1;
    sonuclar+= '","sonSayfa": "' + RegExp.$2 
}

sText=/doi\s*:\s*(.*)/;
if(sText.exec(ref)){
    sonuclar+='", "doi": "' + RegExp.$1
}

sonuclar+= '\"}';

chrome.extension.sendRequest(sonuclar);
