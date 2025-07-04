'use server';

const createUser = async (username: string, handle: string, password: string) => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, handle, password }),
        });

        if (!response.ok) {
            return { success: false, message: "Failed to create user" };
        }

        const success = await response.json();
        if (!success) {
            return { success: false, message: "Failed to create user" };
        }

        return { success: true, message: "User created successfully" };
        
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Network error occurred" };
    }
};

export default createUser;