import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import Link from "next/link";
import type Notification from "@/types/Notifcation";
import convertDateSubtractionToTimeAgo from "@/utils/convertDateSubtractionToTimeAgo";
import getUser from "@/apiCalls/getUser";
import markNotificationAsRead from "@/apiCalls/markNotificationAsRead";

export default async function NotificationComponent({ notification }: { notification: Notification }) {
    const actionUserId = notification.actionUserId;
    const actionUser = await getUser(actionUserId);

    if (!actionUser.success || !actionUser.data) {
        return <div>Error loading notification</div>;
    }

    await markNotificationAsRead(notification.id);

    return (
        <section className={`p-4 w-full border-b border-gray-200 flex flex-row justify-between ${!notification.read ? "bg-gray-100" : ""}`}>
            <section className="flex flex-row gap-4">
                <div>
                    <div className="w-10 h-10 rounded-full relative">
                        <Image src={landingImage} alt="Profile" className="rounded-full object-cover" fill />
                    </div>
                </div>
                <div>
                    <p><Link href={`/portal/profile/${actionUser.data.id}`} className="font-bold hover:underline">{actionUser.data.username}</Link> {notification.message}</p>
                    <p>{convertDateSubtractionToTimeAgo(new Date().getTime() - new Date(notification.createdAt).getTime())}</p>
                </div>
            </section>
            <div className="flex flex-row gap-2">
                {/* TODO: Add like, reply & follow buttons depending on type of notification */}
            </div>
        </section>
    )
}