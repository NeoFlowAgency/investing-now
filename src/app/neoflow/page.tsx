"use client";

import { neoflowData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartBar, ChartLine } from "@/components/charts";
import { cn } from "@/lib/utils";
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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-zinc-500">Stripe Integration</p>
                <h1 className="text-3xl font-bold tracking-tight text-white">NeoFlow BOS</h1>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <KpiCard
                    title="MRR"
                    value={formatCurrency(d.mrr)}
                    trend={{ value: `+${d.mrrChange}%`, positive: true }}
                    icon={<DollarSign size={18} />}
                />
                <KpiCard
                    title="ARR"
                    value={formatCurrency(d.arr)}
                    icon={<TrendingUp size={18} />}
                />
                <KpiCard
                    title="Clients Actifs"
                    value={String(d.activeSubscribers)}
                    icon={<Users size={18} />}
                />
                <KpiCard
                    title="Nouveaux"
                    value={`+${d.newCustomersThisMonth}`}
                    subtitle="ce mois"
                    icon={<UserPlus size={18} />}
                />
                <KpiCard
                    title="Churn"
                    value={`${d.churnRate}%`}
                    trend={{ value: "-0.5%", positive: true }}
                    icon={<Activity size={18} />}
                />
                <KpiCard
                    title="LTV"
                    value={formatCurrency(d.ltv)}
                    subtitle={`ARPU: ${formatCurrency(d.avgRevenuePerUser)}`}
                    icon={<UserMinus size={18} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-7">
                <Card title="Revenus Mensuels" subtitle="Évolution MRR" className="lg:col-span-4">
                    <ChartBar
                        data={d.revenueHistory}
                        dataKeys={[{ key: "revenue", color: "#6366f1" }]}
                        height={300}
                    />
                </Card>

                <Card title="Croissance Clients" className="lg:col-span-3">
                    <ChartLine
                        data={d.revenueHistory}
                        lines={[{ key: "customers", color: "#06b6d4" }]}
                        height={300}
                    />
                </Card>
            </div>

            {/* Events Feed */}
            <Card title="Activité Récente" subtitle="Nouveaux clients, désabonnements, renouvellements">
                <div className="divide-y divide-zinc-800/60">
                    {d.recentEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full text-sm",
                                        event.type === "new" && "bg-emerald-500/10 text-emerald-400",
                                        event.type === "churned" && "bg-red-500/10 text-red-400",
                                        event.type === "renewed" && "bg-cyan-500/10 text-cyan-400"
                                    )}
                                >
                                    {event.type === "new" && <UserPlus size={16} />}
                                    {event.type === "churned" && <UserMinus size={16} />}
                                    {event.type === "renewed" && <Activity size={16} />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-200">{event.name}</p>
                                    <p className="text-xs text-zinc-500">
                                        {event.plan} — {event.date}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p
                                    className={cn(
                                        "text-sm font-semibold",
                                        event.type === "churned" ? "text-red-400" : "text-emerald-400"
                                    )}
                                >
                                    {event.type === "churned" ? "-" : "+"}{formatCurrency(event.amount)}/mo
                                </p>
                                <p
                                    className={cn(
                                        "text-xs font-medium",
                                        event.type === "new" && "text-emerald-500",
                                        event.type === "churned" && "text-red-500",
                                        event.type === "renewed" && "text-cyan-500"
                                    )}
                                >
                                    {event.type === "new" && "Nouveau client"}
                                    {event.type === "churned" && "Désabonné"}
                                    {event.type === "renewed" && "Renouvelé"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
