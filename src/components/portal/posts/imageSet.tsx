"use client";

import getMediaURL from "@/apiCalls/getMediaURL";
import Post from "@/types/Post";
import Image from "next/image";
import { useEffect, useState } from "react";


interface DisplayMedia {
    id: string;
    blobUrl: string;
}

export default function ImageSet({ post }: { post: Post }) {
    const [displayMedia, setDisplayMedia] = useState<DisplayMedia[]>([]);
    const [showEnlargedImage, setShowEnlargedImage] = useState<boolean>(false)
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        const fetchAndCreateBlobUrls = async () => {
            const newDisplayMedia: DisplayMedia[] = [];

            for (const mediaItem of post.media) {
                const mediaURL = await getMediaURL(mediaItem.id);

                
                    try {
                        const response = await fetch(mediaURL);
                        if (!response.ok) {
                            console.error(`Failed to fetch image ${mediaItem.id}: ${response.status} ${response.statusText}`);
                            continue; // Skip this image if fetch fails
                        }

                        const blob = await response.blob();
                        const blobUrl = URL.createObjectURL(blob);

                        newDisplayMedia.push({
                            id: mediaItem.id,
                            blobUrl: blobUrl
                        });
                    } 
                    catch (error) {
                        console.error(`Error processing image ${mediaItem.id}:`, error);
                    }
            }

            setDisplayMedia(newDisplayMedia);
        };

        fetchAndCreateBlobUrls();


    }, [post]);

    return (
        <section className="flex flex-row flex-wrap gap-2 overflow-x-scroll cursor-auto" onClick={(e) => e.stopPropagation()}>
            {displayMedia.map((item, index) => (
                <div className="w-20 h-20 relative cursor-pointer" key={item.id} onClick={() => {setShowEnlargedImage(true), setImageIndex(index)}}>
                    <Image src={item.blobUrl} alt="" fill unoptimized/>
                </div>
            ))}
           {showEnlargedImage && <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-100" onClick={() => setShowEnlargedImage(false)}>
                <div className="relative w-full h-[75vh] z-100" onClick={(e) => e.stopPropagation()}>
                    {displayMedia.length > 0 ? <Image src={displayMedia[imageIndex].blobUrl} alt="" objectFit="contain" fill />: ""}
                </div>
            </div>}
        </section>
    );
}