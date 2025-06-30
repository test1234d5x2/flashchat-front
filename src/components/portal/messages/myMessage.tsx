import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Message from "@/types/Message";
import convertTimestampStringToDateTime from "@/utils/convertTimestampStringToDateTime";

export default function MyMessage({ message }: { message: Message }) {
    const date = convertTimestampStringToDateTime(message.timestamp);
    return (
        <section className="flex flex-row w-full items-end justify-end gap-2">
            <section className="bg-blue-500 text-white p-2 rounded-lg max-w-2/3">
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-right">{`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</p>
            </section>
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
        </section>
    )
}