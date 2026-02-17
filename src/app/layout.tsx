import { Sidebar } from "@/components/sidebar";

export const metadata = {
    title: "Investing Now",
    description: "Personal Investment & Finance Tracker",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-50 text-gray-900 font-sans antialiased">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto pl-64">
                        <div className="container mx-auto p-8 max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
