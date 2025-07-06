export default async function getMedia(mediaId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/media/${mediaId}`);
        if (!response.ok) {
            return {success: false, url: null};
        }

        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob);
                
        return {success: true, url: url};
    } catch (error) {
        console.error(error);
        return {success: false, url: null};
    }
}