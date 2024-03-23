async function login() {
    loginUser();
}

async function loginUser() {
    const endpoint = '/api/auth/login';
    const userName = document.getElementById("name")?.value;
    const password = document.getElementById("password")?.value;
    const reqBody = JSON.stringify({ email: userName, password: password });
    console.log(reqBody);
    const response = await fetch(endpoint, {
        method: 'post',
        body: reqBody,
        headers: {'Content-type': 'application/json; charset=UTF-8',},
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        console.log(userName);
        window.location.href = "/shop.html";
    } else {
        const body = await response.json();
        alert(body.msg);
    }
}

