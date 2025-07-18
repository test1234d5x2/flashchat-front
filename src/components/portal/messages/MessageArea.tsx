"use client";

import { useState, useEffect } from "react";
import MyMessage from "./myMessage";
import TheirMessage from "./theirMessage";
import getChat from "@/apiCalls/getChat";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import handleSendMessage from "@/actions/sendMessage/handleSendMessage";
import Chat from "@/types/Chat";
import getMyDetails from "@/apiCalls/getMyDetails";
import DateComponent from "./DateComponent";
import checkEqualDatesFromTimestamps from "@/utils/checkEqualDatesFromTimestamps";

interface MessageAreaProps {
    chat: Chat
    setChat: (chat: Chat) => void
}

export default function MessageArea({ chat, setChat }: MessageAreaProps) {
    const [chatError, setChatError] = useState(false);
    const [myId, setMyId] = useState("")

    useEffect(() => {
        getMyDetails().then((response) => {
            if (response.success && response.data) {
                setMyId(response.data.id)
            }
        })
    }, []);

    const otherUser = chat.user1.id === myId ? chat.user2 : chat.user1


    const handleSubmit = (formData: FormData) => {
        if (!chat) return
        handleSendMessage(formData, chat.id).then(() => {
            getChat(otherUser.id).then((chat) => {
                if (chat.success && chat.chat) {
                    setChatError(false);
                    setChat(chat.chat)
                } else {
                    setChatError(true);
                }
            });
        }).catch((error) => {
            setChatError(true);
        });
    };

    if (chatError) {
        return (
            <div className="flex flex-col py-4 gap-4 justify-center items-center flex-1 h-full">
                <div className="text-gray-500">Error loading chat</div>
            </div>
        );
    }

    let messageSet = []

    for (let x = 0; x < chat.messages.length; x++) {
        const message = chat.messages[x]

        if (x > 0) {
            const previousMessage = chat.messages[x-1]
            if (checkEqualDatesFromTimestamps(previousMessage.timestamp, message.timestamp)) {
                messageSet.push(<DateComponent timestamp={message.timestamp} /> )
            }
        }

        messageSet.push(message.senderId !== myId ? <TheirMessage key={message.id} message={message} /> : <MyMessage key={message.id} message={message} />)
    }

    return (
        <section className="p-4 flex flex-col justify-between w-full gap-4 h-full">
            <section className="border-b border-gray-200 w-full p-4 text-center">
                <h1 className="text-2xl font-bold">{otherUser?.username}</h1>
            </section>
            <section className="flex flex-col py-4 gap-4 justify-end items-start flex-1 border-b border-gray-200 overflow-y-scroll">
                {chat.messages.length > 0 ? <DateComponent timestamp={chat.messages[0].timestamp} />: ""}
                {messageSet}
            </section>
            <form className="flex flex-row gap-4 items-start w-full" action={handleSubmit}>
                <div>
                    <div className="w-10 h-10 rounded-full relative hidden md:block">
                        <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Add a message"
                            className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none"
                            name="message"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="material-symbols-outlined cursor-pointer text-blue-500">add_photo_alternate</div>
                            <div className="material-symbols-outlined cursor-pointer text-blue-500">gif</div>
                            <div className="material-symbols-outlined cursor-pointer text-blue-500">emoji_emotions</div>
                        </div>
                        <div>
                            <button type="submit" className="material-symbols-outlined cursor-pointer bg-blue-500 p-2 text-white rounded-full hover:bg-blue-400">send</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}