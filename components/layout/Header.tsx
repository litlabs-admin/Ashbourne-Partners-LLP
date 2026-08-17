"use client";

import { AshbourneMark } from "@/components/ui/AshbourneMark";
import { AshbourneWordmark } from "@/components/ui/AshbourneWordmark";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Header ───────────────────────────────────────────────────────────────────

interface HeaderProps {
  /**
   * "dark" renders the bar white-on-transparent, for pages whose hero is the
   * brand blue. It only applies while the bar is *over* that hero: once scrolled
   * past it the header flips to the solid light bar either way, so this is the
   * at-rest appearance rather than a page-wide theme. Defaults to "light".
   */
  theme?: "light" | "dark";
}

export function Header({ theme = "light" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark styling only survives while the bar is transparent over the blue hero;
  // scrolling swaps in the solid white bar, where white-on-white would vanish.
  const onDark = theme === "dark" && !scrolled;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Background layer is separate from the content row so the bar can paint
          edge-to-edge while the row stays within the page's max width. */}
      <div
        className={cn(
          "w-full border-b transition-colors duration-300 ease-out",
          scrolled
            ? "border-[rgba(24,19,10,0.07)] bg-[rgba(255,255,255,0.97)] shadow-[0_1px_3px_rgba(24,19,10,0.05)]"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between px-4 md:px-10">
          {/* Logo */}
          <Link
            href="/#top"
            className="focus-ring shrink-0 origin-left rounded-md"
            aria-label={`${brand.name} home`}
          >
            <span className="flex items-center gap-2 md:gap-2.5">
              {/* One instance sized in CSS rather than a hidden/shown pair —
                  the mark carries its own masked <defs>, and a `display:none`
                  copy is dead weight that never paints. It renders in
                  currentColor, so the on-dark treatment is a colour swap. */}
              <AshbourneMark
                size="md"
                className={cn(
                  "h-8 w-auto transition-colors duration-300 ease-out md:h-10",
                  onDark ? "text-brand-yellow" : "text-brand-blue",
                )}
              />
              {/* Wordmark stays a step smaller on mobile so the CTA always fits */}
              <span className="md:hidden">
                <AshbourneWordmark theme={onDark ? "dark" : "light"} size="sm" />
              </span>
              <span className="hidden md:block">
                <AshbourneWordmark theme={onDark ? "dark" : "light"} size="md" />
              </span>
            </span>
          </Link>

          {/* CTA buttons, desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              size="md"
              variant={onDark ? "ghost-light" : "ghost"}
              href={brand.bookDemoUrl}
            >
              Book a Demo
            </Button>
            {/* `brand` in both scroll states, unlike the Book a Demo ghost beside
                it: this is the one element that stays gold on every surface. */}
            <Button size="md" variant="brand" href={brand.bookDemoUrl}>
              Try For Free
            </Button>
          </div>

          {/* Mobile: single CTA. With no menu behind a hamburger this is the only
              action in the bar, so it shows at every width. */}
          <div className="md:hidden flex shrink-0 items-center">
            <Button
              size="md"
              variant="brand"
              href={brand.bookDemoUrl}
              className="whitespace-nowrap px-4"
            >
              Try For Free
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
