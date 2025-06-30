"use client"

import ChatListItem from "@/components/portal/chatList/chatListItem";
import UserListItem from "@/components/portal/userList/userListItem";
import userSearchQuery from "@/app/portal/messages/userSearchQuery";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import getChatList from "./getChatList";
import getChat from "./getChat";
import User from "@/types/User";
import MessageArea from "@/components/portal/messages/MessageArea";

export default function MessagePlaceholderPage() {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [chatList, setChatList] = useState<any[]>([]);
    const [chatError, setChatError] = useState(false);
    const [chatShowing, setChatShowing] = useState(false);
    const [otherUserId, setOtherUserId] = useState("");


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
             userSearchQuery(searchQuery).then((returnValue) => {
                if (returnValue.success) {
                    setUsers(returnValue.users);
                }
                else {
                    setUsers([]);
                }
            });
        }
    }, [searchParams]);

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
        // TODO: Once auth is implemented, we can use the auth context to get the current user's id.
        getChatList(LOGGED_IN_USER_ID).then((chatList) => {
            setChatList(chatList);
        });
    }, [users]);

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <aside className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} flex flex-col justify-between border-r border-gray-200 lg:w-1/5 lg:relative lg:block`}>
                <section className="p-4">
                    <span className="material-symbols-outlined cursor-pointer" onClick={() => router.push("/portal/home")}>arrow_back</span>
                </section>
                <section>
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
                                    <div key={user.id} onClick={() => handleChatClick(user.id, LOGGED_IN_USER_ID)} className="hover:bg-gray-100 p-2 cursor-pointer">
                                        <UserListItem user={user} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <div className="overflow-y-scroll h-full">
                    {chatList.map((chat) => {
                        let otherUser = chat.user1Id === LOGGED_IN_USER_ID ? chat.user2 : chat.user1;
                        return (
                            /* TODO: Need to find a way to get the user's details from the chatList from the API. */
                            <section key={chat.id} onClick={() => handleChatClick(otherUser.id, LOGGED_IN_USER_ID)} className="hover:bg-gray-100 cursor-pointer">
                                <ChatListItem user={otherUser} />
                            </section>
                        )
                    })}
                </div>
            </aside>
            <section className="z-100 block absolute top-4 right-4 lg:hidden">
                <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>menu</div>
            </section>
            <main className="w-full lg:w-4/5">
            <section className="h-full">
                {!chatShowing ? <NoChatLoaded /> : chatError ? <ChatLoadingError /> : <MessageArea otherUserId={otherUserId} loggedInUserId={LOGGED_IN_USER_ID} />}
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