"use server";

import createPost from "./createPost";

export default async function handleCreatePost(formData: FormData, userId: string) {
    const post = formData.get("post")?.toString();
    if (!post) {
        throw new Error("Error: Post cannot be empty");
    }

    const response = await createPost(userId, post);
    if (!response.success) {
        throw new Error(response.message);
    }

    return "Post created successfully";
}