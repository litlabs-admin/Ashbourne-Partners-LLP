"use client";

import { BrandBloom } from "@/components/ui/BrandBloom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// One flat word list with explicit break points, so the headline breaks where
// it's meant to at every width instead of reflowing raggedly:
//
//   lg and up  Voice AI agents that answer calls / while you run your business
//   below lg   Voice AI agents / that answer calls / while you run your / business
//
// Only the first break is breakpoint-specific, and it holds until lg — the
// one-line form needs the column to out-grow the headline, which given this font
// ramp happens from 1024. Below that it would strand "calls" alone, so tablets
// keep the stack. This breakpoint is coupled to the .hero-display ramp in
// globals.css: make the type bigger and the break has to move out with it. The
// last line needs no break at all — it's simply too long for a phone, so it
// wraps itself before "business".
//
// Words stay individually wrapped for the stagger. The accent phrase nests its
// words inside one *inline* span so it can break between them; an inline-block
// could not, and would jump the whole phrase to its own line.
type HeadlineToken =
  | { word: string }
  | { accent: string[] }
  | { br: "always" | "stacked" };

const headlineTokens: HeadlineToken[] = [
  { word: "Voice" },
  { word: "AI" },
  { word: "agents" },
  { br: "stacked" },
  { word: "that" },
  { word: "answer" },
  { word: "calls" },
  { br: "always" },
  { word: "while" },
  { word: "you" },
  { accent: ["run", "your", "business"] },
];

const BREAK_CLASS: Record<"always" | "stacked", string> = {
  always: "",
  stacked: "lg:hidden",
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: REVEAL_EASE },
    },
  };

  const headlineWord = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: REVEAL_EASE },
    },
  };

  // min-h-svh, not min-h-screen: 100vh is the *large* viewport on mobile, so the
  // section would overflow behind the URL bar and push the next section back into
  // the fold. pt-28 stays alongside justify-center — the fixed header overlays the
  // top, so the asymmetric padding centres the block optically.
  //
  // The blue ends in a hard edge against Features' light surface, with no fade —
  // the section below starts a different theme and the seam is meant to read.
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-brand-blue pt-28 md:pt-24 lg:pt-28 pb-14 md:pb-12"
    >
      <BrandBloom />

      <Container className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            id="hero-heading"
            className="hero-display max-w-[32ch] font-display text-white"
          >
            {headlineTokens.map((token, i) => {
              if ("br" in token) {
                return <br key={i} className={BREAK_CLASS[token.br]} />;
              }
              if ("accent" in token) {
                return (
                  <span key={i} className="text-brand-yellow">
                    {token.accent.map((word, w) => (
                      <motion.span
                        key={word}
                        variants={headlineWord}
                        className={cn(
                          "inline-block",
                          w < token.accent.length - 1 && "mr-[0.25em]",
                        )}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                );
              }
              // A trailing margin on the last word of a line is not just
              // invisible — it still counts toward line-breaking, so it shrinks
              // the usable column by 0.25em. On "calls" (which an unconditional
              // <br> always follows) that phantom width is what tips the line
              // into wrapping on phones. Only skip it for an "always" break:
              // before a "stacked" one the next word rejoins this line at lg,
              // where the margin is real.
              const next = headlineTokens[i + 1];
              const breaksAfter = !!next && "br" in next && next.br === "always";
              return (
                <motion.span
                  key={i}
                  variants={headlineWord}
                  className={cn("inline-block", !breaksAfter && "mr-[0.25em]")}
                >
                  {token.word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-[44rem] text-balance text-[18px] leading-[1.6] text-white md:mt-9 md:text-[19px]"
          >
            {brand.name} builds voice AI that keeps your phone covered, so you
            never miss a lead or leave a customer waiting.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              variant="brand"
              href={brand.bookDemoUrl}
              className="h-14 whitespace-nowrap rounded-[10px] text-[16px] max-sm:px-6 sm:h-[52px] sm:px-9"
            >
              Try For Free
            </Button>
            <Button
              size="lg"
              variant="outline-light"
              href={brand.bookDemoUrl}
              className="h-14 whitespace-nowrap rounded-[10px] text-[16px] max-sm:px-6 sm:h-[52px] sm:px-9"
            >
              Book a Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
