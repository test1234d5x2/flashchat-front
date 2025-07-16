"use client"

import PostComponent from "@/components/portal/posts/post";
import { useRouter } from "next/navigation";
import Post from "@/types/Post";
import { useEffect, useState, useCallback } from "react";
import getPosts from "@/apiCalls/getFeed";
import FeedType from "@/enums/FeedTypes";
import getFollowingPosts from "@/apiCalls/getFollowingPosts";
import User from "@/types/User";
import getPostsByUser from "@/apiCalls/getPostsByUser";
import getMyDetails from "@/apiCalls/getMyDetails";

export default function PostList({ feedType, user }: { feedType: FeedType, user?: User }) {

    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [myId, setMyId] = useState("")

    useEffect(() => {
        getMyDetails().then((response) => {
            if (response.success && response.data) {
                setMyId(response.data.id)
            }
        })
    }, [])

    const fetchMorePosts = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        let response: {data: Post[], success: boolean};
        if (feedType === FeedType.FOLLOWING) {
            response = await getFollowingPosts(page + 1);
        }
        else if (feedType === FeedType.USER && user) {
            response = await getPostsByUser(user.id, page + 1);
        }
        else {
            response = await getPosts(page + 1);
        }


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
    }, [loading, hasMore, page]);

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

    useEffect(() => {
        const loadInitialPosts = async () => {
            setLoading(true);
            let response: {data: Post[], success: boolean};
            if (feedType === FeedType.FOLLOWING) {
                response = await getFollowingPosts(1);
            }
            else if (feedType === FeedType.USER && user) {
                response = await getPostsByUser(user.id, 1);
            }
            else {
                response = await getPosts(1);
            }

            if (response.success) {
                setPosts(response.data);
                if (response.data.length < 10) {
                    setHasMore(false);
                }
            } 
            else {
                console.error("Failed to fetch initial posts");
            }

            setLoading(false);
        }

        setPosts([]); // Clear posts on feed type change
        loadInitialPosts();
    }, [feedType])

    return (
        <div>
            {posts.map((post, index) => (
                <div className="hover:bg-white cursor-pointer" key={index} onClick={() => router.push(`/portal/post/${post.id}`)}>
                    <PostComponent post={post} myId={myId} />
                </div>
            ))}
            {loading && posts.length === 0 && (
                <div className="p-4 bg-gray-100 rounded-lg h-full">
                    <div className="animate-pulse flex-col space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-full h-36"></div>
                        <div className="h-4 bg-gray-300 rounded w-full h-36"></div>
                        <div className="h-4 bg-gray-300 rounded w-full h-36"></div>
                        <div className="h-4 bg-gray-300 rounded w-full h-36"></div>
                    </div>
                </div>
            )}
        </div>
    );
}