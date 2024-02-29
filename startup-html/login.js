function login() {
    const userName = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    if (userName !== localStorage.getItem("userName")){
        alert("Username not recognized");
    }
    else if (password !== localStorage.getItem("password")){
        alert("Password not recognized");
    }
    else {
        window.location.href = "shop.html";
    }
}
