"use client";

import styles from "@/styles/styles";
import { useState } from "react";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Search from "@/components/portal/search";
import PostList from "@/components/portal/posts/postList";

export default function Home() {

    const [selectedTab, setSelectedTab] = useState("For You")

    return (
        <div className="flex flex-col overflow-y-scroll">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Home</h1>
                </section>
                <section className="border-b border-gray-200 p-4 bg-gray-100">
                    <Search />
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
                    <div className="w-full">
                        <div>
                            <input type="text" placeholder="What's on your mind?" className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none" />
                        </div>
                        <div className="flex flex-row justify-between p-4">
                            <div className="flex flex-row gap-2 py-2">
                                <div className="material-symbols-outlined cursor-pointer text-blue-500">add_photo_alternate</div>
                                <div className="material-symbols-outlined cursor-pointer text-blue-500">gif</div>
                                <div className="material-symbols-outlined cursor-pointer text-blue-500">emoji_emotions</div>
                            </div>
                            <button className={styles.postButton}>Post</button>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    <PostList />
                </section>
            </section>
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