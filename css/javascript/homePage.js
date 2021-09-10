// https://sneakeromatic-api.herokuapp.com/
function displaySneakers(array) {
  let container = document.querySelector("#sneakers-container");
  container.innerHTML = ''
  array.forEach((shoe) => {
    container.innerHTML += `<div class="shoe-card" category=${shoe[2]}>
    <img class="shoe-image" src="${shoe[6]}" alt="The Sneaker">
      <a href="./products.html">View</a>
      </div>`;
  });
}

// view products function
let sneakers = []
fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    sneakers = data.data;
    displaySneakers(sneakers.slice(0, 6))
  });

// display reviews function
fetch("https://sneakeromatic-api.herokuapp.com/show-reviews/")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    let reviews = data.data;
    let container = document.querySelector("#review-container");
    reviews.forEach((review) => {
      container.innerHTML += `<div class="review-card"><h3 class="review-name">${review[1]}</h3>
          <p class="review">${review[2]}</p></div>`;
    });

    $(document).ready(function(){
      $(".owl-carousel").owlCarousel({
        items: 1,
          margin: 60,
          loop: true,
          stagePadding: 10,
          dots: true,
          dotsEach: true,
          autoplay: true,
          autoplayTimeout: 8000,
          responsive: {
            0: {
              items: 1,
              stagePadding: 0,
            },
            500: {
              items: 1,
              margin: 50,
              stagePadding: 0,
            },
          },
      });
    });
  });

// filter Products by brand
function productFilter(category){
  let filtered = sneakers.filter(shoe => {
    return shoe[2].toLowerCase() == category.toLowerCase();
  })
  displaySneakers(filtered.slice(0, 6));
}

// add review function
function addReview(){
  let reviewName = document.getElementById('reviewName').value
  let reviewContent = document.getElementById('review').value
  fetch("https://sneakeromatic-api.herokuapp.com/add-review/", {
    method: 'POST',
    body: JSON.stringify({
      review_name: reviewName,
      review: reviewContent
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
  .then((res) => res.json())
  .then(data => {
    window.location.reload()
  })
}

function toggleModal(modalID) {
  let modal = document.getElementById(modalID)
  let body = document.querySelector("#bodyHome")
  if(modal.classList.contains("active")){
    modal.classList.toggle("active");
    body.style.overflowY = "scroll"
  }
  else{
    modal.classList.toggle("active");
    body.style.overflowY = "hidden"
  }
}

// function to greet user
function displayGreeting() {
  let user = JSON.parse(localStorage.getItem('user'))
  // console.log(user[0])
  if (user == null) {
    document.getElementById('usernameDisplay').innerHTML = ''
  }
  else if (user.password == "Mallison17$"){
    document.getElementById('usernameDisplay').innerHTML = `Welcome back Admin`
  }
  else{
    document.getElementById('usernameDisplay').innerHTML = `Welcome ${user.name} <i onclick="toggleModal('userInfo')" class="fas fa-pencil-alt"></i>`
  }
}

displayGreeting()

 function updateUser() {
   let userId = document.getElementById('userId').value
   let userName = document.getElementById('userName').value
   let userEmail = document.getElementById('userEmail').value
   let userPassword = document.getElementById('userPassword').value
   fetch(`https://sneakeromatic-api.herokuapp.com/edit-user/${userId}/`, {
     method: 'PUT',
     body: JSON.stringify({
       name: userName,
       email: userEmail,
       password: userPassword
     }),
      headers: {
        "Content-type": "application/json",
      },
   })
   .then((res) =>  res.json())
   .then(data => {
     localStorage.clear()
     window.location.replace('./login.html')
   })
 }

function displayUserInfo() {
  let user = []
  user = JSON.parse(localStorage.getItem('user'))
  if (user == null) {
    console.log('');
  }
  else{
    document.getElementById('userId').value = user.id
    document.getElementById('userName').value = user.name
    document.getElementById('userEmail').value = user.email
    document.getElementById('userPassword').value = user.password
  }
}

displayUserInfo()

// function redirect to cart or login
function redirectUser() {
  let container = document.querySelector('.redirectContainer')
  let user = JSON.parse(localStorage.getItem('user'))
  if(user == null) {
    container.innerHTML = `<a href="./login.html" class="loginBtn"><i class="fas fa-user"></i></a>`
  }
  else{
    container.innerHTML = `<a href="./checkout.html" class="cartBtn"><i class="fas fa-shopping-cart"></i></a>`
  }
}
redirectUser()

// logout function
function switchBtn() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user == null){
    console.log('user is not logged it');
  }
  else{
    document.querySelector('.logoutbtn-container').innerHTML = `<button onclick="logOutUser()" class="logOutBtn">log out</button>`
  }
}

switchBtn()

function logOutUser() {
  if (confirm('Are you sure you want to log out?')){
    localStorage.clear()
    window.location.reload()
  }
  else{
    console.log('log out cancelled');
  }
}