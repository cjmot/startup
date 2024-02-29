function onStart() {

    if (localStorage.getItem("userName")) {
        document.getElementById("shopUser").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)