//Elérhetőségek
fetch("Elerhetosegek.html")
.then(response => response.text())
.then(data => {
  document.getElementById("elerhetoseg").innerHTML = data;
});
//---------------------------------------------------------//

fetch(Cim + "szakteruletek")
.then(x => x.json())
.then(y => myDisplay(y));

function myDisplay(y)
{
    for (const elem of y) {
        document.getElementById("KezeleseinkAdatok").innerHTML += 
        `
             <div class="col-sm-4 ">
                 <div class="adatok">
                    <img class="szakKep mx-auto d-block" src="${Cim}${elem.szak_kep_web}" alt="">
                    <h5 class="szakNev">${elem.szak_nev}</h5>
                    <p class="szakAr">${elem.szak_ar} Ft</p>
                    <p class="szakLeiras">${elem.szak_leiras}</p>
                 </div>
                 <br>
             </div>
             <br>
        `
    }
}

