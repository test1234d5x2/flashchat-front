"use server";

import createPost from "./createPost";

export default async function handleCreatePost(formData: FormData, userId: string) {
    const post = formData.get("post")?.toString();
    const images = formData.getAll("images") as File[];

    if (!post) {
        throw new Error("Error: Post cannot be empty");
    }

    // Filter out empty files
    const validImages = images.filter(image => image && image.size > 0);

    const response = await createPost(userId, post, validImages.length > 0 ? validImages : undefined);
    if (!response.success) {
        throw new Error(response.message);
    }

    return "Post created successfully";
}