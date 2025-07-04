import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import PostList from "@/components/portal/posts/postList";
import AddPostForm from "@/components/portal/forms/addPostForm";
import HomeTabs from "@/components/portal/homeTabs";

export default function Home() {

    return (
        <div className="flex flex-col overflow-y-scroll">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Home</h1>
                </section>
                <section className="px-4 pt-4 pb-0 border-b border-gray-200 bg-gray-100">
                    <HomeTabs />
                </section>
                <section className="p-4 flex flex-row gap-8 bg-gray-100 border-b border-gray-200">
                    <div>
                        <div className="w-15 h-15 rounded-full relative">
                            <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill />
                        </div>
                    </div>
                    <section className="w-full">
                        <AddPostForm /> 
                    </section>
                </section>
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    {/* TODO: Implement feed. Retrieve all posts for now. */}
                    <PostList />
                </section>
            </section>
        </div>
    );
}