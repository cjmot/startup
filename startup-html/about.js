function onStart() {
    let loggedIn = false;

    if (localStorage.getItem("userName")) {
        loggedIn = true;
        document.getElementById("aboutUser").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)