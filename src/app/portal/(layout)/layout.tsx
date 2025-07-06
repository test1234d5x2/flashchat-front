import NavContents from "@/components/nav/navContents";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {

    return (
        <section className="flex flex-row h-screen">
            <NavContents />
            <main className="w-full overflow-y-scroll md:w-4/5">
                {children}
            </main>
        </section>
    );
}