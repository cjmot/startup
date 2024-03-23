function login() {
    loginUser()
}

async function loginUser() {
    const endpoint = '/api/auth/create';
    const userName = document.getElementById("name")?.value;
    const password = document.getElementById("password")?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {'Content-type': 'application/json; charset=UTF-8',},
    });

    if (response.ok) {
        localStorage.setItem('username', userName);
        window.location.href = "shop.html";
    } else {
        const body = await response.json();
        alert(body.msg);
    }
}

