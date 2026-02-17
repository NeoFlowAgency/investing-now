
export const MOCK_DATA = {
    global: {
        netWorth: 142500,
        netWorthChange: 12.5,
        totalCash: 15000,
        totalInvestments: 85000,
        totalBusinessValue: 42500,
    },
    neoflow: {
        mrr: 4500,
        mrrChange: 8.2,
        activeSubscribers: 42,
        churnRate: 2.1,
        ltv: 850,
        revenueHistory: [
            { month: "Jan", revenue: 3200 },
            { month: "Feb", revenue: 3500 },
            { month: "Mar", revenue: 3800 },
            { month: "Apr", revenue: 4100 },
            { month: "May", revenue: 4500 },
            { month: "Jun", revenue: 4200 }, // Slight dip example
            { month: "Jul", revenue: 4500 },
        ],
        recentCustomers: [
            { id: 1, name: "Alice Corp", plan: "Pro", status: "Active", date: "2023-10-01" },
            { id: 2, name: "Bob Ltd", plan: "Basic", status: "Active", date: "2023-10-05" },
            { id: 3, name: "Charlie Inc", plan: "Enterprise", status: "Cancelled", date: "2023-09-15" },
        ],
    },
    investments: {
        totalValue: 85000,
        todayChange: 350, // +350$
        allocation: [
            { name: "Stocks", value: 45000, fill: "#8884d8" },
            { name: "Crypto", value: 25000, fill: "#82ca9d" },
            { name: "Cash", value: 15000, fill: "#ffc658" },
        ],
        assets: [
            { symbol: "AAPL", name: "Apple Inc.", type: "Stock", quantity: 50, avgPrice: 150, currentPrice: 175, pnl: 1250 },
            { symbol: "BTC", name: "Bitcoin", type: "Crypto", quantity: 0.5, avgPrice: 30000, currentPrice: 42000, pnl: 6000 },
            { symbol: "VWCE", name: "Vanguard All-World", type: "ETF", quantity: 200, avgPrice: 95, currentPrice: 105, pnl: 2000 },
        ],
    },
    finance: {
        monthlyIncome: 5500,
        monthlyExpenses: 3200,
        savingsRate: 41,
        recentTransactions: [
            { id: 1, merchant: "Carrefour", amount: -150.20, category: "Groceries", date: "2023-10-25" },
            { id: 2, merchant: "Uber", amount: -25.50, category: "Transport", date: "2023-10-24" },
            { id: 3, merchant: "Salary", amount: 4500.00, category: "Income", date: "2023-10-23" },
            { id: 4, merchant: "Netflix", amount: -15.99, category: "Subscription", date: "2023-10-20" },
            { id: 5, merchant: "Revolut Metal", amount: -13.99, category: "Bank Fee", date: "2023-10-19" },
        ],
    },
};
