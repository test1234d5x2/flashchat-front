export default async function getChatList(userId: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/chats/userId/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}