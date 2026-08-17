"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calculator,
  Home,
  Pause,
  Play,
  ShieldCheck,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Industry {
  id: string;
  label: string;
  icon: LucideIcon;
  audio: string;
  scenario: string;
}

const industries: Industry[] = [
  {
    id: "law-firms",
    label: "Law firms",
    icon: Briefcase,
    audio: assets.lawFirmAudio,
    scenario: "New client intake",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: Utensils,
    audio: assets.restaurantAudio,
    scenario: "Reservation request",
  },
  {
    id: "real-estate",
    label: "Real estate",
    icon: Home,
    audio: assets.realEstateConvAudio,
    scenario: "Listing inquiry",
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: ShieldCheck,
    audio: assets.insuranceConvAudio,
    scenario: "Quote request",
  },
  {
    id: "accountants",
    label: "Accountants",
    icon: Calculator,
    audio: assets.accountingAudio,
    scenario: "Tax season call",
  },
  {
    id: "electricians",
    label: "Electricians",
    icon: Zap,
    audio: assets.electricianAudio,
    scenario: "Service booking",
  },
];

export function LiveDemo() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Manage the single audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "none";

    const onEnded = () => {
      setActiveId(null);
      setProgress(0);
    };
    const onTime = () => {
      const a = audioRef.current;
      if (!a || !a.duration) return;
      setProgress((a.currentTime / a.duration) * 100);
    };

    audioRef.current.addEventListener("ended", onEnded);
    audioRef.current.addEventListener("timeupdate", onTime);

    return () => {
      const a = audioRef.current;
      a?.removeEventListener("ended", onEnded);
      a?.removeEventListener("timeupdate", onTime);
      a?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggle = (industry: Industry) => {
    const a = audioRef.current;
    if (!a) return;

    if (activeId === industry.id) {
      a.pause();
      setActiveId(null);
      setProgress(0);
      return;
    }

    a.pause();
    setProgress(0);
    a.src = industry.audio;
    a.currentTime = 0;
    a.play().catch(() => {});
    setActiveId(industry.id);
  };

  return (
    <section
      id="live-demo"
      aria-labelledby="live-demo-heading"
      className="relative isolate overflow-hidden bg-surface-muted/60 py-12 md:py-16"
    >
      <Backdrop />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Left: heading column */}
          <div className="text-center lg:text-left">
            <ScrollReveal y={20} duration={0.9}>
              <h2
                id="live-demo-heading"
                className="font-display font-extrabold tracking-[-0.025em] text-ink text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.08]"
              >
                If people call your business, you need voice AI that answers.
              </h2>
              <p className="mt-5 mx-auto max-w-md text-[16px] leading-[1.7] text-ink-muted lg:mx-0 md:text-[17px]">
                Six real calls, six industries. Press play and hear how a
                caller is greeted, understood, and booked.
              </p>
            </ScrollReveal>

            {/* Now-playing strip */}
            <AnimatePresence mode="wait">
              {activeId && (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-8 flex items-center gap-3 rounded-full border border-border bg-surface/90 px-4 py-2.5 shadow-soft"
                >
                  <NowPlayingPulse />
                  <span className="text-[13px] font-medium text-ink">
                    Now playing —{" "}
                    <span className="text-ink-muted">
                      {industries.find((i) => i.id === activeId)?.scenario}
                    </span>
                  </span>
                  <span className="ml-auto font-display text-[11px] font-medium tabular-nums text-ink-muted">
                    {Math.round(progress)}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: industry grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-min">
            {industries.map((industry, i) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                index={i}
                isActive={activeId === industry.id}
                progress={activeId === industry.id ? progress : 0}
                onToggle={() => handleToggle(industry)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function IndustryCard({
  industry,
  index,
  isActive,
  progress,
  onToggle,
}: {
  industry: Industry;
  index: number;
  isActive: boolean;
  progress: number;
  onToggle: () => void;
}) {
  const Icon = industry.icon;

  return (
    <motion.button
      onClick={onToggle}
      aria-pressed={isActive}
      aria-label={`Play the Ashbourne voice AI demo for ${industry.label}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.04 * index }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.99 }}
      className={cn(
        "group/card relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-surface px-5 py-5 text-left",
        // Never transition opacity/transform here — framer-motion writes those
        // inline every frame, and a CSS transition on them would re-ease each
        // written value and smear the scroll-in animation.
        "transition-[box-shadow,border-color] duration-300 ease-out focus-ring",
        isActive
          ? "border-accent shadow-[0_0_0_3px_rgba(255,208,0,0.18),0_8px_24px_rgba(24,19,10,0.08)]"
          : "border-transparent shadow-soft hover:border-ink/10 hover:shadow-lift",
      )}
    >
      {/* Soft lime aura when active */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 100% at 0% 50%, rgba(255,208,0,0.18) 0%, rgba(255,208,0,0) 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Play/Pause button */}
      <motion.span
        animate={{
          backgroundColor: isActive ? "var(--accent)" : "var(--surface-muted)",
        }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          "transition-transform duration-300 ease-out group-hover/card:scale-105",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isActive ? (
            <motion.span
              key="pause"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="flex items-center justify-center"
            >
              <Pause
                className="h-4 w-4 text-accent-ink"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.span>
          ) : (
            <motion.span
              key="play"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="flex items-center justify-center"
            >
              <Play
                className="h-3.5 w-3.5 translate-x-[1px] text-ink"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ripple pulse when active */}
        {isActive && (
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.45], opacity: [0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-xl bg-accent"
          />
        )}
      </motion.span>

      {/* Label + scenario */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-[18px] font-bold tracking-[-0.01em] transition-colors duration-300",
              "text-ink",
            )}
          >
            {industry.label}
          </span>
          <Icon
            className="h-3.5 w-3.5 text-ink-muted/60 transition-colors duration-300 group-hover/card:text-ink-muted"
            strokeWidth={1.75}
          />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {isActive ? (
            <motion.div
              key="waveform"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-1.5"
            >
              <Waveform />
            </motion.div>
          ) : (
            <motion.span
              key="scenario"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-0.5 block text-[14px] font-medium text-ink-muted"
            >
              {industry.scenario}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom progress bar, fills as audio plays */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
      >
        <motion.span
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.12, ease: "linear" }}
          style={{ transformOrigin: "left center" }}
          className="block h-full w-full bg-accent"
        />
      </span>
    </motion.button>
  );
}

function Waveform() {
  // 7 bars, each with its own height loop offset for a believable audio feel
  const bars = [0.4, 0.9, 0.6, 1, 0.7, 0.85, 0.5];
  return (
    <div
      className="flex h-3 items-end gap-[3px]"
      aria-hidden
    >
      {bars.map((peak, i) => (
        <motion.span
          key={i}
          animate={{
            scaleY: [0.4, peak, 0.5, peak * 0.8, 0.6, peak],
          }}
          transition={{
            duration: 1.1 + (i % 3) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
          style={{ transformOrigin: "bottom center" }}
          className="block h-full w-[2.5px] rounded-full bg-accent"
        />
      ))}
    </div>
  );
}

function NowPlayingPulse() {
  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-accent"
      />
      <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent"
      />
    </>
  );
}
