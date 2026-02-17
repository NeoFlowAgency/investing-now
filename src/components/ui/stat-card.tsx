import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends ComponentProps<"div"> {
    title: string;
    value: string | number;
    description?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: React.ReactNode;
}

export function StatCard({ title, value, description, trend, trendValue, icon, className, ...props }: StatCardProps) {
    return (
        <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-6", className)} {...props}>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
            <div className="content">
                <div className="text-2xl font-bold">{value}</div>
                {(description || trendValue) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        {trend === "up" && <span className="text-green-500 mr-1">↑ {trendValue}</span>}
                        {trend === "down" && <span className="text-red-500 mr-1">↓ {trendValue}</span>}
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
