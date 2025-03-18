//Menü kis segítséggel;)___________________________________!
const navLinks = document.querySelectorAll('.nav-link');
const indicator = document.getElementById('menu-indicator');

navLinks.forEach(link => {
    link.addEventListener('mouseover', (e) => {
        const linkRect = e.target.getBoundingClientRect();

        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left}px`;
        indicator.style.display = 'block';
    });

    link.addEventListener('mouseout', () => {
        indicator.style.width = '0';
    });
});
//_________________________________________________________!
fetch("http://localhost:3000/csak_szakteruletek")
.then(x => x.json())
.then(y => myDisplay(y));

function myDisplay(y)
{
    for (const elem of y) {
       document.getElementById("szakrendelesek").innerHTML += 
       `  
       <option value="${elem.szak_nev}">
            ${elem.szak_nev}
       </option>
       `
   
    }
}
function Kivalasztas() {

    document.getElementById("orvosokCim").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; color: #113F67;"><span style="font-size: 23px;">❷ </span>Orvos</h3>
    `
    var adat = {
        "bevitel1": document.getElementById("szakrendelesek").value
    };

    fetch("http://localhost:3000/szakteruletKeres", {
        method: "POST",
        body: JSON.stringify(adat),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(x => x.json()) 
    .then(y => {
        var keresettOrvos = document.getElementById("keresettOrvos");
        keresettOrvos.innerHTML = ''; 

        y.forEach(elem => {
                keresettOrvos.innerHTML += 
                `
                <span style="display: flex; align-items: center;">
                    <span id="orvosNev">${elem.orvos}</span>
                    <hr style="flex-grow: 1; border: none; border-top: 1px solid #000; margin: 0 10px; margin-top: 10px;">
                    <button style="margin-top: 10px;" class="orvosGomb" onclick="orvosKivalaszt('${elem.szakTeruletId}', '${elem.orvos}', '${elem.orvosId}')">Tovább</button>
                </span>
                <br>
                `;
                //<button onclick="orvosKivalaszt(${JSON.stringify(elem)}, '${orvos}')" 
        });
    })
    .catch(error => console.error('Error:', error));
}

function orvosKivalaszt(szakTeruletId, orvos, orvosId) {
    document.getElementById("idopontokCim").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; color: #113F67;"><span style="font-size: 23px;">❸ </span>Időpontfoglalás</h3>
    <input type="date" id="datumValasztas" name="datumValasztas" onchange="dátumKiválasztása('${szakTeruletId}', '${orvos}', '${orvosId}')">
    `;
    document.getElementById("idopontok").innerHTML = '';
}

function dátumKiválasztása(szakTeruletId, orvos, orvosId) {
        var datum = document.getElementById("datumValasztas").value;

        var adat = {
            "bevitel1": orvos,
            "bevitel2": datum,
        };
    fetch("http://localhost:3000/foglaltIdopontok", {
        method: "POST",
        body: JSON.stringify(adat),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(data => {
        var idopontok = document.getElementById("idopontok");
        idopontok.innerHTML = ''

        var idopontokTomb = []

        data.forEach(item => {
            idopontokTomb.push(item.if_idopont)
        })
        //17:00____________________________
        if (idopontokTomb.includes("17:00") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gombElso" onclick="alert('Az időpont már foglalt')">17:00</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gombElso" onclick="idopontKivalaszt('17:00','${orvos}', '${orvosId}', '${szakTeruletId}')">17:00</button>
            `
        }
        //17:30____________________________
        if (idopontokTomb.includes("17:30") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gomb" onclick="alert('Az időpont már foglalt')">17:30</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gomb" onclick="idopontKivalaszt('17:30','${orvos}', '${orvosId}', '${szakTeruletId}')">17:30</button>
            `
        }
        //18:00____________________________
        if (idopontokTomb.includes("18:00") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gomb" onclick="alert('Az időpont már foglalt')">18:00</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gomb" onclick="idopontKivalaszt('18:00','${orvos}', '${orvosId}', '${szakTeruletId}')">18:00</button>
            `
        }
        //18:30____________________________
        if (idopontokTomb.includes("18:30") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gomb" onclick="alert('Az időpont már foglalt')">18:30</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gomb" onclick="idopontKivalaszt('18:30','${orvos}', '${orvosId}', '${szakTeruletId}')">18:30</button>
            `
        }
        //19:00____________________________
        if (idopontokTomb.includes("19:00") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gomb" onclick="alert('Az időpont már foglalt')">19:00</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gomb" onclick="idopontKivalaszt('19:00','${orvos}', '${orvosId}', '${szakTeruletId}')">19:00</button>
            `
        }
        //19:30____________________________
        if (idopontokTomb.includes("19:30") ) {
            idopontok.innerHTML += 
            `
            <button class="foglalt-gomb" onclick="alert('Az időpont már foglalt')">19:30</button>
            `
        }
        else{
            idopontok.innerHTML += 
            `
            <button class="szabad-gomb" onclick="idopontKivalaszt('19:30','${orvos}', '${orvosId}', '${szakTeruletId}')">19:30</button>
            `
        }
    })
    .catch(error => console.error('Error:', error));
}

function idopontKivalaszt(idopont, orvos, orvosId, szakTeruletId) {

    var szakrendeles = document.getElementById("szakrendelesek").value;
    var datum = document.getElementById("datumValasztas").value;
    document.getElementById("veglegesites").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; color: #113F67;"><span style="font-size: 23px;">❹ </span>Véglegesítés</h3>
    <br>
    <input type="text" id="fNev" placeholder="Páciens neve *" >
    <input type="text" id="fDatum" value="${datum}" readonly >
    <input type="text" id="fIdopont" value="${idopont}" readonly >
    <br>
    <br>
    <input type="text" id="fEmail" placeholder="Kapcsolattartó e-mail címe *" >
    <input type="text" id="fOrvos" value="${orvos}" readonly >
    <br>
    <br>
    <input type="text" id="fTelefon" placeholder="Kapcsolattartó telefonszáma *" >
    <input type="text" id="fSzakrendeles" value="${szakrendeles}" readonly >
    <br>
    <br>
    <button class="FoglalasGomb" onclick="Felvitel('${szakTeruletId}', '${orvosId}', '${datum}', '${idopont}')">Foglalás véglegesítése</button>
    <button class="visszaGomb" onclick="visszaAzElejere()">Foglalás újrakezdése</button>
    `
}
function Felvitel(szakTeruletId, orvosId, datum, idopont) {
    var adatok = {
        "bevitel1": szakTeruletId,
        "bevitel2": orvosId,
        "bevitel3": datum,
        "bevitel4": idopont,
        "bevitel5": document.getElementById("fNev").value,
        "bevitel6": document.getElementById("fEmail").value,
        "bevitel7": document.getElementById("fTelefon").value,
    };
    if (adatok.bevitel5 == "" || adatok.bevitel6 == "" || adatok.bevitel7 == "") {
        alert("Kérem töltse ki az összes adatát!")
    }
    else{
        fetch("http://localhost:3000/betegFelvitel", {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(x => x.text())
        .then(y => {
            alert("A foglalás sikeresen megtörtént! Hamarosan e-mailben tájékoztatjuk a részletekről!")
            document.getElementById("veglegesites").innerHTML = '';
            document.getElementById("idopontokCim").innerHTML = '';
            document.getElementById("idopontok").innerHTML = '';
            document.getElementById("keresettOrvos").innerHTML = '';
            document.getElementById("orvosokCim").innerHTML = '';
        })
        .catch(error => console.error('Error:', error));
    }
}

function visszaAzElejere() {
    document.getElementById("veglegesites").innerHTML = '';
    document.getElementById("idopontokCim").innerHTML = '';
    document.getElementById("idopontok").innerHTML = '';
    document.getElementById("keresettOrvos").innerHTML = '';
    document.getElementById("orvosokCim").innerHTML = '';
}
