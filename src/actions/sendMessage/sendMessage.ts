"use server";

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function sendMessage(chatId: string, message: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer: ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chatId, content: message })
        })

        const data = await response.json();
        if (data) {
            return {success: true, message: "Message sent successfully"};
        }
        else {
            return {success: false, message: "Error sending message"};
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error sending message" };
    }
}