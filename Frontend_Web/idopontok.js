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
fetch("http://localhost:3000/szakteruletAdatok")
.then(x => x.json())
.then(y => myDisplay(y));

function myDisplay(y)
{
    for (const elem of y) {
       document.getElementById("szakrendelesek").innerHTML += 
       `
       <option value="${elem.szak_nev}">${elem.szak_nev}</option>
       `
    }n 
}
function Kivalasztas() {
    document.getElementById("orvosokCim").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px;"><span style="font-size: 23px;">❷ </span>Orvos</h3>
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
            var orvosok = elem.orvosok.split(' , '); // Szétválasztjuk az orvosok neveit
            orvosok.forEach(orvos => {
                keresettOrvos.innerHTML += 
                `
                <span style="display: flex; align-items: center;">
                    <span style="margin-top: 10px;">${orvos}</span>
                    <hr style="flex-grow: 1; border: none; border-top: 1px solid #000; margin: 0 10px; margin-top: 10px;">
                    <button style="margin-top: 10px;" class="orvosGomb" onclick="orvosKivalaszt('${elem.szakTerulet}', '${orvos}')">Tovább</button>
                </span>
                <br>
                `;
                //<button onclick="orvosKivalaszt(${JSON.stringify(elem)}, '${orvos}')" 
            });
        });
    })
    .catch(error => console.error('Error:', error));
}


function orvosKivalaszt(szakTerulet, orvos) {
    document.getElementById("idopontokCim").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px;"><span style="font-size: 23px;">❸ </span>Időpontfoglalás</h3>
    <input type="date" id="datumValasztas" min="2024-11-25" max="2024-11-30" name="datumValasztas" onchange="dátumKiválasztása('${szakTerulet}', '${orvos}')">
    `;
    document.getElementById("idopontok").innerHTML = '';
}

function dátumKiválasztása(szakTerulet, orvos) {
        var datum = document.getElementById("datumValasztas").value;

        var adat = {
            "bevitel1": orvos,
            "bevitel2": datum
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
            <button class="szabad-gombElso" onclick="idopontKivalaszt('17:00','${orvos}')">17:00</button>
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
            <button class="szabad-gomb" onclick="idopontKivalaszt('17:30','${orvos}')">17:30</button>
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
            <button class="szabad-gomb" onclick="idopontKivalaszt('18:00','${orvos}')">18:00</button>
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
            <button class="szabad-gomb" onclick="idopontKivalaszt('18:30','${orvos}')">18:30</button>
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
            <button class="szabad-gomb" onclick="idopontKivalaszt('19:00','${orvos}')">19:00</button>
            `
        }
    })
    .catch(error => console.error('Error:', error));
}

function idopontKivalaszt(idopont, orvos) {

    var szakrendeles = document.getElementById("szakrendelesek").value;
    var datum = document.getElementById("datumValasztas").value;
    document.getElementById("veglegesites").innerHTML = 
    `
    <h3 style="margin-top: 15px; margin-left: 40px; margin-right: 40px; background-color: lightcyan; padding: 10px; border-radius: 10px;"><span style="font-size: 23px;">❹ </span>Véglegesítés</h3>
    <br>
    <input type="text" id="fNev" value="Név *" >
    <input type="text" id="fDatum" value="${datum}" readonly >
    <input type="text" id="fIdopont" value="${idopont}" readonly >
    <br>
    <br>
    <input type="text" id="fEmail" value="E-mail cím *" >
    <input type="text" id="fOrvos" value="${orvos}" readonly >
    <br>
    <br>
    <select name="" id="fTelefonKezdete">
        <option value="">+36</option>
        <option value="">+39</option>
        <option value="">+40</option>
        <option value="">+41</option>
        <option value="">+43</option>
        <option value="">+44</option>
        <option value="">+45</option>
    </select>
    <input type="text" id="fTelefon" value="Telefonszám *" >
    <input type="text" id="fSzakrendeles" value="${szakrendeles}" readonly >
    <br>
    <br>
    <button class="FoglalasGomb" onclick="Felvitel()">Foglalás véglegesítése</button>
    <button class="visszaGomb" onclick="visszaAzElejere()">Foglalás újrakezdése</button>
    `
    //alert(`Kiválasztott időpont: ${idopont}`);
}
function Felvitel()
{
    
}

function visszaAzElejere() {
    document.getElementById("veglegesites").innerHTML = '';
    document.getElementById("idopontokCim").innerHTML = '';
    document.getElementById("idopontok").innerHTML = '';
    document.getElementById("keresettOrvos").innerHTML = '';
    document.getElementById("orvosokCim").innerHTML = '';
}