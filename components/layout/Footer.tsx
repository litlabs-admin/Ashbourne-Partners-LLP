"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AshbourneMark } from "@/components/ui/AshbourneMark";
import { AshbourneWordmark } from "@/components/ui/AshbourneWordmark";
import { BrandBloom } from "@/components/ui/BrandBloom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Only destinations that actually exist: the homepage's own sections, the
// booking link, and the privacy page. The industry list that used to sit here
// pointed every entry at the same #live-demo anchor, and Terms/Security/Cookies
// were dead "#" links — nothing to navigate to, so nothing to list.
const columns = [
  {
    title: "Product",
    links: [
      // Root-relative, not bare "#features": the footer also renders on
      // /privacy-policy, where a bare fragment resolves against that page and
      // scrolls nowhere.
      { label: "Features", href: "/#features" },
      { label: "Live demo", href: "/#live-demo" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Book a demo", href: brand.bookDemoUrl },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy", href: "/privacy-policy" }],
  },
];

interface FooterProps {
  /** Hide the "Never miss another customer call" CTA banner — for pages whose
   * entire purpose is already that CTA (e.g. the booking page itself), where
   * repeating it above the footer would be redundant. */
  showCta?: boolean;
}

export function Footer({ showCta = true }: FooterProps = {}) {
  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-brand-blue text-white"
    >
      <BrandBloom />

      {showCta && <FinalCTA />}

      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-16 pb-14 md:grid-cols-12 md:gap-12 md:pt-20 md:pb-16">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <ScrollReveal y={16} duration={0.7}>
              <Link
                href="/#top"
                className="inline-block focus-ring rounded-md"
                aria-label={`${brand.name} home`}
              >
                <span className="flex items-center gap-2.5">
                  <AshbourneMark size="lg" className="text-brand-yellow" />
                  <AshbourneWordmark theme="dark" size="lg" />
                </span>
              </Link>

              <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.6] text-white/60">
                Voice AI that keeps your phone covered, so you never miss a lead
                or leave a customer waiting.
              </p>

            </ScrollReveal>
          </div>

          {/* Link columns */}
          <div className="col-span-2 grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3 md:gap-6">
            {columns.map((col, ci) => (
              <ScrollReveal key={col.title} y={14} duration={0.6} delay={0.05 * ci}>
                <div>
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-yellow">
                    {col.title}
                  </h4>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={cn(
                            "group/link inline-flex items-center gap-1 text-[14px] text-white/65",
                            "transition-colors duration-200 hover:text-white",
                          )}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight
                            className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover/link:opacity-60 group-hover/link:translate-x-0"
                            strokeWidth={2.2}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom legal bar */}
      <Container>
        {/* /70 rather than /45: the bloom is at full strength by this row, and
            the fainter value dissolves into it. */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-center text-[12.5px] text-white/70 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-brand-yellow font-semibold whitespace-nowrap">
              {brand.name}
            </span>{" "}
            · Voice AI for growing businesses · All rights reserved.
          </p>
          <p className="whitespace-nowrap">
            A{" "}
            <a
              href={brand.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-semibold text-white/85 underline-offset-4",
                "transition-colors duration-200 hover:text-brand-yellow hover:underline focus-ring rounded-sm",
              )}
            >
              {brand.parent.name}
            </a>{" "}
            company
          </p>
        </div>
      </Container>

      {/* Oversized brand wordmark, cropped by the page edge */}
      <BrandWordmark />
    </footer>
  );
}

function FinalCTA() {
  return (
    <Container>
      <div className="relative py-12 md:py-16">
        <ScrollReveal y={20} duration={0.9}>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12px] tracking-[0.04em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow shadow-[0_0_0_4px_rgba(255,208,0,0.28)]" />
              Ready when you are
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.025em] text-white text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05]">
              Never miss another <br className="hidden sm:block" />
              <span className="text-brand-yellow">customer call.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/65 md:text-[18px]">
              Go live with{" "}
              <span className="text-brand-yellow font-semibold">
                {brand.shortName}
              </span>{" "}
              in under a day. Live phone coverage, 24/7, with a voice your
              customers will actually thank you for.
            </p>
            <div className="mt-9 flex flex-row flex-wrap items-center justify-center gap-3">
              <Button size="lg" variant="brand" icon="arrow" href={brand.bookDemoUrl}>
                Book a demo
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Container>
  );
}

function BrandWordmark() {
  // The wordmark is sized off viewport width so it always spans edge to edge; the
  // wrapper is deliberately shorter than the glyphs so the page edge crops the
  // bottom ~45% of the letterforms.
  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden h-[calc(clamp(4rem,17vw,15rem)*0.55)]"
    >
      <span
        className={cn(
          "absolute inset-x-0 top-0 block whitespace-nowrap text-center",
          "font-display font-bold text-white/[0.22]",
          "leading-[0.8] tracking-[-0.05em]",
          "text-[clamp(4rem,17vw,15rem)]",
        )}
      >
        Ashbourne
      </span>
    </div>
  );
}
