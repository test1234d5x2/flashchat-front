import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";

export default function MyMessage() {
    return (
        <section className="flex flex-row w-full items-end justify-end gap-2">
            <section className="bg-blue-500 text-white p-2 rounded-lg max-w-2/3">
                <p className="whitespace-pre-wrap">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non explicabo cumque voluptatem beatae facere neque est? Praesentium, sunt laboriosam doloremque labore tempora, consequatur ipsam possimus omnis, optio iure dignissimos assumenda? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus impedit non suscipit ratione accusamus. Officiis tempora laborum nemo, iste optio cupiditate quis eligendi. Consequatur accusantium qui deleniti optio praesentium eius.</p>
                <p className="text-xs text-right">12:00 PM</p>
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