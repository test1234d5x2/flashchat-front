export default async function addReport(reason: string, postId: string, userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reason,
                postId,
                reporterId: userId
            })
        })

        if (!response.ok) {
            return { success: false, message: "Failed to add report" };
        }

        const success = await response.json();
        if (!success) {
            return { success: false, message: "Failed to add report" };
        }

        return { success: true, message: "Report added successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to add report" };
    }
}