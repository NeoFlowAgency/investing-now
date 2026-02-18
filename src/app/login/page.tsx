"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message === "Invalid login credentials" ? "Email ou mot de passe incorrect" : error.message);
            setLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-glow-lg">
                    <span className="text-2xl font-black text-white">IN</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">Investing Now</h1>
                <p className="mt-1 text-sm text-purple-300/50">Connectez-vous à votre dashboard</p>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="card-glow rounded-2xl p-6 sm:p-8">
                {/* Error message */}
                {error && (
                    <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-purple-300/50">
                        Email
                    </label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500/40" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="noakim@neoflow.agency"
                            className="w-full rounded-xl border border-purple-800/30 bg-purple-950/30 py-3 pl-10 pr-4 text-sm text-white placeholder-purple-400/30 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-purple-300/50">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500/40" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-purple-800/30 bg-purple-950/30 py-3 pl-10 pr-12 text-sm text-white placeholder-purple-400/30 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-500/40 hover:text-purple-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-glow-sm transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Connexion...
                        </span>
                    ) : (
                        "Se connecter"
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-purple-400/30">
                Accès restreint — Usage personnel uniquement
            </p>
        </div>
    );
}
