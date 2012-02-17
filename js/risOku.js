function risOku(risMetin) {
    var sonuclar = {
        "AU": [],
       
    }

    var parsed2;
    var parsed = risMetin.split("\n");

    for (var i = 0; i < parsed.length; i++) {
        parsed2 = parsed[i].split("  - ");
        
        if (parsed2[0] == "AU" | parsed2[0] == "A1") sonuclar["AU"].push(parsed2[1]);
        else sonuclar[parsed2[0]] = parsed2[1];
    }
    return sonuclar;
}
