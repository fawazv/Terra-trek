"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Trek } from "@/data/treks";
import TrailMilestones from "./TrailMilestones"

interface Props {
    trek: Trek;
}

const TOTAL_FRAMES = 200;

export default function TrailWalkScroll({ trek }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedCountRef = useRef(0);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"],
    });

    // ── Draw a single frame ──────────────────────────────────────
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use CSS logical dimensions for draw math (ctx is already DPR-scaled)
        const cssW = parseFloat(canvas.style.width) || canvas.width;
        const cssH = parseFloat(canvas.style.height) || canvas.height;

        const img = imagesRef.current[index];

        if (!img || !img.complete || img.naturalWidth === 0) {
            // Fallback: dark gradient
            const grad = ctx.createLinearGradient(0, 0, cssW, cssH);
            grad.addColorStop(0, "#081C15");
            grad.addColorStop(1, trek.themeColor);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, cssW, cssH);
            return;
        }

        // ✅ High-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // ✅ Cover-fit: fill the canvas edge-to-edge (like CSS object-fit: cover)
        const cw = cssW;
        const ch = cssH;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        // Fill background first
        const grad = ctx.createLinearGradient(0, 0, cw, ch);
        grad.addColorStop(0, "#081C15");
        grad.addColorStop(1, trek.themeColor);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }, [trek.themeColor]);

    // ── Resize canvas to fill viewport ──────────────────────────
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ✅ DPR fix: render at full physical pixel density (fixes blur on Retina/HiDPI)
        const dpr = window.devicePixelRatio || 1;
        const cssW = window.innerWidth;
        const cssH = window.innerHeight;

        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = cssW + "px";
        canvas.style.height = cssH + "px";

        // Scale the context so all draw calls use CSS pixel coordinates
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);

        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    // ── Load 120 frames ─────────────────────────────────────────
    useEffect(() => {
        loadedCountRef.current = 0;
        imagesRef.current = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${trek.folderPath}/frame-${String(i).padStart(3, "0")}.jpg`;
            img.onload = () => {
                loadedCountRef.current += 1;
                // Re-draw current frame once its image loads
                if (i - 1 === currentFrameRef.current) {
                    drawFrame(currentFrameRef.current);
                }
            };
            imagesRef.current[i - 1] = img;
        }

        // Initial draw (may be gradient if images not ready)
        drawFrame(0);
    }, [trek.folderPath, drawFrame]);

    // ── Setup canvas size + resize listener ─────────────────────
    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    // ── Map scroll progress → frame index ───────────────────────
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
        );

        if (frameIndex === currentFrameRef.current) return;
        currentFrameRef.current = frameIndex;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawFrame(frameIndex);
        });
    });

    // Cleanup RAF on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative h-[500vh]">
            {/* Sticky full-screen container */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: "block" }}
                />

                {/* Subtle overlay for text legibility */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Milestone text overlays */}
                <TrailMilestones trek={trek} scrollYProgress={scrollYProgress} />

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
                        Scroll to walk
                    </span>
                    <div className="w-px h-10 bg-linear-to-b from-white/30 to-transparent animate-pulse" />
                </div>
            </div>
        </div>
    );
}
