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
    for (const elem of y) {
       document.getElementById("orvosAdatok").innerHTML += 
       `
        <div class="col-sm-4 keret">
            <div class="adatok">
                <img class="orvosKep mx-auto d-block" src="kepek/profile_photo.jpg" alt="">
                <p class="orvosNev">${elem.nev}</p>
                <p class="orvosSzakterulet">${elem.szakteruletek}</p>
            </div>
            <br>
        </div>
        <br>
       `
    }
}

