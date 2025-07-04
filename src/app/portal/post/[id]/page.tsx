import Post from "@/components/portal/posts/post";
import landingImage from "@/images/landingImage.jpg";
import Image from "next/image";
import getPost from "@/components/portal/posts/getPost";
import CommentComponent from "@/components/portal/comments/comment";
import Comment from "@/types/Comment";
import AddCommentForm from "@/components/forms/addCommentForm";

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const post = await getPost(id);
    const postData = post.data;

    if (!post.success || !postData) {
        return <div>Post not found</div>
    }

    return (
        <section className="flex flex-row h-screen justify-center">
            {/* {<div className="w-1/2 flex items-center justify-center max-h-screen">
                <Image src={landingImage} alt="Post Image" />
            </div>} */}
            <section className="w-1/2 bg-gray-100 flex flex-col h-screen min-h-0 overflow-y-scroll">
                <div>
                    <Post post={postData} />
                </div>
                <section>
                    <AddCommentForm postId={id} userId={LOGGED_IN_USER_ID} />
                </section>
                <section className="flex flex-col flex-1 p-2">
                    <h2 className="text-lg font-bold">Comments ({postData.comments.length})</h2>
                    <div className="flex flex-col gap-2">
                        {postData.comments.map((comment: Comment) => {
                            return (
                                <CommentComponent key={comment.id} comment={comment} postId={id} userId={LOGGED_IN_USER_ID} />
                            )
                        })}
                    </div>
                </section>
            </section>
        </section>
    )
}