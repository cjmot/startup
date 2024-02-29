
function onStart() {
    let loggedIn = false;

    if (localStorage.getItem("userName")) {
        document.getElementById("user").innerHTML = localStorage.getItem("userName");
    }
}

window.addEventListener("load", onStart)


function deleteAccount() {
    localStorage.clear();
}

function editAccountInfo(){

}
