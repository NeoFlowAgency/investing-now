// ============================================================
// MOCK DATA — Will be replaced by real API calls (Stripe, GoCardless, Yahoo Finance, CoinGecko)
// ============================================================

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
        { id: 1, name: "Studio Créatif", plan: "Pro", amount: 149, type: "new", date: "17 Fév" },
        { id: 2, name: "DigitalBoost", plan: "Business", amount: 249, type: "new", date: "15 Fév" },
        { id: 3, name: "WebAgency Paris", plan: "Starter", amount: 49, type: "churned", date: "14 Fév" },
        { id: 4, name: "MarketingPro", plan: "Pro", amount: 149, type: "new", date: "12 Fév" },
        { id: 5, name: "FreelanceHub", plan: "Pro", amount: 149, type: "renewed", date: "10 Fév" },
        { id: 6, name: "DesignLab", plan: "Business", amount: 249, type: "new", date: "08 Fév" },
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
        { symbol: "AAPL", name: "Apple Inc.", type: "Action", qty: 50, avgPrice: 152.30, price: 178.50, pnl: 1_310, pnlPercent: 17.2 },
        { symbol: "MSFT", name: "Microsoft Corp.", type: "Action", qty: 20, avgPrice: 310.00, price: 415.60, pnl: 2_112, pnlPercent: 34.1 },
        { symbol: "VWCE", name: "Vanguard FTSE All-World", type: "ETF", qty: 200, avgPrice: 96.50, price: 111.00, pnl: 2_900, pnlPercent: 15.0 },
        { symbol: "BTC", name: "Bitcoin", type: "Crypto", qty: 0.45, avgPrice: 32_000, price: 43_500, pnl: 5_175, pnlPercent: 35.9 },
        { symbol: "ETH", name: "Ethereum", type: "Crypto", qty: 3.2, avgPrice: 2_100, price: 2_420, pnl: 1_024, pnlPercent: 15.2 },
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
        { id: 1, merchant: "Carrefour", amount: -87.40, category: "Alimentation", date: "17 Fév", icon: "🛒" },
        { id: 2, merchant: "Uber", amount: -14.50, category: "Transport", date: "16 Fév", icon: "🚗" },
        { id: 3, merchant: "Salaire", amount: 4_500, category: "Revenu", date: "15 Fév", icon: "💰" },
        { id: 4, merchant: "Netflix", amount: -15.99, category: "Abonnement", date: "14 Fév", icon: "🎬" },
        { id: 5, merchant: "NeoFlow BOS Profit", amount: 3_300, category: "Business", date: "14 Fév", icon: "💼" },
        { id: 6, merchant: "Loyer", amount: -950, category: "Logement", date: "05 Fév", icon: "🏠" },
        { id: 7, merchant: "Spotify", amount: -10.99, category: "Abonnement", date: "04 Fév", icon: "🎵" },
        { id: 8, merchant: "EDF", amount: -76.50, category: "Logement", date: "03 Fév", icon: "💡" },
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
