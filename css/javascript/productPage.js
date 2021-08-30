// https://sneakeromatic-api.herokuapp.com/

// display products function for the admin 
function displayAdminSneakers(array) {
    let container = document.querySelector("#sneaker-container");
    container.innerHTML = ''
    array.forEach((shoe) => {
      container.innerHTML += `<div class="shoe-card" sex=${shoe[3]} category=${shoe[2]}>
      <img class="shoe-image" src="${shoe[6]}" alt="The Sneaker">
      <div>
        <h2 class="shoe-head">${shoe[1]}</h2>
        <h3 class="shoe-brand">${shoe[2]}</h3>
        <p class="gender">${shoe[3]}</p>
        <p class="shoe-description">${shoe[4]}</p>
        <h4 class="price">R${shoe[5]}</h4>
        </div>
        <button onclick="event.preventDefault(), deleteSneaker(${shoe[0]})" class="deletebtn">delete</button>
        <button onclick="event.preventDefault(), updateSneaker(${shoe[0]})" class="updateBtn">Update</button>
        </div>`;
    });
  }

// display products function for users
function displaySneakers(array) {
  let container = document.querySelector("#sneaker-container");
  container.innerHTML = ''
  array.forEach((shoe) => {
    container.innerHTML += `<div class="shoe-card" sex=${shoe[3]} category=${shoe[2]}>
    <img class="shoe-image" src="${shoe[6]}" alt="The Sneaker">
    <div>
      <h2 class="shoe-head">${shoe[1]}</h2>
      <h3 class="shoe-brand">${shoe[2]}</h3>
      <p class="gender">${shoe[3]}</p>
      <p class="shoe-description">${shoe[4]}</p>
      <h4 class="price">R${shoe[5]}</h4>
      </div>
      <button onclick="addToCart(${shoe[0]})" class="purchaseBtn">Purchase</button>
      </div>`;
  });
}

// display the Products
let sneakers = [];
  fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
    .then((res) => res.json())
    .then((data) => {
      let user = JSON.parse(localStorage.getItem('user'))
      // console.log(user)
      sneakers = data.data;
      if (user == null) {
        displaySneakers(sneakers)
      }
      else if (user.name == 'Matthew Allison') {
        displayAdminSneakers(sneakers)
      }
      else{
        displaySneakers(sneakers)
      }

    });


// function to filter the products
function productFilter(category){
    // Get all cards and hide
    let sneakerCards = document.querySelectorAll(".shoe-card");
    for(let i = 0; i < sneakerCards.length; i++){
        sneakerCards[i].style.display = "none"
    }

    // Get all cards with selected category and show
    let selectedSneakers = document.querySelectorAll(`[category=${category}]`)
    for(let i = 0; i < selectedSneakers.length; i++){
        selectedSneakers[i].style.display = "block"
    }
}


// Search function
let filterSneakers = []
fetch('https://sneakeromatic-api.herokuapp.com/show-sneakers')
.then((res) => res.json())
.then(data => {
    let sneakers = data.data
    let searchBar = document.getElementById("search")
    searchBar.addEventListener("keyup", (s) => {
        const searchText = s.target.value.toLowerCase()
        filterSneakers = sneakers.filter((shoe) => {
            return (
                shoe[1].toLowerCase().includes(searchText) || shoe[2].toLowerCase().includes(searchText) || shoe[5].includes(searchText)
             )
        })
        displaySneakers(filterSneakers)        
    })
})

// filter the products by Gender
function genderFilter(sex) {
    let filtered = sneakers.filter(shoe => {
        return shoe[3].toLowerCase() == sex.toLowerCase();
      })
      displaySneakers(filtered);
}


// Add products function
// image converter function
function imageConverter() {
  const image = document.querySelector(".imgholder");
  const file = document.querySelector("#sneaker-image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

// add products function
function addSneaker() {
  let sneakerName = document.getElementById('sneaker-name').value
  let sneakerBrand = document.getElementById('sneaker-brand').value
  let sneakerGender = document.getElementById('gender').value
  let sneakerDescription = document.getElementById('sneaker-description').value
  let sneakerPrice = document.getElementById('sneaker-price').value
  let sneakerImage = document.querySelector('.imgholder').src
  console.log(sneakerName);
  if (confirm('Are you sure you wish to add this product?')) {
    fetch('https://sneakeromatic-api.herokuapp.com/add-sneaker/', {
      method: "POST",
      body: JSON.stringify({
        sneaker_name: sneakerName,
        sneaker_brand: sneakerBrand,
        gender: sneakerGender,
        sneaker_description: sneakerDescription,
        sneaker_price: sneakerPrice,
        sneaker_image: sneakerImage
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
  else{
    console.log('Add cancelled')
  }
}

// delete Product function
function deleteSneaker(sneaker_id) {
  fetch('https://sneakeromatic-api.herokuapp.com/show-sneakers/')
  .then((res) => res.json())
  .then(data => {
    let sneakers = data.data
    let deleteSneaker = sneakers.find((shoe) => {
      return shoe[0] == sneaker_id
    })
    if (confirm('Are you sure you want to delete this?')) {
      fetch(`https://sneakeromatic-api.herokuapp.com/delete-sneaker/${sneaker_id}/`)
      .then((res) => res.json())
      .then(data => {
        window.location.reload()
      })
    }
    else(
      console.log('delete cancelled')
    )
  })
}

// update Product function
function updateSneaker(sneaker_id) {
  fetch('https://sneakeromatic-api.herokuapp.com/show-sneakers/')
  .then((res) => res.json())
  .then(data => {
    let sneakers = data.data
    let updateSneaker = sneakers.find((shoe) => {
      return shoe[0] == sneaker_id
    })
    let sneakerName = document.querySelector('#sneakerName').value
    let sneakerBrand = document.querySelector('#sneakerBrand').value
    let gender = document.querySelector('#Gender').value
    let sneakerDescription = document.querySelector('#sneakerDescription').value
    let sneakerPrice = document.querySelector('#sneakerPrice').value
    let sneakerImage = document.querySelector('#sneakerImage').value
    if (confirm("Are you sure you wish to update this product?")) {
      fetch(`https://sneakeromatic-api.herokuapp.com/edit-sneaker/${sneaker_id}/`, {
        method: 'PUT',
        body: JSON.stringify({
          sneaker_name: sneakerName,
          sneaker_brand: sneakerBrand,
          gender: gender,
          sneaker_description: sneakerDescription,
          sneaker_price: sneakerPrice,
          sneaker_image: sneakerImage
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
    else{
      console.log('update cancelled')
    }
  })
}

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

// cart function 
let cart = []
function addToCart(sneaker_id) {
  fetch('https://sneakeromatic-api.herokuapp.com/show-sneakers')
  .then((res) => res.json())
  .then(data => {
    let sneakers = data.data
    let addSneakerToCart = sneakers.find((shoe) => {
      return shoe[0] == sneaker_id
    })
    cart.push(addSneakerToCart)
    localStorage.setItem('cart', JSON.stringify(cart))
    let cartSize = JSON.parse(localStorage.getItem('cart')).length
    document.querySelector('.itemNumber').innerHTML = cartSize
  })
}