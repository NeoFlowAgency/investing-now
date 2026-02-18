"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

/* ─── Custom Tooltip ──────────────────────────────────── */
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-purple-500/20 bg-surface-100 px-3 py-2 shadow-glow-sm">
            <p className="text-xs font-medium text-purple-300/60">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} className="text-sm font-semibold text-white">
                    {typeof p.value === "number"
                        ? p.value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
                        : p.value}
                </p>
            ))}
        </div>
    );
}

const GRID_STROKE = "rgba(139, 92, 246, 0.08)";
const AXIS_TICK = { fill: "rgba(196, 181, 253, 0.4)", fontSize: 11 };

/* ─── AREA ────────────────────────────────────────────── */
export function ChartArea({
    data,
    dataKey = "value",
    xKey = "month",
    color = "#8b5cf6",
    height = 300,
}: {
    data: any[];
    dataKey?: string;
    xKey?: string;
    color?: string;
    height?: number;
}) {
    const gradId = `area-${color.replace("#", "")}`;
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#${gradId})`} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ─── BAR ─────────────────────────────────────────────── */
export function ChartBar({
    data,
    dataKeys = [{ key: "value", color: "#8b5cf6" }],
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
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139, 92, 246, 0.05)" }} />
                {dataKeys.map((dk) => (
                    <Bar key={dk.key} dataKey={dk.key} fill={dk.color} radius={[8, 8, 0, 0]} barSize={20} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}

/* ─── LINE ────────────────────────────────────────────── */
export function ChartLine({
    data,
    lines = [{ key: "value", color: "#8b5cf6" }],
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
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                {lines.map((l) => (
                    <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2.5} dot={false} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

/* ─── DONUT ───────────────────────────────────────────── */
export function ChartDonut({
    data,
    height = 220,
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
