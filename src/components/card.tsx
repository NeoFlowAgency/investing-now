import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export default function Card({
    title,
    subtitle,
    action,
    children,
    className,
}: {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-zinc-800/60 bg-[#1a1b23] p-6",
                className
            )}
        >
            {(title || action) && (
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        {title && <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>}
                        {subtitle && <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}
