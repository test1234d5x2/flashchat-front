"use client"

import ChatListItem from "@/components/portal/chatList/chatListItem";
import UserListItem from "@/components/portal/userList/userListItem";
import userSearchQuery from "@/dataFetches/userSearchQuery";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import getChatList from "./getChatList";
import MyMessage from "@/components/portal/messages/myMessage";
import TheirMessage from "@/components/portal/messages/theirMessage";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Message from "@/types/Message";
import getChat from "./getChat";

export default function MessagePlaceholderPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [chatList, setChatList] = useState<any[]>([]);
    const [chatError, setChatError] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatShowing, setChatShowing] = useState(false);

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
             userSearchQuery(searchQuery).then((users) => {
                setUsers(users);
            });
        }
    }, [searchParams]);

    const handleChatClick = (user1Id: string, user2Id: string) => {
        setChatShowing(true);
        getChat(user1Id, user2Id).then((chat) => {
            if (chat.success) {
                setMessages(chat.messages);
                setChatError(false);
            }
            else {
                setChatError(true);
            }
        });
    }

    useEffect(() => {
        /* TODO: Need to find a way to get the user's details from the chatList from the API. */
        const userId = "44e64359-94f4-4aef-b217-94d90db71502";
        getChatList(userId).then((chatList) => {
            setChatList(chatList);
        });
    }, [users]);

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between border-r border-gray-200 lg:w-1/5 lg:relative lg:block`}>
                <section className="p-4">
                    <span className="material-symbols-outlined cursor-pointer" onClick={() => router.push("/portal/home")}>arrow_back</span>
                </section>
                <section className="">
                    <input
                        type="text"
                        placeholder="Search users"
                        className="border rounded bg-gray-50 w-full p-2"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("search")?.toString() || ""}
                    />
                    <div className="absolute bg-white z-50 w-full flex flex-col border border-gray-200">
                        {!searchParams.get("search") ? "" :
                            users.map((user) => {
                                return (
                                    <div key={user.id} onClick={() => handleChatClick(user.id, "44e64359-94f4-4aef-b217-94d90db71502")} className="hover:bg-gray-100 p-2 cursor-pointer">
                                        <UserListItem user={user} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <div className="overflow-y-scroll h-full">
                    {chatList.map((chat) => {
                        let otherUser = chat.user1Id === "44e64359-94f4-4aef-b217-94d90db71502" ? chat.user2 : chat.user1;
                        return (
                            /* TODO: Need to find a way to get the user's details from the chatList from the API. */
                            <section key={chat.id} onClick={() => handleChatClick(otherUser.id, "44e64359-94f4-4aef-b217-94d90db71502")} className="hover:bg-gray-100 cursor-pointer">
                                <ChatListItem user={otherUser} />
                            </section>
                        )
                    })}
                    {/* <ChatListItem key="chat-1" />
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
                    <ChatListItem key="chat-23" /> */}
                </div>
            </aside>
            <section className="z-100 block absolute top-4 right-4 lg:hidden">
                <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>menu</div>
            </section>
            <main className="w-full lg:w-4/5">
            <section className="h-full">

                    {!chatShowing ? <NoChatLoaded /> : chatError ? <ChatLoadingError /> : <section className="p-4 flex flex-col justify-between w-full gap-4 h-full">
                        <section className="border-b border-gray-200 w-full p-4 text-center">
                            <h1 className="text-2xl font-bold">Name of Person</h1>
                        </section>
                        <section className="flex flex-col py-4 gap-4 justify-end items-start flex-1 border-b border-gray-200 overflow-y-scroll">
                            {messages.map((message: Message) => {
                                // TODO: Once auth is implemented, we can use the auth context to get the current user's id.
                                if (message.senderId === "44e64359-94f4-4aef-b217-94d90db71502") {
                                    return (
                                        <MyMessage message={message} />
                                    )
                                }
                                else {
                                    return (
                                        <TheirMessage message={message} />
                                    )
                                }
                            })}
                        </section>
                        <section className="flex flex-row gap-4 items-center w-full">
                            <div>
                                <div className="w-10 h-10 rounded-full relative">
                                    <Image  
                                        src={landingImage}
                                        alt="Profile"
                                        className="rounded-full object-cover"
                                        fill
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Add a message"
                                    className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none"
                                />
                            </div>
                            <div>
                                <div className="flex flex-row gap-2">
                                    <div className="material-symbols-outlined cursor-pointer text-blue-500">add_photo_alternate</div>
                                    <div className="material-symbols-outlined cursor-pointer text-blue-500">gif</div>
                                    <div className="material-symbols-outlined cursor-pointer text-blue-500">emoji_emotions</div>
                                </div>
                            </div>
                            <div>
                                <span className="material-symbols-outlined cursor-pointer bg-blue-500 p-2 text-white rounded-full hover:bg-blue-400">send</span>
                            </div>
                        </section>
                    </section>}
                </section>
                
            </main>            
        </section>
    )
}



const NoChatLoaded = () => {
    return (
        <div className="flex flex-col py-4 gap-4 justify-center items-center flex-1 h-full">
            <div className="text-gray-500">No chat selected</div>
        </div>
    )
}

const ChatLoadingError = () => {
    return (
        <div className="flex flex-col py-4 gap-4 justify-center items-center flex-1 h-full">
            <div className="text-gray-500">Error loading chat</div>
        </div>
    )
}