import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";

export default function UserListItem({ user }: { user: any }) {
    return (
        <section className="flex items-center gap-4">
            <section>
                <div className="w-10 h-10 rounded-full relative">
                    <Image
                        src={landingImage}
                        alt="Profile"
                        className="rounded-full object-cover"
                        fill
                    />
                </div>
            </section>
            <section className="flex flex-col">
                <span className="font-bold text-gray-900">{user.username}</span>
                <span className="text-gray-500 text-sm">{user.username}</span>
            </section>
        </section>
    )
        
    
}