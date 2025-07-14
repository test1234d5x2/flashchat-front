"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getChatList() {
    try {
        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, chatList: [], message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/myChats`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return { success: true, chatList: data, message: ""};
    } catch (error) {
        console.error(error);
        return { success: false, chatList: [], message: "" }
    }
}