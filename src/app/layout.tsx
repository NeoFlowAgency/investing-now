import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Investing Now — Personal Finance Dashboard",
    description: "Track your net worth, SaaS revenue, investments, and personal finances in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="dark">
            <body className="min-h-screen bg-[#0a0914] font-sans text-white antialiased">
                {children}
            </body>
        </html>
    );
}
