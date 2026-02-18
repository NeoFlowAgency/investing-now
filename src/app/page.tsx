"use client";

import { useState } from "react";
import { globalData, neoflowData, investmentsData, financeData } from "@/lib/mock-data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { ChartArea, ChartDonut } from "@/components/charts";
import Link from "next/link";
import {
    Globe,
    Code2,
    TrendingUp,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    FolderKanban,
    Zap,
} from "lucide-react";

export default function DashboardPage() {
    const d = globalData;
    const [detailModal, setDetailModal] = useState<string | null>(null);

    const insights = [
        {
            id: "growth",
            title: "Patrimoine en hausse",
            description: `+${formatPercent(d.netWorthChange)} ce mois — votre patrimoine atteint ${formatCurrency(d.netWorth)}.`,
            type: "positive" as const,
        },
        {
            id: "agency",
            title: "NeoFlow Agency performe",
            description: `${neoflowData.activeProjects} projets actifs, ${formatCurrency(neoflowData.recurringRevenue)}/mois de récurrent. Pipeline de ${formatCurrency(neoflowData.pipelineValue)}.`,
            type: "positive" as const,
        },
        {
            id: "savings",
            title: "Épargne optimale",
            description: `Taux d'épargne de ${d.savingsRate}% — vous mettez de côté ${formatCurrency(d.monthlyIncome - d.monthlyExpenses)} par mois.`,
            type: "positive" as const,
        },
        {
            id: "invest",
            title: "Portefeuille solide",
            description: `+${formatPercent(investmentsData.totalPnlPercent)} de plus-value sur vos investissements (${formatCurrency(investmentsData.totalPnl)} de gains).`,
            type: "positive" as const,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Dashboard</h1>
                <p className="mt-1 text-sm text-purple-300/50">Bienvenue Noakim — Vue d&apos;ensemble de vos finances</p>
            </div>

            {/* KPIs — clickable, linking to detail pages */}
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
                        value={formatCurrency(d.totalAgency)}
                        subtitle={`${neoflowData.activeProjects} projets actifs →`}
                        icon={<Code2 size={16} />}
                    />
                </Link>
                <Link href="/investments">
                    <KpiCard
                        title="Investissements"
                        value={formatCurrency(d.totalInvestments)}
                        trend={{ value: formatPercent(investmentsData.totalPnlPercent), positive: true }}
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

                <Card title="Répartition Patrimoine">
                    <div className="space-y-5 pt-2">
                        {[
                            { label: "NeoFlow Agency", pct: Math.round((d.totalAgency / d.netWorth) * 100), color: "from-purple-500 to-indigo-600", href: "/neoflow" },
                            { label: "Investissements", pct: Math.round((d.totalInvestments / d.netWorth) * 100), color: "from-emerald-500 to-teal-600", href: "/investments" },
                            { label: "Liquidités", pct: Math.round((d.totalCash / d.netWorth) * 100), color: "from-cyan-400 to-blue-500", href: "/finance" },
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

            {/* Quick Activity from NeoFlow Agency */}
            <Card
                title="NeoFlow Agency — Activité"
                subtitle={`${neoflowData.activeProjects} projets en cours`}
                action={
                    <Link href="/neoflow" className="flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-200 transition-colors">
                        Tout voir <ArrowUpRight size={12} />
                    </Link>
                }
            >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {neoflowData.projects.filter(p => p.status === "en_cours").map((project) => (
                        <Link key={project.id} href="/neoflow">
                            <div className="flex items-center gap-3 rounded-xl bg-purple-950/20 p-3.5 transition-colors hover:bg-purple-900/20">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-950/50 text-lg">
                                    {project.clientLogo}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-semibold text-white">{project.name}</p>
                                    <p className="text-xs text-purple-300/40">{project.client}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-white">{Math.round((project.hoursSpent / project.hoursEstimated) * 100)}%</p>
                                    <p className="text-[10px] text-purple-300/40">avancement</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Card>

            {/* Insights */}
            <Card title="Insights" subtitle="Analyse automatique">
                <div className="grid gap-3 sm:grid-cols-2">
                    {insights.map((insight) => (
                        <div key={insight.id} className="flex gap-3 rounded-xl bg-purple-950/20 p-4">
                            <div className="mt-0.5">
                                {insight.type === "positive" ? (
                                    <Zap size={16} className="text-emerald-400" />
                                ) : (
                                    <ArrowDownRight size={16} className="text-red-400" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{insight.title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-purple-200/50">{insight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Revenue / Expenses / Savings */}
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

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            { label: "NeoFlow Agency", value: d.totalAgency, pct: Math.round((d.totalAgency / d.netWorth) * 100), color: "#8b5cf6" },
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

                    <ChartDonut
                        data={[
                            { name: "NeoFlow Agency", value: d.totalAgency, color: "#8b5cf6" },
                            { name: "Investissements", value: d.totalInvestments, color: "#10b981" },
                            { name: "Liquidités", value: d.totalCash, color: "#06b6d4" },
                        ]}
                        height={220}
                    />

                    <div>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/50">Évolution</h4>
                        <div className="card-glow rounded-2xl p-4">
                            <ChartArea data={d.wealthHistory} color="#8b5cf6" height={200} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
