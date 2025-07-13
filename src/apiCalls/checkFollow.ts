"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function checkFollow(followerId: string, followedId: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, isFollowing: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/follows/check-follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followerId: followerId, followedId: followedId })
        });

        const isFollowing = await response.json();
        if (!response.ok) {
            return { success: false, isFollowing: false, message: "" };
        }

        return { success: true, isFollowing: isFollowing, message: "" };
    }
    catch (error) {
        console.error(error);
        return { success: false, isFollowing: false, message: "" };
    }
}