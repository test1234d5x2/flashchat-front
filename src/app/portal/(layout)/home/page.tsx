"use client";

import styles from "@/styles/styles";
import { useState } from "react";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import PostList from "@/components/portal/posts/postList";
import createPost from "./createPost";
import UserMessage from "@/components/userMessage";

export default function Home() {

    const [selectedTab, setSelectedTab] = useState("For You")
    const [message, setMessage] = useState("");


    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const handleSubmit = async (formData: FormData) => {
        const post = formData.get("post")?.toString();
        if (!post) {
            setMessage("Error: Post cannot be empty");
            return;
        }

        let result = await createPost(LOGGED_IN_USER_ID, post);

        if (result.success) {
            setMessage(result.message);
        }
        else {
            setMessage(result.message);
        }
    }

    return (
        <div className="flex flex-col overflow-y-scroll">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Home</h1>
                </section>
                <section className="px-4 pt-4 pb-0 border-b border-gray-200 bg-gray-100">
                    <div className="flex justify-between w-full">
                        <Tab title="For You" selected={selectedTab === "For You"} onClick={() => setSelectedTab("For You")} />
                        <Tab title="Following" selected={selectedTab === "Following"} onClick={() => setSelectedTab("Following")} />
                    </div>
                </section>
                <section className="p-4 flex flex-row gap-8 bg-gray-100 border-b border-gray-200">
                    <div>
                        <div className="w-15 h-15 rounded-full relative">
                            <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill />
                        </div>
                    </div>
                    <form className="w-full" action={handleSubmit}>
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
                    </form>
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    {/* TODO: Implement feed. Retrieve all posts for now. */}
                    <PostList />
                </section>
            </section>
            {message && <UserMessage message={message} setMessage={setMessage} />}
        </div>
    );
}



function Tab({ title, selected, onClick }: { title: string, selected: boolean, onClick: () => void }) {
    return (
        <div className={`w-1/2 pb-4 text-center ${selected ? "text-blue-500 border-b-4 border-blue-500" : ""}`}>
            <span className="text-sm font-bold cursor-pointer" onClick={onClick}>{title}</span>
        </div>
    )
}