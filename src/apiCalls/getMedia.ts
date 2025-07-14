"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";

export default async function getMedia(mediaId: string) {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, url: null, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${mediaId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            return {success: false, url: null, message: ""};
        }

        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob);
                
        return {success: true, url: url, message: ""};
    } catch (error) {
        console.error(error);
        return {success: false, url: null, message: ""};
    }
}