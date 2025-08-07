'use strict';

// modal
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
const modalCloseFunc = function () { modal.classList.add('closed') }

modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}



//header top

const dynamicText = document.querySelector(".dynamic-text");
const textArray = [
  "C'EST BIENTOT LA RENTREE, TROUVEZ VOTRE LISTE SCOLAIRE", 
  "COMMANDEZ TOUTES LES FOURNITURES DE VOS ENFANTS EN QUELQUES CLICS", 
  "10% DE REDUCTION SUR VOTRE PREMIERE COMMANDE", 
  "RECEVEZ VOS FOURNITURES EN 48H PARTOUT AU BURKINA FASO",
];
let textIndex = 0;

function typeText() {
  dynamicText.textContent = ""; // Clear previous text
  let charIndex = 0;
  const currentText = textArray[textIndex];

  function typeChar() {
    if (charIndex < currentText.length) {
      dynamicText.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 100); // Adjust typing speed
    } else {
      setTimeout(eraseText, 2000); // Pause before erasing
    }
  }

  function eraseText() {
    if (dynamicText.textContent.length > 0) {
      dynamicText.textContent = dynamicText.textContent.slice(0, -1);
      setTimeout(eraseText, 50); // Adjust erasing speed
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(typeText, 500); // Pause before typing next text
    }
  }

  typeChar();
}
typeText();


// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setupNavigation();




// banner
const track = document.querySelector('.banner-carousel-track');
const slides = document.querySelectorAll('.banner-carousel-item');
let current = 0;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === current) {
      slide.classList.add('active');
    }
  });
  const offset = -current * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  current = (current + 1) % slides.length;
   updateCarousel();
}
updateCarousel();
setInterval(nextSlide, 5000);