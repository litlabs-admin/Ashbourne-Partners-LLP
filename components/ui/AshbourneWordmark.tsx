// ─── Ashbourne Partners LLP — wordmark ────────────────────────────────────────
// Set live in the display face rather than shipped as outlines: the letterforms
// are a stock cut, so there's nothing to preserve against a font update, and a
// live wordmark stays crisp at any size without a second asset.
//
// A stacked lockup: the name on top, "PARTNERS LLP" beneath it in small tracked
// caps. The suffix tracking is tuned per size so the lower line optically spans
// the width of the name above it.

import { cn } from "@/lib/cn";

const TYPE: Record<
  "sm" | "md" | "lg",
  { name: string; suffix: string; tracking: string; gap: string }
> = {
  sm: { name: "text-[17px]", suffix: "text-[7px]", tracking: "0.235em", gap: "mt-[3px]" },
  md: { name: "text-[21px]", suffix: "text-[8px]", tracking: "0.255em", gap: "mt-[3px]" },
  lg: { name: "text-[27px]", suffix: "text-[10px]", tracking: "0.255em", gap: "mt-[4px]" },
};

export function AshbourneWordmark({
  size = "md",
  theme = "light",
  className,
}: {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  className?: string;
}) {
  const type = TYPE[size];
  const onDark = theme === "dark";

  return (
    <span
      role="img"
      aria-label="Ashbourne Partners LLP"
      className={cn("flex select-none flex-col items-start leading-none", className)}
    >
      <span
        className={cn(
          "font-display font-extrabold leading-none tracking-[-0.035em]",
          type.name,
          onDark ? "text-white" : "text-ink",
        )}
      >
        Ashbourne
      </span>
      <span
        className={cn(
          "font-display font-semibold uppercase leading-none",
          type.suffix,
          type.gap,
          onDark ? "text-white/65" : "text-ink-muted",
        )}
        // Tracking adds a trailing space after the final glyph; the negative
        // margin pulls the line back so it stays optically flush-left with the
        // name above.
        style={{ letterSpacing: type.tracking, marginRight: `-${type.tracking}` }}
      >
        Partners LLP
      </span>
    </span>
  );
}
