export default async function createFollow(followerId: string, followedId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/follows`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followerId: followerId, followedId: followedId })
        });

        const success = await response.json();
        if (!response.ok || !success) {
            return { success: false, message: "Failed to follow user" };
        }

        return { success: true, message: "Follow created" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to follow user" };
    }
}