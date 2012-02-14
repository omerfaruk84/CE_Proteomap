function sayfaAl(sURL) {
    var oRequest = new XMLHttpRequest();
    oRequest.open("GET", sURL, false);
    oRequest.setRequestHeader("User-Agent", navigator.userAgent);
    oRequest.send(null);
    if (oRequest.status == 200) return oRequest.responseText;
    else return null;
}