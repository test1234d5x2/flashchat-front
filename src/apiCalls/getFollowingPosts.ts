"use server"

import Post from "@/types/Post";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getFollowingPosts(page: number = 1) {
    try {
        const accessToken = await getAccessToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/following/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` 
            }
        });
        const data: Post[] = await res.json();
        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: []};
    }
}