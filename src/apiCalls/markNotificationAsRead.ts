"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function markNotificationAsRead(notificationId: string) {
    try {
        
        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, data: [], message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications/mark-as-read`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ notificationId: notificationId }),
        });
        const data = await response.json();

        if (!response.ok) {
            return { success: false, data: null, message: ""};
        }

        return { success: true, data: data, message: "" };
    } catch (error) {
        console.error(error);
        return { success: false, data: null, message: "" };
    }
}