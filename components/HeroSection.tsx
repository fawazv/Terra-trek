"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Trek } from "@/data/treks";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function useCountUp(end: number, duration: number = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease out expo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
}

// Helper to parse numeric part of a stat for counting
const parseStatValue = (val: string) => {
    const numMatch = val.match(/\d+/);
    if (numMatch) {
        return {
            num: parseInt(numMatch[0], 10),
            suffix: val.replace(numMatch[0], "")
        };
    }
    return { num: null, suffix: val };
};

function AnimatedStat({
    stat,
    icon
}: {
    stat: { label: string; val: string };
    icon: string;
}) {
    const parsed = parseStatValue(stat.val);
    const hasNum = parsed.num !== null;
    // Unconditional hook call
    const count = useCountUp(hasNum ? parsed.num! : 0);

    return (
        <div className="glass rounded-2xl p-4 md:p-6 text-center flex flex-col items-center justify-center border-t border-white/10 shadow-xl">
            <span className="text-xl mb-2 opacity-80">{icon}</span>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                {hasNum ? count : ""}{parsed.suffix}
            </div>
            <div className="text-[10px] md:text-xs text-green-400/80 uppercase tracking-widest font-semibold mt-1">
                {stat.label}
            </div>
        </div>
    );
}

interface Props {
    trek: Trek;
}

export default function HeroSection({ trek }: Props) {
    const containerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth parallax
    const springConfig = { damping: 25, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Background parallax (moves with mouse)
    const bgX = useTransform(springX, [-0.5, 0.5], ["-1.5%", "1.5%"]);
    const bgY = useTransform(springY, [-0.5, 0.5], ["-1.5%", "1.5%"]);

    // Foreground text parallax (moves opposite to mouse for depth)
    const textX = useTransform(springX, [-0.5, 0.5], ["0.8%", "-0.8%"]);
    const textY = useTransform(springY, [-0.5, 0.5], ["0.8%", "-0.8%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        // Reset loading state when trek changes
        setIsVideoLoaded(false);
        const video = videoRef.current;

        if (video) {
            // If the video is already loaded (from cache, or fast connection), 
            // the onLoadedData event may have already fired before this effect runs.
            // Check readyState directly: 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
            if (video.readyState >= 3) {
                setIsVideoLoaded(true);
            } else {
                // Otherwise attach listener
                const handleLoaded = () => setIsVideoLoaded(true);
                video.addEventListener("loadeddata", handleLoaded);
                video.addEventListener("canplay", handleLoaded);
                return () => {
                    video.removeEventListener("loadeddata", handleLoaded);
                    video.removeEventListener("canplay", handleLoaded);
                };
            }
        }
    }, [trek.id]);

    const scrollToDetails = () => {
        document.getElementById("trail-details")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToBook = () => {
        document.getElementById("book-now")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Background Video & Parallax Layer ── */}
            <motion.div
                className="absolute inset-0 w-[103%] h-[103%] -left-[1.5%] -top-[1.5%]"
                style={{ x: bgX, y: bgY }}
            >
                {/* Fallback gradient if video fails/loads */}
                <div
                    className="absolute inset-0 z-0"
                    style={{ background: trek.gradient }}
                />

                <video
                    ref={videoRef}
                    key={trek.id} // Re-mount and autoplay on trek change
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isVideoLoaded ? "opacity-80" : "opacity-0"
                        }`}
                >
                    <source src={trek.heroVideo} type="video/mp4" />
                </video>

                {/* Overlays for contrast and theme tint */}
                <div className={`absolute inset-0 z-10 bg-linear-to-b from-black/20 via-black/40 to-trek-dark transition-opacity duration-1000 ${isVideoLoaded ? "opacity-100" : "opacity-0"
                    }`} />
                <div
                    className={`absolute inset-0 z-10 mix-blend-color transition-opacity duration-1000 ${isVideoLoaded ? "opacity-40" : "opacity-0"
                        }`}
                    style={{ backgroundColor: trek.themeColor }}
                />
            </motion.div>

            {/* ── Modern Loading Overlay ── */}
            <AnimatePresence>
                {!isVideoLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-trek-dark"
                    >
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            {/* Outer spinning ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-green-400/20 border-t-green-400"
                            />
                            {/* Inner pulsing diamond (compass motif) */}
                            <motion.div
                                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-3 h-3 bg-green-400 rotate-45 rounded-[2px] shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                            />
                        </div>
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="mt-6 text-green-400/80 text-[10px] font-semibold tracking-[0.3em] uppercase"
                        >
                            Loading Expedition
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Foreground Content ── */}
            {isVideoLoaded && (
                <motion.div
                    className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-32 pb-24 w-full flex flex-col items-center"
                    style={{ x: textX, y: textY }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/10 text-green-400 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Expedition Available
                    </motion.div>

                    {/* Animated Title (Clip-path Word Reveal) */}
                    <h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[1.1] mb-6 flex flex-wrap justify-center gap-[0.2em]"
                        style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
                    >
                        {trek.name.split(" ").map((word, i) => (
                            <span key={i} className="overflow-hidden inline-block pb-2">
                                <motion.span
                                    className="inline-block"
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{
                                        delay: 0.3 + (i * 0.1),
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1] // Apple-style cinematic ease
                                    }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    {/* Tagline */}
                    <div className="overflow-hidden mb-4">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-xl md:text-3xl text-white/80 font-light italic"
                        >
                            {trek.tagline}
                        </motion.p>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        className="text-sm md:text-base text-white/50 tracking-widest uppercase mb-16 max-w-2xl"
                    >
                        {trek.description}
                    </motion.p>

                    {/* Stats row (Glassmorphism Cards) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="grid grid-cols-3 gap-4 md:gap-8 mb-16 w-full max-w-3xl"
                    >
                        {trek.stats.map((s, idx) => {
                            const icons = ["📏", "🏔️", "⚡"];
                            const icon = icons[idx % icons.length];
                            return <AnimatedStat key={s.label} stat={s} icon={icon} />;
                        })}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <button
                            onClick={scrollToDetails}
                            className="px-8 py-4 bg-green-400 text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95 text-sm uppercase tracking-wider relative overflow-hidden group w-full sm:w-auto"
                        >
                            <span className="relative z-10 w-full text-center">Explore the Trail</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        </button>

                        <button
                            onClick={scrollToBook}
                            className="px-8 py-4 glass text-white font-semibold rounded-full transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 text-sm uppercase tracking-wider w-full sm:w-auto"
                        >
                            Book This Trek →
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 z-20 pointer-events-none"
            >
                <span className="text-[10px] tracking-widest uppercase font-semibold">
                    Scroll to walk
                </span>
                <div className="w-px h-16 bg-linear-to-b from-green-400/50 via-white/20 to-transparent relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-white w-full shadow-[0_0_8px_white]"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
