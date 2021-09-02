// https://sneakeromatic-api.herokuapp.com/
function displaySneakers(array) {
  let container = document.querySelector("#sneakers-container");
  container.innerHTML = ''
  array.forEach((shoe) => {
    container.innerHTML += `<div class="shoe-card" category=${shoe[2]}>
    <img class="shoe-image" src="${shoe[6]}" alt="The Sneaker">
    <div>
      <h2 class="shoe-head">${shoe[1]}</h2>
      <h3 class="shoe-brand">${shoe[2]}</h3>
      <p class="gender">${shoe[3]}</p>
      <p class="shoe-description">${shoe[4]}</p>
      <h4 class="price">R${shoe[5]}</h4>
      </div>
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
      container.innerHTML += `<h3 class="review-name">${review[1]}</h3>
          <p class="review">${review[2]}</p>`;
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
    document.getElementById('usernameDisplay').innerHTML = `Welcome ${user.name}`
  }
}

displayGreeting()

// function redirect to cart or login
function redirectUser() {
  let container = document.querySelector('.redirectContainer')
  let user = JSON.parse(localStorage.getItem('user'))
  if(user == null) {
    container.innerHTML = `<a href="./login.html" class="loginBtn">Login</a>`
  }
  else{
    container.innerHTML = `<a href="./checkout.html" class="cartBtn">Cart</a>`
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
    localStorage.removeItem('user')
    window.location.reload()
  }
  else{
    console.log('log out cancelled');
  }
}