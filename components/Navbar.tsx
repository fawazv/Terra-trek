"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const unsub = scrollY.on("change", (v) => setScrolled(v > 80));
        return () => unsub();
    }, [scrollY]);

    const scrollToBook = () => {
        const el = document.getElementById("book-now");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-black/80 backdrop-blur-md py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-green-400"
                    >
                        <path
                            d="M14 2L6 10h4v4H6l-4 4h6v6h4v-6h4v6h4v-6h6l-4-4h-4v-4h4L14 2z"
                            fill="currentColor"
                            opacity="0.9"
                        />
                    </svg>
                    <span className="text-white font-bold text-xl tracking-tight">
                        Terra<span className="text-green-400">Trek</span>
                    </span>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="#trail-details" className="hover:text-white transition-colors">
                        Trails
                    </a>
                    <a href="#experience" className="hover:text-white transition-colors">
                        Experience
                    </a>
                    <a href="#book-now" className="hover:text-white transition-colors">
                        Pricing
                    </a>
                </div>

                {/* CTA */}
                <motion.button
                    onClick={scrollToBook}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-5 py-2.5 text-sm font-semibold text-black bg-green-400 rounded-full overflow-hidden group"
                >
                    {/* pulse ring */}
                    <span className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
                    <span className="relative z-10">Book Expedition</span>
                </motion.button>
            </div>
        </motion.nav>
    );
}
