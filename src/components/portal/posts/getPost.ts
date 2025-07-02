import Post from "@/types/Post";

export default async function getPost(postId: string) {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/post/${postId}`);
        const data: Post = await res.json();
        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: null};
    }
}