import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function addComment(postId: string, comment: string, parentCommentId?: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ postId, comment, parentCommentId }),
        });

        if (!response.ok) {
            return { success: false, message: "Error: Failed to add comment" };
        }

        const success = await response.json();

        if (success) {
            return { success: true, message: "Comment added successfully" };
        }

        return { success: false, message: "Error: Failed to add comment" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error: Failed to add comment" };
    }
}