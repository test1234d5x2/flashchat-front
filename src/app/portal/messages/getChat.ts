import Message from "@/types/Message";

export default async function getChat(user1Id: string, user2Id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/getChat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user1Id, user2Id })
        })

        const chatData = await response.json();
        const messages: Message[] = chatData.messages;
        return {success: true, messages: messages, chatId: chatData.id as string};
    } catch (error) {
        console.error(error);
        return {success: false, messages: [], chatId: ""};
    }
}