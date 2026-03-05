"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { Trek } from "@/data/treks";

interface Props {
    trek: Trek;
    scrollYProgress: MotionValue<number>;
}

// Each milestone: [fadeInStart, fullOpacityStart, fullOpacityEnd, fadeOutEnd]
// Progress runs 0 → 1 across the sticky section
const MILESTONE_RANGES: [number, number, number, number][] = [
    [0.0, 0.06, 0.2, 0.27],
    [0.26, 0.32, 0.46, 0.53],
    [0.52, 0.58, 0.72, 0.79],
    [0.78, 0.84, 0.96, 1.0],
];

interface MilestoneData {
    title: string;
    subtitle: string;
}

function Milestone({
    data,
    range,
    scrollYProgress,
    index,
}: {
    data: MilestoneData;
    range: [number, number, number, number];
    scrollYProgress: MotionValue<number>;
    index: number;
}) {
    const [r0, r1, r2, r3] = range;

    const opacity = useTransform(
        scrollYProgress,
        [r0, r1, r2, r3],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [r0, r1, r2, r3],
        [30, 0, 0, -30]
    );

    const isLast = index === 3;

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
        >
            <div className="max-w-2xl text-center">
                {/* Milestone number */}
                <span className="inline-block text-green-400/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                    {String(index + 1).padStart(2, "0")} / 04
                </span>

                {/* Title */}
                <h2
                    className={`font-bold text-white leading-tight mb-4 tracking-tight
            ${isLast ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl lg:text-7xl"}`}
                    style={{
                        textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                    }}
                >
                    {data.title}
                </h2>

                {/* Subtitle */}
                {data.subtitle && (
                    <p
                        className="text-white/75 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl mx-auto"
                        style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
                    >
                        {data.subtitle}
                    </p>
                )}

                {/* Accent line */}
                {isLast && (
                    <div className="mt-8 flex justify-center">
                        <div className="w-16 h-px bg-green-400/60" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function TrailMilestones({ trek, scrollYProgress }: Props) {
    const milestones: MilestoneData[] = [
        trek.milestone1,
        trek.milestone2,
        trek.milestone3,
        trek.milestone4,
    ];

    return (
        <>
            {milestones.map((m, i) => (
                <Milestone
                    key={i}
                    data={m}
                    range={MILESTONE_RANGES[i]}
                    scrollYProgress={scrollYProgress}
                    index={i}
                />
            ))}
        </>
    );
}
