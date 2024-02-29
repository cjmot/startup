let userName;
let email;
let password;

function loadElements() {
    if (userName !== null) {
        document.querySelector("#infoUserName").value = userName;
        document.querySelector("#infoEmail").value = email;
        document.querySelector("#infoPassword").value = password;
    }
}

function onStart() {
    if (localStorage.getItem("userName") === null){
        alert("You aren't logged in!");
        window.location.href = "index.html";
    }
    else {
        userName = localStorage.getItem("userName");
        email = localStorage.getItem("email");
        password = localStorage.getItem("password");

        document.querySelector("#user").innerText = userName
        loadElements()

    }
}

window.addEventListener("load", onStart)


function deleteAccount() {
    alert("You are about to delete your account");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "index.html";

}
function changeToEdit(selector) {
    document.querySelector(selector).className = "w-full py-1 px-2 bg-white border-2 border-gray-400 text-gray-300"
}

function changedInfo(selector, info) {
    return (document.querySelector(selector).value !== info);
}

function setLocalStorage(key, value){
    localStorage.removeItem(key);
    localStorage.setItem(key, value)
}

function submitChanges() {
    if (changedInfo("#infoUserName", userName) || changedInfo("#infoEmail", email) || changedInfo("#infoPassword", password)){
        const newName = document.querySelector("#infoUserName").value;
        const newEmail = document.querySelector("#infoEmail").value;
        const newPassword = document.querySelector("#infoPassword").value;

        setLocalStorage("userName", newName);
        setLocalStorage("email", newEmail);
        setLocalStorage("password", newPassword)

        alert("Changes Successful")
        window.location.reload()
    } else {
        window.location.reload();
    }
}
function editAccount(){
    document.querySelector("#infoUserName").removeAttribute("disabled");
    document.querySelector("#infoEmail").removeAttribute("disabled");
    document.querySelector("#infoPassword").removeAttribute("disabled");
    changeToEdit("#infoUserName");
    changeToEdit("#infoEmail");
    changeToEdit("#infoPassword");
    document.querySelector("#editButton").innerText = "SUBMIT";
    document.querySelector("#deleteButton").hidden = true;
    document.querySelector("#editButton").removeAttribute("onclick");
    document.querySelector("#editButton").addEventListener("click", submitChanges);
}
