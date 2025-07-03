"use client";

import styles from "@/styles/styles";
import { useState } from "react";
import addComment from "./addComment";
import UserMessage from "@/components/userMessage";
import { useRouter } from "next/navigation";

export default function AddCommentForm({ postId, userId, parentCommentId }: { postId: string, userId: string, parentCommentId?: string }) {

    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const comment = formData.get("comment")?.toString();

        if (!comment) {
            setMessage("Error: Comment is required");
            return;
        }

        const response = await addComment(postId, comment, userId, parentCommentId);

        if (response.success) {
            setMessage("");
            router.refresh();
        } else {
            setMessage(response.message);
        }
    };

    return (
        <form className="flex flex-row gap-2 w-full p-2" action={handleSubmit}>
            <input type="text" placeholder="Add a comment" className="flex-1 p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none" name="comment" />
            <button className={`material-symbols-outlined ${styles.postButton}`}>send</button>
            {message && <UserMessage message={message} setMessage={setMessage} />}
        </form>
    )
}