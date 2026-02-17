"use client";

import { MOCK_DATA } from "@/lib/mock-data";
import { StatCard } from "@/components/ui/stat-card";
import { SimpleChart } from "@/components/ui/simple-chart";
import { DollarSign, TrendingUp, Users, Activity } from "lucide-react";

export default function NeoFlowPage() {
    const data = MOCK_DATA.neoflow;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">NeoFlow BOS</h2>
                <p className="text-muted-foreground mt-1">
                    Business Operating System & SaaS Metrics.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Monthly Recurring Revenue"
                    value={`$${data.mrr.toLocaleString()}`}
                    trend="up"
                    trendValue={`${data.mrrChange}%`}
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Active Subscribers"
                    value={data.activeSubscribers}
                    description="Total active subscriptions"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Churn Rate"
                    value={`${data.churnRate}%`}
                    trend="down"
                    trendValue="0.5%"
                    icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                    title="Lifetime Value (LTV)"
                    value={`$${data.ltv}`}
                    icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                />
            </div>

            {/* Main Charts & Lists */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Revenue Chart */}
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h3 className="font-semibold leading-none tracking-tight">Revenue History</h3>
                        <p className="text-sm text-muted-foreground">Monthly revenue over the last 6 months.</p>
                    </div>
                    <SimpleChart data={data.revenueHistory} type="bar" categoryKey="month" dataKey="revenue" />
                </div>

                {/* Recent Customers */}
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm p-6 max-h-[450px] overflow-y-auto">
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h3 className="font-semibold leading-none tracking-tight">Recent Customers</h3>
                        <p className="text-sm text-muted-foreground">Latest subscription events.</p>
                    </div>
                    <div className="space-y-4">
                        {data.recentCustomers.map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{customer.name}</p>
                                    <p className="text-xs text-muted-foreground">{customer.plan}</p>
                                </div>
                                <div className={cn(
                                    "px-2 py-1 rounded-full text-xs font-semibold",
                                    customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {customer.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
