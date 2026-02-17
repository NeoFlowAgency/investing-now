import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface KpiCardProps {
    title: string;
    value: string;
    subtitle?: string;
    trend?: { value: string; positive: boolean };
    icon?: ReactNode;
    className?: string;
    accentColor?: string;
}

export default function KpiCard({
    title,
    value,
    subtitle,
    trend,
    icon,
    className,
    accentColor = "indigo",
}: KpiCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#1a1b23] p-5 transition-all duration-300 hover:border-zinc-700/80 hover:shadow-lg hover:shadow-black/20",
                className
            )}
        >
            {/* Subtle gradient glow on hover */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{title}</p>
                {icon && <div className="text-zinc-600">{icon}</div>}
            </div>

            <p className="mt-2 text-2xl font-bold text-zinc-100">{value}</p>

            <div className="mt-1 flex items-center gap-2">
                {trend && (
                    <span
                        className={cn(
                            "text-xs font-semibold",
                            trend.positive ? "text-emerald-400" : "text-red-400"
                        )}
                    >
                        {trend.positive ? "↑" : "↓"} {trend.value}
                    </span>
                )}
                {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
            </div>
        </div>
    );
}
