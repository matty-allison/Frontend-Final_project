// https://sneakeromatic-api.herokuapp.com/

fetch("https://sneakeromatic-api.herokuapp.com/show-sneakers")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let sneakers = data.data;
    let container = document.querySelector("#sneakers-container");
    sneakers.forEach((shoe) => {
      container.innerHTML += `<img class="shoe-image" src="${shoe[5]}" alt="The Sneaker">
        <h2 class="shoe-head">${shoe[1]}</h2>
        <h3 class="shoe-brand">${shoe[2]}</h3>
        <p class="shoe-description">${shoe[3]}</p>
        <h4 class="price">R${shoe[4]}</h4>`;
    });
  });

fetch("https://sneakeromatic-api.herokuapp.com/show-reviews/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let reviews = data.data;
    let container = document.querySelector("#review-container");
    reviews.forEach((review) => {
      container.innerHTML += `<h3 class="review-name">${review[1]}</h3>
          <p class="review">${review[2]}</p>`;
    });
  });

function filtering() {
    
}