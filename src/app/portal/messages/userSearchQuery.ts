import User from "@/types/User";

export default async function userSearchQuery(searchQuery: string) {
    try {     
        const response = await fetch(`http://localhost:8080/api/v1/users/search/${encodeURIComponent(searchQuery)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: User[] = await response.json();
        return {success: true, users: data};
    }
    catch (error) {
        console.error(error);
        return {success: false, users: []};
    }
}