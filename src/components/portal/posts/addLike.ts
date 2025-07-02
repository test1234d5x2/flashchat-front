export default async function addLike(postId: string, userId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({postId, userId}),
        });
        const data = await res.json();
        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: false};
    }
}