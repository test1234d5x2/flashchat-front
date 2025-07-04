"use server";

import createUser from "./createUser";

export default async function handleCreateUser(formData: FormData) {
    const username = formData.get("username")?.toString() || "";
    const handle = formData.get("handle")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!username || !handle || !password) {
        throw new Error("Username, handle and password are required");
    }

    const response = await createUser(username, handle, password);

    if (!response.success) {
        throw new Error(response.message);
    }

    return { success: true, message: "User created successfully" };
}