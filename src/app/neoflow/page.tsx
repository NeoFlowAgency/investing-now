"use client";

import { useState } from "react";
import { neoflowData, type Customer, type NeoflowEvent } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { ChartBar, ChartLine } from "@/components/charts";
import {
    DollarSign,
    Users,
    UserPlus,
    UserMinus,
    Activity,
    TrendingUp,
    Mail,
    Calendar,
    Receipt,
    CreditCard,
} from "lucide-react";

export default function NeoFlowPage() {
    const d = neoflowData;
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Find customer by event name
    const handleEventClick = (event: NeoflowEvent) => {
        const customer = d.customers.find((c) => c.name === event.name);
        if (customer) setSelectedCustomer(customer);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">NeoFlow BOS</h1>
                <p className="mt-1 text-sm text-purple-300/50">Stripe · SaaS Metrics</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 xl:gap-4">
                <KpiCard
                    title="MRR"
                    value={formatCurrency(d.mrr)}
                    trend={{ value: `+${d.mrrChange}%`, positive: true }}
                    icon={<DollarSign size={16} />}
                />
                <KpiCard title="ARR" value={formatCurrency(d.arr)} icon={<TrendingUp size={16} />} />
                <KpiCard title="Clients Actifs" value={String(d.activeSubscribers)} icon={<Users size={16} />} />
                <KpiCard title="Nouveaux" value={`+${d.newCustomersThisMonth}`} subtitle="ce mois" icon={<UserPlus size={16} />} />
                <KpiCard
                    title="Churn"
                    value={`${d.churnRate}%`}
                    trend={{ value: "-0.5%", positive: true }}
                    icon={<Activity size={16} />}
                    className="col-span-2 md:col-span-1"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Revenus Mensuels" subtitle="Évolution MRR">
                    <ChartBar data={d.revenueHistory} dataKeys={[{ key: "revenue", color: "#8b5cf6" }]} height={280} />
                </Card>
                <Card title="Croissance Clients">
                    <ChartLine data={d.revenueHistory} lines={[{ key: "customers", color: "#06b6d4" }]} height={280} />
                </Card>
            </div>

            {/* Clients DB */}
            <Card title="Clients" subtitle="Cliquez pour voir le profil complet">
                <div className="divide-y divide-purple-800/20">
                    {d.customers.map((customer) => (
                        <div
                            key={customer.id}
                            onClick={() => setSelectedCustomer(customer)}
                            className="flex cursor-pointer items-center justify-between py-4 first:pt-0 last:pb-0 transition-colors hover:bg-purple-500/5 -mx-2 px-2 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                                    customer.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                )}>
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{customer.name}</p>
                                    <p className="text-xs text-purple-300/40">{customer.plan} · {customer.email}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-white">{formatCurrency(customer.amount)}/mo</p>
                                <p className={cn(
                                    "text-[10px] font-semibold uppercase tracking-wide",
                                    customer.status === "active" ? "text-emerald-400" : "text-red-400"
                                )}>
                                    {customer.status === "active" ? "Actif" : "Churned"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Events Feed */}
            <Card title="Activité Récente" subtitle="Cliquez pour ouvrir le profil client">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {d.recentEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className="flex cursor-pointer items-center gap-3 rounded-xl bg-purple-950/20 p-3.5 transition-all hover:bg-purple-900/20 active:scale-[0.98]"
                        >
                            <div className={cn(
                                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                                event.type === "new" && "bg-emerald-500/10 text-emerald-400",
                                event.type === "churned" && "bg-red-500/10 text-red-400",
                                event.type === "renewed" && "bg-cyan-500/10 text-cyan-400"
                            )}>
                                {event.type === "new" && <UserPlus size={18} />}
                                {event.type === "churned" && <UserMinus size={18} />}
                                {event.type === "renewed" && <Activity size={18} />}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-semibold text-white">{event.name}</p>
                                <p className="text-xs text-purple-300/40">{event.plan} · {event.date}</p>
                            </div>
                            <p className={cn("text-sm font-bold whitespace-nowrap", event.type === "churned" ? "text-red-400" : "text-emerald-400")}>
                                {event.type === "churned" ? "-" : "+"}{formatCurrency(event.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* ─── CUSTOMER DETAIL MODAL ──────────────────────────── */}
            <Modal
                open={!!selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
                title={selectedCustomer?.name}
                subtitle={selectedCustomer?.email}
                wide
            >
                {selectedCustomer && (
                    <div className="space-y-6">
                        {/* Status + Plan header */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={cn(
                                "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                                selectedCustomer.status === "active" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                            )}>
                                {selectedCustomer.status === "active" ? "Actif" : "Churned"}
                            </span>
                            <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-300">
                                Plan {selectedCustomer.plan}
                            </span>
                            <span className="text-2xl font-bold text-white ml-auto">
                                {formatCurrency(selectedCustomer.amount)}<span className="text-sm font-normal text-purple-300/50">/mois</span>
                            </span>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: "Client depuis", value: selectedCustomer.joinDate, icon: <Calendar size={14} /> },
                                { label: "Total payé", value: formatCurrency(selectedCustomer.totalPaid), icon: <CreditCard size={14} /> },
                                { label: "Factures", value: String(selectedCustomer.invoices), icon: <Receipt size={14} /> },
                                { label: "Dernier paiement", value: selectedCustomer.lastPayment, icon: <DollarSign size={14} /> },
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

                        {/* Payment History Chart */}
                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/50">
                                Historique des paiements
                            </h4>
                            <div className="card-glow rounded-2xl p-4">
                                <ChartBar
                                    data={selectedCustomer.paymentHistory}
                                    dataKeys={[{ key: "amount", color: "#8b5cf6" }]}
                                    height={200}
                                />
                            </div>
                        </div>

                        {/* Payment details */}
                        <div>
                            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/50">
                                Détail des paiements
                            </h4>
                            <div className="divide-y divide-purple-800/20">
                                {selectedCustomer.paymentHistory.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                        <span className="text-sm text-purple-200/60">{p.month} 2025</span>
                                        <span className={cn("text-sm font-bold", p.amount > 0 ? "text-emerald-400" : "text-red-400")}>
                                            {p.amount > 0 ? formatCurrency(p.amount) : "Aucun paiement"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-2 rounded-xl bg-purple-950/30 p-4">
                            <Mail size={16} className="text-purple-400" />
                            <span className="text-sm text-purple-200/60">{selectedCustomer.email}</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
