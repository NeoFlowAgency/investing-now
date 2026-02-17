"use client";

import { globalData } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartArea } from "@/components/charts";
import { Globe, Briefcase, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
    const d = globalData;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500">Bienvenue, Noakim</p>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Vue Globale</h1>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#1a1b23] px-4 py-2">
                    <span className="text-xs text-zinc-500">Net Worth</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(d.netWorth)}</span>
                    <span className="flex items-center text-xs font-semibold text-emerald-400">
                        <ArrowUpRight size={14} /> {formatPercent(d.netWorthChange)}
                    </span>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Patrimoine Net"
                    value={formatCurrency(d.netWorth)}
                    trend={{ value: formatPercent(d.netWorthChange), positive: true }}
                    icon={<Globe size={18} />}
                />
                <KpiCard
                    title="Business (SaaS)"
                    value={formatCurrency(d.totalBusiness)}
                    subtitle="NeoFlow BOS"
                    icon={<Briefcase size={18} />}
                />
                <KpiCard
                    title="Investissements"
                    value={formatCurrency(d.totalInvestments)}
                    trend={{ value: "+16.2%", positive: true }}
                    icon={<TrendingUp size={18} />}
                />
                <KpiCard
                    title="Liquidités"
                    value={formatCurrency(d.totalCash)}
                    subtitle="Revolut"
                    icon={<Wallet size={18} />}
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Wealth Evolution */}
                <Card title="Évolution du Patrimoine" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartArea data={d.wealthHistory} color="#6366f1" height={280} />
                </Card>

                {/* Asset Repartition */}
                <Card title="Répartition Macro">
                    <div className="space-y-5 pt-2">
                        {[
                            { label: "NeoFlow Agency", pct: 31, color: "bg-indigo-500" },
                            { label: "Marchés Financiers", pct: 60, color: "bg-emerald-500" },
                            { label: "Liquidités", pct: 9, color: "bg-cyan-500" },
                        ].map((item) => (
                            <div key={item.label} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-400">{item.label}</span>
                                    <span className="font-semibold text-zinc-200">{item.pct}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Revenue vs Expenses Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card className="flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Revenus / mois</p>
                    <p className="mt-1 text-3xl font-bold text-emerald-400">{formatCurrency(d.monthlyIncome)}</p>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Dépenses / mois</p>
                    <p className="mt-1 text-3xl font-bold text-red-400">{formatCurrency(d.monthlyExpenses)}</p>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Taux d&apos;épargne</p>
                    <p className="mt-1 text-3xl font-bold text-cyan-400">{d.savingsRate}%</p>
                </Card>
            </div>
        </div>
    );
}
