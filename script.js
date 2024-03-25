document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sideNav = document.querySelector('.side-nav');
    hamburgerMenu.addEventListener('click', () => {
        sideNav.classList.toggle('open');
    });
});
