import User from "@/types/User";

export default async function getUser(userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/details/${userId}`);
        const data: User = await response.json();
        return {success: true, data: data};
    } catch (error) {
        console.error(error);
        return {success: false, data: null};
    }
}