'use server';

const createUser = async (username: string, password: string) => {
    try {

        const response = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: "Failed to create user" };
        }

        return { success: true, message: "User created successfully" };
        
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export default createUser;