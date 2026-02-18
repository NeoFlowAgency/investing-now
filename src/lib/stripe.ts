import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
    typescript: true,
});

// Helper to get global Stripe stats (for NeoFlow Dashboard)
export async function getStripeStats() {
    try {
        const listBalances = await stripe.balance.retrieve();
        const balance = listBalances.available.reduce((acc, curr) => acc + curr.amount, 0) / 100; // Cents to units (EUR/USD mix potential issue, assume EUR default)

        // Get last 30 days charges (successful)
        const charges = await stripe.charges.list({ limit: 100 });
        const successfulCharges = charges.data.filter((c) => c.status === "succeeded");
        const volume = successfulCharges.reduce((acc, curr) => acc + curr.amount, 0) / 100;

        // Get active subscriptions (MRR approximation)
        const subs = await stripe.subscriptions.list({ status: "active", limit: 100 });
        const mrr = subs.data.reduce((acc, sub) => {
            // Very simple MRR calc: sum of plan amounts (assuming monthly interval for simplicity, need adjusting for yearly)
            const item = sub.items.data[0];
            const amount = item.price.unit_amount || 0;
            const interval = item.price.recurring?.interval;
            return acc + (interval === "year" ? amount / 12 : amount);
        }, 0) / 100;

        return {
            balance,
            volume30d: volume,
            mrr,
            activeSubs: subs.data.length,
            recentCharges: charges.data.slice(0, 5).map(c => ({
                id: c.id,
                amount: c.amount / 100,
                status: c.status,
                date: new Date(c.created * 1000).toLocaleDateString(),
                customer: c.billing_details.name || c.billing_details.email || "Unknown",
            }))
        };
    } catch (error) {
        console.error("Stripe Error:", error);
        return null;
    }
}
