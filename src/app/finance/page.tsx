"use client";

import { MOCK_DATA } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { Wallet, CreditCard, PiggyBank, ArrowDown } from "lucide-react";

export default function FinancePage() {
    const data = MOCK_DATA.finance;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Finances Personnelles</h2>
                <p className="text-muted-foreground mt-1">
                    Gestion du budget et suivi des transactions quotidiennes.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Revenus Mensuels"
                    value={`$${data.monthlyIncome.toLocaleString()}`}
                    trend="neutral"
                    icon={<Wallet className="h-4 w-4 text-blue-500" />}
                />
                <StatCard
                    title="Dépenses Mensuelles"
                    value={`$${data.monthlyExpenses.toLocaleString()}`}
                    trend="down"
                    trendValue="Healthy"
                    icon={<CreditCard className="h-4 w-4 text-orange-500" />}
                />
                <StatCard
                    title="Taux d'Épargne"
                    value={`${data.savingsRate}%`}
                    trend="up"
                    description="Target: 50%"
                    icon={<PiggyBank className="h-4 w-4 text-green-500" />}
                />
            </div>

            {/* Transactions List */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Transactions Récentes</h3>
                    <button className="text-sm text-blue-600 hover:underline">Voir tout</button>
                </div>

                <div className="space-y-4">
                    {data.recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${tx.amount > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                                    {tx.amount > 0 ? <Wallet className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{tx.merchant}</p>
                                    <p className="text-xs text-muted-foreground">{tx.date} • {tx.category}</p>
                                </div>
                            </div>
                            <div className={`font-medium ${tx.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                                {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} €
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
