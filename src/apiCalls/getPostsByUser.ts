import Post from "@/types/Post";

export default async function getPostsByUser(
    userId: string,
    page: number = 1
): Promise<{ success: boolean; data: Post[] }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/user/${userId}/${page}`);
        const data: Post[] = await response.json();
        return { success: true, data: data };
    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
}