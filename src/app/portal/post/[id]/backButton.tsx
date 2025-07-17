"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter()

    const goBack = () => {
        router.replace("/portal/home")
    }

    return (
        <span className="material-symbols-outlined absolute top-0 left-0 p-4 cursor-pointer" onClick={() => goBack()}>arrow_back</span>
    )
}