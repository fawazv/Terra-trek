"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubscribed(true);
    };

    const trails = ["Emerald Canopy", "Mystic Ridge", "Coorg Summit", "Western Ghats Trail", "Nilgiri Descent"];
    const safety = ["Altitude Guidelines", "Wildlife Protocol", "Emergency Contacts", "Weather Policy", "Insurance Info"];

    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-green-400">
                                <path d="M14 2L6 10h4v4H6l-4 4h6v6h4v-6h4v6h4v-6h6l-4-4h-4v-4h4L14 2z" fill="currentColor" opacity="0.9" />
                            </svg>
                            <span className="text-white font-bold text-lg tracking-tight">
                                Terra<span className="text-green-400">Trek</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Immersive, zero-impact wilderness expeditions through India's most
                            extraordinary forest corridors.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {["𝕏", "IG", "YT"].map((s) => (
                                <button
                                    key={s}
                                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-green-400/50 hover:text-green-400 transition-colors text-xs font-bold"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trail Directory */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
                            Trail Directory
                        </h4>
                        <ul className="space-y-2.5">
                            {trails.map((t) => (
                                <li key={t}>
                                    <a href="#" className="text-gray-500 text-sm hover:text-green-400 transition-colors">
                                        {t}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Safety */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
                            Safety Guidelines
                        </h4>
                        <ul className="space-y-2.5">
                            {safety.map((s) => (
                                <li key={s}>
                                    <a href="#" className="text-gray-500 text-sm hover:text-green-400 transition-colors">
                                        {s}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
                            Trail Dispatches
                        </h4>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                            Monthly field notes from our guides — sent straight to your inbox.
                        </p>
                        {subscribed ? (
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-400 text-sm font-medium"
                            >
                                ✓ You're on the trail list.
                            </motion.p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-400/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-green-400 text-black text-sm font-semibold rounded-lg hover:bg-green-300 transition-colors"
                                >
                                    →
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-gray-600 text-xs">
                        © 2026 TerraTrek. All rights reserved. Leave No Trace.
                    </p>
                    <div className="flex gap-6">
                        {["Privacy", "Terms", "Accessibility"].map((l) => (
                            <a key={l} href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                                {l}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
