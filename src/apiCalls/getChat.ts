"use server"

import Chat from "@/types/Chat";
import Message from "@/types/Message";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getChat(otherParticipantId: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment.", chat: null };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/getChat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ otherParticipantId })
        })

        const chatData: Chat = await response.json();
        const messages: Message[] = chatData.messages;
        return {success: true, chat: chatData, message: ""};
    } catch (error) {
        console.error(error);
        return {success: false, chat: null, message: ""};
    }
}