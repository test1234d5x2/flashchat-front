"use server"

import User from "@/types/User";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getUser(userId: string) {
    try {
        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, data: null, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/details/${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data: User = await response.json();
        return {success: true, data: data, message: ""};
    } catch (error) {
        console.error(error);
        return {success: false, data: null, message: ""};
    }
}