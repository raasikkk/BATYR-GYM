// Get elements
const loginPopupBg = document.getElementById('loginPopupBg'); 
const loginPopupForm = document.getElementById('loginPopupForm'); 
const openLoginPopupButton = document.getElementById('openLoginPopup'); 
const closeLoginPopupButton = document.getElementById('closeLoginPopup'); 
const newUserLink = document.getElementById('newUser');
const registerPopupBg = document.getElementById('registerPopupBg'); 
const registerPopupForm = document.getElementById('registerPopupForm'); 
const closeRegisterPopupButton = document.getElementById('closeRegisterPopup'); 
const alert_signin = document.getElementById('openPopup');

const profilePopupBg = document.getElementById('profilePopupBg'); 
const profilePopupForm = document.getElementById('profilePopupForm'); 
const openProfilePopupButton = document.getElementById('openProfilePopup'); 
const closeProfilePopupButton = document.getElementByID('closeProfilePopup');


function alert_signin_func (){
  alert(`You didn't sign in yet`)
}


// Open login popup
openLoginPopupButton.addEventListener('click', (e) => { 
  e.preventDefault(); 
  loginPopupBg.classList.add('active'); 
  loginPopupForm.classList.add('active'); 
});

// Close login popup
closeLoginPopupButton.addEventListener('click', () => { 
  loginPopupBg.classList.remove('active'); 
  loginPopupForm.classList.remove('active');
});

// Open registration popup from login popup
newUserLink.addEventListener('click', (e) => { 
  e.preventDefault(); 
  loginPopupBg.classList.remove('active'); 
  loginPopupForm.classList.remove('active');
  registerPopupBg.classList.add('active'); 
  registerPopupForm.classList.add('active'); 
});

// Close registration popup
closeRegisterPopupButton.addEventListener('click', () => { 
  registerPopupBg.classList.remove('active'); 
  registerPopupForm.classList.remove('active');
});

// Open profile popup
openProfilePopupButton.addEventListener('click', (e) => { 
  e.preventDefault(); 
  profilePopupBg.classList.add('active'); 
  profilePopupForm.classList.add('active'); 
});

// Close profile popup
closeProfilePopupButton.addEventListener('click', () => { 
  profilePopupBg.classList.remove('active'); 
  profilePopupForm.classList.remove('active');
});

// Close popups by clicking outside
document.addEventListener('click', (e) => { 
  if (e.target === loginPopupBg) {
    loginPopupBg.classList.remove('active'); 
    loginPopupForm.classList.remove('active'); 
  } else if (e.target === registerPopupBg) {
    registerPopupBg.classList.remove('active'); 
    registerPopupForm.classList.remove('active'); 
  } 
});

document.addEventListener('click', (e) => {
  if (e.target === profilePopupBg) {
    profilePopupBg.classList.remove('active'); 
    profilePopupForm.classList.remove('active'); 
  }
});
  
  
  
  /**
   * navbar toggle
   */
  
  const addEventOnElem = (elems, event, callback) => {
    elems.forEach(elem => elem.addEventListener(event, callback));
  };
  
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  
  const toggleNavbar = () => {
    navbar.classList.toggle("active");
  };
  
  addEventOnElem(navTogglers, "click", toggleNavbar);
  
  const closeNavbar = () => {
    navbar.classList.remove("active");
  };
  
  addEventOnElem(navLinks, "click", closeNavbar);
  
  // Header & back top button active on scroll
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });

  

