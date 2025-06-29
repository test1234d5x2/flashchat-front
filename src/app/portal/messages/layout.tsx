"use client"

import ChatListItem from "@/components/portal/chatList/chatListItem";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import UserListItem from "@/components/portal/userList/userListItem";
import Link from "next/link";
import userSearchQuery from "@/dataFetches/userSearchQuery";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);

    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set("search", searchQuery);
        } 
        else {
            params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    useEffect(() => {
        const searchQuery = searchParams.get("search")
        if (searchQuery) {
            const users = userSearchQuery(searchQuery).then((users) => {
                setUsers(users);
            });
        }
    }, [searchParams]);

    let userListItems = users.map((user) => {
        return (
            <Link key={user.id} href={`/portal/messages/${user.username}`} className="hover:bg-gray-100 p-2 cursor-pointer">
                <UserListItem user={user} />
            </Link>
        )
    })

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between border-r border-gray-200 lg:w-1/5 lg:relative lg:block`}>
                <section className="p-4">
                    <span className="material-symbols-outlined cursor-pointer" onClick={() => router.push("/portal/home")}>arrow_back</span>
                </section>
                <section className="p-4">
                    <input
                        type="text"
                        placeholder="Search users"
                        className="border rounded bg-gray-50 w-full p-2"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("search")?.toString() || ""}
                    />
                    <div className="absolute bg-white z-50 w-full flex flex-col py-2">
                        {searchParams.get("search") ? userListItems : ""}
                    </div>
                </section>
                <div className="overflow-y-scroll h-full">
                    <ChatListItem key="chat-1" />
                    <ChatListItem key="chat-2" />
                    <ChatListItem key="chat-3" />
                    <ChatListItem key="chat-4" />
                    <ChatListItem key="chat-5" />
                    <ChatListItem key="chat-6" />
                    <ChatListItem key="chat-7" />
                    <ChatListItem key="chat-8" />
                    <ChatListItem key="chat-9" />
                    <ChatListItem key="chat-10" />
                    <ChatListItem key="chat-11" />
                    <ChatListItem key="chat-12" />
                    <ChatListItem key="chat-13" />
                    <ChatListItem key="chat-14" />
                    <ChatListItem key="chat-15" />
                    <ChatListItem key="chat-16" />
                    <ChatListItem key="chat-17" />
                    <ChatListItem key="chat-18" />
                    <ChatListItem key="chat-19" />
                    <ChatListItem key="chat-20" />
                    <ChatListItem key="chat-21" />
                    <ChatListItem key="chat-22" />
                    <ChatListItem key="chat-23" />
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