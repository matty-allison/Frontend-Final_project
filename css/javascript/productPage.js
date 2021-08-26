// https://sneakeromatic-api.herokuapp.com/
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
        </div>`;
    });
  }
  
let sneakers = [];
  fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      sneakers = data.data;
      displaySneakers(sneakers)
    });

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

function genderFilter(sex) {
    let filtered = sneakers.filter(shoe => {
        return shoe[3].toLowerCase() == sex.toLowerCase();
      })
      displaySneakers(filtered);
}