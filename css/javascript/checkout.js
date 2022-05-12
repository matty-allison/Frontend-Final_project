// display sneakers in cart


// cart.reduce((total, c) => total + (parseInt(c[5]) * c[7]), 0)
let sneakers = []
function displayCart(array) {
    let container = document.querySelector('.cart-container')
    document.querySelector('.totalPrice').innerHTML = 'Total Price: R' + array.reduce((total, c) => total + (parseInt(c[5]) * c[7]), 0)
    container.innerHTML = ''
    array.forEach((shoe) => {
        container.innerHTML += `
        <div class="shoe-card-cart">
            <img class="shoe-image-cart" src="${shoe[6]}" alt="The Sneaker">
            <div class="info">
                <h2 class="shoe-head-cart">${shoe[1]}</h2>
                <h3 class="shoe-brand-cart">${shoe[2]}</h3>
                <p class="gender-cart">${shoe[3]}</p>
                <p class="shoe-description-cart">${shoe[4]}</p>
                <h4 class="price-cart">R${shoe[5]}</h4>
                <input type="number" min=1 class="quntity" id="qunatity-${ shoe[0] }" value="${shoe[7]}" onchange="updateValue(${shoe[0]})">
            </div>
            <button onclick='removeSneaker(${shoe[0]})'>&times;</button>
        </div>`
    })
}
sneakers = JSON.parse(localStorage.getItem('cart'))
let price = JSON.parse(localStorage.getItem('price'))


if (sneakers == null) {
    document.querySelector('.emptyCart').innerHTML = '<p class="emptyCartMessage">Your cart is empty.</p>'
}
else{
    displayCart(sneakers)
    document.querySelector('.totalPrice').innerHTML = "Total price: R"+price
}

// remove sneaker from cart
function removeSneaker(id) {
    if (confirm("Are you sure you would like to remove this product")) {
        let cart = []
        let restOfSneaker = sneakers.filter(sneaker => sneaker[0] != id)
        localStorage.setItem('cart', JSON.stringify(restOfSneaker))
        cart = JSON.parse(localStorage.getItem('cart'))
        let newPrice = cart.reduce((total, c) => total + parseInt(c[5]), 0)
        localStorage.setItem('price', newPrice)
        document.querySelector('.totalPrice').innerHTML = 'R'+newPrice
        window.location.reload()
    }
    else {
        console.log("product Removal from cart cancelled")
    }
}

function updateValue(id) {
    let newQunatity = document.getElementById(`qunatity-${ id }`).value
    let foundSneaker = sneakers.find((shoe) => {
        return shoe[0] == id
    })
    foundSneaker[7] = newQunatity

    sneakers.forEach(shoe => {
        if(shoe[0] == foundSneaker[0]){
          shoe = [...shoe, ...foundSneaker]
        }
        return shoe
    })

    localStorage.setItem('cart', JSON.stringify(sneakers))
    displayCart(sneakers)
}
// user pick up or delivery function

function collection() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = '<p class="rejectMessage">Please select a item to purchase</p>'
    }
    else if (cart == []) {
        container.innerHTML = '<p class="rejectMessage">Please select a item to purchase</p>'
    }
    else{
        container.innerHTML = `<form>
        <label for="location1"><input type="radio" name="location" id="location1" value="Cavendish location">Cavendish location</label><br>
        <label for="location2"><input type="radio" name="location" id="location2" value="Century City location">Century City location</label><br>
        <label for="location3"><input type="radio" name="location" id="location3" value="Blue Route location">Blue Route location</label><br>
        <label for="location4"><input type="radio" name="location" id="location4" value="Bayside Mall location">Bayside Mall location</label><br>
    </form>`
    }
}

function delivery() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = '<p class="rejectMessage">Please select a item to purchase</p>'
    }
    else if (cart == []) {
        container.innerHTML = '<p class="rejectMessage">Please select a item to purchase</p>'
    }
    else{
        container.innerHTML = `<form><label for="delvery1"><input type="radio" name="delivery" id="delivery1" value="Courier Guy">Courier Guy</label><br>
                                    <label for="delvery2"><input type="radio" name="delivery" id="delivery2" value="Ups">UPS</label><br>
                                    <label for="delvery3"><input type="radio" name="delivery" id="delivery3" value="Postnet to Postnet">Postnet to Postnet</label><br>
                                </form>`
    }
}

// checkout Btn

function checkoutProduct() {
    let container = document.querySelector('.collection-or-delivery')
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        container.innerHTML = "<p class='rejectMessage'>You can't checkout with nothing in the cart.</p>"
    }
    else if (cart == []) {
        container.innerHTML = "<p class='rejectMessage'>You can't checkout with nothing in the cart.</p>"
    }
    else{
        if(confirm('Are you sure you would like to checkout?')) {
            localStorage.removeItem('cart')
            localStorage.removeItem('price')
            container.innerHTML = "Thank you for your purchase"
            window.location.replace('./index.html')
        }
        else {
            console.log('user is still buying sneakers');
        }
    }
}

// Loader
window.addEventListener("load", function () {
    const loader = this.document.querySelector(".loader");
    loader.className += " hidden";
  });