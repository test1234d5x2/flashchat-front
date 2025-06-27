import Post from "@/components/portal/posts/post";
import CommentsList from "@/components/portal/comments/commentsList";
import landingImage from "@/images/landingImage.jpg";
import Image from "next/image";

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <section className="flex flex-row h-screen">
            <div className="w-1/2 flex items-center justify-center max-h-screen">
                <Image src={landingImage} alt="Post Image" />
            </div>
            <section className="w-1/2 bg-gray-100 flex flex-col h-screen min-h-0 overflow-y-scroll">
                <div>
                    <Post />
                </div>
                <section className="p-4 flex flex-col gap-4 flex-1">   
                    <CommentsList />
                </section>
            </section>
        </section>
    )
}