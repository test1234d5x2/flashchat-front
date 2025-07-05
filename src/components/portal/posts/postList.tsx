"use client"

import PostComponent from "@/components/portal/posts/post";
import { useRouter } from "next/navigation";
import Post from "@/types/Post";

export default function PostList({ posts }: { posts?: Post[] }) {

    const router = useRouter();

    if (!posts) {
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
    )}
