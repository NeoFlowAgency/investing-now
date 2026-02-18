import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface KpiCardProps {
    title: string;
    value: string;
    subtitle?: string;
    trend?: { value: string; positive: boolean };
    icon?: ReactNode;
    className?: string;
}

export default function KpiCard({
    title,
    value,
    subtitle,
    trend,
    icon,
    className,
}: KpiCardProps) {
    return (
        <div
            className={cn(
                "card-glow group relative overflow-hidden rounded-2xl p-5 transition-all duration-300",
                className
            )}
        >
            {/* Subtle corner glow */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-purple-300/60">{title}</p>
                {icon && <div className="text-purple-400/50">{icon}</div>}
            </div>

            <p className="mt-3 text-2xl font-bold text-white">{value}</p>

            <div className="mt-1.5 flex items-center gap-2">
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
                {subtitle && <span className="text-xs text-purple-300/50">{subtitle}</span>}
            </div>
        </div>
    );
}
