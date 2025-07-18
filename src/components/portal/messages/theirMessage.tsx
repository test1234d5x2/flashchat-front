import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import convertTimestampStringToDateTime from "@/utils/convertTimestampStringToDateTime";
import Message from "@/types/Message";

export default function TheirMessage({ message }: { message: Message }) {
    const date = convertTimestampStringToDateTime(message.timestamp);
    return (
        <section className="flex flex-row w-full items-end justify-start gap-2">
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
            <section className="bg-gray-200 text-black p-2 rounded-lg max-w-2/3">
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <p className="text-xs text-right">{`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</p>
            </section>
        </section>
    )
}