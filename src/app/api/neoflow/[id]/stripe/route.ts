import { NextResponse } from "next/server";
import { getStripeStats } from "@/lib/stripe";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // In a real app, verify user auth & check if this project (params.id) matches this user

    const stats = await getStripeStats();

    if (!stats) {
        return NextResponse.json({ error: "Failed to fetch Stripe data" }, { status: 500 });
    }

    return NextResponse.json(stats);
}
