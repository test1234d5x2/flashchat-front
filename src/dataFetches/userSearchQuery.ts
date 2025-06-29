export default async function userSearchQuery(searchQuery: string) {
    const response = await fetch(`http://localhost:8080/api/v1/users/search/${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data); // TODO: Remove
    return data;
}