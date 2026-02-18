import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden px-4 py-6 md:px-8 md:py-8 lg:ml-[var(--sidebar-width)]">
                {children}
            </main>
        </div>
    );
}
