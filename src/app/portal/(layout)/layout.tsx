import getMyDetails from "@/apiCalls/getMyDetails";
import NavContents from "@/components/nav/navContents";
import { redirect } from "next/navigation";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {

    const response = await getMyDetails()
    if (!response.data) {
        redirect("/auth/login")
    }

    const user = response.data

    return (
        <section className="flex flex-row h-screen">
            <NavContents user={user} />
            <main className="w-full overflow-y-scroll md:w-4/5">
                {children}
            </main>
        </section>
    );
}