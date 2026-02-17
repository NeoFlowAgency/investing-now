"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Briefcase,
    TrendingUp,
    Wallet,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const navItems = [
    { label: "Vue Globale", href: "/", icon: LayoutDashboard },
    { label: "NeoFlow BOS", href: "/neoflow", icon: Briefcase },
    { label: "Investissements", href: "/investments", icon: TrendingUp },
    { label: "Finances", href: "/finance", icon: Wallet },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-800/60 bg-[#13141b] transition-all duration-300",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-zinc-800/60 px-4">
                {!collapsed && (
                    <h1 className="text-lg font-bold">
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            Investing Now
                        </span>
                    </h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                            )}
                        >
                            <Icon
                                size={20}
                                className={cn(
                                    "flex-shrink-0 transition-colors",
                                    isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                                )}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User */}
            {!collapsed && (
                <div className="border-t border-zinc-800/60 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                            NG
                        </div>
                        <div className="overflow-hidden">
                            <p className="truncate text-sm font-medium text-zinc-200">Noakim Grelier</p>
                            <p className="truncate text-xs text-zinc-500">NeoFlow Agency</p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
