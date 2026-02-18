"use client";

import { useState } from "react";
import { financeData, type Transaction } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { ChartBar, ChartDonut } from "@/components/charts";
import { Wallet, CreditCard, PiggyBank, Landmark, Calendar, Tag, FileText, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function FinancePage() {
    const d = financeData;
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Finance</h1>
                <p className="mt-1 text-sm text-purple-300/50">Budget · Transactions · Revolut</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <KpiCard title="Solde Revolut" value={formatCurrency(d.balance)} icon={<Landmark size={16} />} />
                <KpiCard title="Revenus" value={formatCurrency(d.monthlyIncome)} icon={<Wallet size={16} />} />
                <KpiCard title="Dépenses" value={formatCurrency(d.monthlyExpenses)} icon={<CreditCard size={16} />} />
                <KpiCard
                    title="Épargne"
                    value={`${d.savingsRate}%`}
                    trend={{ value: "+3.2%", positive: true }}
                    icon={<PiggyBank size={16} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card title="Revenus vs Dépenses" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartBar
                        data={d.incomeVsExpenses}
                        dataKeys={[
                            { key: "income", color: "#10b981" },
                            { key: "expenses", color: "#ef4444" },
                        ]}
                        height={260}
                    />
                </Card>
                <Card title="Catégories">
                    <ChartDonut data={d.expensesByCategory} height={180} />
                    <div className="mt-4 space-y-2">
                        {d.expensesByCategory.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-purple-200/60">{cat.name}</span>
                                </div>
                                <span className="font-semibold text-white">{formatCurrency(cat.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Budget progress */}
            <Card title="Budget Mensuel" subtitle="Progression par catégorie">
                <div className="space-y-4">
                    {d.expensesByCategory.map((cat) => {
                        const budget = cat.value * 1.2; // Simulated budget = 120% of current
                        const pct = Math.round((cat.value / budget) * 100);
                        return (
                            <div key={cat.name} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-purple-200/70">{cat.name}</span>
                                    <span className="text-xs text-purple-300/40">
                                        {formatCurrency(cat.value)} / {formatCurrency(budget)}
                                    </span>
                                </div>
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(pct, 100)}%`,
                                            backgroundColor: pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : cat.color,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Transactions — CLICKABLE */}
            <Card title="Transactions Récentes" subtitle="Cliquez pour voir le détail">
                <div className="divide-y divide-purple-800/20">
                    {d.transactions.map((tx) => (
                        <div
                            key={tx.id}
                            onClick={() => setSelectedTx(tx)}
                            className="flex cursor-pointer items-center justify-between py-3.5 first:pt-0 last:pb-0 -mx-2 px-2 rounded-lg transition-colors hover:bg-purple-500/5 active:scale-[0.99]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/50 text-lg">
                                    {tx.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{tx.merchant}</p>
                                    <p className="text-xs text-purple-300/40">{tx.category} · {tx.date}</p>
                                </div>
                            </div>
                            <p className={cn("text-sm font-bold", tx.amount >= 0 ? "text-emerald-400" : "text-purple-100")}>
                                {tx.amount >= 0 ? "+" : ""}{formatCurrency(tx.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* ─── TRANSACTION DETAIL MODAL ───────────────────────── */}
            <Modal
                open={!!selectedTx}
                onClose={() => setSelectedTx(null)}
                title={selectedTx?.merchant}
                subtitle={selectedTx?.date}
            >
                {selectedTx && (
                    <div className="space-y-6">
                        {/* Amount hero */}
                        <div className="flex flex-col items-center gap-2 py-4">
                            <div className={cn(
                                "flex h-16 w-16 items-center justify-center rounded-2xl text-3xl",
                                selectedTx.amount >= 0 ? "bg-emerald-500/10" : "bg-purple-500/10"
                            )}>
                                {selectedTx.icon}
                            </div>
                            <p className={cn(
                                "text-3xl font-bold",
                                selectedTx.amount >= 0 ? "text-emerald-400" : "text-white"
                            )}>
                                {selectedTx.amount >= 0 ? "+" : ""}{formatCurrency(selectedTx.amount)}
                            </p>
                            <div className="flex items-center gap-1.5">
                                {selectedTx.amount >= 0 ? (
                                    <ArrowDownLeft size={14} className="text-emerald-400" />
                                ) : (
                                    <ArrowUpRight size={14} className="text-red-400" />
                                )}
                                <span className="text-sm text-purple-300/50">
                                    {selectedTx.amount >= 0 ? "Crédit" : "Débit"}
                                </span>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-purple-950/30 p-3">
                                <div className="flex items-center gap-1.5 text-purple-300/50">
                                    <Tag size={14} />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Catégorie</span>
                                </div>
                                <p className="mt-1 text-sm font-bold text-white">{selectedTx.category}</p>
                            </div>
                            <div className="rounded-xl bg-purple-950/30 p-3">
                                <div className="flex items-center gap-1.5 text-purple-300/50">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Date</span>
                                </div>
                                <p className="mt-1 text-sm font-bold text-white">{selectedTx.date} 2025</p>
                            </div>
                            <div className="col-span-2 rounded-xl bg-purple-950/30 p-3">
                                <div className="flex items-center gap-1.5 text-purple-300/50">
                                    <FileText size={14} />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Détail</span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-purple-200/60">{selectedTx.details}</p>
                            </div>
                        </div>

                        {/* Balance impact */}
                        <div className="card-glow rounded-2xl p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/50">Impact sur le solde</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-sm text-purple-200/60">Solde avant</span>
                                <span className="font-semibold text-white">{formatCurrency(d.balance - selectedTx.amount)}</span>
                            </div>
                            <div className="my-2 h-px bg-purple-800/20" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-purple-200/60">Solde après</span>
                                <span className="font-semibold text-white">{formatCurrency(d.balance)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
