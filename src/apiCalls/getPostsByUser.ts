import Post from "@/types/Post";

export default async function getPostsByUser(userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/user/${userId}`);
        const data: Post[] = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error(error);
        return { success: false, data: null };
    }
}