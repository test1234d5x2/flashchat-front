"use client";

import { styles } from "@/styles/styles";
import Nav from "@/components/nav/nav";
import { useState } from "react";
import NavProfile from "@/components/nav/navProfile";

export default function PortalLayout({ children }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="flex flex-row h-screen">
            <section className={`flex flex-col justify-between border-r border-gray-200 md:w-1/5`}>
                <section className={`absolute top-0 left-0 w-full h-full bg-white z-50 ${sidebarOpen ? "block" : "hidden"} md:relative md:block`}>
                    <NavProfile />
                    <Nav />
                </section>
                <section className="p-4 hidden md:block">
                    <button className={`${styles.postButton} w-full`}>Post</button>
                </section>
                <section className="block absolute top-4 right-4 md:hidden">
                    <div className="material-symbols-outlined cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>menu</div>
                </section>
            </section>
            <section className="w-full overflow-y-scroll md:w-4/5">
                {children}
            </section>
        </main>
    );
}