"use client";

import Search from "@/components/portal/search";
import PostList from "@/components/portal/posts/postList";

export default function Explore() {

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
                    <PostList />
                </section>
            </section>
        </div>
    );
}