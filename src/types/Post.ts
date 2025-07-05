import Like from "./Like";
import User from "./User";
import Comment from "./Comment";
import Media from "./Media";

interface Post {
    id: string;
    post: string;
    datePosted: string;
    user: User;
    likes: Like[];
    views: number;
    comments: Comment[];
    media: Media[];
}

export default Post;