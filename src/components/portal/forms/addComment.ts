export default async function addComment(postId: string, comment: string, userId: string, parentCommentId?: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId, comment, userId, parentCommentId }),
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