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


  document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('userName').innerText = sessionStorage.getItem('userName');
  });

  function purchaseClass(className, coachName, price) {
    const userName = sessionStorage.getItem('userName');
  
    const data = {
      name: userName, // Retrieve the actual user name from session storage
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
    .then(response => {
      if (response.ok) {
        alert('Purchase successful!');
        location.reload(); // Refresh the page after successful purchase
      } else {
        throw new Error('Purchase failed!');
      }
    })
    .catch(error => {
      console.error('Error purchasing class:', error);
      alert('Error purchasing class. Please try again later.');
    });
  }