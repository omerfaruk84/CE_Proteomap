//urlReg n x 3luk array, URL RegExpleri, ilgili translator js dosyasinin adlari
//ve tranlator XMLHttpRequestse true, aciksayfada calisacaksa false degerini iceriyor.
urlReg = [
	[/https?:\/\/www\.springerlink\.com\/content\/([^\/]+)/,"springerlink", true],
	[/.*sciencedirect\.com\/science\?_ob=MiamiImageURL.*&_pii=([^&]+).*/,"scdirectpdf",true],
	[/https?:\/\/.*\.sciencedirect\.com\/.*pii(?:=|\/)([a-zA-Z0-9]+).*/,"scdirect", false],  			
	[/(https?:\/\/[^\/]+\/[^\/]+\/journal\/v[^\/]+\/n[^\/]+\/)(full|abs)(\/.+)\.html/,"nature",true],
	[/https?:\/\/([^\/]+)\.sciencemag.org\//,"science",true]
	];

