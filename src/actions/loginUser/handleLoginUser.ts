"use server";

import loginUser from "./loginUser";

export default async function handleLoginUser(formData: FormData) {
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const response = await loginUser(username, password);

    if (!response.success) {
        throw new Error(response.message);
    }

    return true;
}