// https://sneakeromatic-api.herokuapp.com/
function registerUser() {
    let registerName = document.getElementById('name').value
    let registerEmail =  document.getElementById('email').value
    let registerPassword = document.getElementById('password').value
    // console.log(registerName, registerEmail, registerPassword)
    fetch('https://sneakeromatic-api.herokuapp.com/sign-up/', {
        method: 'POST',
        body: JSON.stringify({
            name: registerName,
            email: registerEmail,
            password: registerPassword 
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then(data => {
        window.location.replace("./login.html")
    })
}

// Loader
window.addEventListener("load", function () {
    const loader = this.document.querySelector(".loader");
    loader.className += " hidden";
  });