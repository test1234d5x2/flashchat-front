import sendMessage from "./sendMessage";

export default async function handleSendMessage(formData: FormData, chatId: string, loggedInUserId: string) {
    const message = formData.get("message")?.toString() || "";
    if (message.length === 0) {
        throw new Error("Error: Message cannot be empty");
    }
    
    const response = await sendMessage(chatId, message, loggedInUserId);
    if (!response.success) {
        throw new Error(response.message);
    }

    return response.message;
}