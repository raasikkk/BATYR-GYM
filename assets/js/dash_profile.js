// Get elements
const loginPopupBg = document.getElementById('loginPopupBg'); 
const loginPopupForm = document.getElementById('loginPopupForm'); 
const openLoginPopupButton = document.getElementById('userName'); 
const closeLoginPopupButton = document.getElementById('closeLoginPopup'); 
const newUserLink = document.getElementById('newUser');
const registerPopupBg = document.getElementById('registerPopupBg'); 
const registerPopupForm = document.getElementById('registerPopupForm'); 
const closeRegisterPopupButton = document.getElementById('closeRegisterPopup'); 
const alert_signin = document.getElementById('openPopup');


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



// Close popups by clicking outside
document.addEventListener('click', (e) => { 
  if (e.target === loginPopupBg) {
    loginPopupBg.classList.remove('active'); 
    loginPopupForm.classList.remove('active'); 
  }
});