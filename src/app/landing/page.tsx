import Header from "@/components/landing/header";

export default function LandingPage() {
    return (
        <main className="flex flex-col">
            <Header />
            <section className="flex flex-col items-center justify-center gap-10 h-screen">
                <h1 className="text-4xl font-bold">FlashChat</h1>
                <p className="text-lg text-gray-600">The best way to chat with your friends</p>
                <section className="flex flex-row gap-4">
                    <div className="flex flex-col gap-4 w-1/3 bg-gray-100 p-4 rounded-md text-center">
                        <h2 className="text-2xl font-bold">Build Your Community</h2>
                        <p className="text-gray-600">Create a space where your users can connect, share, and grow together.</p>
                    </div>
                    <div className="flex flex-col gap-4 w-1/3 bg-gray-100 p-4 rounded-md text-center">
                        <h2 className="text-2xl font-bold">Share Your Stories</h2>
                        <p className="text-gray-600">Post updates, share photos, and videos with your community.</p>
                    </div>
                    <div className="flex flex-col gap-4 w-1/3 bg-gray-100 p-4 rounded-md text-center">
                        <h2 className="text-2xl font-bold">Connect with Your Audience</h2>
                        <p className="text-gray-600">Engage with your community and build lasting relationships.</p>
                    </div>
                </section>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">Get Started</button>
            </section>
            <footer className="flex flex-col justify-center items-center gap-y-4 p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">© 2025 FlashChat. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="text-sm text-gray-600">Terms of Service</a>
                    <a href="#" className="text-sm text-gray-600">Privacy Policy</a>
                    <a href="#" className="text-sm text-gray-600">Contact Us</a>
                </div>
            </footer>
        </main>
    )
}