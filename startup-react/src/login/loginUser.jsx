export async function loginUser(userName, password) {
    const endpoint = "/api/auth/login";
    try {
        const reqBody = JSON.stringify({email: userName, password: password});
        const response = await fetch(endpoint, {
            method: 'post',
            body: reqBody,
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        console.log(response);

        if (response.ok) {
            localStorage.setItem('userName', userName);
            console.log(userName);
        } else {
            const body = await response.json();
            alert(body.msg);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert('An error occurred while logging in. Please try again later.');
    }

}

