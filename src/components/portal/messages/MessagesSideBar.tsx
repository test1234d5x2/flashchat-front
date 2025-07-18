"use client";

import ChatListItem from "../chatList/chatListItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getChat from "@/apiCalls/getChat";
import getChatList from "@/apiCalls/getChatList";
import UserSearch from "./UserSearch";
import getMyDetails from "@/apiCalls/getMyDetails";
import Chat from "@/types/Chat";


export default function MessagesSideBar({ setChatError, setChat }: { setChatError: (chatError: boolean) => void, setChat: (chat: Chat) => void }) {

    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatList, setChatList] = useState<Chat[]>([]);
    const [myId, setMyId] = useState("")

    const handleChatClick = (otherParticiantId: string) => {
        getChat(otherParticiantId).then((chat) => {
            if (chat.success && chat.chat) {
                setChatError(false);
                setChat(chat.chat)
                setSidebarOpen(false)
            }
            else {
                setChatError(true);
            }
        });
    }

    useEffect(() => {
        getMyDetails().then((response) => {
            if (response.success && response.data) {
                setMyId(response.data.id)
            }
        })

        getChatList().then((chatList) => {
            setChatList(chatList.chatList);
        });
    }, []);
    
    return (
        <section>
            <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between lg:relative lg:block`}>
                <section className="p-4">
                    <span className="material-symbols-outlined cursor-pointer" onClick={() => router.push("/portal/home")}>arrow_back</span>
                </section>
                <section>
                    <UserSearch handleChatClick={handleChatClick} />
                </section>
                <div className="overflow-y-scroll h-full">
                    {chatList.map((chat) => {
                        const otherUser = chat.user1.id === myId ? chat.user2 : chat.user1
                        return (
                            <section key={chat.id} onClick={() => handleChatClick(otherUser.id)} className="hover:bg-gray-100 cursor-pointer">
                                <ChatListItem chat={chat} otherUser={otherUser} />
                            </section>
                        )
                    })}
                </div>
            </aside>
            <section className="z-100 block absolute top-4 right-4 lg:hidden">
                <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? "close": "menu"}</div>
            </section>
        </section>
    )
}