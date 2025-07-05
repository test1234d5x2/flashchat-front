export default async function getMedia(mediaId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${mediaId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob);
                
        return url;
    } catch (error) {
        console.error(error);
        return null;
    }
}