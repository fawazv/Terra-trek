import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                trek: {
                    green: "#1B4332",
                    pine: "#2F4F4F",
                    moss: "#3A5A40",
                    earth: "#6B5A3E",
                    mist: "#C9D6C8",
                    dark: "#050A05",
                    canopy: "#081C15",
                    slate: "#1A2421",
                },
            },
            fontFamily: {
                outfit: ["var(--font-outfit)", "sans-serif"],
            },
            animation: {
                "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
                "fade-up": "fadeUp 0.8s ease-out forwards",
            },
            keyframes: {
                pulseGlow: {
                    "0%, 100%": {
                        boxShadow: "0 0 8px 2px rgba(34,197,94,0.25)",
                    },
                    "50%": {
                        boxShadow: "0 0 22px 8px rgba(34,197,94,0.45)",
                    },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
