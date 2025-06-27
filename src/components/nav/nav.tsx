"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    
    const pathname = usePathname();
    const navItems = [
        {
            label: "Home",
            href: "/portal/home"
        },
        {
            label: "Explore",
            href: "/portal/explore"
        },
        {
            label: "Notifications",
            href: "/portal/notifications"
        },
        {
            label: "Messages",
            href: "/portal/messages"
        },
        {
            label: "Profile",
            href: "/portal/profile/sagdvashgd"
        },
        {
            label: "Settings",
            href: "/portal/settings"
        },
        {
            label: "Logout",
            href: "/portal/logout"
        }
    ]

    return (
        <nav className="flex flex-col gap-2 p-4 border-b border-gray-200">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <div key={item.label}>
                        <Link
                            href={item.href}
                            className={`transition-colors px-2 py-1 rounded-md w-full block ${isActive ? "bg-gray-100 text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            {item.label}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}