// https://sneakeromatic-api.herokuapp.com/
function loginUser() {
    let nameUser = document.getElementById('login-name').value
    let userPassword = document.getElementById('login-password').value
    fetch('https://sneakeromatic-api.herokuapp.com/login/', {
        method: 'PATCH',
        body: JSON.stringify({
            name: nameUser,
            password: userPassword
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data.data)
    })
}