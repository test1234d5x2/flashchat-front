"use client";

import ChatListItem from "../chatList/chatListItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getChat from "@/apiCalls/getChat";
import getChatList from "@/apiCalls/getChatList";
import UserSearch from "./UserSearch";


export default function MessagesSideBar({ setChatError, setChatShowing, setOtherUserId }: { setChatError: (chatError: boolean) => void, setChatShowing: (chatShowing: boolean) => void, setOtherUserId: (otherUserId: string) => void }) {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatList, setChatList] = useState<any[]>([]);

    const handleChatClick = (user1Id: string, user2Id: string) => {
        setChatShowing(true);
        getChat(user1Id, user2Id).then((chat) => {
            if (chat.success) {
                setChatError(false);
                setOtherUserId(user1Id === LOGGED_IN_USER_ID ? user2Id : user1Id);
            }
            else {
                setChatError(true);
                setOtherUserId("");
            }
        });
    }

    useEffect(() => {
        getChatList(LOGGED_IN_USER_ID).then((chatList) => {
            setChatList(chatList.chatList);
        });
    }, []);
    
    return (
        <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between border-r border-gray-200 lg:w-1/5 lg:relative lg:block`}>
            <section className="p-4">
                <span className="material-symbols-outlined cursor-pointer" onClick={() => router.push("/portal/home")}>arrow_back</span>
            </section>
            <section>
                <UserSearch handleChatClick={handleChatClick} />
            </section>
            <div className="overflow-y-scroll h-full">
                {chatList.map((chat) => {
                    let otherUser = chat.user1Id === LOGGED_IN_USER_ID ? chat.user2 : chat.user1;
                    return (
                        <section key={chat.id} onClick={() => handleChatClick(otherUser.id, LOGGED_IN_USER_ID)} className="hover:bg-gray-100 cursor-pointer">
                            <ChatListItem user={otherUser} />
                        </section>
                    )
                })}
            </div>
            <section className="z-100 block absolute top-4 right-4 lg:hidden">
                <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>menu</div>
            </section>
        </aside>       
    )
}