import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Image from "next/image";
import landingPage from "@/images/landingImage.jpg"
import { styles } from "@/styles/styles";

export default function LandingPage() {
    return (
        <section className="flex flex-col items-center justify-center gap-10 min-h-screen p-10">
            <div className="relative w-full max-w-xl h-64 md:h-96">
                <Image src={landingPage} alt="FlashChat" className="rounded-md" fill style={{objectFit: 'cover'}} />
            </div>
            <h1 className="text-4xl font-bold">FlashChat</h1>
            <p className="text-lg text-gray-600">The best way to chat with your friends.</p>
            <section className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-md text-center sm: w-1/3">
                    <h2 className="text-2xl font-bold">Build Your Community</h2>
                    <p className="text-gray-600">Create a space where your users can connect, share, and grow together.</p>
                </div>
                <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-md text-center sm: w-1/3">
                    <h2 className="text-2xl font-bold">Share Your Stories</h2>
                    <p className="text-gray-600">Post updates, share photos, and videos with your community.</p>
                </div>
                <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-md text-center sm: w-1/3">
                    <h2 className="text-2xl font-bold">Connect with Your Audience</h2>
                    <p className="text-gray-600">Engage with your community and build lasting relationships.</p>
                </div>
            </section>
            <button className={styles.postButton}>Get Started</button>
        </section>
    );
}