"use client";

import getMedia from "@/apiCalls/getMedia";
import Post from "@/types/Post";
import Image from "next/image";
import { useEffect, useState } from "react";
import Media from "@/types/Media";

export default function ImageSet({ post }: { post: Post }) {
    const [media, setMedia] = useState<Media[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            let mediaArray: Media[] = [];
            for (const media of post.media) {
                const mediaData = await getMedia(media.id);
                if (mediaData.success && mediaData.url) {
                    mediaArray.push(
                        {
                            id: media.id,
                            filePath: mediaData.url
                        }
                    );
                }
            }
            setMedia(mediaArray);
        };

        fetchImages();
    }, [post.media]);

    return (
        <section className="flex flex-row flex-wrap gap-2 overflow-x-scroll">
            {media.map((media) => (
                <Image key={media.id} src={media.filePath} alt="Image" width={100} height={100} unoptimized />
            ))}
        </section>
    );
}