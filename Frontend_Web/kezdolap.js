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






