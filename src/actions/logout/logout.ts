"use server"

import getAccessToken from "@/utils/getAccessTokenCookie";
import { cookies } from "next/headers";

export default async function logout() {
    try {

        const accessToken = await getAccessToken()

        if (!accessToken) {
            console.warn("Attempted to add comment without an access token. User might not be logged in.");
            return { success: false, message: "Error: You must be logged in to add a comment." };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            return { success: false, message: "Error: Failed to log out." };
        }

        const success = await response.json();
        if (!success) {
            return { success: false, message: "Failed to log out." };
        }

        const cookiesSet = response.headers.getSetCookie()
        if (cookiesSet && cookiesSet.length > 0) {
            for (const cookieString of cookiesSet) {
                const parts = cookieString.split(';');
                let name = '';
                let value = '';
                const options: { [key: string]: any } = {};

                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i].trim();
                    if (i === 0) {
                        const nameValue = part.split('=');
                        name = nameValue[0];
                        value = nameValue.slice(1).join('='); // Handle values containing '='
                    } else {
                        const [key, val] = part.split('=');
                        const lowerKey = key.toLowerCase();
                        if (lowerKey === 'httponly') options.httpOnly = true;
                        else if (lowerKey === 'secure') options.secure = true;
                        else if (lowerKey === 'samesite') options.sameSite = val.toLowerCase() as 'lax' | 'strict' | 'none';
                        else if (lowerKey === 'path') options.path = val;
                        else if (lowerKey === 'max-age') options.maxAge = parseInt(val, 10);
                        else if (lowerKey === 'expires') options.expires = new Date(val);
                        else if (lowerKey === 'domain') options.domain = val;
                    }
                }

                if (name) { // Ensure name is not empty
                    (await cookies()).set(name, value, options);
                    console.log(`Cookie '${name}' successfully set for browser.`);
                }
            }
        }

        return { success: true, message: "" }

    }

    catch (err) {
        console.error(err);
        return { success: false, message: "Error: Failed to log out" };
    }
}