"use client";

import { useState } from "react";
import { neoflowData, type AgencyClient } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { ChartBar, ChartDonut } from "@/components/charts";
import Link from "next/link";
import {
    Briefcase,
    Users,
    TrendingUp,
    Layers,
    Timer,
    CircleDollarSign,
    FolderKanban,
    Target,
    Percent,
    Star,
    Building2,
    Mail,
    ArrowRight,
} from "lucide-react";

// Reuse labels from before
const typeLabels: Record<string, { label: string; color: string }> = {
    saas: { label: "SaaS", color: "bg-indigo-500/15 text-indigo-300" },
    app_interne: { label: "App Interne", color: "bg-cyan-500/15 text-cyan-300" },
    outil: { label: "Outil", color: "bg-emerald-500/15 text-emerald-300" },
    refonte: { label: "Refonte", color: "bg-amber-500/15 text-amber-300" },
};

const statusLabels: Record<string, { label: string; color: string }> = {
    en_cours: { label: "En cours", color: "bg-blue-500/15 text-blue-300" },
    livre: { label: "Livré", color: "bg-emerald-500/15 text-emerald-300" },
    maintenance: { label: "Maintenance", color: "bg-purple-500/15 text-purple-300" },
    pipeline: { label: "Pipeline", color: "bg-amber-500/15 text-amber-300" },
};

export default function NeoFlowPage() {
    const d = neoflowData;
    const [selectedClient, setSelectedClient] = useState<AgencyClient | null>(null);
    const [activeTab, setActiveTab] = useState<"projets" | "clients" | "pipeline">("projets");

    const revenueStackedData = d.revenueHistory;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">NeoFlow Agency</h1>
                <p className="mt-1 text-sm text-purple-300/50">Agence de développement SaaS, Apps & Outils — B2B</p>
            </div>

            {/* KPIs Row 1 */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                <KpiCard
                    title="Revenu Total"
                    value={formatCurrency(d.totalRevenue)}
                    trend={{ value: `+${d.revenueChange}%`, positive: true }}
                    icon={<CircleDollarSign size={16} />}
                />
                <KpiCard
                    title="Récurrent Mensuel"
                    value={formatCurrency(d.recurringRevenue)}
                    subtitle={`${Math.round((d.recurringRevenue / d.monthlyRevenue) * 100)}% du CA mensuel`}
                    icon={<TrendingUp size={16} />}
                />
                <KpiCard
                    title="Projets Actifs"
                    value={String(d.activeProjects)}
                    subtitle={`${d.completedProjects} livrés`}
                    icon={<FolderKanban size={16} />}
                />
                <KpiCard
                    title="Pipeline"
                    value={formatCurrency(d.pipelineValue)}
                    subtitle={`${d.pipelineProjects} prospects`}
                    icon={<Target size={16} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card title="Revenus par Type" subtitle="6 derniers mois" className="lg:col-span-2">
                    <ChartBar
                        data={revenueStackedData}
                        dataKeys={[
                            { key: "projet", color: "#8b5cf6" },
                            { key: "recurrent", color: "#06b6d4" },
                            { key: "maintenance", color: "#10b981" },
                        ]}
                        height={280}
                    />
                </Card>

                <Card title="Répartition CA">
                    <ChartDonut data={d.revenueByType} height={180} />
                    <div className="mt-4 space-y-2">
                        {d.revenueByType.map((r) => (
                            <div key={r.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: r.color }} />
                                    <span className="text-purple-200/60">{r.name}</span>
                                </div>
                                <span className="font-semibold text-white">{formatCurrency(r.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Tab Switcher */}
            <div className="inline-flex gap-1 rounded-xl bg-purple-950/40 p-1">
                {(["projets", "clients", "pipeline"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all duration-200",
                            activeTab === tab
                                ? "bg-purple-600/40 text-white shadow-glow-sm"
                                : "text-purple-300/50 hover:text-purple-200"
                        )}
                    >
                        {tab === "projets" ? `Projets (${d.projects.length})` : tab === "clients" ? `Clients (${d.clients.length})` : `Pipeline (${d.pipeline.length})`}
                    </button>
                ))}
            </div>

            {/* ─── PROJETS TAB (UPDATED: LINKS TO DETAIL PAGE) ────── */}
            {activeTab === "projets" && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {d.projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/neoflow/${project.id}`}
                            className="card-glow block rounded-2xl p-5 transition-all duration-200 hover:border-purple-500/30 active:scale-[0.98]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-950/50 text-xl">
                                    {project.clientLogo}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-bold text-white">{project.name}</p>
                                    <p className="text-xs text-purple-300/40">{project.client}</p>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", typeLabels[project.type].color)}>
                                    {typeLabels[project.type].label}
                                </span>
                                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", statusLabels[project.status].color)}>
                                    {statusLabels[project.status].label}
                                </span>
                            </div>

                            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-purple-200/40 opacity-80">{project.description}</p>

                            {/* Progress bar */}
                            {project.hoursEstimated > 0 && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-[10px] text-purple-300/40">
                                        <span>{project.hoursSpent}h / {project.hoursEstimated}h</span>
                                        <span>{Math.round((project.hoursSpent / project.hoursEstimated) * 100)}%</span>
                                    </div>
                                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-purple-950/50">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                            style={{ width: `${Math.min((project.hoursSpent / project.hoursEstimated) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex items-center justify-between border-t border-purple-800/20 pt-3">
                                <span className="text-lg font-bold text-white">
                                    {project.budget > 0 ? formatCurrency(project.budget) : "Produit interne"}
                                </span>
                                {project.type === "saas" && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#635bff] bg-[#635bff]/10 px-2 py-0.5 rounded-full">
                                        STRIPE
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* ─── CLIENTS TAB ────────────────────────────────────── */}
            {activeTab === "clients" && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {d.clients.map((client) => (
                        <div
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            className="card-glow cursor-pointer rounded-2xl p-5 transition-all duration-200 hover:border-purple-500/30 active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950/50 text-xl">
                                    {client.logo}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{client.name}</p>
                                    <p className="text-xs text-purple-300/40">{client.industry}</p>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-purple-950/30 p-2 text-center">
                                    <p className="text-[10px] text-purple-300/40">CA Total</p>
                                    <p className="text-sm font-bold text-white">{formatCurrency(client.totalRevenue)}</p>
                                </div>
                                <div className="rounded-lg bg-purple-950/30 p-2 text-center">
                                    <p className="text-[10px] text-purple-300/40">Projets</p>
                                    <p className="text-sm font-bold text-white">{client.activeProjects + client.completedProjects}</p>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={12} className={i < client.satisfaction ? "fill-amber-400 text-amber-400" : "text-purple-800"} />
                                    ))}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-semibold uppercase tracking-wide",
                                    client.status === "actif" ? "text-emerald-400" : "text-purple-400/40"
                                )}>
                                    {client.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── PIPELINE TAB ───────────────────────────────────── */}
            {activeTab === "pipeline" && (
                <div className="space-y-3">
                    {d.pipeline.map((deal) => (
                        <Card key={deal.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950/50">
                                    <Briefcase size={18} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{deal.name}</p>
                                    <p className="text-xs text-purple-300/40">{deal.client} · {typeLabels[deal.type].label}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-white">{formatCurrency(deal.value)}</p>
                                    <p className="text-xs text-purple-300/40">{deal.stage}</p>
                                </div>
                                {/* Probability badge */}
                                <div className={cn(
                                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                                    deal.probability >= 75 ? "bg-emerald-500/15 text-emerald-400" :
                                        deal.probability >= 50 ? "bg-amber-500/15 text-amber-400" :
                                            "bg-red-500/15 text-red-400"
                                )}>
                                    {deal.probability}%
                                </div>
                            </div>
                        </Card>
                    ))}
                    {/* Pipeline total */}
                    <div className="flex items-center justify-between rounded-2xl bg-purple-500/5 border border-purple-500/10 p-5">
                        <span className="text-sm font-medium text-purple-300/50">Valeur totale Pipeline pondérée</span>
                        <span className="text-xl font-bold text-white">
                            {formatCurrency(d.pipeline.reduce((sum, deal) => sum + deal.value * deal.probability / 100, 0))}
                        </span>
                    </div>
                </div>
            )}

            {/* ─── CLIENT DETAIL MODAL ────────────────────────────── */}
            <Modal
                open={!!selectedClient}
                onClose={() => setSelectedClient(null)}
                title={selectedClient?.name}
                subtitle={selectedClient?.industry}
                wide
            >
                {selectedClient && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                                selectedClient.status === "actif" ? "bg-emerald-500/15 text-emerald-400" : "bg-purple-500/15 text-purple-300"
                            )}>
                                {selectedClient.status}
                            </span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} className={i < selectedClient.satisfaction ? "fill-amber-400 text-amber-400" : "text-purple-800"} />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: "Client depuis", value: selectedClient.since },
                                { label: "CA Total", value: formatCurrency(selectedClient.totalRevenue) },
                                { label: "Projets actifs", value: String(selectedClient.activeProjects) },
                                { label: "Projets livrés", value: String(selectedClient.completedProjects) },
                            ].map((m) => (
                                <div key={m.label} className="rounded-xl bg-purple-950/30 p-3">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">{m.label}</p>
                                    <p className="mt-1 text-sm font-bold text-white">{m.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Client projects mocked for list */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300/50">Contact</h4>
                            <div className="flex items-center gap-3 rounded-xl bg-purple-950/30 p-4">
                                <Building2 size={16} className="text-purple-400" />
                                <span className="text-sm text-purple-200/60">{selectedClient.contactName}</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl bg-purple-950/30 p-4">
                                <Mail size={16} className="text-purple-400" />
                                <span className="text-sm text-purple-200/60">{selectedClient.contactEmail}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
