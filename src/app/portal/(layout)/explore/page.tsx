import Search from "@/components/portal/search";
import PostList from "@/components/portal/posts/postList";
import getPosts from "@/apiCalls/getPosts";

export default async function Explore() {

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
                    <h1 className="text-2xl font-bold">Explore</h1>
                </section>
                <section className="border-b border-gray-200 p-4 bg-gray-100">
                    <Search />
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    {posts ? <PostList posts={posts} /> : <div>No posts</div>}
                </section>
            </section>
        </div>
    );
}