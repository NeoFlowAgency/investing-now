"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, UploadCloud, FileSpreadsheet, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ImportFinancePage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            if (!text) return;

            // Simple CSV Parse (Revolut format usually: Date, Type, Description, Paid Out (EUR), Paid In (EUR), Exchange Out, Exchange In, Balance, Category, Notes)
            // Or similar depending on export type. Assume standard CSV.
            const rows = text.split("\n").slice(1); // Skip header
            const transactions = [];

            for (const row of rows) {
                if (!row.trim()) continue;
                const cols = row.split(",").map(c => c.replace(/"/g, "").trim()); // Basic CSV parsing, handle simple quotes

                // Mock mapping based on typical structure. ADAPT THIS TO ACTUAL CSV.
                // Index 0: Date, 1: Type, 2: Description, 3: Amount Out, 4: Amount In...
                const date = cols[0]; // e.g., "2024-02-18" or "18 Feb 2024"
                const desc = cols[2] || "Unknown";
                const amountOut = parseFloat(cols[3] || "0");
                const amountIn = parseFloat(cols[4] || "0");

                const amount = amountIn > 0 ? amountIn : -amountOut;
                if (amount === 0) continue;

                transactions.push({
                    date: new Date(date).toISOString(),
                    merchant: desc,
                    amount: amount,
                    category: cols[9] || "Uncategorized", // Guess column index 9
                    source: "revolut_import",
                    details: `Type: ${cols[1]}`,
                });
            }

            // Insert to Supabase
            const supabase = createClient();
            const { error: insertError } = await supabase
                .from("bank_transactions")
                .insert(transactions);

            if (insertError) {
                console.error(insertError);
                setError("Erreur lors de l'import : " + insertError.message);
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/finance"), 2000);
            }
            setLoading(false);
        };

        reader.readAsText(file);
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/finance"
                    className="rounded-xl bg-purple-950/40 p-2 text-purple-300 hover:bg-purple-900/40 hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Importer Transactions</h1>
                    <p className="text-sm text-purple-300/50">Ajoutez vos relevés bancaires (CSV Revolut, Boursorama...)</p>
                </div>
            </div>

            <div className="card-glow rounded-2xl p-8">
                {!success ? (
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-950/20 py-12 text-center transition-colors hover:bg-purple-900/20">
                            <div className="mb-4 rounded-full bg-purple-500/10 p-4 text-purple-400">
                                <UploadCloud size={32} />
                            </div>
                            <label htmlFor="csv-upload" className="cursor-pointer text-sm font-medium text-purple-300 hover:text-white">
                                <span className="font-bold text-white">Cliquez pour choisir un fichier</span> ou glissez-le ici
                                <input
                                    id="csv-upload"
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </label>
                            <p className="mt-1 text-xs text-purple-400/40">Format supporté : CSV (Revolut, Standard)</p>
                            {file && (
                                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                                    <FileSpreadsheet size={14} />
                                    {file.name}
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300 text-center border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!file || loading}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-glow-sm transition-all hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                                Importer CSV
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 rounded-full bg-emerald-500/10 p-4 text-emerald-400">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Import réussi !</h3>
                        <p className="mt-2 text-sm text-purple-300/50">Vos transactions ont été ajoutées.</p>
                        <p className="mt-1 text-xs text-purple-400/40">Redirection vers Finance...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
