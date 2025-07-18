"use client"

import { useState } from "react";
import MessageArea from "@/components/portal/messages/MessageArea";
import MessagesSideBar from "@/components/portal/messages/MessagesSideBar";
import Chat from "@/types/Chat";

export default function MessagePlaceholderPage() {

    const [chatError, setChatError] = useState(false);
    const [chat, setChat] = useState<Chat>();

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <div className="lg:w-1/5 border-r border-gray-200">
                <MessagesSideBar setChatError={setChatError} setChat={setChat} />
            </div>
            <main className="w-full lg:w-4/5">
                <section className="h-full">
                    {!chat ? <NoChatLoaded /> : chatError ? <ChatLoadingError /> : <MessageArea chat={chat} setChat={setChat} />}
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