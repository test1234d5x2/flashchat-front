"use client"

import ChatListItem from "@/components/portal/chatList/chatListItem";
import React, { useState } from "react";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between border-r border-gray-200 lg:w-1/5 lg:relative lg:block`}>
                <section className="p-4">
                    <span className="material-symbols-outlined cursor-pointer">arrow_back</span>
                </section>
                <section className="p-4">
                    <input
                        type="text"
                        placeholder="Search chats"
                        className="border rounded bg-gray-50 w-full p-2"
                    />
                </section>
                <div className="overflow-y-scroll h-full">
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                </div>
            </aside>
            <section className="z-100 block absolute top-4 right-4 lg:hidden">
                <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>menu</div>
            </section>
            <main className="w-full lg:w-4/5">
                {children}
            </main>
        </section>
    );
}