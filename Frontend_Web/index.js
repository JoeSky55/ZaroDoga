//Elérhetőségek
fetch("Elerhetosegek.html")
.then(response => response.text())
.then(data => {
  document.getElementById("elerhetoseg").innerHTML = data;
});

fetch(Cim + "szakteruletek")
.then(x => x.json())
.then(y => myDisplay(y));

function myDisplay(y)
{
    for (const elem of y) {
        console.log("bármit")
        document.getElementById("kezelesinkKezdolap").innerHTML += 
        `
        <td>
            <img class="szakkKep rounded-circle" src="${Cim}${elem.szak_kep_web}" alt="">
            <p style="font-size: 10px; text-align: center">${elem.szak_nev}</p>   
        </td>
        
        `
    }
}