"use client";

import { investmentsData } from "@/lib/mock-data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartArea, ChartDonut } from "@/components/charts";
import { TrendingUp, PieChart as PieIcon, ArrowUpRight, Zap } from "lucide-react";

export default function InvestmentsPage() {
    const d = investmentsData;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-zinc-500">Actions · ETFs · Crypto</p>
                <h1 className="text-3xl font-bold tracking-tight text-white">Investissements</h1>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Valeur Totale"
                    value={formatCurrency(d.totalValue)}
                    trend={{ value: formatPercent(d.todayChangePercent), positive: d.todayChange >= 0 }}
                    subtitle="Aujourd'hui"
                    icon={<TrendingUp size={18} />}
                />
                <KpiCard
                    title="Plus-Value Totale"
                    value={formatCurrency(d.totalPnl)}
                    trend={{ value: formatPercent(d.totalPnlPercent), positive: d.totalPnl >= 0 }}
                    subtitle="Depuis l'origine"
                    icon={<ArrowUpRight size={18} />}
                />
                <KpiCard
                    title="Performance Jour"
                    value={`${d.todayChange >= 0 ? "+" : ""}${formatCurrency(d.todayChange)}`}
                    icon={<Zap size={18} />}
                />
                <KpiCard
                    title="Diversification"
                    value={`${d.allocation.length} Classes`}
                    subtitle="Actions, ETFs, Crypto"
                    icon={<PieIcon size={18} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Performance historical */}
                <Card title="Performance du Portefeuille" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartArea data={d.performanceHistory} color="#10b981" height={280} />
                </Card>

                {/* Allocation Donut */}
                <Card title="Allocation d'Actifs">
                    <ChartDonut data={d.allocation} height={200} />
                    <div className="mt-4 space-y-2">
                        {d.allocation.map((a) => (
                            <div key={a.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: a.color }} />
                                    <span className="text-zinc-400">{a.name}</span>
                                </div>
                                <span className="font-medium text-zinc-200">{formatCurrency(a.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Positions Table */}
            <Card title="Positions Actives" subtitle={`${d.positions.length} actifs en portefeuille`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
                                <th className="pb-3 text-left font-medium">Actif</th>
                                <th className="pb-3 text-left font-medium">Type</th>
                                <th className="pb-3 text-right font-medium">Quantité</th>
                                <th className="pb-3 text-right font-medium">PRU</th>
                                <th className="pb-3 text-right font-medium">Prix Actuel</th>
                                <th className="pb-3 text-right font-medium">P&L</th>
                                <th className="pb-3 text-right font-medium">P&L %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                            {d.positions.map((pos) => (
                                <tr key={pos.symbol} className="transition-colors hover:bg-zinc-800/30">
                                    <td className="py-3.5">
                                        <div>
                                            <p className="font-semibold text-zinc-200">{pos.symbol}</p>
                                            <p className="text-xs text-zinc-500">{pos.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3.5">
                                        <span
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                                pos.type === "Action" && "bg-indigo-500/10 text-indigo-400",
                                                pos.type === "ETF" && "bg-cyan-500/10 text-cyan-400",
                                                pos.type === "Crypto" && "bg-amber-500/10 text-amber-400"
                                            )}
                                        >
                                            {pos.type}
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-right text-zinc-300">{pos.qty}</td>
                                    <td className="py-3.5 text-right text-zinc-400">{formatCurrency(pos.avgPrice)}</td>
                                    <td className="py-3.5 text-right font-medium text-zinc-200">{formatCurrency(pos.price)}</td>
                                    <td
                                        className={cn(
                                            "py-3.5 text-right font-semibold",
                                            pos.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                                        )}
                                    >
                                        {pos.pnl >= 0 ? "+" : ""}
                                        {formatCurrency(pos.pnl)}
                                    </td>
                                    <td
                                        className={cn(
                                            "py-3.5 text-right font-semibold",
                                            pos.pnlPercent >= 0 ? "text-emerald-400" : "text-red-400"
                                        )}
                                    >
                                        {formatPercent(pos.pnlPercent)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
