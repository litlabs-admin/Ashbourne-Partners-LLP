"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly does Ashbourne Partners LLP build?",
    answer:
      "Ashbourne Partners LLP builds voice AI agents that answer your business calls. The agent talks naturally with callers, captures the details you ask it to, books appointments, and handles routine inquiries 24/7 — so fewer calls go unanswered and your team spends less time on the phone.",
  },
  {
    question: "How does a voice AI agent help my business avoid missed calls?",
    answer:
      "The agent answers every call instantly, including evenings, weekends, and while your team is already on another line, so callers never reach voicemail. That keeps enquiries in your pipeline instead of sending them to the next business that picks up.",
  },
  {
    question: "Can it book appointments automatically?",
    answer:
      "Yes. The agent can check availability, schedule appointments, collect caller details, and send confirmations during the live call. Bookings land in your calendar without anyone rekeying them.",
  },
  {
    question: "Which businesses benefit most from voice AI?",
    answer:
      "It suits clinics, law firms, restaurants, estate agencies, insurance brokers, accountants, and home service businesses — any team that takes a high volume of phone enquiries and loses revenue when a call goes unanswered.",
  },
  {
    question: "Will it integrate with our CRM and scheduling tools?",
    answer:
      "Yes. Ashbourne connects to CRMs, calendars, Slack, Zapier, and internal systems through APIs and webhooks, so call outcomes and caller records stay in sync with the tools your team already uses.",
  },
  {
    question:
      "Why choose Ashbourne over a traditional answering service or an IVR?",
    answer:
      "IVR menus make callers navigate a keypad and answering services work from a rigid script. Ashbourne holds a real conversation, understands what the caller actually wants, and acts on it — a better experience for your customers at a lower running cost.",
  },
];

// FAQPage schema, read by Google, Bing, and AI overviews (ChatGPT/Perplexity).
// Helps the FAQ surface in SERP rich results and in generative search answers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export function FAQ() {
  // Single-active hover-to-expand (mirrors the Why Robyn BenefitRow pattern).
  // First row is open by default, gives crawlers an above-the-fold answer.
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-surface-muted/60 py-12 md:py-16"
    >
      {/* Structured data, picked up by search engines + AI summarizers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Backdrop />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* Left, sticky on desktop so the heading stays in view while scrolling answers */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:pt-2 text-center lg:text-left">
            <ScrollReveal y={16} duration={0.7}>
              <Eyebrow asPill className="mb-6">
                <span className="text-ink-muted">Common questions</span>
              </Eyebrow>
            </ScrollReveal>
            <ScrollReveal y={20} duration={0.9} delay={0.05}>
              <h2
                id="faq-heading"
                className="section-heading font-display text-ink"
              >
                Everything you need to know.
              </h2>
            </ScrollReveal>
            <ScrollReveal y={16} duration={0.7} delay={0.1}>
              <p className="mt-5 mx-auto max-w-md text-[17px] leading-[1.7] text-ink-muted md:text-[18px] lg:mx-0">
                Quick answers to the questions teams ask before going live with{" "}
                <span className="text-brand-blue font-semibold">Ashbourne</span>.
              </p>
            </ScrollReveal>
          </div>

          {/* Right, accordion */}
          <div>
            <ul
              className="flex flex-col"
              onMouseLeave={() => setActiveIndex(0)}
            >
              {faqs.map((faq, i) => (
                <FAQRow
                  key={i}
                  index={i}
                  question={faq.question}
                  answer={faq.answer}
                  open={activeIndex === i}
                  onOpen={() => setActiveIndex(i)}
                  onToggle={() =>
                    setActiveIndex(activeIndex === i ? -1 : i)
                  }
                  isFirst={i === 0}
                  isLast={i === faqs.length - 1}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FAQRow({
  index,
  question,
  answer,
  open,
  onOpen,
  onToggle,
  isFirst,
  isLast,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const numberLabel = String(index + 1).padStart(2, "0");
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.04 * index }}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      className={cn(
        "group/row relative border-t border-border/80",
        isFirst && "border-t-0",
        isLast && "border-b border-border/80",
      )}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "relative flex w-full items-start gap-4 py-5 pr-2 text-left focus-ring",
          "transition-colors duration-200",
        )}
      >
        {/* Hover/active tint */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 inset-y-0 -mx-3 -z-10 rounded-2xl bg-gradient-to-r from-accent/[0.08] via-accent/[0.04] to-transparent"
        />

        {/* Number prefix */}
        <span
          className={cn(
            "mt-1 inline-block w-7 shrink-0 font-display text-[12px] font-medium tabular-nums tracking-[0.12em] transition-colors duration-300",
            open ? "text-ink" : "text-ink-muted/50",
          )}
        >
          {numberLabel}
        </span>

        {/* Question, h3 for SEO + outline structure */}
        <h3
          className={cn(
            "flex-1 font-display text-[17px] font-extrabold tracking-[-0.01em] leading-snug transition-colors duration-300 md:text-[19px]",
            open ? "text-ink" : "text-ink-muted group-hover/row:text-ink",
          )}
        >
          {question}
        </h3>

        {/* Plus → X toggle */}
        <motion.span
          aria-hidden
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "var(--accent)" : "transparent",
            borderColor: open ? "var(--accent)" : "var(--border)",
            color: open ? "var(--accent-ink)" : "var(--ink-muted)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
        </motion.span>
      </button>

      {/* Answer panel, always in DOM (grid trick collapses height), so SEO + GEO crawlers always see the text */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          marginBottom: open ? 22 : 0,
        }}
        transition={{
          gridTemplateRows: { duration: 0.45, ease: EASE },
          opacity: { duration: open ? 0.35 : 0.2, ease: "easeOut", delay: open ? 0.1 : 0 },
          marginBottom: { duration: 0.4, ease: EASE },
        }}
        style={{ display: "grid" }}
        className="overflow-hidden pl-[44px] pr-12"
      >
        <div className="min-h-0 overflow-hidden">
          <motion.p
            initial={false}
            animate={{ y: open ? 0 : -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-[14.5px] leading-[1.7] text-ink-muted md:text-[15px]"
          >
            {answer}
          </motion.p>
        </div>
      </motion.div>

      {/* Accent underline */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: open ? 1 : 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="absolute -bottom-px left-0 right-0 h-px origin-left bg-accent"
      />
    </motion.li>
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
