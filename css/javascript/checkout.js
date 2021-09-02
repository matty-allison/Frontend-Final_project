// display sneakers in cart
let sneakers = []
function displayCart(array) {
    let container = document.querySelector('.cart-container')
    container.innerHTML = ''
    array.forEach((shoe) => {
        container.innerHTML += `<div class="shoe-card-cart">
        <img class="shoe-image-cart" src="${shoe[6]}" alt="The Sneaker">
        <div>
          <h2 class="shoe-head-cart">${shoe[1]}</h2>
          <h3 class="shoe-brand-cart">${shoe[2]}</h3>
          <p class="gender-cart">${shoe[3]}</p>
          <p class="shoe-description-cart">${shoe[4]}</p>
          <h4 class="price-cart">R${shoe[5]}</h4>
          </div>
          <button onclick='removeSneaker(${shoe[0]})'>remove</button>
          </div>`
    })
}
sneakers = JSON.parse(localStorage.getItem('cart'))
let price = JSON.parse(localStorage.getItem('price'))

if (sneakers == null) {
    document.querySelector('.emptyCart').innerHTML = 'Your cart is empty.'
}
else{
    displayCart(sneakers)
    document.querySelector('.totalPrice').innerHTML = "R"+price
}

// remove sneaker from cart
function removeSneaker(id) {
    let cart = []
    let restOfSneaker = sneakers.filter(sneaker => sneaker[0] != id)
    localStorage.setItem('cart', JSON.stringify(restOfSneaker))
    cart = JSON.parse(localStorage.getItem('cart'))
    let newPrice = cart.reduce((total, c) => total + parseInt(c[5]), 0)
    localStorage.setItem('price', newPrice)
    document.querySelector('.totalPrice').innerHTML = 'R'+newPrice
    window.location.reload()
}

// user pick up or delivery function

function collection() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = 'Please select a item to purchase'
    }
    else if (cart == []) {
        container.innerHTML = 'Please select a item to purchase'
    }
    else{
        container.innerHTML = `<div>
        <button></button> <p>Cavendish location</p>
        <button></button> <p>Century City location</p>
        <button></button> <p>Blue Route location</p>
        <button></button> <p>Bayside Mall location</p>
    </div>`
    }
}

function delivery() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = 'Please select a item to purchase'
    }
    else if (cart == []) {
        container.innerHTML = 'Please select a item to purchase'
    }
    else{
        container.innerHTML = `<button></button> <p>Courier Guy</p>
        <button></button> <p>Ups</p>
        <button></button> <p>Postnet to Postnet</p>`
    }
}

// checkout Btn

function checkoutProduct() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = "You can't checkout with nothing in the cart."
    }
    else if (cart == []) {
        container.innerHTML = "You can't checkout with nothing in the cart."
    }
    else{
        localStorage.removeItem('cart')
        container.innerHTML = "Thank you for your purchase"
        window.location.replace('./index.html')
    }
}