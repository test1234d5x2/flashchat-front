import Post from "@/types/Post";
import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getPost(postId: string) {

    try {
        const accessToken = await getAccessToken()
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/post/${postId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data: Post = await res.json();
        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: null};
    }
}