"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    subtitle?: string;
    wide?: boolean;
}

export default function Modal({ open, onClose, children, title, subtitle, wide }: ModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Panel */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl border border-purple-500/15 bg-[#12101f] shadow-glow-lg sm:rounded-3xl",
                    wide ? "sm:max-w-4xl" : "sm:max-w-2xl"
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-purple-800/20 px-6 py-5">
                    <div>
                        {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
                        {subtitle && <p className="mt-0.5 text-sm text-purple-300/50">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-purple-400/60 transition-colors hover:bg-purple-900/30 hover:text-purple-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            </div>
        </div>
    );
}
