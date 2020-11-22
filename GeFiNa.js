var pos = 0, test, test_status, vprasanje, izbira, izbire, izbA, izbB, izbC, pravilno = 0;
var vprasanja = [
    [ "What is 10 + 4?", "12", "14", "16", "B" ],
	[ "What is 20 - 9?", "7", "13", "11", "C" ],
	[ "What is 7 x 3?", "21", "24", "25", "A" ],
	[ "What is 8 / 2?", "10", "2", "4", "C" ]
];
function _(x){
	return document.getElementById(x);
}
function prikazVprasanja(){
	test = _("test");
	if(pos >= vprasanja.length){
		test.innerHTML = "<h2>Dobil si "+pravilno+" od "+vprasanja.length+" pravilna vprašanja</h2>";
		_("test_status").innerHTML = "Test končan";
		pos = 0;
		pravilno = 0;
		return false;
	}
	_("test_status").innerHTML = "Vprašanje "+(pos+1)+" od "+vprasanja.length;
	vprasanje = vprasanja[pos][0];
	izbA = vprasanja[pos][1];
	izbB = vprasanja[pos][2];
	izbC = vprasanja[pos][3];
	test.innerHTML = "<h3>"+vprasanje+"</h3>";
	test.innerHTML += "<input type='radio' name='izbire' value='A'> "+izbA+"<br>";
	test.innerHTML += "<input type='radio' name='izbire' value='B'> "+izbB+"<br>";
	test.innerHTML += "<input type='radio' name='izbire' value='C'> "+izbC+"<br><br>";
	test.innerHTML += "<button onclick='preveriOdgovor()'>Potrdi izbiro</button>";
}
function preveriOdgovor(){
	izbire = document.getElementsByName("izbire");
	for(var i=0; i<izbire.length; i++){
		if(izbire[i].checked){
			izbira = izbire[i].value;
		}
	}
	if(izbira == vprasanja[pos][4]){
		pravilno++;
	}
	pos++;
	prikazVprasanja();
}
window.addEventListener("load", prikazVprasanja, false);