"use server"

import Post from "@/types/Post";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getPostsByUser(userId: string, page: number = 1) {
    try {
        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, data: [], message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/user/${userId}/${page}`);
        const data: Post[] = await response.json();
        return { success: true, data: data, message: "" };
    } catch (error) {
        console.error(error);
        return { success: false, data: [], message: "" };
    }
}