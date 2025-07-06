export default async function markNotificationAsRead(notificationId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications/mark-as-read`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ notificationId: notificationId }),
        });
        const data = await response.json();

        if (!response.ok) {
            return { success: false, data: null };
        }

        return { success: true, data: data };
    } catch (error) {
        console.error(error);
        return { success: false, data: null };
    }
}