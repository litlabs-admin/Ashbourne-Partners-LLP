"use client";

import { cn } from "@/lib/cn";
import { Phone, PhoneOff } from "lucide-react";

// A live call rendered as markup rather than a screenshot: the transcript is the
// product demo, and it stays sharp at every DPR, re-colours with the brand
// tokens, and costs no image bytes.
//
// The bubbles deliberately overhang the handset on both sides — the section that
// hosts this is `overflow-hidden`, which is what keeps the overhang from opening
// a horizontal scrollbar on narrow phones.

function StatusChip() {
  return (
    <span className="shrink-0 rounded-md bg-[#D6F5E0] px-1.5 py-[3px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-[#0F7A3D] sm:text-[8.5px]">
      Call in progress
    </span>
  );
}

function Avatar({ agent, initials }: { agent: boolean; initials: string }) {
  return (
    <span
      className={cn(
        "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[7.5px] font-extrabold sm:h-5 sm:w-5 sm:text-[8.5px]",
        agent ? "bg-brand-blue text-brand-yellow" : "bg-[#4A5567] text-white",
      )}
    >
      {initials}
    </span>
  );
}

function Bubble({
  speaker,
  initials,
  agent = false,
  text,
  align,
  className,
}: {
  speaker: string;
  initials: string;
  agent?: boolean;
  text: string;
  align: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 w-[74%] max-w-[280px] rounded-[14px] border border-white/50 bg-white/45 p-1.5 shadow-[0_8px_28px_rgba(10,20,60,0.20)] backdrop-blur-md sm:rounded-2xl sm:p-2",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 px-1 pb-1 pt-0.5",
          align === "right" && "flex-row-reverse",
        )}
      >
        <Avatar agent={agent} initials={initials} />
        <span className="truncate text-[9.5px] font-semibold text-[#1B1B1F] sm:text-[11px]">
          {speaker}
        </span>
        <span className={cn(align === "left" ? "ml-auto" : "mr-auto")}>
          <StatusChip />
        </span>
      </div>
      <p className="rounded-[10px] bg-white/85 px-2 py-1.5 text-[9.5px] font-medium leading-[1.35] text-[#101014] sm:rounded-xl sm:px-2.5 sm:py-2 sm:text-[11.5px]">
        {text}
      </p>
    </div>
  );
}

export function PhoneMock({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Handset. Inset from the wrapper so the bubbles have somewhere to
          overhang into without leaving the wrapper's own box. */}
      <div className="relative mx-auto w-[66%] max-w-[232px]">
        <div className="relative aspect-[9/19] w-full rounded-[13%/6.2%] bg-[#0B0B0D] p-[2.5%] shadow-[0_28px_60px_rgba(6,12,40,0.35),0_2px_0_rgba(255,255,255,0.25)_inset]">
          <div
            className="relative h-full w-full overflow-hidden rounded-[11.5%/5.6%]"
            style={{
              background:
                "linear-gradient(155deg, #C9D2E4 0%, #E7C9C2 26%, #7FA8D8 52%, #0B2B76 78%, #06133F 100%)",
            }}
          >
            {/* Wallpaper sweep — the soft light curve in the reference render */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 70% at 12% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(90% 55% at 90% 78%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 60%)",
              }}
            />

            {/* Dynamic island */}
            <div className="absolute left-1/2 top-[2.2%] h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-black/90" />

            {/* Incoming call banner */}
            <div className="absolute inset-x-[6%] top-[8.5%] flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-2 py-1.5 backdrop-blur-md">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3B4557] text-[9px] font-bold text-white sm:h-7 sm:w-7 sm:text-[10px]">
                DR
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[7px] font-medium text-white/75 sm:text-[8px]">
                  mobile
                </span>
                <span className="block truncate text-[10px] font-semibold text-white sm:text-[12px]">
                  Daniel Reeve
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5423C] sm:h-6 sm:w-6">
                  <PhoneOff className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" strokeWidth={2.4} />
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2BC24C] sm:h-6 sm:w-6">
                  <Phone
                    className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript bubbles, overhanging the handset */}
      <Bubble
        align="left"
        agent
        speaker="Ashbourne"
        initials="A"
        text="Thanks for calling Harper & Co. How may I help you today?"
        className="left-0 top-[32%]"
      />
      <Bubble
        align="right"
        speaker="+44 7700 900312"
        initials="DR"
        text="Hi, I'd like to book an appointment."
        className="right-0 top-[52%]"
      />
      <Bubble
        align="left"
        agent
        speaker="Ashbourne"
        initials="A"
        text="No problem, I can help with that. What's your first name?"
        className="left-0 top-[71%]"
      />
    </div>
  );
}
