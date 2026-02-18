"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Neoflow", href: "/neoflow" },
    { label: "Investissement", href: "/investments" },
    { label: "Finance", href: "/finance" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed left-4 top-4 z-50 rounded-xl bg-surface-100 p-2.5 text-purple-300 lg:hidden"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-screen w-[160px] flex-col items-center py-8 transition-transform duration-300 lg:translate-x-0",
                    "bg-gradient-to-b from-surface-100/80 to-surface/80 backdrop-blur-xl border-r border-purple-900/20",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Close button mobile */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute right-3 top-3 text-purple-400 lg:hidden"
                >
                    <X size={20} />
                </button>

                {/* Logo dot */}
                <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-glow">
                    <span className="text-sm font-bold text-white">IN</span>
                </div>

                {/* Nav items */}
                <nav className="flex flex-1 flex-col items-center gap-2 w-full px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "w-full rounded-xl px-4 py-2.5 text-center text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-purple-600/30 text-white border border-purple-500/40 shadow-glow-sm"
                                        : "text-purple-300/70 hover:bg-purple-900/20 hover:text-purple-200 border border-transparent"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom avatar */}
                <div className="mt-auto flex flex-col items-center gap-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
                        NG
                    </div>
                    <p className="text-[10px] text-purple-400/60">Noakim</p>
                </div>
            </aside>
        </>
    );
}
