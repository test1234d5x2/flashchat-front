import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Link from "next/link";

export default function ChatListItem({ user }: { user: any }) {
    return (
        <div className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded">
            <div className="w-10 h-10 relative">
                <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
            </div>
            <div>
                <div className="font-bold">{user.username}</div>
                <div className="text-xs">I just shared a link about this c...</div>
            </div>
            <div className="ml-auto text-xs">3h</div>
        </div>
    )
}