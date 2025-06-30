import Message from "@/types/Message";

export default async function getChat(user1Id: string, user2Id: string) {
    try {
        const response = await fetch("http://localhost:8080/api/v1/chats/getChat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user1Id, user2Id })
        })

        console.log(response);
        const chatData = await response.json();
        console.log(chatData);
        const messages: Message[] = chatData.messages;
        return {success: true, messages: messages};
    } catch (error) {
        console.error(error);
        return {success: false, messages: []};
    }
}