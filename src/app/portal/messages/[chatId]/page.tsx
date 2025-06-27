import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import MyMessage from "@/components/portal/messages/myMessage";
import TheirMessage from "@/components/portal/messages/theirMessage";

export default function MessagePage() {
    return (
        <section className="p-4 flex flex-col justify-between w-full gap-4 h-full">
            <section className="border-b border-gray-200 w-full p-4 text-center">
                <h1 className="text-2xl font-bold">Name of Person</h1>
            </section>
            <section className="flex flex-col py-4 gap-4 justify-end items-start flex-1 border-b border-gray-200 overflow-y-scroll">
                <MyMessage />
                <TheirMessage />
                <MyMessage />
                <TheirMessage />
                <MyMessage />
                <TheirMessage />
                <MyMessage />
                <TheirMessage />
                <MyMessage />
                <TheirMessage />
                <MyMessage />
                <TheirMessage />
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
        </section>
    )
}