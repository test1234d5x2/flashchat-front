"use client";

import styles from "@/styles/styles";
import { useState } from "react";
import UserMessage from "@/components/userMessage";
import { useRouter } from "next/navigation";
import handleAddComment from "@/actions/addComment/handleAddComment";

export default function AddCommentForm({ postId, userId, parentCommentId }: { postId: string, userId: string, parentCommentId?: string }) {

    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleAddCommentWithDetails = async (formData: FormData) => {
        try {
            await handleAddComment(formData, postId, userId, parentCommentId);
            setMessage("");
            router.refresh();
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <form className="flex flex-row gap-2 w-full p-2" action={handleAddCommentWithDetails}>
            <input type="text" placeholder="Add a comment" className="flex-1 p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none" name="comment" />
            <button className={`material-symbols-outlined ${styles.postButton}`}>send</button>
            {message && <UserMessage message={message} setMessage={setMessage} />}
        </form>
    )
}