"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function addLike(postId: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, data: false, message: "Error: You must be logged in to add a comment." };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ postId }),
        });
        const data: boolean = await res.json();
        return { success: true, data: data, message: '' };
    } catch (error) {
        console.error(error);
        return { success: false, data: false, message: "Error: Failed to like the post." };
    }
}