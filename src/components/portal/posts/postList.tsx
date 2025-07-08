"use client"

import PostComponent from "@/components/portal/posts/post";
import { useRouter } from "next/navigation";
import Post from "@/types/Post";
import { useEffect, useState, useCallback } from "react";
import getPosts from "@/apiCalls/getPosts";

export default function PostList({ posts: initialPosts = [] }: { posts?: Post[] }) {

    const LOGGED_IN_USER_ID = "44e64359-94f4-4aef-b217-94d90db71502";

    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMorePosts = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        
        const response = await getPosts(LOGGED_IN_USER_ID, page + 1);
        if (response.success) {
            const newPosts = response.data;
            if (newPosts.length === 0) {
                setHasMore(false);
            }
            else {
                setPosts(prev => [...prev, ...newPosts]);
                setPage(prev => prev + 1);
            }
        }

        setLoading(false);
    }, [loading, hasMore, page, posts]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
                !loading && hasMore
            ) {
                fetchMorePosts();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchMorePosts, loading, hasMore]);

    if (!posts || posts.length === 0) {
        return <div>No posts</div>;
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div className="hover:bg-white cursor-pointer" key={index} onClick={() => router.push(`/portal/post/${post.id}`)}>
                    <PostComponent post={post} />
                </div>
            ))}
        </div>
    );
}
// TODO: Pagination done but needs refactoring.