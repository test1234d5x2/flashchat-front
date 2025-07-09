import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import AddPostForm from "@/components/forms/addPostForm";
import PostSection from "@/components/portal/posts/postSection";

export default async function Home() {

    return (
        <div className="flex flex-col overflow-y-scroll">
            <section>
                <section className="border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold">Home</h1>
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
                <section>
                    <PostSection />
                </section>
            </section>
        </div>
    );
}