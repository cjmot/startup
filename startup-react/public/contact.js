function onStart() {
    let loggedIn = false;

    if (localStorage.getItem("userName")) {
        loggedIn = true;
        document.getElementById("constactUser").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)