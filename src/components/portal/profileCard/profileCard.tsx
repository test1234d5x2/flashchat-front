import Image from "next/image";
import landingImage from "@/images/landingImage.jpg";
import styles from "@/styles/styles";
import User from "@/types/User";
import createFollow from "@/apiCalls/createFollow";
import checkFollow from "@/apiCalls/checkFollow";
import unfollow from "@/apiCalls/unfollow";
import { revalidatePath } from "next/cache";

export default async function ProfileCard({ user }: { user: User }) {

    const isFollowingResponse = await checkFollow(user.id);
    const isFollowing = isFollowingResponse.isFollowing;    

    const handleFollow = async (formData: FormData) => {
        "use server";

        const response = isFollowing ? await unfollow(user.id) : await createFollow(user.id);
        // TODO: If the response is not successful, show an error message.
        revalidatePath(`/portal/profile/${user.id}`);
    }

    // TODO: Check that the form does not appear if the user is viewing their own page.

    return (
        <section className="flex flex-row gap-4 bg-white p-10 rounded-lg">
            <div className="w-20 h-20 rounded-full relative">
                <Image src={landingImage} alt="Profile Photo" className="rounded-full object-cover" fill />
            </div>
            <section className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-gray-900 text-xl">{user.username} {/* name */}</span>
                    <span>@{user.handle} {/* handle */}</span>
                </div>
                {(
                    <form action={handleFollow}>
                        <button className={styles.postButton}>{isFollowing ? "Following" : "Follow"}</button>
                    </form>
                )}
            </section>
        </section>
    )   
}