export async function loginUser(userName, password) {
    const endpoint = "/api/auth/login";
    try {
        const reqBody = JSON.stringify({email: userName, password: password});
        const response = await fetch(endpoint, {
            method: 'post',
            body: reqBody,
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        });

        if (response.ok) {
            localStorage.setItem('userName', userName);
            return true;
        } else {
            const body = await response.json();
            console.error(body.msg);
            return false;
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert('An error occurred while logging in. Please try again later.');
    }

}

