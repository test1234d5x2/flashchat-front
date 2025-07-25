import Notification from "./Notifcation";

export default interface User {
    id: string;
    username: string;
    handle: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    notifications: Notification[];
}