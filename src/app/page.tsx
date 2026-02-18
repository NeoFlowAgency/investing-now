"use client";

import { useState } from "react";
import { globalData, neoflowData, investmentsData, financeData } from "@/lib/mock-data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { ChartArea, ChartBar, ChartDonut } from "@/components/charts";
import Link from "next/link";
import {
    Globe,
    Briefcase,
    TrendingUp,
    Wallet,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
    const d = globalData;
    const [detailModal, setDetailModal] = useState<string | null>(null);

    // Quick insights
    const insights = [
        {
            id: "net-worth",
            title: "Patrimoine en hausse",
            description: `Votre patrimoine a progressé de ${formatPercent(d.netWorthChange)} ce mois. Continue comme ça !`,
            type: "positive" as const,
        },
        {
            id: "savings",
            title: "Excellent taux d'épargne",
            description: `${d.savingsRate}% de vos revenus sont épargnés — bien au-dessus de la moyenne.`,
            type: "positive" as const,
        },
        {
            id: "mrr",
            title: "NeoFlow en croissance",
            description: `MRR de ${formatCurrency(neoflowData.mrr)} avec +${neoflowData.newCustomersThisMonth} nouveaux clients ce mois.`,
            type: "positive" as const,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Dashboard</h1>
                <p className="mt-1 text-sm text-purple-300/50">Bienvenue Noakim</p>
            </div>

            {/* KPIs — clickable */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <div onClick={() => setDetailModal("net-worth")} className="cursor-pointer">
                    <KpiCard
                        title="Patrimoine Net"
                        value={formatCurrency(d.netWorth)}
                        trend={{ value: formatPercent(d.netWorthChange), positive: true }}
                        icon={<Globe size={16} />}
                    />
                </div>
                <Link href="/neoflow">
                    <KpiCard
                        title="NeoFlow Agency"
                        value={formatCurrency(d.totalBusiness)}
                        subtitle="Business SaaS →"
                        icon={<Briefcase size={16} />}
                    />
                </Link>
                <Link href="/investments">
                    <KpiCard
                        title="Investissements"
                        value={formatCurrency(d.totalInvestments)}
                        trend={{ value: "+16.2%", positive: true }}
                        icon={<TrendingUp size={16} />}
                    />
                </Link>
                <Link href="/finance">
                    <KpiCard
                        title="Liquidités"
                        value={formatCurrency(d.totalCash)}
                        subtitle="Revolut →"
                        icon={<Wallet size={16} />}
                    />
                </Link>
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card title="Évolution du Patrimoine" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartArea data={d.wealthHistory} color="#8b5cf6" height={260} />
                </Card>

                <Card title="Répartition Macro">
                    <div className="space-y-5 pt-2">
                        {[
                            { label: "NeoFlow Agency", pct: 31, color: "from-purple-500 to-indigo-600", href: "/neoflow" },
                            { label: "Marchés Financiers", pct: 60, color: "from-emerald-500 to-teal-600", href: "/investments" },
                            { label: "Liquidités", pct: 9, color: "from-cyan-400 to-blue-500", href: "/finance" },
                        ].map((item) => (
                            <Link key={item.label} href={item.href} className="block space-y-1.5 group">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-purple-200/60 group-hover:text-purple-100 transition-colors">{item.label}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-white">{item.pct}%</span>
                                        <ChevronRight size={14} className="text-purple-500/40 group-hover:text-purple-300 transition-colors" />
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.pct}%` }} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Insights */}
            <Card title="Insights" subtitle="Analyse automatique de vos finances">
                <div className="grid gap-3 sm:grid-cols-3">
                    {insights.map((insight) => (
                        <div
                            key={insight.id}
                            className="rounded-xl bg-purple-950/20 p-4 transition-colors hover:bg-purple-900/20"
                        >
                            <div className="flex items-center gap-2">
                                {insight.type === "positive" ? (
                                    <ArrowUpRight size={16} className="text-emerald-400" />
                                ) : (
                                    <ArrowDownRight size={16} className="text-red-400" />
                                )}
                                <p className="text-sm font-semibold text-white">{insight.title}</p>
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-purple-200/50">{insight.description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quick links row */}
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

            {/* ─── Net Worth Detail Modal ─────────────────────────── */}
            <Modal
                open={detailModal === "net-worth"}
                onClose={() => setDetailModal(null)}
                title="Patrimoine Net"
                subtitle="Décomposition complète"
                wide
            >
                <div className="space-y-6">
                    <div className="flex flex-col items-center gap-1 py-2">
                        <p className="text-4xl font-bold text-white">{formatCurrency(d.netWorth)}</p>
                        <p className="text-sm font-semibold text-emerald-400">↑ {formatPercent(d.netWorthChange)} ce mois</p>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            { label: "Business (SaaS)", value: d.totalBusiness, pct: Math.round((d.totalBusiness / d.netWorth) * 100), color: "#8b5cf6" },
                            { label: "Investissements", value: d.totalInvestments, pct: Math.round((d.totalInvestments / d.netWorth) * 100), color: "#10b981" },
                            { label: "Liquidités", value: d.totalCash, pct: Math.round((d.totalCash / d.netWorth) * 100), color: "#06b6d4" },
                        ].map((item) => (
                            <div key={item.label} className="rounded-xl bg-purple-950/30 p-4 text-center">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">{item.label}</p>
                                <p className="mt-1 text-xl font-bold text-white">{formatCurrency(item.value)}</p>
                                <p className="text-xs text-purple-300/40">{item.pct}% du total</p>
                            </div>
                        ))}
                    </div>

                    {/* Donut */}
                    <ChartDonut
                        data={[
                            { name: "Business", value: d.totalBusiness, color: "#8b5cf6" },
                            { name: "Investissements", value: d.totalInvestments, color: "#10b981" },
                            { name: "Liquidités", value: d.totalCash, color: "#06b6d4" },
                        ]}
                        height={220}
                    />

                    {/* Historical chart */}
                    <div>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/50">Évolution</h4>
                        <div className="card-glow rounded-2xl p-4">
                            <ChartArea data={d.wealthHistory} color="#8b5cf6" height={200} />
                        </div>
                    </div>

                    {/* Monthly stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-purple-950/30 p-3 text-center">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">Revenus</p>
                            <p className="mt-1 text-lg font-bold text-emerald-400">{formatCurrency(d.monthlyIncome)}</p>
                        </div>
                        <div className="rounded-xl bg-purple-950/30 p-3 text-center">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">Dépenses</p>
                            <p className="mt-1 text-lg font-bold text-red-400">{formatCurrency(d.monthlyExpenses)}</p>
                        </div>
                        <div className="rounded-xl bg-purple-950/30 p-3 text-center">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">Épargne</p>
                            <p className="mt-1 text-lg font-bold text-purple-300">{d.savingsRate}%</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
