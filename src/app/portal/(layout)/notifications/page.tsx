import NotificationsList from "@/components/portal/notifications/notificationsList";

export default function NotificationsPage() {
    return (
        <div className="flex flex-col">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    <NotificationsList />
                </section>
            </section>
        </div>
    )
}