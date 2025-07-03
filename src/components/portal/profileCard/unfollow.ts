export default async function unfollow(followerId: string, followedId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/follows`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followerId: followerId, followedId: followedId })
        });

        const success = await response.json();
        if (!response.ok || !success) {
            return { success: false, message: "Failed to unfollow user" };
        }

        return { success: true, message: "Unfollow created" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to unfollow user" };
    }
}