document.addEventListener('DOMContentLoaded', function() {
    // Sélection du hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    // Sélection de la nav
    const sideNav = document.querySelector('.side-nav');

    // Écouteur d'événement pour le clic sur le hamburger menu
    hamburgerMenu.addEventListener('click', () => {
        // Basculement de la classe 'open' pour afficher ou masquer la nav
        sideNav.classList.toggle('open');
    });
});
