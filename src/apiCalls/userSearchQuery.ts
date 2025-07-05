import User from "@/types/User";

export default async function userSearchQuery(searchQuery: string) {
    try {     
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/search/${encodeURIComponent(searchQuery)}`);
        const data: User[] = await response.json();
        return {success: true, users: data};
    }
    catch (error) {
        console.error(error);
        return {success: false, users: []};
    }
}