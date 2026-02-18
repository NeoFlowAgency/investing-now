"use client";

import { globalData } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartArea } from "@/components/charts";
import { Globe, Briefcase, TrendingUp, Wallet } from "lucide-react";

export default function DashboardPage() {
    const d = globalData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Dashboard</h1>
                <p className="mt-1 text-sm text-purple-300/50">Bienvenue Noakim</p>
            </div>

            {/* KPIs — 4 colonnes desktop, 2 mobile */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <KpiCard
                    title="Patrimoine Net"
                    value={formatCurrency(d.netWorth)}
                    trend={{ value: formatPercent(d.netWorthChange), positive: true }}
                    icon={<Globe size={16} />}
                />
                <KpiCard
                    title="NeoFlow Agency"
                    value={formatCurrency(d.totalBusiness)}
                    subtitle="Business SaaS"
                    icon={<Briefcase size={16} />}
                />
                <KpiCard
                    title="Investissements"
                    value={formatCurrency(d.totalInvestments)}
                    trend={{ value: "+16.2%", positive: true }}
                    icon={<TrendingUp size={16} />}
                />
                <KpiCard
                    title="Liquidités"
                    value={formatCurrency(d.totalCash)}
                    subtitle="Revolut"
                    icon={<Wallet size={16} />}
                />
            </div>

            {/* Charts — on mobile, stack vertically */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card title="Évolution du Patrimoine" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartArea data={d.wealthHistory} color="#8b5cf6" height={260} />
                </Card>

                <Card title="Répartition Macro">
                    <div className="space-y-5 pt-2">
                        {[
                            { label: "NeoFlow Agency", pct: 31, color: "from-purple-500 to-indigo-600" },
                            { label: "Marchés Financiers", pct: 60, color: "from-emerald-500 to-teal-600" },
                            { label: "Liquidités", pct: 9, color: "from-cyan-400 to-blue-500" },
                        ].map((item) => (
                            <div key={item.label} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-purple-200/60">{item.label}</span>
                                    <span className="font-semibold text-white">{item.pct}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                        style={{ width: `${item.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <Card className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400/50">Revenus / mois</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-400">{formatCurrency(d.monthlyIncome)}</p>
                </Card>
                <Card className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400/50">Dépenses / mois</p>
                    <p className="mt-1 text-2xl font-bold text-red-400">{formatCurrency(d.monthlyExpenses)}</p>
                </Card>
                <Card className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400/50">Taux d&apos;épargne</p>
                    <p className="mt-1 text-2xl font-bold text-purple-300">{d.savingsRate}%</p>
                </Card>
            </div>
        </div>
    );
}
