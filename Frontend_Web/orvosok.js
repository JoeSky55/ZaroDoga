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

fetch("http://localhost:3000/orvosAdatok2")
.then(x => x.json())
.then(y => myDisplay(y));

function myDisplay(y)
{
    var valtozo = 0
    for (const elem of y) {
        document.getElementById("orvosAdatok").innerHTML += 
        `
             <div class="col-sm-4 ">
                 <div class="adatok">
                     <img class="orvosKep mx-auto d-block" src="./kepek/${elem.kep}" alt="">
                     <p class="orvosNev">${elem.nev}</p>
                     <p class="orvosSzakterulet">${elem.szakteruletek}</p>  
                     <p style="text-align: center;"><button class="bovebbenStilus" onclick='Bovebben(${JSON.stringify(elem)}, ${valtozo})'>Bemutatkozás ▿</button></p>
                     <div id="${valtozo}"></div>
                 </div>
                 <br>
             </div>
             <br>
        `
        valtozo++;
    }
}

function Bovebben(y, id) {
    var leirasDiv = document.getElementById(`${id}`);
    var leirasGomb = event.target; 
    
    if (leirasDiv.style.display === "none" || leirasDiv.style.display === "") {
        leirasDiv.style.display = "block";
        leirasGomb.innerHTML = "Bemutatkozás ▴";
        leirasDiv.innerHTML = `<p class="orvosLeiras">${y.leiras}</p>`;
        
        leirasGomb.style.color = "#113F67";
        leirasGomb.style.fontWeight = "bold";
        leirasGomb.style.borderRadius = "5px"; 
        leirasGomb.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.6)";
        leirasGomb.style.transition = "all 0.1s ease";
    } 
    else {
        leirasDiv.style.display = "none";
        leirasGomb.innerHTML = "Bemutatkozás ▿";
 
        leirasGomb.style.color = "black";
        leirasGomb.style.fontWeight = "normal";
        leirasGomb.style.borderRadius = "5px";
        leirasGomb.style.boxShadow = "none";
    }
}
