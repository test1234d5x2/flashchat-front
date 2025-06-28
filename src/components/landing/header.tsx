import Link from "next/link";

export default function Header() {
    return (
        <section className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
                <h1 className="text-2xl font-bold">FlashChat</h1>
            </div>
            <div className="flex gap-4">
                <Link href="/auth/login">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">Login</button>
                </Link>
                <Link href="/auth/signup">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">Signup</button>
                </Link>
            </div>
        </section>
    )
}