// https://sneakeromatic-api.herokuapp.com/

// display products function
function displaySneakers(array) {
    let container = document.querySelector("#sneaker-container");
    container.innerHTML = ''
    array.forEach((shoe) => {
      container.innerHTML += `<div class="shoe-card" sex=${shoe[3]} category=${shoe[2]}>
      <img class="shoe-image" src="${shoe[6]}" alt="The Sneaker">
      <button onclick="event.preventDefault(), deleteSneaker(${shoe[0]})" class="deletebtn">delete</button>
      <div>
        <h2 class="shoe-head">${shoe[1]}</h2>
        <h3 class="shoe-brand">${shoe[2]}</h3>
        <p class="gender">${shoe[3]}</p>
        <p class="shoe-description">${shoe[4]}</p>
        <h4 class="price">R${shoe[5]}</h4>
        </div>
        </div>`;
    });
  }

// display the Products 
let sneakers = [];
  fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      sneakers = data.data;
      displaySneakers(sneakers)
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

// delete Product function
function deleteSneaker(sneaker_id) {
  fetch('https://sneakeromatic-api.herokuapp.com/show-sneakers/')
  .then((res) => res.json())
  .then(data => {
    let sneakers = data.data
    let deleteSneaker = sneakers.find((shoe) => {
      return shoe[0] == sneaker_id
    })
    fetch(`https://sneakeromatic-api.herokuapp.com/delete-sneaker/${sneaker_id}/`)
    .then((res) => res.json())
    .then(data => {
      window.location.reload()
    })
  })
}

