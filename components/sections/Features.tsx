"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { useIsTouch } from "@/lib/useIsTouch";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  MessageSquareText,
  PencilLine,
  PhoneForwarded,
  type LucideIcon,
} from "lucide-react";

import { type ReactNode } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
  side: "left" | "right";
  position: "top" | "bottom";
}

const features: Feature[] = [
  {
    icon: PencilLine,
    title: "Take messages",
    body: "Choose exactly which details it captures from every caller, it lands in your inbox or as a text the moment the call ends.",
    side: "left",
    position: "top",
  },
  {
    icon: CalendarCheck,
    title: "Book appointments",
    body: <>Send callers a one-tap link to your calendar, or let <span className="text-brand-blue font-semibold">{brand.shortName}</span> confirm a time directly. Bookings show up on autopilot.</>,
    side: "right",
    position: "top",
  },
  {
    icon: MessageSquareText,
    title: "Answer questions",
    body: "Train it on the questions your business hears every day so customers get instant, accurate answers, no waiting, no hold music.",
    side: "left",
    position: "bottom",
  },
  {
    icon: PhoneForwarded,
    title: "Transfer calls",
    body: <>Need certain callers routed straight to you or a teammate? <span className="text-brand-blue font-semibold">{brand.shortName}</span> sends the right person the right call, every time.</>,
    side: "right",
    position: "bottom",
  },
];

export function Features() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  // This section renders completely static on phones: no entrance reveals, no
  // blur-in, and no infinitely pulsing ring behind the handset.
  const still = isTouch || !!reducedMotion;

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative isolate overflow-hidden bg-bg py-16 md:py-20"
    >
      <SectionBackdrop />

      <Container>
        {/* Heading */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <ScrollReveal y={12} duration={0.7} amount={0.4} disabled={still}>
            <Eyebrow asPill className="mb-6 !text-[#111111]">
              What {brand.shortName} does
            </Eyebrow>
          </ScrollReveal>
          <ScrollReveal
            y={22}
            duration={0.95}
            delay={0.07}
            amount={0.3}
            disabled={still}
          >
            <h2
              id="features-heading"
              className="section-heading font-display text-ink"
            >
              The smarter voice AI agent
            </h2>
          </ScrollReveal>
          <ScrollReveal
            y={16}
            duration={0.8}
            delay={0.15}
            amount={0.3}
            disabled={still}
          >
            <p className="mt-5 max-w-xl text-balance text-[17px] leading-[1.7] text-ink-muted md:text-[18px]">
              Every call is captured, routed, and handled like your best
              employee answered, only faster, friendlier, and always on.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid: left cards | phone | right cards */}
        <div className="relative mt-16 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-[1fr_minmax(280px,360px)_1fr] lg:gap-x-12 lg:gap-y-16">
          {/* Left column (desktop), top & bottom features */}
          <div className="order-2 flex flex-col divide-y divide-border lg:order-1 lg:gap-20 lg:divide-y-0 lg:pt-8">
            {features
              .filter((f) => f.side === "left")
              .map((f, i) => (
                <FeatureCard
                  key={f.title}
                  feature={f}
                  delay={0.1 + i * 0.1}
                  align="right"
                  still={still}
                />
              ))}
          </div>

          {/* Phone, center */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <PhoneShowcase still={still} />
          </div>

          {/* Right column (desktop), top & bottom features */}
          <div className="order-3 flex flex-col divide-y divide-border border-t border-border pt-6 lg:gap-20 lg:divide-y-0 lg:border-t-0 lg:pt-8">
            {features
              .filter((f) => f.side === "right")
              .map((f, i) => (
                <FeatureCard
                  key={f.title}
                  feature={f}
                  delay={0.15 + i * 0.1}
                  align="left"
                  still={still}
                />
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal y={16} duration={0.7} delay={0.2} disabled={still}>
          <div className="mt-16 flex justify-center md:mt-20">
            <Button variant="primary" size="md" icon="arrow" href="#live-demo">
              Hear it on a real call
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function FeatureCard({
  feature,
  delay,
  align,
  still,
}: {
  feature: Feature;
  delay: number;
  align: "left" | "right";
  still: boolean;
}) {
  const Icon = feature.icon;

  const className = cn(
    "group flex flex-col items-center py-6 text-center first:pt-0 last:pb-0 lg:py-0 lg:text-left",
    align === "right" && "lg:items-end lg:text-right",
    align === "left" && "lg:items-start",
  );

  const body = (
    <>
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-2xl bg-surface ring-1 ring-border",
          "shadow-soft transition-transform duration-300 ease-out group-hover:-translate-y-0.5",
        )}
      >
        <Icon className="h-5 w-5 text-ink" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-[20px] font-extrabold tracking-[-0.01em] text-ink md:text-[22px]">
        {feature.title}
      </h3>
      <p className="mt-2.5 max-w-sm text-[15px] leading-[1.65] text-ink-muted md:text-[16px]">
        {feature.body}
      </p>
    </>
  );

  if (still) {
    return <div className={className}>{body}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {body}
    </motion.div>
  );
}

function PhoneShowcase({ still }: { still: boolean }) {
  const wrapperClass = "relative mx-auto w-full max-w-[320px] md:max-w-[360px]";

  const contents = (
    <>
      {/* Yellow aura behind phone. A gradient is already soft-edged, so when
          still we widen the stops to approximate the blur instead of asking the
          GPU to blur a full-size layer on every composited frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={
          still
            ? {
                background:
                  "radial-gradient(closest-side, rgba(255,208,0,0.38) 0%, rgba(255,208,0,0.14) 48%, rgba(255,208,0,0) 78%)",
                transform: "scale(1.15)",
              }
            : {
                background:
                  "radial-gradient(closest-side, rgba(255,208,0,0.45) 0%, rgba(255,208,0,0.15) 40%, rgba(255,208,0,0) 70%)",
                filter: "blur(20px)",
                transform: "scale(1.15)",
              }
        }
      />

      {/* Soft ring. Pulses on desktop; when still, held at the loop's resting
          frame with the blur baked into the gradient stops instead of applied
          as a filter — a blur() this large over a full-size element costs area
          × radius in GPU bandwidth and forces an offscreen texture, which is
          real money on a phone for a glow no one is looking at. */}
      {still ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,208,0,0.30) 0%, rgba(255,208,0,0.10) 45%, rgba(255,208,0,0) 80%)",
            transform: "scale(1.25)",
            opacity: 0.55,
          }}
        />
      ) : (
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.04, 1], opacity: [0.55, 0.35, 0.55] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,208,0,0.35) 0%, rgba(255,208,0,0) 65%)",
            filter: "blur(28px)",
            transform: "scale(1.25)",
          }}
        />
      )}

      <PhoneMock />
    </>
  );

  if (still) {
    return <div className={wrapperClass}>{contents}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={wrapperClass}
    >
      {contents}
    </motion.div>
  );
}

function SectionBackdrop() {
  return (
    <>
      {/* Soft top vignette so the section feels distinct from hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg to-transparent"
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(24,19,10,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)",
        }}
      />
    </>
  );
}
