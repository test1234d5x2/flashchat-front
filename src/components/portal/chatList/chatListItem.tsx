import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Chat from "@/types/Chat";
import User from "@/types/User";
import convertDateSubtractionToTimeAgo from "@/utils/convertDateSubtractionToTimeAgo";

export default function ChatListItem({ chat, otherUser }: { chat: Chat, otherUser: User }) {

    const mostRecentMessage = chat.messages.length > 0 ? chat.messages[0] : undefined
    const mostRecentMessageContent = mostRecentMessage ? mostRecentMessage.content : ""

    const dateSubtraction = !mostRecentMessage ? 0 : new Date().getTime() - new Date(mostRecentMessage.timestamp).getTime()
    const timeAgo = convertDateSubtractionToTimeAgo(dateSubtraction);
    
    return (
        <div className="p-4 flex items-center justify-between gap-3 hover:bg-gray-100 cursor-pointer rounded">
            <div className="flex gap-3 w-full overflow-x-hidden">
                <div className="min-w-10 min-h-10 relative">
                    <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
                </div>
                <div className="flex flex-col flex-grow overflow-x-hidden">
                    <div className="flex items-center justify-between">
                        <div className="font-bold">{otherUser.username}</div>
                        {mostRecentMessage ? <div className="text-xs hidden 2xl:block">{timeAgo}</div>: ""}
                    </div>
                    <div>
                        {mostRecentMessage ? <div className="text-xs">{mostRecentMessageContent}</div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}