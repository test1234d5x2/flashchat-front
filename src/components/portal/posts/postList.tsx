import Link from "next/link";
import Post from "./post";

export default function PostList() {
    return (
        <div>
            <div className="hover:bg-white">
                <Link href="/portal/post/1">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/2">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/3">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/4">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/5">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/6">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/7">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/8">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/9">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/10">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/11">
                    <Post />
                </Link>
            </div>
            <div className="hover:bg-white">
                <Link href="/portal/post/12">
                    <Post />
                </Link>
            </div>
        </div>
    )
}