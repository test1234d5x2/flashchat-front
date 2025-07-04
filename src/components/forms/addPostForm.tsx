"use client";

import handleCreatePost from "@/actions/addPost/handleCreatePost";
import { useState } from "react";
import styles from "@/styles/styles";
import UserMessage from "@/components/userMessage";

export default function AddPostForm() {

    const [message, setMessage] = useState("");

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";
    
    const handleCreatePostWithDetails = (formData: FormData) => {
        handleCreatePost(formData, LOGGED_IN_USER_ID).then((message) => {
            setMessage(message);
        }).catch((error) => {
            setMessage(error.message);
        });
    };

    return (
        <form className="w-full" action={handleCreatePostWithDetails}>
            <div>
                <input type="text" placeholder="What's on your mind?" className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none" name="post" />
            </div>
            <div className="flex flex-row justify-between p-4">
                <div className="flex flex-row gap-2 py-2">
                    <div className="material-symbols-outlined cursor-pointer text-blue-500">add_photo_alternate</div>
                    <div className="material-symbols-outlined cursor-pointer text-blue-500">gif</div>
                    <div className="material-symbols-outlined cursor-pointer text-blue-500">emoji_emotions</div>
                </div>
                <button className={styles.postButton}>Post</button>
            </div>
            {message && <UserMessage message={message} setMessage={setMessage} />}
        </form>
    )
}