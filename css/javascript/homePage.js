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
      </div>`;
  });
}

let sneakers = []
fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    sneakers = data.data;
    displaySneakers(sneakers.slice(0, 6))
  });

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

function productFilter(category){
  let filtered = sneakers.filter(shoe => {
    return shoe[2].toLowerCase() == category.toLowerCase();
  })
  displaySneakers(filtered.slice(0, 6));
}

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
  })
}