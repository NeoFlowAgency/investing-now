"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
    LayoutDashboard,
    Code2,
    TrendingUp,
    Wallet,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    LogOut,
} from "lucide-react";

const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/neoflow", label: "NeoFlow Agency", icon: Code2 },
    { href: "/investments", label: "Investissements", icon: TrendingUp },
    { href: "/finance", label: "Finance", icon: Wallet },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    const nav = (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-6">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600">
                    <span className="text-sm font-black text-white">IN</span>
                </div>
                {!collapsed && <span className="text-sm font-bold text-white tracking-tight">Investing Now</span>}
            </div>

            {/* Links */}
            <nav className="flex-1 space-y-1 px-3">
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                active
                                    ? "bg-purple-600/15 text-white shadow-glow-sm"
                                    : "text-purple-300/50 hover:bg-purple-900/20 hover:text-purple-200"
                            )}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-purple-800/20 px-3 py-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut size={18} />
                    {!collapsed && <span>Déconnexion</span>}
                </button>
            </div>

            {/* Collapse toggle (desktop) */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="mx-3 mb-4 hidden rounded-xl p-2 text-purple-500/40 transition-colors hover:bg-purple-900/20 hover:text-purple-300 lg:flex lg:items-center lg:justify-center"
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
        </div>
    );

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 text-purple-300 backdrop-blur-sm lg:hidden"
            >
                <Menu size={20} />
            </button>

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 hidden border-r border-purple-800/15 bg-[#0e0c1a]/95 backdrop-blur-sm transition-all duration-300 lg:block",
                    collapsed ? "w-[72px]" : "w-[var(--sidebar-width)]"
                )}
                style={collapsed ? {} : undefined}
            >
                {nav}
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <aside
                        className="absolute inset-y-0 left-0 w-[260px] border-r border-purple-800/15 bg-[#0e0c1a]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute right-3 top-5 rounded-lg p-1.5 text-purple-400/60 hover:text-purple-200"
                        >
                            <X size={18} />
                        </button>
                        {nav}
                    </aside>
                </div>
            )}
        </>
    );
}
