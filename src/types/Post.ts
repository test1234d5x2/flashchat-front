import Like from "./Like";
import User from "./User";
import Comment from "./Comment";

interface Post {
    id: string;
    post: string;
    datePosted: string;
    user: User;
    likes: Like[];
    views: number;
    comments: Comment[];
}

export default Post;