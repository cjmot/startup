export default async function createUser(userName, password) {
    try {
        const response = await fetch("/api/auth/create", {
            method: 'POST',
            body: JSON.stringify({email: userName, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const responseBody = await response.json();
        return !!(response.ok && responseBody);
    } catch (error) {
        console.error("Error creating account:", error);
        throw new Error(`Error creating account`);
    }
}