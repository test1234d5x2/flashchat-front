"use client";

import { useState } from "react";

export default function HomeTabs() {
    const [selectedTab, setSelectedTab] = useState("For You")

    return (
        <div className="flex justify-between w-full">
            <Tab title="For You" selected={selectedTab === "For You"} onClick={() => setSelectedTab("For You")} />
            <Tab title="Following" selected={selectedTab === "Following"} onClick={() => setSelectedTab("Following")} />
        </div>
    )
}


function Tab({ title, selected, onClick }: { title: string, selected: boolean, onClick: () => void }) {
    return (
        <div className={`w-1/2 pb-4 text-center ${selected ? "text-blue-500 border-b-4 border-blue-500" : ""}`}>
            <span className="text-sm font-bold cursor-pointer" onClick={onClick}>{title}</span>
        </div>
    )
}