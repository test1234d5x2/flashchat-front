"use server";

import addComment from "./addComment";

export default async function handleAddComment(formData: FormData, postId: string, parentCommentId?: string) {
    const comment = formData.get("comment")?.toString();
    if (!comment) {
        throw new Error("Error: Comment cannot be empty");
    }

    const response = await addComment(postId, comment, parentCommentId);
    if (!response.success) {
        throw new Error(response.message);
    }

    return response.message;
}