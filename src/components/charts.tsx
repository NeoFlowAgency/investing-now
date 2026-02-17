"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

// ─── Custom Tooltip ─────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-xl">
            <p className="text-xs font-medium text-zinc-400">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
                    {typeof p.value === "number"
                        ? p.value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
                        : p.value}
                </p>
            ))}
        </div>
    );
}

// ─── AREA CHART ─────────────────────────────────────────
export function ChartArea({
    data,
    dataKey = "value",
    xKey = "month",
    color = "#6366f1",
    height = 300,
}: {
    data: any[];
    dataKey?: string;
    xKey?: string;
    color?: string;
    height?: number;
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey={xKey} tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#grad-${color})`} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// ─── BAR CHART ──────────────────────────────────────────
export function ChartBar({
    data,
    dataKeys = [{ key: "value", color: "#6366f1" }],
    xKey = "month",
    height = 300,
}: {
    data: any[];
    dataKeys?: { key: string; color: string }[];
    xKey?: string;
    height?: number;
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey={xKey} tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                {dataKeys.map((dk) => (
                    <Bar key={dk.key} dataKey={dk.key} fill={dk.color} radius={[6, 6, 0, 0]} barSize={24} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}

// ─── LINE CHART ─────────────────────────────────────────
export function ChartLine({
    data,
    lines = [{ key: "value", color: "#6366f1" }],
    xKey = "month",
    height = 300,
}: {
    data: any[];
    lines?: { key: string; color: string }[];
    xKey?: string;
    height?: number;
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey={xKey} tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                {lines.map((l) => (
                    <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2.5} dot={false} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

// ─── DONUT / PIE CHART ──────────────────────────────────
export function ChartDonut({
    data,
    height = 250,
}: {
    data: { name: string; value: number; color: string }[];
    height?: number;
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
}
