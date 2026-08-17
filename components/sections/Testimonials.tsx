"use client";

import { BrandBloom } from "@/components/ui/BrandBloom";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  img: string;
}

// Quotes are adapted for Ashbourne — get sign-off from each named customer
// before this page goes live.
const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Ashbourne was a game-changer. Our customers actually compliment our phone service now — something we never heard before.",
    name: "Will Sinclair",
    role: "Sales Director",
    company: "Sales Geek",
    img: "/assets/william.png",
  },
  {
    quote:
      "I was losing jobs to competitors who answered faster. Now every call is picked up, the details are captured, and I follow up when I'm free.",
    name: "Calum Maguire",
    role: "Director",
    company: "RACAM Security",
    img: "/assets/callum.png",
  },
  {
    quote:
      "Clients call at all hours for policy questions. Ashbourne is professional and never makes a caller feel ignored. My retention has visibly improved.",
    name: "Jim Craig",
    role: "Managing Director",
    company: "RoswellIt",
    img: "/assets/jim.png",
  },
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.08 * index }}
      whileHover="hovered"
      animate="rest"
      // No border and no hover ring: both would be yellow (the tan --border
      // #EAD870 and a rgba(255,208,0) ring), and the card sits on navy rather
      // than cream. Depth comes from a neutral shadow instead — brown-tinted
      // rgba(24,19,10) shadows are invisible against --brand-blue.
      variants={{
        rest: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.12)",
        },
        hovered: {
          boxShadow: "0 18px 38px rgba(0,0,0,0.30)",
        },
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface"
    >
      {/* 23/20 at every width, matching the source photos' own landscape ratio.
          A portrait box would force object-cover to zoom and crop the sides;
          every crop here is horizontal only, so object-center keeps the faces. */}
      <div className="relative w-full aspect-[23/20] flex-shrink-0 overflow-hidden">
        <motion.div
          variants={{ rest: { scale: 1 }, hovered: { scale: 1.05 } }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={t.img}
            alt={t.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 px-3.5 pb-2.5 pt-6"
          style={{
            background:
              "linear-gradient(to top, rgba(15,12,3,0.85) 0%, rgba(15,12,3,0.30) 55%, transparent 100%)",
          }}
        >
          <p
            className="font-display text-[14px] font-bold leading-tight text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            {t.name}
          </p>
          <p
            className="mt-0.5 text-[10.5px] font-medium leading-snug text-white/85"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            {t.role} · {t.company}
          </p>
        </div>
      </div>

      {/* Quote — flex-1 keeps every card the same height */}
      <div className="relative flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-0.5 select-none font-display text-[36px] leading-none"
          style={{ color: "rgba(255,208,0,0.30)" }}
        >
          &rdquo;
        </span>

        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                ease: "backOut",
                delay: 0.08 * index + 0.25 + i * 0.05,
              }}
            >
              <Star className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={0} />
            </motion.span>
          ))}
        </div>

        {/* text-ink, not text-ink/90: --ink is a literal hex, so the opacity
            modifier silently drops the utility. Stating the colour outright
            matters now the card sits on navy. */}
        <p className="relative text-[13px] leading-[1.5] text-ink">{t.quote}</p>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-brand-blue py-10 md:py-16"
    >
      <BrandBloom />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 flex justify-center md:mb-4"
        >
          <Eyebrow asPill theme="dark">Testimonials</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.07, ease: EASE }}
          className="mx-auto mb-7 max-w-[18ch] text-center font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.025em] text-white md:mb-12 md:text-[42px]"
        >
          Loved by businesses{" "}
          <span className="text-brand-yellow">around the world</span>
        </motion.h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
