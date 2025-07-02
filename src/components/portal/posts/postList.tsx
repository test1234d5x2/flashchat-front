"use client"

import PostComponent from "@/components/portal/posts/post";
import { useRouter } from "next/navigation";
import getPosts from "./getPosts";
import { useEffect, useState } from "react";
import Post from "@/types/Post";

export default function PostList({}) {

    const router = useRouter();

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts("44e64359-94f4-4aef-b217-94d90db71502").then((data) => {
            if (data.success) {
                setPosts(data.data);
            }
        });
    }, []);

    return (
        <div>

            {posts.map((post, index) => (
                <div className="hover:bg-white cursor-pointer" key={index} onClick={() => router.push(`/portal/post/${post.id}`)}>
                    <PostComponent post={post} />
                </div>
            ))}
        </div>
    )}
