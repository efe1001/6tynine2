
function toggleMenu() {
    // Toggle the class to show/hide the menu
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
    
    // Toggle hamburger animation
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('open');

    // Adjust the page layout when the menu is open
    const body = document.body;
    const profileDetails = document.querySelector('.profiledetails');
    body.classList.toggle('menu-open');
    profileDetails.classList.toggle('menu-open');
}
