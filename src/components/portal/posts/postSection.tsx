"use client"

import { useState } from "react"
import HomeTabs from "../homeTabs"
import PostList from "./postList"
import FeedType from "@/enums/FeedTypes"

export default function PostSection() {
    const [tab, setTab] = useState(FeedType.FOLLOWING)

    return (
        <section>
            <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                <section className="px-4 pt-4 pb-0 border-b border-gray-200 bg-gray-100">
                    <HomeTabs setTab={setTab} selectedTab={tab} />
                </section>
                <PostList feedType={tab} />
            </section>
        </section>
    )
}