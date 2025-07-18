"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()

    const goBack = () => {
        router.replace("/portal/home")
    }

    return (
        <span className="material-symbols-outlined absolute top-0 right-0 md:left-0 p-4 cursor-pointer z-100" onClick={() => goBack()}>arrow_back</span>
    )
}