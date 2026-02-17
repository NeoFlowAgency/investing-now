"use client";

import { MOCK_DATA } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { Globe, Briefcase, TrendingUp, Wallet } from "lucide-react";

export default function Home() {
    const { global, neoflow, investments } = MOCK_DATA;

    // Aggregate simulated data for the chart
    const globalPerformanceData = [
        { name: "Jan", value: 120000 },
        { name: "Feb", value: 125000 },
        { name: "Mar", value: 130000 },
        { name: "Apr", value: 128000 },
        { name: "May", value: 135000 },
        { name: "Jun", value: global.netWorth },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Vue Globale</h2>
                    <p className="text-muted-foreground mt-1">
                        Bienvenue Noakim. Voici la synthèse de votre patrimoine.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground">Net Worth Total</p>
                    <p className="text-3xl font-bold text-primary">${global.netWorth.toLocaleString()}</p>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Patrimoine Net"
                    value={`$${global.netWorth.toLocaleString()}`}
                    trend="up"
                    trendValue="4.5%"
                    icon={<Globe className="h-4 w-4 text-blue-500" />}
                    className="border-l-4 border-l-blue-500"
                />
                <StatCard
                    title="Business Valuation (SaaS)"
                    value={`$${global.totalBusinessValue.toLocaleString()}`}
                    description="Estimation basée sur 10x MRR"
                    icon={<Briefcase className="h-4 w-4 text-indigo-500" />}
                />
                <StatCard
                    title="Liquidités & Investissements"
                    value={`$${(global.totalCash + global.totalInvestments).toLocaleString()}`}
                    icon={<Wallet className="h-4 w-4 text-green-500" />}
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Main Growth Chart */}
                <div className="col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-6">Évolution du Patrimoine (YTD)</h3>
                    <SimpleChart data={globalPerformanceData} type="line" height={300} />
                </div>

                {/* Quick Distribution */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-2">Répartition Macro</h3>
                    <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>NeoFlow Agency</span>
                                <span className="font-medium">30%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[30%]"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Marchés Financiers (Bourse/Crypto)</span>
                                <span className="font-medium">60%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[60%]"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Liquidités</span>
                                <span className="font-medium">10%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[10%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
