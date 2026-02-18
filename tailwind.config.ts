import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                brand: {
                    50: "#f3e8ff",
                    100: "#e9d5ff",
                    200: "#d8b4fe",
                    300: "#c084fc",
                    400: "#a855f7",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                    700: "#6d28d9",
                    800: "#5b21b6",
                    900: "#4c1d95",
                    950: "#2e1065",
                },
                surface: {
                    DEFAULT: "#0c0a1a",
                    50: "#1a1535",
                    100: "#1e1840",
                    200: "#261f52",
                    300: "#2f2768",
                    400: "#3d2d7a",
                },
            },
            boxShadow: {
                glow: "0 0 20px rgba(139, 92, 246, 0.15)",
                "glow-sm": "0 0 10px rgba(139, 92, 246, 0.1)",
                "glow-lg": "0 0 40px rgba(139, 92, 246, 0.2)",
            },
        },
    },
    plugins: [],
};
export default config;
