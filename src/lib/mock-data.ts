// ============================================================
// MOCK DATA — Will be replaced by real API calls
// ============================================================

// ---------- HELPER: Generate fake price history ----------
function generatePriceHistory(basePrice: number, months: number, volatility: number) {
    const data: { date: string; price: number }[] = [];
    let price = basePrice * (1 - volatility * months * 0.01);
    const now = new Date();
    for (let i = months; i >= 0; i--) {
        const d = new Date(now);
        d.setMonth(d.getMonth() - i);
        const change = (Math.random() - 0.4) * volatility * basePrice * 0.01;
        price = Math.max(price + change, basePrice * 0.5);
        data.push({
            date: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
            price: Math.round(price * 100) / 100,
        });
    }
    data[data.length - 1].price = basePrice;
    return data;
}

// ═══════════════════════════════════════════════════════════
// VUE GLOBALE
// ═══════════════════════════════════════════════════════════
export const globalData = {
    netWorth: 147_850,
    netWorthChange: 5.3,
    totalCash: 12_400,
    totalInvestments: 89_200,
    totalAgency: 46_250,
    monthlyIncome: 7_800,
    monthlyExpenses: 3_450,
    savingsRate: 55.8,
    wealthHistory: [
        { month: "Sep", value: 118_000 },
        { month: "Oct", value: 122_500 },
        { month: "Nov", value: 128_300 },
        { month: "Dec", value: 131_000 },
        { month: "Jan", value: 138_700 },
        { month: "Feb", value: 147_850 },
    ],
};

// ═══════════════════════════════════════════════════════════
// NEOFLOW AGENCY — Agence de développement SaaS/Apps B2B
// ═══════════════════════════════════════════════════════════

export type ProjectStatus = "en_cours" | "livre" | "maintenance" | "pipeline";
export type ProjectType = "saas" | "app_interne" | "outil" | "refonte";
export type RevenueType = "projet" | "recurrent" | "maintenance";

export interface AgencyProject {
    id: string;
    name: string;
    client: string;
    clientLogo: string;
    type: ProjectType;
    status: ProjectStatus;
    description: string;
    techStack: string[];
    startDate: string;
    endDate?: string;
    budget: number;
    paid: number;
    remaining: number;
    margin: number;
    hoursEstimated: number;
    hoursSpent: number;
    monthlyRecurring?: number;
    timeline: { month: string; revenue: number }[];
    milestones: { name: string; done: boolean; date: string }[];
}

export interface AgencyClient {
    id: string;
    name: string;
    logo: string;
    industry: string;
    contactName: string;
    contactEmail: string;
    since: string;
    totalRevenue: number;
    activeProjects: number;
    completedProjects: number;
    status: "actif" | "inactif";
    satisfaction: number; // 1-5
}

export const neoflowData = {
    // KPIs Agence
    totalRevenue: 46_250,
    monthlyRevenue: 8_400,
    recurringRevenue: 3_200,
    projectRevenue: 5_200,
    revenueChange: 12.5,
    activeProjects: 4,
    completedProjects: 12,
    pipelineValue: 35_000,
    pipelineProjects: 3,
    activeClients: 6,
    totalClients: 9,
    avgProjectValue: 8_500,
    utilizationRate: 78, // % du temps facturé
    avgMargin: 62, // % marge moyenne

    // Revenue breakdown
    revenueByType: [
        { name: "Projets", value: 28_500, color: "#8b5cf6" },
        { name: "Récurrent (SaaS)", value: 12_750, color: "#06b6d4" },
        { name: "Maintenance", value: 5_000, color: "#10b981" },
    ],

    // Revenue history
    revenueHistory: [
        { month: "Sep", projet: 4_500, recurrent: 2_200, maintenance: 600 },
        { month: "Oct", projet: 5_200, recurrent: 2_400, maintenance: 700 },
        { month: "Nov", projet: 6_100, recurrent: 2_500, maintenance: 800 },
        { month: "Dec", projet: 4_800, recurrent: 2_700, maintenance: 900 },
        { month: "Jan", projet: 5_800, recurrent: 2_900, maintenance: 1_000 },
        { month: "Feb", projet: 5_200, recurrent: 3_200, maintenance: 1_100 },
    ],

    // Projects
    projects: [
        {
            id: "proj_1",
            name: "BOS Platform",
            client: "NeoFlow (Interne)",
            clientLogo: "🚀",
            type: "saas" as ProjectType,
            status: "en_cours" as ProjectStatus,
            description: "Plateforme SaaS de gestion business all-in-one pour les agences et freelances. Facturation, CRM, projet management, analytics.",
            techStack: ["Next.js", "Supabase", "Stripe", "Vercel"],
            startDate: "Jan 2024",
            budget: 0,
            paid: 0,
            remaining: 0,
            margin: 100,
            hoursEstimated: 400,
            hoursSpent: 285,
            monthlyRecurring: 2_100,
            timeline: [
                { month: "Sep", revenue: 1_200 },
                { month: "Oct", revenue: 1_400 },
                { month: "Nov", revenue: 1_600 },
                { month: "Dec", revenue: 1_800 },
                { month: "Jan", revenue: 1_950 },
                { month: "Feb", revenue: 2_100 },
            ],
            milestones: [
                { name: "MVP Launch", done: true, date: "Mar 2024" },
                { name: "Stripe Integration", done: true, date: "Mai 2024" },
                { name: "CRM Module", done: true, date: "Sep 2024" },
                { name: "Analytics Dashboard", done: true, date: "Dec 2024" },
                { name: "Mobile App", done: false, date: "Avr 2025" },
                { name: "AI Features", done: false, date: "Juin 2025" },
            ],
        },
        {
            id: "proj_2",
            name: "LogiTrack Pro",
            client: "TransNantes SARL",
            clientLogo: "🚛",
            type: "app_interne" as ProjectType,
            status: "en_cours" as ProjectStatus,
            description: "Application interne de gestion logistique : suivi de flotte, planification de tournées, gestion des chauffeurs et reporting temps réel.",
            techStack: ["React", "Node.js", "PostgreSQL", "Mapbox"],
            startDate: "Oct 2024",
            endDate: "Avr 2025",
            budget: 18_000,
            paid: 12_000,
            remaining: 6_000,
            margin: 58,
            hoursEstimated: 220,
            hoursSpent: 145,
            timeline: [
                { month: "Oct", revenue: 4_000 },
                { month: "Nov", revenue: 4_000 },
                { month: "Dec", revenue: 4_000 },
                { month: "Jan", revenue: 0 },
                { month: "Feb", revenue: 0 },
            ],
            milestones: [
                { name: "Cahier des charges", done: true, date: "Oct 2024" },
                { name: "Maquettes UI/UX", done: true, date: "Nov 2024" },
                { name: "Module Flotte", done: true, date: "Dec 2024" },
                { name: "Module Tournées", done: false, date: "Fév 2025" },
                { name: "Module Reporting", done: false, date: "Mar 2025" },
                { name: "Livraison finale", done: false, date: "Avr 2025" },
            ],
        },
        {
            id: "proj_3",
            name: "RecruteFlow",
            client: "TalentPulse SAS",
            clientLogo: "👤",
            type: "saas" as ProjectType,
            status: "en_cours" as ProjectStatus,
            description: "SaaS de recrutement pour PME : publication d'offres multi-canal, suivi candidatures (ATS), scoring IA des CV, onboarding automatisé.",
            techStack: ["Next.js", "Supabase", "OpenAI API", "Resend"],
            startDate: "Nov 2024",
            endDate: "Mai 2025",
            budget: 24_000,
            paid: 14_400,
            remaining: 9_600,
            margin: 65,
            hoursEstimated: 300,
            hoursSpent: 165,
            monthlyRecurring: 800,
            timeline: [
                { month: "Nov", revenue: 6_000 },
                { month: "Dec", revenue: 4_400 },
                { month: "Jan", revenue: 4_000 },
                { month: "Feb", revenue: 800 },
            ],
            milestones: [
                { name: "Architecture & Design", done: true, date: "Nov 2024" },
                { name: "Core ATS", done: true, date: "Jan 2025" },
                { name: "AI Scoring", done: true, date: "Fév 2025" },
                { name: "Multi-channel posting", done: false, date: "Mar 2025" },
                { name: "Client Beta", done: false, date: "Avr 2025" },
                { name: "Production Launch", done: false, date: "Mai 2025" },
            ],
        },
        {
            id: "proj_4",
            name: "StockMaster",
            client: "Boulangerie Moreau",
            clientLogo: "🥖",
            type: "outil" as ProjectType,
            status: "maintenance" as ProjectStatus,
            description: "Outil de gestion des stocks et commandes fournisseurs pour réseau de 5 boulangeries. Alertes de rupture, commande auto, historique.",
            techStack: ["React", "Firebase", "Tailwind"],
            startDate: "Juin 2024",
            endDate: "Sep 2024",
            budget: 6_500,
            paid: 6_500,
            remaining: 0,
            margin: 72,
            hoursEstimated: 80,
            hoursSpent: 75,
            monthlyRecurring: 300,
            timeline: [
                { month: "Jun", revenue: 3_000 },
                { month: "Jul", revenue: 2_000 },
                { month: "Aug", revenue: 1_500 },
                { month: "Sep", revenue: 300 },
                { month: "Oct", revenue: 300 },
                { month: "Nov", revenue: 300 },
                { month: "Dec", revenue: 300 },
                { month: "Jan", revenue: 300 },
                { month: "Feb", revenue: 300 },
            ],
            milestones: [
                { name: "Développement", done: true, date: "Juil 2024" },
                { name: "Tests & Déploiement", done: true, date: "Août 2024" },
                { name: "Formation client", done: true, date: "Sep 2024" },
                { name: "Maintenance mensuelle", done: true, date: "En cours" },
            ],
        },
        {
            id: "proj_5",
            name: "CRM Immo+",
            client: "Immobilière de l'Ouest",
            clientLogo: "🏠",
            type: "refonte" as ProjectType,
            status: "livre" as ProjectStatus,
            description: "Refonte complète du CRM immobilier : gestion des biens, matching acheteur/vendeur, signature électronique, portail client.",
            techStack: ["Vue.js", "Laravel", "MySQL", "DocuSign API"],
            startDate: "Mar 2024",
            endDate: "Août 2024",
            budget: 15_000,
            paid: 15_000,
            remaining: 0,
            margin: 55,
            hoursEstimated: 200,
            hoursSpent: 210,
            timeline: [
                { month: "Mar", revenue: 5_000 },
                { month: "Avr", revenue: 4_000 },
                { month: "Mai", revenue: 3_000 },
                { month: "Jun", revenue: 2_000 },
                { month: "Jul", revenue: 1_000 },
            ],
            milestones: [
                { name: "Audit existant", done: true, date: "Mar 2024" },
                { name: "Nouvelle architecture", done: true, date: "Avr 2024" },
                { name: "Migration données", done: true, date: "Jun 2024" },
                { name: "Formation & Go-Live", done: true, date: "Août 2024" },
            ],
        },
        {
            id: "proj_6",
            name: "FactureExpress",
            client: "Cabinet Durand & Associés",
            clientLogo: "⚖️",
            type: "outil" as ProjectType,
            status: "livre" as ProjectStatus,
            description: "Outil de facturation et suivi des temps pour cabinet d'avocats. Ventilation par dossier, exports comptables, rappels automatiques.",
            techStack: ["Next.js", "Prisma", "PostgreSQL"],
            startDate: "Jan 2024",
            endDate: "Mar 2024",
            budget: 5_500,
            paid: 5_500,
            remaining: 0,
            margin: 68,
            hoursEstimated: 70,
            hoursSpent: 65,
            monthlyRecurring: 0,
            timeline: [
                { month: "Jan", revenue: 2_500 },
                { month: "Feb", revenue: 2_000 },
                { month: "Mar", revenue: 1_000 },
            ],
            milestones: [
                { name: "Développement", done: true, date: "Fév 2024" },
                { name: "Livraison", done: true, date: "Mar 2024" },
            ],
        },
    ] as AgencyProject[],

    // Pipeline — projets en négociation
    pipeline: [
        { id: "pipe_1", name: "App RH + Paie", client: "GroupeABC", type: "app_interne" as ProjectType, value: 22_000, probability: 75, stage: "Proposition envoyée" },
        { id: "pipe_2", name: "SaaS Compta PME", client: "FinanceFirst", type: "saas" as ProjectType, value: 8_000, probability: 40, stage: "Premier contact" },
        { id: "pipe_3", name: "Portail Fournisseur", client: "NantesLogistic", type: "outil" as ProjectType, value: 5_000, probability: 90, stage: "Contrat en cours" },
    ],

    // Clients
    clients: [
        { id: "cli_1", name: "NeoFlow (Interne)", logo: "🚀", industry: "Tech / SaaS", contactName: "Noakim Grelier", contactEmail: "noakim@neoflow.agency", since: "Jan 2024", totalRevenue: 12_600, activeProjects: 1, completedProjects: 0, status: "actif" as const, satisfaction: 5 },
        { id: "cli_2", name: "TransNantes SARL", logo: "🚛", industry: "Logistique / Transport", contactName: "Marc Dubois", contactEmail: "m.dubois@transnantes.fr", since: "Oct 2024", totalRevenue: 12_000, activeProjects: 1, completedProjects: 0, status: "actif" as const, satisfaction: 4 },
        { id: "cli_3", name: "TalentPulse SAS", logo: "👤", industry: "Ressources Humaines", contactName: "Sophie Martin", contactEmail: "s.martin@talentpulse.io", since: "Nov 2024", totalRevenue: 14_400, activeProjects: 1, completedProjects: 0, status: "actif" as const, satisfaction: 5 },
        { id: "cli_4", name: "Boulangerie Moreau", logo: "🥖", industry: "Alimentaire / Retail", contactName: "Jean Moreau", contactEmail: "contact@moreau-boulanger.fr", since: "Juin 2024", totalRevenue: 6_500, activeProjects: 0, completedProjects: 1, status: "actif" as const, satisfaction: 5 },
        { id: "cli_5", name: "Immobilière de l'Ouest", logo: "🏠", industry: "Immobilier", contactName: "Claire Lefèvre", contactEmail: "c.lefevre@immo-ouest.fr", since: "Mar 2024", totalRevenue: 15_000, activeProjects: 0, completedProjects: 1, status: "inactif" as const, satisfaction: 4 },
        { id: "cli_6", name: "Cabinet Durand & Associés", logo: "⚖️", industry: "Juridique", contactName: "Pierre Durand", contactEmail: "p.durand@durand-associes.fr", since: "Jan 2024", totalRevenue: 5_500, activeProjects: 0, completedProjects: 1, status: "inactif" as const, satisfaction: 4 },
    ] as AgencyClient[],
};

// ═══════════════════════════════════════════════════════════
// INVESTISSEMENTS
// ═══════════════════════════════════════════════════════════
export const investmentsData = {
    totalValue: 89_200,
    totalPnl: 12_450,
    totalPnlPercent: 16.2,
    todayChange: 380,
    todayChangePercent: 0.43,
    allocation: [
        { name: "Actions", value: 42_000, color: "#6366f1" },
        { name: "ETFs", value: 22_200, color: "#06b6d4" },
        { name: "Crypto", value: 25_000, color: "#f59e0b" },
    ],
    positions: [
        {
            symbol: "AAPL", name: "Apple Inc.", type: "Action", qty: 50, avgPrice: 152.30, price: 178.50, pnl: 1_310, pnlPercent: 17.2,
            marketCap: "2.89T", peRatio: 28.5, dividend: "0.52%", volume: "58.2M", high52w: 199.62, low52w: 143.90,
            sector: "Technology", exchange: "NASDAQ",
            description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
            priceHistory: generatePriceHistory(178.50, 12, 8),
            transactions: [
                { date: "12 Jan 2024", type: "Achat", qty: 20, price: 148.50, total: 2_970 },
                { date: "15 Mar 2024", type: "Achat", qty: 15, price: 155.20, total: 2_328 },
                { date: "02 Aug 2024", type: "Achat", qty: 15, price: 154.10, total: 2_311.50 },
            ],
        },
        {
            symbol: "MSFT", name: "Microsoft Corp.", type: "Action", qty: 20, avgPrice: 310.00, price: 415.60, pnl: 2_112, pnlPercent: 34.1,
            marketCap: "3.09T", peRatio: 34.2, dividend: "0.74%", volume: "22.1M", high52w: 430.82, low52w: 309.45,
            sector: "Technology", exchange: "NASDAQ",
            description: "Microsoft Corporation develops and supports software, services, devices and solutions worldwide.",
            priceHistory: generatePriceHistory(415.60, 12, 6),
            transactions: [
                { date: "05 Feb 2024", type: "Achat", qty: 10, price: 305.00, total: 3_050 },
                { date: "20 Jun 2024", type: "Achat", qty: 10, price: 315.00, total: 3_150 },
            ],
        },
        {
            symbol: "VWCE", name: "Vanguard FTSE All-World", type: "ETF", qty: 200, avgPrice: 96.50, price: 111.00, pnl: 2_900, pnlPercent: 15.0,
            marketCap: "N/A", peRatio: 0, dividend: "1.8%", volume: "1.2M", high52w: 115.30, low52w: 89.20,
            sector: "Global Equity", exchange: "Euronext",
            description: "Vanguard FTSE All-World UCITS ETF tracks the FTSE All-World Index, providing global equity exposure.",
            priceHistory: generatePriceHistory(111.00, 12, 4),
            transactions: [
                { date: "01 Jan 2024", type: "Achat", qty: 50, price: 92.30, total: 4_615 },
                { date: "01 Apr 2024", type: "Achat", qty: 50, price: 97.10, total: 4_855 },
                { date: "01 Jul 2024", type: "Achat", qty: 50, price: 99.50, total: 4_975 },
                { date: "01 Oct 2024", type: "Achat", qty: 50, price: 97.10, total: 4_855 },
            ],
        },
        {
            symbol: "BTC", name: "Bitcoin", type: "Crypto", qty: 0.45, avgPrice: 32_000, price: 43_500, pnl: 5_175, pnlPercent: 35.9,
            marketCap: "852B", peRatio: 0, dividend: "N/A", volume: "32.5B", high52w: 73_750, low52w: 24_800,
            sector: "Cryptocurrency", exchange: "Multiple",
            description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator.",
            priceHistory: generatePriceHistory(43_500, 12, 15),
            transactions: [
                { date: "10 Dec 2023", type: "Achat", qty: 0.25, price: 30_500, total: 7_625 },
                { date: "22 May 2024", type: "Achat", qty: 0.20, price: 33_875, total: 6_775 },
            ],
        },
        {
            symbol: "ETH", name: "Ethereum", type: "Crypto", qty: 3.2, avgPrice: 2_100, price: 2_420, pnl: 1_024, pnlPercent: 15.2,
            marketCap: "291B", peRatio: 0, dividend: "~4.0% staking", volume: "15.8B", high52w: 4_090, low52w: 1_520,
            sector: "Cryptocurrency", exchange: "Multiple",
            description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
            priceHistory: generatePriceHistory(2_420, 12, 12),
            transactions: [
                { date: "15 Jan 2024", type: "Achat", qty: 2.0, price: 2_050, total: 4_100 },
                { date: "10 Jul 2024", type: "Achat", qty: 1.2, price: 2_183, total: 2_619.60 },
            ],
        },
    ],
    performanceHistory: [
        { month: "Sep", value: 72_000 },
        { month: "Oct", value: 75_500 },
        { month: "Nov", value: 79_800 },
        { month: "Dec", value: 82_100 },
        { month: "Jan", value: 85_900 },
        { month: "Feb", value: 89_200 },
    ],
};

// ═══════════════════════════════════════════════════════════
// FINANCES PERSONNELLES
// ═══════════════════════════════════════════════════════════
export const financeData = {
    monthlyIncome: 7_800,
    monthlyExpenses: 3_450,
    savingsRate: 55.8,
    balance: 12_400,
    expensesByCategory: [
        { name: "Logement", value: 950, color: "#6366f1" },
        { name: "Alimentation", value: 520, color: "#06b6d4" },
        { name: "Transport", value: 280, color: "#10b981" },
        { name: "Abonnements", value: 185, color: "#f59e0b" },
        { name: "Loisirs", value: 350, color: "#ec4899" },
        { name: "Divers", value: 1_165, color: "#8b5cf6" },
    ],
    transactions: [
        { id: 1, merchant: "Carrefour", amount: -87.40, category: "Alimentation", date: "17 Fév", icon: "🛒", details: "Courses hebdomadaires — fruits, légumes, viande, produits frais" },
        { id: 2, merchant: "Uber", amount: -14.50, category: "Transport", date: "16 Fév", icon: "🚗", details: "Trajet Nantes Centre → Gare SNCF" },
        { id: 3, merchant: "Salaire", amount: 4_500, category: "Revenu", date: "15 Fév", icon: "💰", details: "Virement salaire mensuel — Employeur principal" },
        { id: 4, merchant: "Netflix", amount: -15.99, category: "Abonnement", date: "14 Fév", icon: "🎬", details: "Abonnement mensuel Standard — renouvellement automatique" },
        { id: 5, merchant: "NeoFlow Agency Profit", amount: 3_300, category: "Business", date: "14 Fév", icon: "💼", details: "Transfert profit mensuel NeoFlow Agency → Compte personnel" },
        { id: 6, merchant: "Loyer", amount: -950, category: "Logement", date: "05 Fév", icon: "🏠", details: "Loyer mensuel — Appartement T3 centre-ville" },
        { id: 7, merchant: "Spotify", amount: -10.99, category: "Abonnement", date: "04 Fév", icon: "🎵", details: "Abonnement Spotify Premium — renouvellement automatique" },
        { id: 8, merchant: "EDF", amount: -76.50, category: "Logement", date: "03 Fév", icon: "💡", details: "Facture électricité mensuelle" },
    ],
    incomeVsExpenses: [
        { month: "Sep", income: 6_800, expenses: 3_100 },
        { month: "Oct", income: 7_200, expenses: 3_300 },
        { month: "Nov", income: 7_000, expenses: 3_200 },
        { month: "Dec", income: 7_500, expenses: 3_800 },
        { month: "Jan", income: 7_600, expenses: 3_400 },
        { month: "Feb", income: 7_800, expenses: 3_450 },
    ],
};

// Type exports
export type Position = (typeof investmentsData.positions)[number];
export type Transaction = (typeof financeData.transactions)[number];
