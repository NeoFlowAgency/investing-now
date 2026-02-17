"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Briefcase, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Global", href: "/", icon: LayoutDashboard },
    { name: "NeoFlow", href: "/neoflow", icon: Briefcase },
    { name: "Invest", href: "/investments", icon: PieChart },
    { name: "Finance", href: "/finance", icon: Wallet },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col border-r bg-card w-64 fixed left-0 top-0">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Investing Now
                </h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        N
                    </div>
                    <div>
                        <p className="text-sm font-medium">Noakim Grelier</p>
                        <p className="text-xs text-muted-foreground">Pro Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
