"use server";

export default async function sendMessage(chatId: string, message: string, senderId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chatId, content: message, userId: senderId })
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