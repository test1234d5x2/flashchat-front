import getMyDetails from "@/apiCalls/getMyDetails";
import NotificationComponent from "@/components/portal/notifications/notification";
import type Notification from "@/types/Notifcation";

export default async function NotificationsPage() {
    const response = await getMyDetails();
    const user = response.data;


    if (!user || !response.success) {
        return <div>Error loading user</div>;
    }

    const notifications = user.notifications;

    return (
            <section className="flex flex-col min-h-[100vh]">
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                </section>
                <section className="flex flex-col overflow-y-scroll flex-grow">
                    {notifications.length === 0 ? <NoNotificationMessage /> : notifications.map((n: Notification) => {
                        return (
                            <NotificationComponent key={n.id} notification={n} />
                        )
                    })}
                </section>
            </section>
    )
}


const NoNotificationMessage = () => {
    return <div className="w-full flex-grow flex items-center justify-center">No notifications.</div>
}