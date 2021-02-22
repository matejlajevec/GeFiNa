var pos = 0, test, test_status, vprasanje, pravilno = 0, a=0, b=0;
var vprasanja = [];
var ime, mail;
var resentest = "";

function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
};

var seznam_vprasanj = [
	['Voznik avtobusa opazi, da se bo na semaforju prižgala rdeča luč. Zavirati začne pri hitrosti #a# km/h in zavira #b# s preden se ustavi. Izračunaj velikost pospeška.', '#a#/3.6 * 1/#b#'],
	['Povprečna hitrost opazovanega telesa je enaka #a# m/s. Kolikšna je končna hitrost telesa, če je bila začetna enaka nič?', '#a# * 2'],
	['Avto vozi s hitrostjo #a# m/s. Pri prehitevanju, ki traja #b# s, pospešuje s pospeškom #c# m/s². Izračunaj, kolikšno končno hitrost doseže avto med pospeševanjem?', '(#c#*#b#) + #a#'],
	['Kolesar se s hitrostjo #a# m/s pripelje na vrh klanca in se brez zaviranja spusti po njem. Pri tem ima pospešek #b# m/s², vožnja po klancu pa traja #c# s. Kolikšno hitrost doseže ob vznožju klanca?', '#a#+(#b#*#c#)'],
	['Raketa se po startu giblje s pospeškom #a# m/s². Kolikšno hitrost ima po #b# s gibanja? Izrazi v km/h.', '#a#*3.6 * #b#'],
	['Avtomobil s hitrostjo #a# m/s zaleti v oviro in se ustavi. Trk z oviro traja #b# s. Predpostavimo, da je to gibanje enakomerno pospešeno. S kolikšnim negativnim pospeškom se avto ustavlja?', '-#a# / #b#'],
	['Telo začne pri hitrosti #a# m/s enakomerno pospeševati do hitrosti #b# m/s. Pospeševanje traja #c# s. Izračunaj povprečno hitrost.', '#a#+#b# / #c#'],
	['Tovornjak vozi s hitrostjo #a# km/h. V nekem trenutku začne enakomerno pospešeno zavirati. Po #b# m se ustavi. Koliko časa se ustavlja?', '(7.2*#b#)/#a#'],
];

function generirajVprasanje(i){
	vprasanje = seznam_vprasanj[i][0];
	enacba = seznam_vprasanj[i][1];
	a = getRandomInt(100);
	b = getRandomInt(100);
	c = getRandomInt(100);
	d = getRandomInt(100);
	e = getRandomInt(100);
	f = getRandomInt(100);
	vprasanje = vprasanje.replace("#a#", String(a));
	enacba = enacba.replace("#a#", String(a));
	vprasanje = vprasanje.replace("#b#", String(b));
	enacba = enacba.replace("#b#", String(b))
	vprasanje = vprasanje.replace("#c#", String(c));
	enacba = enacba.replace("#c#", String(c))
	vprasanje = vprasanje.replace("#d#", String(d));
	enacba = enacba.replace("#d#", String(d))
	vprasanje = vprasanje.replace("#e#", String(e));
	enacba = enacba.replace("#e#", String(e))
	vprasanje = vprasanje.replace("#f#", String(f));
	enacba = enacba.replace("#f#", String(f))
	rezultat = eval(enacba).toFixed(2)
	return [vprasanje, rezultat];
}

function _(x){
	return document.getElementById(x);
}

function prikazVprasanja(){
	test = _("test");
	if (pos == 0){
		test.innerHTML = "<h3 class='is-size-4'>Pozdravljen/a, vnesi število nalog, ki bi jih danes želel/a rešiti!</h3>";
		test.innerHTML += "<h5 class='is-size-6	'>Vse odgovore zaokroži na dve decimalni mesti in zapiši le številsko vrednost odgovora v osnovnih enotah.</h2>"
		test.innerHTML += "<input type = 'number' class='is-size-3' class='mx=10' id = 'stevilo' >";
		test.innerHTML += "<button onclick='steviloNalog()' class=' mr-3 button is-normall button is-black'>Potrdi izbiro</button>";	
		return;
	}
	else if(pos >= vprasanja.length){
		test.innerHTML = "<h1 class='is-size-2'>Dobil si "+(pravilno/stevilo)*100 + "%</h1>";
		_("test_status").innerHTML = "Test končan";
		test.innerHTML += "<h3 class='is-size-4'>Če želiš rezultat in svoje rešitve poslati na elektronski naslov, ga vnesi spodaj:</h3>";	
		test.innerHTML += "<input type = 'text' class='is-size-3' class='mx=10' id = 'mail' >";
		test.innerHTML += "<button onclick='posljiMail()' class=' mr-3 button is-normall button is-black'>Pošlji mail</button>";
		return ;
	}
	_("test_status").innerHTML = "Vprašanje "+ pos +" od " + stevilo;
	vprasanje = vprasanja[pos][0];
	test.innerHTML = "<h3 class='is-size-4'>" + vprasanje + "</h3>";	
	test.innerHTML += "<input type = 'number' class='is-size-3' class='mx=10' id = 'vnos' >";
	test.innerHTML += "<button onclick='preveriOdgovor()' class=' mr-3 button is-normall button is-black'>Potrdi izbiro</button>";
	resentest += String(pos)
	resentest += ". "
	resentest += vprasanje; 
	resentest += "<br> Odgovor: "; 
}

//StackOwerflow https://stackoverflow.com/a/19270021 - izbere naključne naloge iz zbirke nalog
function getRandom(arr, n) {
    var result = new Array(n-1),
        len = arr.length,
        taken = new Array(len);
    if (n-1 > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function steviloNalog(){
	stevilo = parseInt(document.getElementById("stevilo").value);
	seznam = getRandom(seznam_vprasanj, stevilo+1);
	seznam_vprasanj = seznam
	for(i=0; i<=stevilo; i++) {
		vprasanja.push(generirajVprasanje(i));
	}
	pos++;
	prikazVprasanja();
}

function preveriOdgovor(){
	var vnos = document.getElementById("vnos").value;
	rezultat = vprasanja[pos][1]
	if(vnos == rezultat){
		pravilno++;
		resentest += vnos; 
		resentest += "	<b>Pravilno!</b> <br> <br>";
	}
	else{
		resentest += vnos; 
		resentest += "	<b>Napačno.</b>";
		resentest += " Pravilen odgovor: ";
		resentest += rezultat
		resentest += "<br> <br>"
	}
	pos++;
	prikazVprasanja();
}

function posljiMail() { 
	mail = document.getElementById("mail").value;
	var d = new Date()
	const dan = d.getDate();
	const mesec = d.getMonth();
	const leto = d.getFullYear();
	const ura = new Date().toLocaleTimeString('en-US', { hour12: false, 
		hour: "numeric", 
		minute: "numeric"});

	Email.send({ 
	  Host: "smtp.gmail.com", 
	  Username: "ustvarjalecnalog@gmail.com", 
	  Password: "Matej2021", 
	  To: mail, 
	  From: "ustvarjalecnalog@gmail.com", 
	  Subject: "Rešitve testa od " + ime, 
	  Body: "" + dan + "." + mesec + "." + leto + " ob " + ura  + "si pri preverjanju znanja pravilno rešil/a <b>" + (pravilno/stevilo)*100 + "%</b> nalog.<br><br> Rešen test:<br>" + resentest
	  +"Lep pozdrav, Ustvarjalec nalog.", 
	}) 
	  .then(function (message) { 
		alert("Sporočilo uspešno poslano!") 
	  }); 
  } 

window.addEventListener("load", prikazVprasanja, false);
