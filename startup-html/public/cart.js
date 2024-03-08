function onStart() {
    let loggedIn = false;

    if (localStorage.getItem("userName")) {
        loggedIn = true;
        document.getElementById("cartUser").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)