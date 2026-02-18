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
        <div className={cn("card-glow rounded-2xl p-6 transition-all duration-300", className)}>
            {(title || action) && (
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        {title && <h3 className="text-sm font-semibold text-purple-100">{title}</h3>}
                        {subtitle && <p className="mt-0.5 text-xs text-purple-300/50">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}
