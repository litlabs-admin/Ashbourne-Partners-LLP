"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay before reveal in seconds */
  delay?: number;
  /** Initial Y offset in px */
  y?: number;
  /** Initial X offset in px */
  x?: number;
  /** Duration in seconds */
  duration?: number;
  /** Stagger children */
  stagger?: number;
  /** Custom class on the wrapper */
  className?: string;
  /** When this ratio of the element is in view, trigger */
  amount?: number | "some" | "all";
  /** Reveal only once (default true) */
  once?: boolean;
  /** Apply a blur-to-sharp transition */
  blur?: boolean;
  as?: "div" | "section" | "li" | "span";
  /**
   * Render children in place, with no animation at all. Note this does not
   * propagate variants, so don't disable a parent whose children use
   * `revealItem` — they'd have no `show` state to reach and stay hidden.
   */
  disabled?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.8,
  stagger,
  className,
  amount = 0.25,
  once = true,
  blur = false,
  as = "div",
  disabled = false,
}: ScrollRevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      x,
      filter: blur ? "blur(8px)" : "none",
      transition: {
        duration: duration * 0.6,
        ease: [0.32, 0, 0.67, 0],
      },
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: EASE,
        delay,
        staggerChildren: stagger,
      },
    },
  };

  if (disabled) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Child variant matching ScrollReveal's stagger, wrap each staggered child
 * in <RevealItem> when using stagger on the parent.
 */
export const revealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
    transition: { duration: 0.42, ease: [0.32, 0, 0.67, 0] },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};
