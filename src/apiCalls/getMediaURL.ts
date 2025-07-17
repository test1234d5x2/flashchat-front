export default async function getMediaURL(id: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${id}`
}