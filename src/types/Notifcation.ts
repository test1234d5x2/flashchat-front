interface Notification {
    id: string;
    message: string;
    type: string;
    createdAt: string;
    read: boolean;
    actionUserId: string;
}

export default Notification;