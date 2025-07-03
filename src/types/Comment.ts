import User from "./User";

export default interface Comment {
    id: string;
    comment: string;
    datePosted: string;
    replies: Comment[];
    user: User;
}