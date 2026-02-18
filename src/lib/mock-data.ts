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
    // Make sure last price is close to current
    data[data.length - 1].price = basePrice;
    return data;
}

// ---------- VUE GLOBALE ----------
export const globalData = {
    netWorth: 147_850,
    netWorthChange: 5.3,
    totalCash: 12_400,
    totalInvestments: 89_200,
    totalBusiness: 46_250,
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

// ---------- NEOFLOW BOS (STRIPE) ----------
export const neoflowData = {
    mrr: 4_625,
    mrrChange: 8.2,
    arr: 55_500,
    activeSubscribers: 47,
    newCustomersThisMonth: 5,
    churnedThisMonth: 2,
    churnRate: 2.1,
    ltv: 920,
    avgRevenuePerUser: 98.4,
    revenueHistory: [
        { month: "Sep", revenue: 3_200, customers: 32 },
        { month: "Oct", revenue: 3_500, customers: 35 },
        { month: "Nov", revenue: 3_800, customers: 38 },
        { month: "Dec", revenue: 4_100, customers: 41 },
        { month: "Jan", revenue: 4_350, customers: 44 },
        { month: "Feb", revenue: 4_625, customers: 47 },
    ],
    recentEvents: [
        { id: 1, name: "Studio Créatif", plan: "Pro", amount: 149, type: "new" as const, date: "17 Fév" },
        { id: 2, name: "DigitalBoost", plan: "Business", amount: 249, type: "new" as const, date: "15 Fév" },
        { id: 3, name: "WebAgency Paris", plan: "Starter", amount: 49, type: "churned" as const, date: "14 Fév" },
        { id: 4, name: "MarketingPro", plan: "Pro", amount: 149, type: "new" as const, date: "12 Fév" },
        { id: 5, name: "FreelanceHub", plan: "Pro", amount: 149, type: "renewed" as const, date: "10 Fév" },
        { id: 6, name: "DesignLab", plan: "Business", amount: 249, type: "new" as const, date: "08 Fév" },
    ],
    customers: [
        {
            id: "cus_1",
            name: "Studio Créatif",
            email: "contact@studiocrea.fr",
            plan: "Pro",
            amount: 149,
            status: "active" as const,
            joinDate: "15 Jan 2024",
            totalPaid: 1_490,
            invoices: 10,
            lastPayment: "17 Fév 2025",
            paymentHistory: [
                { month: "Sep", amount: 149 },
                { month: "Oct", amount: 149 },
                { month: "Nov", amount: 149 },
                { month: "Dec", amount: 149 },
                { month: "Jan", amount: 149 },
                { month: "Feb", amount: 149 },
            ],
        },
        {
            id: "cus_2",
            name: "DigitalBoost",
            email: "admin@digitalboost.io",
            plan: "Business",
            amount: 249,
            status: "active" as const,
            joinDate: "03 Mar 2024",
            totalPaid: 2_988,
            invoices: 12,
            lastPayment: "15 Fév 2025",
            paymentHistory: [
                { month: "Sep", amount: 249 },
                { month: "Oct", amount: 249 },
                { month: "Nov", amount: 249 },
                { month: "Dec", amount: 249 },
                { month: "Jan", amount: 249 },
                { month: "Feb", amount: 249 },
            ],
        },
        {
            id: "cus_3",
            name: "WebAgency Paris",
            email: "billing@webagency.paris",
            plan: "Starter",
            amount: 49,
            status: "churned" as const,
            joinDate: "20 Jun 2024",
            totalPaid: 392,
            invoices: 8,
            lastPayment: "14 Jan 2025",
            paymentHistory: [
                { month: "Sep", amount: 49 },
                { month: "Oct", amount: 49 },
                { month: "Nov", amount: 49 },
                { month: "Dec", amount: 49 },
                { month: "Jan", amount: 49 },
                { month: "Feb", amount: 0 },
            ],
        },
    ],
};

// ---------- INVESTISSEMENTS ----------
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
            symbol: "AAPL",
            name: "Apple Inc.",
            type: "Action",
            qty: 50,
            avgPrice: 152.30,
            price: 178.50,
            pnl: 1_310,
            pnlPercent: 17.2,
            marketCap: "2.89T",
            peRatio: 28.5,
            dividend: "0.52%",
            volume: "58.2M",
            high52w: 199.62,
            low52w: 143.90,
            sector: "Technology",
            exchange: "NASDAQ",
            description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
            priceHistory: generatePriceHistory(178.50, 12, 8),
            transactions: [
                { date: "12 Jan 2024", type: "Achat", qty: 20, price: 148.50, total: 2_970 },
                { date: "15 Mar 2024", type: "Achat", qty: 15, price: 155.20, total: 2_328 },
                { date: "02 Aug 2024", type: "Achat", qty: 15, price: 154.10, total: 2_311.50 },
            ],
        },
        {
            symbol: "MSFT",
            name: "Microsoft Corp.",
            type: "Action",
            qty: 20,
            avgPrice: 310.00,
            price: 415.60,
            pnl: 2_112,
            pnlPercent: 34.1,
            marketCap: "3.09T",
            peRatio: 34.2,
            dividend: "0.74%",
            volume: "22.1M",
            high52w: 430.82,
            low52w: 309.45,
            sector: "Technology",
            exchange: "NASDAQ",
            description: "Microsoft Corporation develops and supports software, services, devices and solutions worldwide.",
            priceHistory: generatePriceHistory(415.60, 12, 6),
            transactions: [
                { date: "05 Feb 2024", type: "Achat", qty: 10, price: 305.00, total: 3_050 },
                { date: "20 Jun 2024", type: "Achat", qty: 10, price: 315.00, total: 3_150 },
            ],
        },
        {
            symbol: "VWCE",
            name: "Vanguard FTSE All-World",
            type: "ETF",
            qty: 200,
            avgPrice: 96.50,
            price: 111.00,
            pnl: 2_900,
            pnlPercent: 15.0,
            marketCap: "N/A",
            peRatio: 0,
            dividend: "1.8%",
            volume: "1.2M",
            high52w: 115.30,
            low52w: 89.20,
            sector: "Global Equity",
            exchange: "Euronext",
            description: "Vanguard FTSE All-World UCITS ETF tracks the performance of the FTSE All-World Index, providing exposure to large- and mid-cap equities worldwide.",
            priceHistory: generatePriceHistory(111.00, 12, 4),
            transactions: [
                { date: "01 Jan 2024", type: "Achat", qty: 50, price: 92.30, total: 4_615 },
                { date: "01 Apr 2024", type: "Achat", qty: 50, price: 97.10, total: 4_855 },
                { date: "01 Jul 2024", type: "Achat", qty: 50, price: 99.50, total: 4_975 },
                { date: "01 Oct 2024", type: "Achat", qty: 50, price: 97.10, total: 4_855 },
            ],
        },
        {
            symbol: "BTC",
            name: "Bitcoin",
            type: "Crypto",
            qty: 0.45,
            avgPrice: 32_000,
            price: 43_500,
            pnl: 5_175,
            pnlPercent: 35.9,
            marketCap: "852B",
            peRatio: 0,
            dividend: "N/A",
            volume: "32.5B",
            high52w: 73_750,
            low52w: 24_800,
            sector: "Cryptocurrency",
            exchange: "Multiple",
            description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network.",
            priceHistory: generatePriceHistory(43_500, 12, 15),
            transactions: [
                { date: "10 Dec 2023", type: "Achat", qty: 0.25, price: 30_500, total: 7_625 },
                { date: "22 May 2024", type: "Achat", qty: 0.20, price: 33_875, total: 6_775 },
            ],
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            type: "Crypto",
            qty: 3.2,
            avgPrice: 2_100,
            price: 2_420,
            pnl: 1_024,
            pnlPercent: 15.2,
            marketCap: "291B",
            peRatio: 0,
            dividend: "~4.0% staking",
            volume: "15.8B",
            high52w: 4_090,
            low52w: 1_520,
            sector: "Cryptocurrency",
            exchange: "Multiple",
            description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
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

// ---------- FINANCES PERSONNELLES ----------
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
        { id: 5, merchant: "NeoFlow BOS Profit", amount: 3_300, category: "Business", date: "14 Fév", icon: "💼", details: "Transfert profit mensuel NeoFlow BOS (SaaS) → Compte personnel" },
        { id: 6, merchant: "Loyer", amount: -950, category: "Logement", date: "05 Fév", icon: "🏠", details: "Loyer mensuel — Appartement T3 centre-ville" },
        { id: 7, merchant: "Spotify", amount: -10.99, category: "Abonnement", date: "04 Fév", icon: "🎵", details: "Abonnement Spotify Premium — renouvellement automatique" },
        { id: 8, merchant: "EDF", amount: -76.50, category: "Logement", date: "03 Fév", icon: "💡", details: "Facture électricité mensuelle — Contrat Heures Pleines/Creuses" },
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
export type Customer = (typeof neoflowData.customers)[number];
export type Transaction = (typeof financeData.transactions)[number];
export type NeoflowEvent = (typeof neoflowData.recentEvents)[number];
