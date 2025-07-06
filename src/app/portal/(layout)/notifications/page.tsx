import getUser from "@/apiCalls/getUser";
import NotificationComponent from "@/components/portal/notifications/notification";
import type Notification from "@/types/Notifcation";

export default async function NotificationsPage() {
    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const response = await getUser(LOGGED_IN_USER_ID);
    const user = response.data;

    if (!user || !response.success) {
        // TODO: Redirect to error page.
        return <div>Error loading user</div>;
    }

    const notifications = user.notifications;

    return (
        <div className="flex flex-col">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                </section>
                <section className="flex flex-col overflow-y-scroll">
                    {notifications.map((n: Notification) => {
                        return (
                            <NotificationComponent key={n.id} notification={n} />
                        )
                    })}
                </section>
            </section>
        </div>
    )
}