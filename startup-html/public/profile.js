function onStart() {
    if (localStorage.getItem("userName") === null){
        alert("You aren't logged in!");
        window.location.href = "index.html";
    }
    else {
        const profileUser = document.querySelector("#profileUser");
        profileUser.innerHTML = localStorage.getItem("userName")
        const userNameElement = document.querySelector("#infoUserName");
        userNameElement.value = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)


function logout() {
    localStorage.removeItem('userName');
    fetch('api/auth/logout', {
        method: 'delete',
    }).then(() => (window.location.href = '/'))
}
