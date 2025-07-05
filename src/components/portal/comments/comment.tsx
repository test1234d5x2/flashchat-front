"use client";

import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import IconNumberComponent from "@/components/iconNumberComponent";
import Link from "next/link";
import type Comment from "@/types/Comment";
import AddCommentForm from "@/components/forms/addCommentForm";
import convertDateSubtractionToTimeAgo from "@/utils/convertDateSubtractionToTimeAgo";
import { useState } from "react";
import CommentComponent from "./comment";

export default function Comment({ comment, postId, userId }: { comment: Comment, postId: string, userId: string }) {

    const [showCommentReply, setShowCommentReply] = useState(false);

    return (
        <section className="p-4 w-full">
            <section className="flex items-start gap-4">
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
                        <Link href={`/portal/profile/${comment.user.id}`} className="hover:underline">
                            <span className="font-bold text-gray-900">{comment.user.username}</span>
                        </Link>
                        <span className="text-gray-500 text-sm">{comment.user.username}</span>
                        <span className="text-gray-400 text-xs ml-2">{convertDateSubtractionToTimeAgo(new Date().getTime() - new Date(comment.datePosted).getTime())}</span>
                    </div>
                    <p className="text-gray-800">
                        {comment.comment}
                    </p>
                    <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                        <IconNumberComponent icon="chat" number={comment.replies.length} /> {/* comments */}
                        <div className="material-symbols-outlined cursor-pointer hover:text-blue-500" onClick={() => setShowCommentReply(!showCommentReply)}>{showCommentReply ? "close" : "reply"}</div>
                    </div>
                    {showCommentReply && (
                    <div>
                        <AddCommentForm postId={postId} userId={userId} parentCommentId={comment.id} />
                    </div>
                    )}
                    {comment.replies.map((reply: Comment) => (
                        <CommentComponent key={reply.id} comment={reply} postId={postId} userId={userId} />
                    ))}
                </div>
            </section>
        </section>
    )
}