import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import styles from "@/styles/styles";

export default function ProfileCard({ tagline }: { tagline: string }) {
    return (
        <section className="flex flex-row gap-4 bg-white p-10 rounded-lg">
            <div className="w-20 h-20 rounded-full relative">
                <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill />
            </div>
            <section className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-gray-900 text-xl">Jane Doe {/* name */}</span>
                    <span>@{tagline} {/* tagline */}</span>
                    <span>asyudasgdvgahsvdhas {/* bio */}</span>
                </div>
                <div>
                    <button className={styles.postButton}>Follow</button>
                </div>
            </section>
        </section>
    )   
}