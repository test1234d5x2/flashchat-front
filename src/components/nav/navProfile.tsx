import Image from "next/image"
import landingImage from "@/images/landingImage.jpg"

export default function NavProfile() {
    return (
        <section className="flex flex-col items-center gap-2 p-4 border-b border-gray-200">
            <div className="w-20 h-20 relative mb-2">
                <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill /> {/* profile photo */}
            </div>
            <span className="font-bold text-lg">Jane Doe {/* name */}</span>
            <span className="text-gray-500 text-sm">@janedoe {/* username */}</span>
            <span className="text-xs text-gray-400 italic">Building the future, one chat at a time. {/* tagline */}</span>
        </section>
    )
}