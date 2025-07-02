export default async function createPost(userId: string, post: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, post })
    });

    if (!response.ok) {
        return { success: false, message: "Failed to create post" };
    }

    const data = await response.json();

    if (data) {
        return { success: true, message: "Post created successfully" };
    }
    
    return { success: false, message: "Failed to create post" };
}