"use client";

import { MOCK_DATA } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { TrendingUp, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function InvestmentsPage() {
    const data = MOCK_DATA.investments;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Investissements</h2>
                <p className="text-muted-foreground mt-1">
                    Suivi des performances de portefeuille en temps réel.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Valeur Totale"
                    value={`$${data.totalValue.toLocaleString()}`}
                    trend="up"
                    trendValue="+$350 today"
                    icon={<TrendingUp className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                    title="Plus-Value Latente"
                    value="+$23,500"
                    description="Depuis l'origine"
                    icon={<ArrowUpRight className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                    title="Diversification"
                    value="3 Classes"
                    description="Actions, Crypto, Cash"
                    icon={<PieIcon className="h-4 w-4 text-blue-500" />}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-7">

                {/* Allocation Chart */}
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Allocation d'Actifs</h3>
                    <SimpleChart data={data.allocation} type="pie" dataKey="value" />
                    <div className="mt-4 flex justify-center space-x-4">
                        {data.allocation.map((item: any) => (
                            <div key={item.name} className="flex items-center text-xs">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.fill }}></div>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assets Table */}
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Positions Actives</h3>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3">Actif</th>
                                    <th className="px-4 py-3 text-right">Qté</th>
                                    <th className="px-4 py-3 text-right">Prix</th>
                                    <th className="px-4 py-3 text-right">P&L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.assets.map((asset) => (
                                    <tr key={asset.symbol} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex flex-col">
                                                <span>{asset.symbol}</span>
                                                <span className="text-xs text-muted-foreground font-normal">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">{asset.quantity}</td>
                                        <td className="px-4 py-3 text-right">${asset.currentPrice.toLocaleString()}</td>
                                        <td className={`px-4 py-3 text-right font-medium ${asset.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                                            {asset.pnl > 0 ? "+" : ""}{asset.pnl.toLocaleString()}$
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
