import Post from "@/types/Post";

export default async function getPosts(userId: string, page: number = 1) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/feed/${userId}/${page}`);
        const data: Post[] = await res.json();

        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: []};
    }
}