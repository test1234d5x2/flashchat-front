import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col">
            <Header />
            {children}
            <Footer />
        </main>
    );
}