"use server"

import Post from "@/types/Post";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getFeed(page: number = 1) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, data: [], message: "Error: You must be logged in to add a comment." };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/feed/${page}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data: Post[] = await res.json();

        return { success: true, data: data, message: "" };
    } catch (error) {
        console.error(error);
        return { success: false, data: [], message: "" };
    }
}