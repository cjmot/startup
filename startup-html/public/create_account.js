async function create_account() {
    localStorage.clear();
    const userName = document.getElementById("createName").value;
    const password = document.getElementById("createPassword").value;
    const confPassword = document.getElementById("passwordConfirmation").value;
    if (confPassword !== password) {
        alert("Passwords must match");
    }
    else {
        const response = await fetch('api/auth/create', {
            method: 'post',
            body: JSON.stringify({email: userName, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            alert("Account created");
            localStorage.setItem("userName", userName);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        } else {
            const body = await response.json();
            alert(body.msg)
        }
    }
}
