function create_account() {
    localStorage.clear();
    const createName = document.getElementById("createName").value;
    const createEmail = document.getElementById("createEmail").value;
    const createPassword = document.getElementById("createPassword").value;
    const confPassword = document.getElementById("passwordConfirmation").value;

    if (confPassword !== createPassword) {
        alert("Passwords must match");
    }
    else {
        alert("Account created")
        localStorage.setItem("userName", createName);
        localStorage.setItem("email", createEmail);
        localStorage.setItem("password", createPassword);
    }
}