import Post from "@/components/portal/posts/post";
import landingImage from "@/images/landingImage.jpg";
import Image from "next/image";
import getPost from "@/apiCalls/getPost";
import CommentComponent from "@/components/portal/comments/comment";
import Comment from "@/types/Comment";
import AddCommentForm from "@/components/forms/addCommentForm";
import getMyDetails from "@/apiCalls/getMyDetails";
import BackButton from "./backButton";

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const post = await getPost(id);
    const postData = post.data;

    if (!post.success || !postData) {
        return <div>Post not found</div>
    }

    let myId = ""
    const me = await getMyDetails()
    if (!me.success || !me.data) {
        return
    }

    myId = me.data.id

    return (
        <section className="flex flex-row h-screen justify-center">
            <section className="w-full md:w-2/3 bg-gray-100 flex flex-col h-screen min-h-0 overflow-y-scroll">
                <div>
                    <Post post={postData} myId={myId} />
                </div>
                <section>
                    <AddCommentForm postId={id} />
                </section>
                <section className="flex flex-col flex-1 p-2">
                    <h2 className="text-lg font-bold">Comments ({postData.comments.length})</h2>
                    <div className="flex flex-col gap-2">
                        {postData.comments.map((comment: Comment) => {
                            return (
                                <CommentComponent key={comment.id} comment={comment} postId={id} />
                            )
                        })}
                    </div>
                </section>
            </section>
            <BackButton />
        </section>
    )
}