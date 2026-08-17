"use client";

import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

// The three "-light" / brand variants are the on-dark set: they're the only ones
// legible over --brand-blue, since primary/ghost/outline all bake in ink or a
// light surface. `white` is a real Tailwind colour (not a var token), so the
// /opacity modifiers below do compile — don't copy that pattern onto brand-*.
type Variant =
  | "primary"
  | "ghost"
  | "outline"
  | "dark"
  | "brand"
  | "ghost-light"
  | "outline-light";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "none";
  children: ReactNode;
  asMotion?: boolean;
  /** When set, the button renders as an anchor linking to this URL. */
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:brightness-[0.92] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_4px_18px_rgba(255,208,0,0.45)]",
  ghost:
    "bg-transparent text-ink hover:bg-surface-muted",
  outline:
    "bg-surface text-ink border border-border hover:border-ink/30 hover:bg-surface-muted",
  dark:
    "bg-ink text-white hover:bg-ink/90",
  brand:
    "bg-brand-yellow text-brand-black hover:brightness-[0.94]",
  "ghost-light":
    "bg-transparent text-white hover:bg-white/10",
  "outline-light":
    "bg-transparent text-white border border-white/60 hover:border-white hover:bg-white/10",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      icon = "none",
      className,
      children,
      href,
      ...props
    },
    ref,
  ) {
    const classes = cn(
      // Jakarta 800, matching headings. font-display carries -0.035em, which is
      // tuned for display sizes and reads cramped on a 13px label — hence the
      // explicit, lighter tracking here.
      "group/btn inline-flex items-center justify-center gap-2 rounded-xl",
      "font-display font-extrabold tracking-[-0.01em]",
      "transition-colors duration-200 ease-out focus-ring",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    const inner = (
      <>
        <span>{children}</span>
        {icon === "arrow" && (
          <ArrowUpRight
            className="h-4 w-4 -mr-0.5 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={2}
          />
        )}
      </>
    );

    const motionProps = {
      whileHover: { y: -1 },
      whileTap: { y: 0, scale: 0.985 },
      transition: { type: "spring" as const, stiffness: 500, damping: 30 },
      className: classes,
    };

    if (href) {
      // External links open in a new tab; internal links stay in place.
      const isExternal = /^https?:\/\//.test(href);
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...motionProps}
          {...(props as React.ComponentProps<typeof motion.a>)}
        >
          {inner}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        {...motionProps}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {inner}
      </motion.button>
    );
  },
);
