export default async function getChatList(userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/userId/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}