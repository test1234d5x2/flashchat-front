"use client"

import Image from "next/image"
import landingImage from "@/images/landingImage.jpg"
import getMyDetails from "@/apiCalls/getMyDetails"
import { useEffect, useState } from "react"
import User from "@/types/User"
import { useRouter } from "next/navigation"

export default function NavProfile() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        getMyDetails().then((response) => {
            if (response.success && response.data) {
                setUser(response.data)
            }
        })
    }, [])

    return (
        <section className="flex flex-col items-center gap-2 p-4 border-b border-gray-200">
            <div className="w-20 h-20 relative mb-2">
                <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill /> {/* profile photo */}
            </div>
            <span className="font-bold text-lg">{user?.username} {/* name */}</span>
            <span className="text-gray-500 text-sm">@{user?.handle} {/* username */}</span>
        </section>
    )
}