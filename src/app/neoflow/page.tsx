"use client";

import { neoflowData } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartBar, ChartLine } from "@/components/charts";
import {
    DollarSign,
    Users,
    UserPlus,
    UserMinus,
    Activity,
    TrendingUp,
} from "lucide-react";

export default function NeoFlowPage() {
    const d = neoflowData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">NeoFlow BOS</h1>
                <p className="mt-1 text-sm text-purple-300/50">Stripe · SaaS Metrics</p>
            </div>

            {/* KPIs — wrap nicely on mobile */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 xl:gap-4">
                <KpiCard
                    title="MRR"
                    value={formatCurrency(d.mrr)}
                    trend={{ value: `+${d.mrrChange}%`, positive: true }}
                    icon={<DollarSign size={16} />}
                />
                <KpiCard title="ARR" value={formatCurrency(d.arr)} icon={<TrendingUp size={16} />} />
                <KpiCard title="Clients Actifs" value={String(d.activeSubscribers)} icon={<Users size={16} />} />
                <KpiCard title="Nouveaux" value={`+${d.newCustomersThisMonth}`} subtitle="ce mois" icon={<UserPlus size={16} />} />
                <KpiCard
                    title="Churn"
                    value={`${d.churnRate}%`}
                    trend={{ value: "-0.5%", positive: true }}
                    icon={<Activity size={16} />}
                    className="col-span-2 md:col-span-1"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Revenus Mensuels" subtitle="Évolution MRR">
                    <ChartBar
                        data={d.revenueHistory}
                        dataKeys={[{ key: "revenue", color: "#8b5cf6" }]}
                        height={280}
                    />
                </Card>
                <Card title="Croissance Clients">
                    <ChartLine
                        data={d.revenueHistory}
                        lines={[{ key: "customers", color: "#06b6d4" }]}
                        height={280}
                    />
                </Card>
            </div>

            {/* Events */}
            <div className="grid gap-4 lg:grid-cols-3">
                {d.recentEvents.map((event) => (
                    <Card key={event.id} className="flex items-center gap-4">
                        <div
                            className={cn(
                                "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
                                event.type === "new" && "bg-emerald-500/10 text-emerald-400",
                                event.type === "churned" && "bg-red-500/10 text-red-400",
                                event.type === "renewed" && "bg-cyan-500/10 text-cyan-400"
                            )}
                        >
                            {event.type === "new" && <UserPlus size={18} />}
                            {event.type === "churned" && <UserMinus size={18} />}
                            {event.type === "renewed" && <Activity size={18} />}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-semibold text-white">{event.name}</p>
                            <p className="text-xs text-purple-300/50">{event.plan} · {event.date}</p>
                        </div>
                        <p
                            className={cn(
                                "text-sm font-bold whitespace-nowrap",
                                event.type === "churned" ? "text-red-400" : "text-emerald-400"
                            )}
                        >
                            {event.type === "churned" ? "-" : "+"}{formatCurrency(event.amount)}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
