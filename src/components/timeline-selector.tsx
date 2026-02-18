"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const timeframes = ["1J", "1S", "1M", "3M", "6M", "1A", "MAX"] as const;
type Timeframe = (typeof timeframes)[number];

interface TimelineSelectorProps {
    value: Timeframe;
    onChange: (t: Timeframe) => void;
}

export default function TimelineSelector({ value, onChange }: TimelineSelectorProps) {
    return (
        <div className="inline-flex gap-1 rounded-xl bg-purple-950/40 p-1">
            {timeframes.map((t) => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                        value === t
                            ? "bg-purple-600/40 text-white shadow-glow-sm"
                            : "text-purple-300/50 hover:text-purple-200"
                    )}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

export { timeframes, type Timeframe };
