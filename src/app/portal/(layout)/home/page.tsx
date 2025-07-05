import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import PostList from "@/components/portal/posts/postList";
import AddPostForm from "@/components/forms/addPostForm";
import HomeTabs from "@/components/portal/homeTabs";
import getPosts from "@/apiCalls/getPosts";

export default async function Home() {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const postsData = await getPosts(LOGGED_IN_USER_ID);
    const posts = postsData.data;
    if (!postsData.success) {
        return <div>Posts not found</div>;
    }

    return (
        <div className="flex flex-col overflow-y-scroll">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Home</h1>
                </section>
                <section className="px-4 pt-4 pb-0 border-b border-gray-200 bg-gray-100">
                    <HomeTabs />
                </section>
                <section className="p-4 flex flex-row gap-8 bg-gray-100 border-b border-gray-200">
                    <div>
                        <div className="w-15 h-15 rounded-full relative">
                            <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill />
                        </div>
                    </div>
                    <section className="w-full">
                        <AddPostForm /> 
                    </section>
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    {/* TODO: Implement feed. Retrieve all posts for now. */}
                    {posts ? <PostList posts={posts} /> : <div>No posts</div>}
                </section>
            </section>
        </div>
    );
}