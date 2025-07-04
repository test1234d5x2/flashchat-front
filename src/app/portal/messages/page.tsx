"use client"

import { useState } from "react";
import MessageArea from "@/components/portal/messages/MessageArea";
import MessagesSideBar from "@/components/portal/messages/MessagesSideBar";

export default function MessagePlaceholderPage() {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const [chatError, setChatError] = useState(false);
    const [chatShowing, setChatShowing] = useState(false);
    const [otherUserId, setOtherUserId] = useState("");

    return (
        <section className="flex flex-row h-screen overflow-hidden">
            <MessagesSideBar setChatError={setChatError} setChatShowing={setChatShowing} setOtherUserId={setOtherUserId} />
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