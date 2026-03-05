"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { treks } from "@/data/treks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrailWalkScroll from "@/components/TrailWalkScroll";
import HeroSection from "@/components/HeroSection";

// ── Page transition variants ──────────────────────────────────
const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Section reveal variants ───────────────────────────────────
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trek = treks[currentIndex];
  const nextTrek = treks[(currentIndex + 1) % treks.length];

  // Reset scroll on trek change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentIndex]);

  return (
    <main className="relative bg-trek-dark min-h-screen">
      <Navbar />

      {/* ── Animated Trek Content ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={trek.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* ═══════════════════════════════════════════════
              HERO HEADER (above canvas)
          ═══════════════════════════════════════════════ */}
          <HeroSection trek={trek} />

          {/* ═══════════════════════════════════════════════
              CANVAS SCROLL SECTION
          ═══════════════════════════════════════════════ */}
          <TrailWalkScroll trek={trek} />

          {/* ═══════════════════════════════════════════════
              TRAIL DETAILS SECTION
          ═══════════════════════════════════════════════ */}
          <section id="trail-details" className="bg-trek-dark py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                {/* Text */}
                <div>
                  <span className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
                    The Environment
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {trek.detailsSection.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {trek.detailsSection.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3">
                    {trek.features.map((f) => (
                      <span
                        key={f}
                        className="px-4 py-2 rounded-full text-sm font-medium text-green-300 border border-green-400/20 bg-green-400/5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats card */}
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Trail Statistics
                  </h3>
                  <div className="space-y-5">
                    {trek.stats.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between pb-5 border-b border-white/5 last:border-0 last:pb-0"
                      >
                        <span className="text-gray-400 text-sm uppercase tracking-widest">
                          {s.label}
                        </span>
                        <span className="text-white font-bold text-xl">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Theme accent bar */}
                  <div
                    className="mt-8 h-px w-full opacity-40"
                    style={{ background: trek.themeColor }}
                  />
                  <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                    {trek.detailsSection.imageAlt}. Statistics are based on standard conditions and may vary.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              EXPERIENCE SECTION
          ═══════════════════════════════════════════════ */}
          <section id="experience" className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: trek.gradient }}
            />
            <div className="absolute inset-0 bg-trek-dark/80" />

            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <span className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
                  Our Commitment
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {trek.experienceSection.title}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  {trek.experienceSection.description}
                </p>
              </motion.div>

              {/* Icon row */}
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-16 grid grid-cols-3 gap-6"
              >
                {[
                  { icon: "🌿", label: "Zero Impact" },
                  { icon: "🦎", label: "Wildlife Safe" },
                  { icon: "♻️", label: "Carbon Neutral" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-white text-sm font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              BOOK NOW SECTION
          ═══════════════════════════════════════════════ */}
          <section id="book-now" className="py-24 px-6 bg-trek-dark">
            <div className="max-w-5xl mx-auto">
              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-14"
              >
                <span className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
                  Secure Your Expedition
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white">
                  Ready to Walk?
                </h2>
              </motion.div>

              <motion.div
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="glass rounded-3xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left: Details */}
                  <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className="mb-8">
                      <div className="text-gray-400 text-sm uppercase tracking-widest mb-1">
                        Starting from
                      </div>
                      <div className="text-5xl font-bold text-white">
                        {trek.bookNowSection.price}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        {trek.bookNowSection.duration}
                      </div>
                    </div>

                    {/* Included */}
                    <div className="mb-8">
                      <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                        What's Included
                      </div>
                      <ul className="space-y-3">
                        {trek.bookNowSection.includedParams.map((p) => (
                          <li key={p} className="flex items-center gap-3 text-gray-300 text-sm">
                            <span className="w-5 h-5 rounded-full bg-green-400/15 flex items-center justify-center text-green-400 text-xs flex-shrink-0">
                              ✓
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Guide promise */}
                    <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                      <div className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        🧭 Guide Promise
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {trek.bookNowSection.guidePromise}
                      </p>
                    </div>
                  </div>

                  {/* Right: Booking */}
                  <div className="p-10 flex flex-col">
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                        Select Date
                      </div>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-400/50 mb-4 transition-colors"
                      />

                      <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                        Group Size
                      </div>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-400/50 mb-6 transition-colors appearance-none">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n} className="bg-gray-900">
                            {n} {n === 1 ? "person" : "people"}
                          </option>
                        ))}
                      </select>

                      {/* Name input */}
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-400/50 mb-3 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-400/50 mb-6 transition-colors"
                      />
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#4ade80" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-green-400 text-black font-bold text-base rounded-xl transition-colors relative overflow-hidden group"
                    >
                      <span className="relative z-10">🌲 Secure Your Spot</span>
                    </motion.button>

                    {/* Cancellation */}
                    <p className="text-gray-600 text-xs text-center mt-4 leading-relaxed">
                      {trek.bookNowSection.cancellationPolicy}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              NEXT TREK SECTION
          ═══════════════════════════════════════════════ */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: nextTrek.gradient }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10 text-center px-6 max-w-2xl mx-auto"
            >
              <span className="text-white/40 text-xs tracking-widest uppercase mb-4 block">
                Next Expedition
              </span>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                {nextTrek.name}
              </h2>
              <p className="text-white/60 text-lg italic mb-3">
                {nextTrek.tagline}
              </p>
              <p className="text-white/30 text-sm uppercase tracking-widest mb-10">
                {nextTrek.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex((currentIndex + 1) % treks.length)}
                className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/15 transition-all text-sm tracking-wide"
              >
                Start the Journey →
              </motion.button>
            </motion.div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom Trek Switcher Pill ──────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl shadow-black/60">
          {treks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(i)}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${i === currentIndex
                ? "bg-green-400 text-black"
                : "text-gray-400 hover:text-white"
                }`}
            >
              {t.name}
              {i === currentIndex && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-green-400 rounded-full -z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
