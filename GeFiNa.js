var pos = 0, test, test_status, vprasanje, pravilno = 0;
var odgovori = []; 
var vprasanja = [
    [ "What is 10 + 4?", 14],
	[ "What is 20 - 9?", 11],
	[ "What is 7 x 3?", 21],
	[ "What is 8 / 2?", 4]
];

function _(x){
	return document.getElementById(x);
}

function prikazVprasanja(){
	test = _("test");
	if(pos >= vprasanja.length){
		test.innerHTML = "<h2>Dobil si " + (pravilno/vprasanja.length)*100 + "%</h2>";
		_("test_status").innerHTML = "Test končan";
		return ;
	}
	_("test_status").innerHTML = "Vprašanje "+ (pos+1) +" od " + vprasanja.length;
	vprasanje = vprasanja[pos][0];
	test.innerHTML = "<h3>"+vprasanje+"</h3>";	
	test.innerHTML += "<input type = 'num' id = 'vnos' >";
	test.innerHTML += "<button onclick='preveriOdgovor()'>Potrdi izbiro</button>";
}

function preveriOdgovor(){
	var vnos = document.getElementById("vnos").value;
	if(vnos == vprasanja[pos][1]){
		pravilno++;
	}
	odgovori.push(vnos);
	pos++;
	prikazVprasanja();
}
window.addEventListener("load", prikazVprasanja, false);
