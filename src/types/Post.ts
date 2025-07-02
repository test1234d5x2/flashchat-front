import Like from "./Like";
import User from "./User";

interface Post {
    id: string;
    post: string;
    datePosted: string;
    user: User;
    likes: Like[];
}

export default Post;