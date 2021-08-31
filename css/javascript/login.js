// https://sneakeromatic-api.herokuapp.com/
function loginUser() {
    let nameUser = document.getElementById('login-name').value
    let userPassword = document.getElementById('login-password').value
    // console.log(nameUser, userPassword);
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
    .then(res => {
        console.log(res.data);
        if (res.data == null) {
            alert("Incorrect name or password, please make sure you entered the right info")
        }
        else{
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location = './index.html'
        }
    })
}