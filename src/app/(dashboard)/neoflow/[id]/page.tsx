"use client";

import { useState, useEffect } from "react";
import { neoflowData, type AgencyProject } from "@/lib/mock-data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import KpiCard from "@/components/kpi-card";
import Card from "@/components/card";
import { ChartArea, ChartBar, ChartLine } from "@/components/charts";
import {
    ArrowLeft,
    Settings,
    MoreVertical,
    Activity,
    Users,
    CreditCard,
    Target,
    BarChart3,
    TrendingDown,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = neoflowData.projects.find((p) => p.id === params.id);

    // Real Stripe Data State
    const [stripeData, setStripeData] = useState<any>(project?.stripeData || null);
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [isRealData, setIsRealData] = useState(false);

    // Fetch real data on load if SaaS
    useEffect(() => {
        if (project?.type === "saas") {
            setLoadingStripe(true);
            fetch(`/api/neoflow/${params.id}/stripe`)
                .then((res) => {
                    if (!res.ok) throw new Error("API Route error");
                    return res.json();
                })
                .then((data) => {
                    if (!data || data.error) return; // Keep mock data if API fails or returns error

                    setIsRealData(true);
                    // Merge real stats with existing structure
                    // Note: Full history/churn requires more complex Stripe queries not in simple API route
                    setStripeData((prev: any) => ({
                        ...prev,
                        mrr: data.mrr,
                        activeSubscribers: data.activeSubs,
                        netVolume: data.volume30d,
                        recentTransactions: data.recentCharges.map((c: any) => ({
                            id: c.id,
                            customer: c.customer,
                            amount: c.amount,
                            status: c.status,
                            date: c.date,
                            plan: "Stripe Charge", // Default label
                        })),
                    }));
                })
                .catch((err) => console.warn("Using mock Stripe data (API fetch failed or no keys):", err))
                .finally(() => setLoadingStripe(false));
        }
    }, [params.id, project?.type]);

    if (!project) {
        notFound();
    }

    const isSaaS = project.type === "saas";
    const stripe = stripeData;

    return (
        <div className="space-y-6">
            {/* ─── Breadcrumb + Header ───────────────────────────── */}
            <div className="flex items-center gap-4">
                <Link
                    href="/neoflow"
                    className="rounded-xl bg-purple-950/40 p-2 text-purple-300 hover:bg-purple-900/40 hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">{project.clientLogo}</span> {project.name}
                    </h1>
                    <p className="text-sm text-purple-300/50 flex items-center gap-1.5">
                        {project.client} · <span className="uppercase">{project.type.replace("_", " ")}</span>
                        {isSaaS && (
                            <span className={cn(
                                "ml-2 rounded-full px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide border",
                                isRealData
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            )}>
                                {loadingStripe ? "Loading..." : isRealData ? "Live Data" : "Mock Data"}
                            </span>
                        )}
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    {isSaaS && (
                        <button className="flex items-center gap-2 rounded-xl bg-[#635bff]/10 px-4 py-2 text-xs font-bold text-[#635bff] hover:bg-[#635bff]/20 transition-colors">
                            <ExternalLink size={14} />
                            Ouvrir Stripe
                        </button>
                    )}
                    <button className="rounded-xl bg-purple-950/40 p-2 text-purple-300 hover:bg-purple-900/40 hover:text-white transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* ─── SAAS DASHBOARD (STRIPE MODE) ──────────────────── */}
            {isSaaS && stripe ? (
                <>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                        <KpiCard
                            title="MRR"
                            value={formatCurrency(stripe.mrr)}
                            trend={{ value: "+5.2%", positive: true }} // Mock trend
                            icon={<Activity size={16} />}
                            className="bg-gradient-to-br from-[#635bff]/10 to-transparent border-[#635bff]/20"
                        />
                        <KpiCard
                            title="Abonnés Actifs"
                            value={String(stripe.activeSubscribers)}
                            subtitle={`+${stripe.newSubscribers} ce mois`}
                            icon={<Users size={16} />}
                        />
                        <KpiCard
                            title="Churn Rate"
                            value={`${stripe.churnRate}%`}
                            trend={{ value: "-0.2%", positive: true }}
                            icon={<TrendingDown size={16} />}
                        />
                        <KpiCard
                            title="LTV (Valeur Vie)"
                            value={formatCurrency(stripe.ltv)}
                            subtitle={`ARPU: ${formatCurrency(stripe.arpu)}`}
                            icon={<Target size={16} />}
                        />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        <Card title="Revenus Récurrents (MRR)" subtitle="12 derniers mois" className="lg:col-span-2">
                            <ChartArea data={stripe.revenueHistory || []} color="#635bff" height={280} />
                        </Card>
                        <Card title="Santé des Paiements">
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-purple-200/60">Succès</span>
                                    <span className="font-bold text-emerald-400">98.5%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div className="h-full w-[98.5%] rounded-full bg-emerald-500" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-purple-200/60">Échecs ({stripe.failedPayments})</span>
                                    <span className="font-bold text-red-400">1.2%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div className="h-full w-[1.2%] rounded-full bg-red-500" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-purple-200/60">Remboursements ({stripe.refunds})</span>
                                    <span className="font-bold text-amber-400">0.3%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-purple-950/50">
                                    <div className="h-full w-[0.3%] rounded-full bg-amber-500" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card title="Dernières Transactions live" subtitle={isRealData ? "Flux Stripe Réel" : "Mode Test Mocké"}>
                        <div className="divide-y divide-purple-800/20">
                            {stripe.recentTransactions.map((tx: any) => (
                                <div key={tx.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                                            tx.status === "succeeded" ? "bg-emerald-500/10 text-emerald-400" :
                                                tx.status === "refunded" ? "bg-amber-500/10 text-amber-400" :
                                                    "bg-red-500/10 text-red-400"
                                        )}>
                                            {tx.status === "succeeded" ? "OK" : "!"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{tx.customer}</p>
                                            <p className="text-xs text-purple-300/40">{tx.plan} · {tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">{formatCurrency(tx.amount)}</p>
                                        <p className={cn("text-[10px] uppercase",
                                            tx.status === "succeeded" ? "text-emerald-400" :
                                                tx.status === "refunded" ? "text-amber-400" : "text-red-400"
                                        )}>
                                            {tx.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </>
            ) : (
                /* ─── AGENCY PROJECT DASHBOARD (DEV MODE) ────────────── */
                <>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                        <KpiCard
                            title="Budget Total"
                            value={formatCurrency(project.budget)}
                            subtitle={`Marge: ${project.margin}%`}
                            icon={<CreditCard size={16} />}
                        />
                        <KpiCard
                            title="Avancement"
                            value={`${Math.round((project.hoursSpent / project.hoursEstimated) * 100)}%`}
                            subtitle={`${project.hoursSpent}h / ${project.hoursEstimated}h`}
                            icon={<Clock size={16} />}
                        />
                        <KpiCard
                            title="Restant à facturer"
                            value={formatCurrency(project.remaining)}
                            icon={<Target size={16} />}
                        />
                        <KpiCard
                            title="Tech Stack"
                            value={String(project.techStack.length)}
                            subtitle="Technologies"
                            icon={<Code2Icon size={16} />} // icon placeholder
                        />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        <Card title="Avancement Financier" subtitle="Flux de trésorerie projet" className="lg:col-span-2">
                            <ChartBar data={project.timeline} dataKeys={[{ key: "revenue", color: "#8b5cf6" }]} height={260} />
                        </Card>

                        <Card title="Jalons (Milestones)">
                            <div className="space-y-3 pt-1">
                                {project.milestones.map((ms, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        {ms.done ? (
                                            <CheckCircle2 size={18} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                                        ) : (
                                            <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-purple-500/30 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className={cn("text-sm font-medium", ms.done ? "text-purple-200/50 line-through" : "text-white")}>
                                                {ms.name}
                                            </p>
                                            <p className="text-xs text-purple-300/40">{ms.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}

// Function Icon Helper (since lucide exports components)
function Code2Icon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}
