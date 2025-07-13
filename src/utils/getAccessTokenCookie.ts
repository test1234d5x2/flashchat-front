import { cookies } from "next/headers";


export default async function getAccessToken() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    return accessToken;
}