'use server';

export default async function loginUser(username: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const loggedIn = await response.json();

    if (!loggedIn) {
        return { success: false, message: "Invalid username or password" };
    }

    return { success: true, message: "Login successful"};
}