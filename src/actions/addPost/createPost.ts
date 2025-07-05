export default async function createPost(userId: string, post: string, images?: File[]) {
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('post', post);
        
        if (images && images.length > 0) {
            images.forEach((image, index) => {
                formData.append('images', image);
            });
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            return { success: false, message: "Error: Failed to create post" };
        }

        const data = await response.json();

        if (data) {
            return { success: true, message: "Post created successfully" };
        }
        
        return { success: false, message: "Error: Failed to create post" };
    } 
    catch (error) {
        console.error("Error creating post:", error);
        return { success: false, message: "Error: Failed to create post" };
    }
}