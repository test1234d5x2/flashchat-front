"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function unfollow(followerId: string, followedId: string) {
    try {
        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/follows`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ followerId: followerId, followedId: followedId })
        });

        const success = await response.json();
        if (!response.ok || !success) {
            return { success: false, message: "Failed to unfollow user" };
        }

        return { success: true, message: "Unfollow created" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to unfollow user" };
    }
}