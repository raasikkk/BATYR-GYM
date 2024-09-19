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

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('profileName').innerText += sessionStorage.getItem('userName');

  // Fetch and display purchased subscriptions on profile popup load
  fetchPurchasedSubscriptions();
});

function fetchPurchasedSubscriptions() {
  const userName = sessionStorage.getItem('userName');
  fetch(`/purchase?name=${userName}`)
    .then(response => response.json())
    .then(data => {
      const purchasedList = document.getElementById('purchasedList');
      purchasedList.innerHTML = '';
      data.forEach(purchase => {
        addSubscriptionToList(purchase);
      });
    })
    .catch(error => console.error('Error fetching purchases:', error));
}

function addSubscriptionToList(purchase) {
  const purchasedList = document.getElementById('purchasedList');
  const existingItems = purchasedList.getElementsByTagName('li');
  for (let item of existingItems) {
    if (item.textContent === `${purchase.class_name} with ${purchase.coach_name}`) {
      return; // Subscription already exists in the list
    }
  }
  const listItem = document.createElement('li');
  listItem.textContent = `${purchase.class_name} with ${purchase.coach_name}`;
  purchasedList.appendChild(listItem);
}

function purchaseClass(className, coachName, price) {
  const userName = sessionStorage.getItem('userName');
  
  const data = {
    name: userName,
    class_name: className,
    coach_name: coachName,
    price: price
  };

  fetch('/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Purchase successful!');
      fetchPurchasedSubscriptions(); // Refresh the purchased subscriptions list
    } else {
      throw new Error('Purchase failed!');
    }
  })
  .catch(error => {
    console.error('Error purchasing class:', error);
    alert('Error purchasing class. Please try again later.');
  });
}