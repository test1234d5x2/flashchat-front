"use client";

import { styles } from "@/styles/styles";
import NavProfile from "./navProfile";
import Nav from "./nav";
import { useState } from "react";

export default function NavContents() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <aside className={`flex flex-col justify-between border-r border-gray-200 md:w-1/5`}>
            <section>
                <section className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} md:relative md:block`}>
                    <NavProfile />
                    <Nav />
                </section>
                <section className="block absolute top-4 right-4 md:hidden z-100">
                    <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? "close" : "menu"}</div>
                </section>
            </section>
            <section className="p-4 hidden md:block">
                <button className={`${styles.postButton} w-full`}>Post</button>
            </section>
        </aside>
    )
}