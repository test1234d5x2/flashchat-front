import getMyDetails from "@/apiCalls/getMyDetails";
import { redirect } from "next/navigation";

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
    const response = await getMyDetails()
    if (!response.success) {
        redirect("/auth/login")
    }
    
    return (
        <section>
            {children}
        </section>
    );
}