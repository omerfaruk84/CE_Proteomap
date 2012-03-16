function post(){
	$.ajax({
		type: "POST",
	url : "http://sencer.princeton.edu/errors",
	cache: false,
	data: JSON.parse(bg.document.getElementById('hata').textContent),
	statusCode: {
		200:function() { alert("200"); },
		202:function() { alert("202"); }
	},
	success: function(response){
		if(response)
		document.getElementById('hata').textContent="Hata gonderildi";
		else
		document.getElementById('hata').textContent="Tekrar Deneyin";

	},
	error: function(xhr){
		document.getElementById('hata').textContent="Tekrar Deneyin";
	}
	});
}
