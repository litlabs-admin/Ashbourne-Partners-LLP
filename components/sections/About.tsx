"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { useIsTouch } from "@/lib/useIsTouch";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useMemo, useRef } from "react";

const PARAGRAPHS: string[] = [
  "Most growing businesses lose work to a voicemail greeting. Ashbourne Partners builds real-time voice AI that picks up on the first ring, holds a **natural, human-like conversation**, qualifies the caller, and books the appointment straight into your calendar. No hold music, no callback queue, no extra headcount — just a real answer, **every time someone calls**.",
];

// Scroll progress window for the reveal.
// Start slightly later so text is already entering view when animation begins.
const REVEAL_START = 0.04;
const REVEAL_END = 0.62;

const EASE = [0.22, 1, 0.36, 1] as const;

// --- Parse ----------------------------------------------------------------

function parseSegments(src: string): { text: string; accent: boolean }[] {
  const segments: { text: string; accent: boolean }[] = [];
  let i = 0;
  while (i < src.length) {
    const marker = src.indexOf("**", i);
    if (marker === -1) {
      segments.push({ text: src.slice(i), accent: false });
      break;
    }
    if (marker > i) {
      segments.push({ text: src.slice(i, marker), accent: false });
    }
    const close = src.indexOf("**", marker + 2);
    if (close === -1) {
      segments.push({ text: src.slice(marker), accent: false });
      break;
    }
    segments.push({ text: src.slice(marker + 2, close), accent: true });
    i = close + 2;
  }
  return segments;
}

function tokenize(text: string) {
  const parts = text.split(/(\s+)/);
  return parts
    .filter((p) => p.length > 0)
    .map((p) => ({ text: p, isWord: !/^\s+$/.test(p) }));
}

// --- Component ------------------------------------------------------------

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 25%"],
  });

  const parsed = useMemo(
    () =>
      PARAGRAPHS.map((p) =>
        parseSegments(p).map((seg) => ({ ...seg, tokens: tokenize(seg.text) })),
      ),
    [],
  );

  const totalWords = useMemo(
    () =>
      parsed.reduce(
        (sum, para) =>
          sum +
          para.reduce(
            (s, seg) => s + seg.tokens.filter((t) => t.isWord).length,
            0,
          ),
        0,
      ),
    [parsed],
  );

  const revealRange = REVEAL_END - REVEAL_START;
  // Wider window = each word transitions slower & overlaps more with neighbours.
  const stagger = revealRange / Math.max(totalWords, 1);
  const windowSize = stagger * 6;

  let wordCursor = 0;

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-bg py-12 md:py-20"
    >
      <Backdrop />

      <Container>
        {/* No mx-auto: the column sits flush with the container's left edge, so
            the heading and body share one left margin. This section is fully
            left-aligned like ProblemVsSolution — the page alternates between
            fully-centred and fully-left sections. */}
        <div className="max-w-[860px]">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-16 flex flex-col items-start text-left md:mb-24"
          >
            
            <h2
              id="about-heading"
              className="font-display font-extrabold tracking-[-0.025em] text-ink text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05]"
            >
              Why we built <span className="text-brand-blue">Ashbourne</span>.
            </h2>
          </motion.div>

          {/* Body, large editorial paragraphs with per-word scroll reveal */}
          <div className="flex flex-col gap-14 md:gap-18">
            {parsed.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className={cn(
                  "font-display font-semibold tracking-[-0.022em]",
                  "text-[clamp(1.625rem,3.2vw,2.625rem)] leading-[1.35]",
                  "text-left",
                )}
              >
                {paragraph.map((seg, segIdx) => {
                  const segWords = seg.tokens.filter((t) => t.isWord).length;
                  const segStartCursor = wordCursor;
                  wordCursor += segWords;

                  let localWordIdx = 0;
                  const content = seg.tokens.map((tok, tIdx) => {
                    if (!tok.isWord) {
                      return <Fragment key={tIdx}>{tok.text}</Fragment>;
                    }
                    const globalIdx = segStartCursor + localWordIdx;
                    localWordIdx++;
                    const start = REVEAL_START + globalIdx * stagger;
                    const end = Math.min(REVEAL_END, start + windowSize);
                    return (
                      <Word
                        key={tIdx}
                        text={tok.text}
                        scrollProgress={scrollYProgress}
                        start={start}
                        end={end}
                        accent={seg.accent}
                        reducedMotion={!!reducedMotion}
                        simplified={isTouch}
                      />
                    );
                  });

                  return <Fragment key={segIdx}>{content}</Fragment>;
                })}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Color constants, warm tan to full ink. Avoids variable references
// inside useTransform which only accepts resolved values.
const COLOR_UNREVEALED = "rgb(180, 155, 80)"; // warm golden tan, visible on --bg
const COLOR_REVEALED = "rgb(24, 19, 10)";      // --ink
// Emphasis lands on colour rather than a highlight bar, so accent words reveal
// to brand blue instead of ink. --brand-blue, resolved for the same reason.
const COLOR_REVEALED_ACCENT = "rgb(0, 26, 120)";

function Word({
  text,
  scrollProgress,
  start,
  end,
  accent,
  reducedMotion,
  simplified,
}: {
  text: string;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  accent: boolean;
  reducedMotion: boolean;
  simplified: boolean;
}) {
  const revealed = accent ? COLOR_REVEALED_ACCENT : COLOR_REVEALED;
  const color = useTransform(
    scrollProgress,
    [start, end],
    [COLOR_UNREVEALED, revealed],
  );
  const opacity = useTransform(scrollProgress, [start, end], [0.38, 1]);
  const y = useTransform(scrollProgress, [start, end], [10, 0]);

  // Every branch keeps display:inline-block so the box model — and therefore
  // line breaking — is identical across them. The server renders the animated
  // branch, so a bare inline span here would reflow the paragraph at hydration.
  if (reducedMotion) {
    return (
      <span style={{ color: revealed, display: "inline-block" }}>{text}</span>
    );
  }

  // Touch devices fade in on opacity alone. `color` is a paint property, so
  // animating it across every word repaints the whole paragraph on each scroll
  // frame — the most expensive thing on the page, and phones can't absorb it.
  //
  // `color` must stay in the style object on both paths, as a static value
  // here. Framer applies MotionValues imperatively, so React never diffs them:
  // dropping the key entirely would leave the last colour framer wrote to the
  // element stranded as a stale inline style after the branch swaps.
  return (
    <motion.span
      style={
        simplified
          ? { color: revealed, opacity, display: "inline-block" }
          : { color, opacity, y, display: "inline-block" }
      }
    >
      {text}
    </motion.span>
  );
}

function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-surface-muted/60 to-transparent"
    />
  );
}
