import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
    title: "Investing Now — Personal Finance Dashboard",
    description: "Track your net worth, SaaS revenue, investments and personal budget.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <Sidebar />
                {/* Main content: shifts right on desktop, full width on mobile */}
                <main className="min-h-screen overflow-y-auto px-4 pb-10 pt-16 lg:pl-[180px] lg:pr-8 lg:pt-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </body>
        </html>
    );
}
