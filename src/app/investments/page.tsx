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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Investissement</h1>
                <p className="mt-1 text-sm text-purple-300/50">Actions · ETFs · Crypto</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <KpiCard
                    title="Valeur Totale"
                    value={formatCurrency(d.totalValue)}
                    trend={{ value: formatPercent(d.todayChangePercent), positive: d.todayChange >= 0 }}
                    icon={<TrendingUp size={16} />}
                />
                <KpiCard
                    title="Plus-Value"
                    value={formatCurrency(d.totalPnl)}
                    trend={{ value: formatPercent(d.totalPnlPercent), positive: d.totalPnl >= 0 }}
                    icon={<ArrowUpRight size={16} />}
                />
                <KpiCard
                    title="Jour"
                    value={`${d.todayChange >= 0 ? "+" : ""}${formatCurrency(d.todayChange)}`}
                    icon={<Zap size={16} />}
                />
                <KpiCard
                    title="Classes"
                    value={`${d.allocation.length}`}
                    subtitle="Diversification"
                    icon={<PieIcon size={16} />}
                />
            </div>

            {/* Performance + Allocation */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card title="Performance" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartArea data={d.performanceHistory} color="#10b981" height={260} />
                </Card>

                <Card title="Allocation">
                    <ChartDonut data={d.allocation} height={180} />
                    <div className="mt-4 space-y-2">
                        {d.allocation.map((a) => (
                            <div key={a.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: a.color }} />
                                    <span className="text-purple-200/60">{a.name}</span>
                                </div>
                                <span className="font-semibold text-white">{formatCurrency(a.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Positions — cards on mobile, table on desktop */}
            <Card title="Positions Actives" subtitle={`${d.positions.length} actifs`}>
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-purple-800/30 text-xs uppercase tracking-wider text-purple-300/40">
                                <th className="pb-3 text-left font-medium">Actif</th>
                                <th className="pb-3 text-left font-medium">Type</th>
                                <th className="pb-3 text-right font-medium">Qté</th>
                                <th className="pb-3 text-right font-medium">PRU</th>
                                <th className="pb-3 text-right font-medium">Prix</th>
                                <th className="pb-3 text-right font-medium">P&L</th>
                                <th className="pb-3 text-right font-medium">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-800/20">
                            {d.positions.map((pos) => (
                                <tr key={pos.symbol} className="transition-colors hover:bg-purple-500/5">
                                    <td className="py-3.5">
                                        <p className="font-semibold text-white">{pos.symbol}</p>
                                        <p className="text-xs text-purple-300/40">{pos.name}</p>
                                    </td>
                                    <td className="py-3.5">
                                        <span
                                            className={cn(
                                                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                                                pos.type === "Action" && "bg-indigo-500/15 text-indigo-300",
                                                pos.type === "ETF" && "bg-cyan-500/15 text-cyan-300",
                                                pos.type === "Crypto" && "bg-amber-500/15 text-amber-300"
                                            )}
                                        >
                                            {pos.type}
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-right text-purple-100">{pos.qty}</td>
                                    <td className="py-3.5 text-right text-purple-300/50">{formatCurrency(pos.avgPrice)}</td>
                                    <td className="py-3.5 text-right font-medium text-white">{formatCurrency(pos.price)}</td>
                                    <td
                                        className={cn(
                                            "py-3.5 text-right font-bold",
                                            pos.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                                        )}
                                    >
                                        {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)}
                                    </td>
                                    <td
                                        className={cn(
                                            "py-3.5 text-right font-bold",
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

                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                    {d.positions.map((pos) => (
                        <div key={pos.symbol} className="flex items-center justify-between rounded-xl bg-purple-950/30 p-3.5">
                            <div>
                                <p className="font-semibold text-white">{pos.symbol}</p>
                                <p className="text-xs text-purple-300/40">{pos.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-white">{formatCurrency(pos.price)}</p>
                                <p
                                    className={cn(
                                        "text-xs font-bold",
                                        pos.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                                    )}
                                >
                                    {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)} ({formatPercent(pos.pnlPercent)})
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
