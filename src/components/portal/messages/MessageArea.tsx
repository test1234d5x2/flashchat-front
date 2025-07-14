"use client";

import { useState, useEffect } from "react";
import MyMessage from "./myMessage";
import TheirMessage from "./theirMessage";
import getChat from "@/apiCalls/getChat";
import Message from "@/types/Message";
import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import User from "@/types/User";
import handleSendMessage from "@/actions/sendMessage/handleSendMessage";
import getOtherUserDetails from "@/apiCalls/getOtherUserDetails";

interface MessageAreaProps {
    otherUserId: string;
    loggedInUserId: string;
}

export default function MessageArea({ otherUserId, loggedInUserId }: MessageAreaProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatError, setChatError] = useState(false);
    const [otherUser, setOtherUser] = useState<User | null>(null);
    const [chatId, setChatId] = useState<string>("");

    // TODO: This requires a username to get the other user's details so this needs changing.
    useEffect(() => {
        if (!otherUserId) return;
        getOtherUserDetails(otherUserId).then((user) => {
            if (user.success) {
                setOtherUser(user.data);
            }
            // TODO: If there is no user, redirect to error page.
        });
    }, [otherUserId]);

    useEffect(() => {
        if (!otherUserId) return;
        getChat(otherUserId, loggedInUserId).then((chat) => {   
            if (chat.success) {
                setMessages(chat.messages);
                setChatId(chat.chatId);
                setChatError(false);
            } else {
                setMessages([]);
                setChatError(true);
            }
        });
    }, [otherUserId, loggedInUserId]);

    const handleSubmit = (formData: FormData) => {
        handleSendMessage(formData, chatId, loggedInUserId).then(() => {
            getChat(otherUserId, loggedInUserId).then((chat) => {
                if (chat.success) {
                    setMessages(chat.messages);
                    setChatId(chat.chatId);
                    setChatError(false);
                } else {
                    setMessages([]);
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

    return (
        <section className="p-4 flex flex-col justify-between w-full gap-4 h-full">
            <section className="border-b border-gray-200 w-full p-4 text-center">
                <h1 className="text-2xl font-bold">{otherUser?.username}</h1>
            </section>
            <section className="flex flex-col py-4 gap-4 justify-end items-start flex-1 border-b border-gray-200 overflow-y-scroll">
                {messages.map((message: Message) =>
                    message.senderId === loggedInUserId ? (
                        <MyMessage key={message.id} message={message} />
                    ) : (
                        <TheirMessage key={message.id} message={message} />
                    )
                )}
            </section>
            <form className="flex flex-row gap-4 items-center w-full" action={handleSubmit}>
                <div>
                    <div className="w-10 h-10 rounded-full relative">
                        <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
                    </div>
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Add a message"
                        className="w-full p-2 rounded-md border border-gray-300 focus:border-highlight-default focus:outline-none"
                        name="message"
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
                    <button type="submit" className="material-symbols-outlined cursor-pointer bg-blue-500 p-2 text-white rounded-full hover:bg-blue-400">send</button>
                </div>
            </form>
        </section>
    );
}