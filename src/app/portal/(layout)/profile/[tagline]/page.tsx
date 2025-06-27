import ProfileCard from "@/components/portal/profileCard";
import PostList from "@/components/portal/posts/postList";

interface ProfilePageProps {
    params: {
        tagline: string;
    };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { tagline } = await params;

    return (
        <section className="flex flex-col">
            <section className="border-b border-gray-200 p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
            </section>
            <section className="p-8 bg-gray-100">
                <ProfileCard tagline={tagline} />
            </section>
            <section className="p-8 bg-gray-100">
                <section className="flex flex-col gap-4 justify-between md:flex-row">
                    <Stats number={100} text="Posts" />
                    <Stats number={100} text="Followers" />
                    <Stats number={100} text="Following" />
                </section>
            </section>
            <section className="px-8 bg-gray-100">
                <section className="flex flex-col bg-gray-100 overflow-y-scroll">
                    <PostList />
                </section>
            </section>
        </section>
    );
}


function Stats({ number, text }: { number: number, text: string }) {
    return (
        <div className="flex flex-col bg-white p-4 w-full rounded-lg items-center">
            <span className="font-bold text-gray-900 text-2xl">{number}</span>
            <span className="text-gray-500">{text}</span>
        </div>
    )
}