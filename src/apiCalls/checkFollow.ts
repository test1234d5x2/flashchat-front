export default async function checkFollow(followerId: string, followedId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/follows/check-follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followerId: followerId, followedId: followedId })
        });

        const isFollowing = await response.json();
        if (!response.ok) {
            return { success: false, isFollowing: false };
        }

        return { success: true, isFollowing: isFollowing };
    }
    catch (error) {
        console.error(error);
        return { success: false, isFollowing: false };
    }
}