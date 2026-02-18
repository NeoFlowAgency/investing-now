"use client";

import { financeData } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartBar, ChartDonut } from "@/components/charts";
import { Wallet, CreditCard, PiggyBank, Landmark } from "lucide-react";

export default function FinancePage() {
    const d = financeData;

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

            {/* Transactions */}
            <Card title="Transactions Récentes" subtitle="Dernières opérations">
                <div className="divide-y divide-purple-800/20">
                    {d.transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/50 text-lg">
                                    {tx.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{tx.merchant}</p>
                                    <p className="text-xs text-purple-300/40">{tx.category} · {tx.date}</p>
                                </div>
                            </div>
                            <p
                                className={cn(
                                    "text-sm font-bold",
                                    tx.amount >= 0 ? "text-emerald-400" : "text-purple-100"
                                )}
                            >
                                {tx.amount >= 0 ? "+" : ""}{formatCurrency(tx.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
