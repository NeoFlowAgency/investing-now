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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-zinc-500">Budget & Transactions</p>
                <h1 className="text-3xl font-bold tracking-tight text-white">Finances Personnelles</h1>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Solde Revolut"
                    value={formatCurrency(d.balance)}
                    icon={<Landmark size={18} />}
                />
                <KpiCard
                    title="Revenus / mois"
                    value={formatCurrency(d.monthlyIncome)}
                    icon={<Wallet size={18} />}
                />
                <KpiCard
                    title="Dépenses / mois"
                    value={formatCurrency(d.monthlyExpenses)}
                    icon={<CreditCard size={18} />}
                />
                <KpiCard
                    title="Taux d'Épargne"
                    value={`${d.savingsRate}%`}
                    trend={{ value: "+3.2%", positive: true }}
                    subtitle="vs mois précédent"
                    icon={<PiggyBank size={18} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Income vs Expenses */}
                <Card title="Revenus vs Dépenses" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartBar
                        data={d.incomeVsExpenses}
                        dataKeys={[
                            { key: "income", color: "#10b981" },
                            { key: "expenses", color: "#ef4444" },
                        ]}
                        height={280}
                    />
                </Card>

                {/* Spending Categories */}
                <Card title="Répartition Dépenses">
                    <ChartDonut data={d.expensesByCategory} height={200} />
                    <div className="mt-4 space-y-2">
                        {d.expensesByCategory.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-zinc-400">{cat.name}</span>
                                </div>
                                <span className="font-medium text-zinc-200">{formatCurrency(cat.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Transactions */}
            <Card title="Transactions Récentes" subtitle="Dernières opérations Revolut">
                <div className="divide-y divide-zinc-800/60">
                    {d.transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-lg">
                                    {tx.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-200">{tx.merchant}</p>
                                    <p className="text-xs text-zinc-500">{tx.category} · {tx.date}</p>
                                </div>
                            </div>
                            <p
                                className={cn(
                                    "text-sm font-semibold",
                                    tx.amount >= 0 ? "text-emerald-400" : "text-zinc-300"
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
