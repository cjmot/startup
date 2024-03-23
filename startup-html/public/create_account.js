async function createUser(){
    create_account();
}


async function create_account() {
    const userNameInput = document.querySelector("#createName");
    const passwordInput = document.querySelector("#createPassword");
    const confPasswordInput = document.querySelector("#passwordConfirmation");
    const userName = userNameInput?.value.trim();
    const password = passwordInput?.value;
    const confPassword = confPasswordInput?.value;

    // input validation
    if (!userName || !password || !confPassword) {
        alert("Please fill in all fields");
        return;
    }
    if (confPassword !== password) {
        alert("Passwords must match");
        return;
    }
    const body = JSON.stringify({email: userName, password: password});
    console.log(body);
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        body: body,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        alert("Account created successfully.");
        localStorage.setItem("userName", userName);
        window.location.href = "/index.html";
    } else {
        const responseBody = await response.json();
        alert(responseBody.msg || "An error occurred while creating the account.");
    }
}
