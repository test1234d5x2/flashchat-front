"use client"

import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import IconNumberComponent from "@/components/iconNumberComponent";
import Link from "next/link";
import Post from "@/types/Post";
import convertDateSubtractionToTimeAgo from "@/utils/convertDateSubtractionToTimeAgo";
import { useState, useEffect } from "react";
import addLike from "@/apiCalls/addLike";
import deleteLike from "@/apiCalls/deleteLike";
import UserMessage from "@/components/userMessage";
import ReportModal from "@/components/reportModal";
import ImageSet from "./imageSet";

export default function PostComponent({ post, myId }: { post: Post, myId: string }) {

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const [message, setMessage] = useState("");
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    useEffect(() => {
        for (let like of post.likes) {
            if (like.likedById === myId) {
                setIsLiked(true)
            }
        }
    }, [post, myId]);

    const handleLikeClick = () => {
        if (myId === post.user.id) {
            setMessage("Error: You cannot like your own post!");
            return
        }

        if (isLiked) {
            deleteLike(post.id).then((data) => {
                if (data.success) {
                    setIsLiked(false);
                    setLikes(likes - 1);
                }
            });
        }

        else {
            addLike(post.id).then((data) => {
                if (data.success) {
                    setIsLiked(true);
                    setLikes(likes + 1);
                }
            });
        }
    }

    const dateSubtraction = new Date().getTime() - new Date(post.datePosted).getTime();
    const timeAgo = convertDateSubtractionToTimeAgo(dateSubtraction);

    return (
        <section className="w-full">
            <section>
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
                            <div className="flex flex-col items-start md:items-center md:gap-2 md:flex-row">
                                <Link href={`/portal/profile/${post.user.id}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                                    <span className="font-bold text-gray-900">{post.user.username}</span>
                                </Link>
                                <span className="text-gray-500 text-sm">@{post.user.username}</span>
                                <span className="text-gray-400 text-xs ml-2 hidden md:block">{timeAgo}</span>
                            </div>
                            <p className="text-gray-800">
                                {post.post}
                            </p>
                            <section>
                                <div className="flex flex-row gap-2 overflow-x-scroll">
                                    <ImageSet post={post} />
                                </div>
                            </section>
                            <div className="flex flex-row gap-2 overflow-x-scroll">
                            </div>
                            <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                                <IconNumberComponent icon="chat" number={post.comments.length} /> {/* comments */}
                                <section className={`${isLiked ? "text-blue-500" : ""} cursor-pointer hover:text-blue-500`} onClick={(e) => (e.stopPropagation(), handleLikeClick())}>
                                    <IconNumberComponent icon="favorite" number={likes} /> {/* likes */}
                                </section>
                                <IconNumberComponent icon="visibility" number={post.views} /> {/* views */}
                                <section onClick={(e) => {
                                    e.stopPropagation();
                                    setIsReportModalOpen(true);
                                }}>
                                    <div className="material-symbols-outlined hover:text-red-500 cursor-pointer">flag_2</div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                {message && <UserMessage message={message} setMessage={setMessage} />}
            </section>
            {isReportModalOpen && <ReportModal postId={post.id} setIsReportModalOpen={setIsReportModalOpen} />}
        </section>
    );
}