import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import styles from "@/styles/styles";
import Link from "next/link";

export default function Notification() {
    return (
        <section className="p-4 w-full border-b border-gray-200 flex flex-row justify-between">
            <section className="flex flex-row gap-4">
                <div>
                    <div className="w-10 h-10 rounded-full relative">
                        <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
                    </div>
                </div>
                <div>
                    <p><Link href={`/portal/profile/johnsnow`} className="font-bold hover:underline">John Snow</Link> liked your post</p>
                    <p>2h ago</p>
                </div>
            </section>
            <div className="flex flex-row gap-2">
                <button className={styles.postButton}>Like</button>
                <button className={styles.postButton}>Like</button>
                <button className={styles.postButton}>Like</button>
            </div>
        </section>
    )
}