import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
    title: "Investing Now — Personal Finance Dashboard",
    description: "Track your net worth, SaaS revenue, investments and personal budget in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <Sidebar />
                <main className="ml-[260px] min-h-screen overflow-y-auto p-8 transition-all duration-300">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </body>
        </html>
    );
}
