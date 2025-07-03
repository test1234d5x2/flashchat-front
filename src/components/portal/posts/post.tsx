"use client"

import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import IconNumberComponent from "@/components/iconNumberComponent";
import Link from "next/link";
import Post from "@/types/Post";
import convertDateSubtractionToTimeAgo from "@/utils/convertDateSubtractionToTimeAgo";
import checkIfPostIsLiked from "./checkIfPostIsLiked";
import { useState, useEffect } from "react";
import addLike from "./addLike";
import deleteLike from "./deleteLike";

export default function PostComponent({ post }: { post: Post }) {

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);

    useEffect(() => {
        checkIfPostIsLiked(post.id, "44e64359-94f4-4aef-b217-94d90db71502").then((data) => {
            if (data.success) {
                setIsLiked(data.data);
            }
        });
    }, [post]);

    const dateSubtraction = new Date().getTime() - new Date(post.datePosted).getTime();
    const timeAgo = convertDateSubtractionToTimeAgo(dateSubtraction);

    const handleLikeClick = () => {
        if (isLiked) {
            deleteLike(post.id, "44e64359-94f4-4aef-b217-94d90db71502").then((data) => {
                if (data.success) {
                    setIsLiked(false);
                    setLikes(likes - 1);
                }
            });
        }

        else {
            addLike(post.id, "44e64359-94f4-4aef-b217-94d90db71502").then((data) => {
            if (data.success) {
                    setIsLiked(true);
                    setLikes(likes + 1);
                }
            });
        }
    }
    
    return (
        <section className="w-full border-b border-gray-200">
            <div className="flex items-start gap-4 p-4">
                <div className="w-10 h-10 rounded-full relative">
                    <Image  
                        src={landingImage}
                        alt="Profile"
                        className="rounded-full object-cover"
                        fill
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Link href={`/portal/profile/${post.user.id}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                            <span className="font-bold text-gray-900">{post.user.username}</span>
                        </Link>
                        <span className="text-gray-500 text-sm">@{post.user.username}</span>
                        <span className="text-gray-400 text-xs ml-2">· {timeAgo}</span>
                    </div>
                    <p className="text-gray-800">
                        {post.post}
                    </p>
                    <div className="flex flex-row gap-2 overflow-x-scroll">
                    </div>
                    <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                        <IconNumberComponent icon="chat" number={post.comments.length} /> {/* comments */}
                        <section className={`${isLiked ? "text-blue-500" : ""} cursor-pointer hover:text-blue-500`} onClick={(e) => (e.stopPropagation(), handleLikeClick())}>
                            <IconNumberComponent icon="favorite" number={likes} /> {/* likes */}
                        </section>
                        <IconNumberComponent icon="visibility" number={post.views} /> {/* views */}
                    </div>
                </div>
            </div>
        </section>
    );
}