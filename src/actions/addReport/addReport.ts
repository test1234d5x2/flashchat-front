"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function addReport(reason: string, postId: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer: ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reason,
                postId,
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