"use client";

import { useState } from "react";
import { investmentsData, type Position } from "@/lib/mock-data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import TimelineSelector, { type Timeframe } from "@/components/timeline-selector";
import { ChartArea, ChartDonut } from "@/components/charts";
import {
    TrendingUp,
    PieChart as PieIcon,
    ArrowUpRight,
    Zap,
    Building2,
    BarChart3,
    Percent,
    Activity,
    Calendar,
    DollarSign,
} from "lucide-react";

export default function InvestmentsPage() {
    const d = investmentsData;
    const [selected, setSelected] = useState<Position | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>("6M");

    // Filter price history based on timeframe
    const getFilteredHistory = (pos: Position) => {
        const map: Record<Timeframe, number> = { "1J": 1, "1S": 1, "1M": 1, "3M": 3, "6M": 6, "1A": 12, MAX: 999 };
        const months = map[timeframe] || 6;
        return pos.priceHistory.slice(-months - 1);
    };

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

            {/* Positions — CLICKABLE */}
            <Card title="Positions Actives" subtitle="Cliquez sur un actif pour voir le détail">
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
                                <tr
                                    key={pos.symbol}
                                    onClick={() => setSelected(pos)}
                                    className="cursor-pointer transition-colors hover:bg-purple-500/8"
                                >
                                    <td className="py-3.5">
                                        <p className="font-semibold text-white">{pos.symbol}</p>
                                        <p className="text-xs text-purple-300/40">{pos.name}</p>
                                    </td>
                                    <td className="py-3.5">
                                        <span className={cn(
                                            "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                                            pos.type === "Action" && "bg-indigo-500/15 text-indigo-300",
                                            pos.type === "ETF" && "bg-cyan-500/15 text-cyan-300",
                                            pos.type === "Crypto" && "bg-amber-500/15 text-amber-300"
                                        )}>
                                            {pos.type}
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-right text-purple-100">{pos.qty}</td>
                                    <td className="py-3.5 text-right text-purple-300/50">{formatCurrency(pos.avgPrice)}</td>
                                    <td className="py-3.5 text-right font-medium text-white">{formatCurrency(pos.price)}</td>
                                    <td className={cn("py-3.5 text-right font-bold", pos.pnl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                        {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)}
                                    </td>
                                    <td className={cn("py-3.5 text-right font-bold", pos.pnlPercent >= 0 ? "text-emerald-400" : "text-red-400")}>
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
                        <div
                            key={pos.symbol}
                            onClick={() => setSelected(pos)}
                            className="flex cursor-pointer items-center justify-between rounded-xl bg-purple-950/30 p-3.5 transition-colors active:bg-purple-900/30"
                        >
                            <div>
                                <p className="font-semibold text-white">{pos.symbol}</p>
                                <p className="text-xs text-purple-300/40">{pos.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-white">{formatCurrency(pos.price)}</p>
                                <p className={cn("text-xs font-bold", pos.pnl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                    {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)} ({formatPercent(pos.pnlPercent)})
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* ─── ASSET DETAIL MODAL ─────────────────────────────── */}
            <Modal
                open={!!selected}
                onClose={() => setSelected(null)}
                title={selected ? `${selected.symbol} — ${selected.name}` : ""}
                subtitle={selected?.sector}
                wide
            >
                {selected && (
                    <div className="space-y-6">
                        {/* Price + PnL header */}
                        <div className="flex flex-wrap items-end gap-4">
                            <div>
                                <p className="text-3xl font-bold text-white">{formatCurrency(selected.price)}</p>
                                <p className={cn("text-sm font-semibold", selected.pnl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                    {selected.pnl >= 0 ? "+" : ""}{formatCurrency(selected.pnl)} ({formatPercent(selected.pnlPercent)})
                                </p>
                            </div>
                            <div className="ml-auto">
                                <TimelineSelector value={timeframe} onChange={setTimeframe} />
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="card-glow rounded-2xl p-4">
                            <ChartArea
                                data={getFilteredHistory(selected)}
                                dataKey="price"
                                xKey="date"
                                color={selected.pnl >= 0 ? "#10b981" : "#ef4444"}
                                height={250}
                            />
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: "Market Cap", value: selected.marketCap, icon: <Building2 size={14} /> },
                                { label: "P/E Ratio", value: selected.peRatio || "N/A", icon: <BarChart3 size={14} /> },
                                { label: "Dividende", value: selected.dividend, icon: <Percent size={14} /> },
                                { label: "Volume 24h", value: selected.volume, icon: <Activity size={14} /> },
                                { label: "Plus Haut 52s", value: formatCurrency(selected.high52w), icon: <ArrowUpRight size={14} /> },
                                { label: "Plus Bas 52s", value: formatCurrency(selected.low52w), icon: <TrendingUp size={14} /> },
                                { label: "Quantité", value: String(selected.qty), icon: <DollarSign size={14} /> },
                                { label: "PRU", value: formatCurrency(selected.avgPrice), icon: <Calendar size={14} /> },
                            ].map((m) => (
                                <div key={m.label} className="rounded-xl bg-purple-950/30 p-3">
                                    <div className="flex items-center gap-1.5 text-purple-300/50">
                                        {m.icon}
                                        <span className="text-[10px] font-semibold uppercase tracking-wider">{m.label}</span>
                                    </div>
                                    <p className="mt-1 text-sm font-bold text-white">{m.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-300/50">À propos</h4>
                            <p className="text-sm leading-relaxed text-purple-200/60">{selected.description}</p>
                        </div>

                        {/* Transaction History */}
                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/50">
                                Historique d&apos;achats
                            </h4>
                            <div className="divide-y divide-purple-800/20">
                                {selected.transactions.map((tx, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                        <div>
                                            <p className="text-sm font-medium text-white">{tx.type} × {tx.qty}</p>
                                            <p className="text-xs text-purple-300/40">{tx.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-white">{formatCurrency(tx.total)}</p>
                                            <p className="text-xs text-purple-300/40">@ {formatCurrency(tx.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
