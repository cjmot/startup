function onStart() {
    let loggedIn = false;

    if (localStorage.getItem("userName")) {
        loggedIn = true;
        document.getElementById("checkoutUser").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)