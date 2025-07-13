"use server"

import Message from "@/types/Message";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getChat(user1Id: string, user2Id: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment.", messages: [], chatId: "" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/getChat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ user1Id, user2Id })
        })

        const chatData = await response.json();
        const messages: Message[] = chatData.messages;
        return {success: true, messages: messages, chatId: chatData.id as string, message: ""};
    } catch (error) {
        console.error(error);
        return {success: false, messages: [], chatId: "", message: ""};
    }
}