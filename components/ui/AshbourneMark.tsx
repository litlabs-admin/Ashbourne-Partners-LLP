// ─── Ashbourne Partners LLP — logo mark ───────────────────────────────────────
// The supplied artwork is a black-on-white JPEG, so it has no alpha to key out:
// dropping it straight onto the navy header would paint a white box.
//
// Instead the bitmap is used as an SVG *luminance mask* over a `currentColor`
// rect. SVG masks read luminance (white = opaque, black = transparent), so the
// artwork is inverted first with a feColorMatrix — the strokes become white and
// mask in the fill, the page-white background becomes black and drops out. The
// result is the exact supplied artwork, tinted by whatever `color` it inherits:
// brand yellow over navy, brand blue on the light surfaces.
//
// The viewBox crops to the glyph's bounding box inside the source file, which is
// mostly padding.

"use client";

import { cn } from "@/lib/cn";
import { useId } from "react";

const SRC = "/assets/logo-mark.jpg";
const SRC_W = 846;
const SRC_H = 960;

// Glyph bounding box within the source bitmap.
// Glyph bounding box within the source bitmap, measured off the file, plus a
// couple of px of breathing room.
const BOX = { x: 254, y: 283, w: 314, h: 350 };

const SIZE: Record<"sm" | "md" | "lg", number> = { sm: 30, md: 38, lg: 46 };

export function AshbourneMark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const height = SIZE[size];
  const width = Math.round((height * BOX.w) / BOX.h);

  // Ids must be unique per instance. With a shared id every mark on the page
  // resolves to the *first* one in the DOM — and if that instance sits inside a
  // `display:none` responsive branch, its <image> never loads, the filter turns
  // the empty result opaque white, and every mark renders as a solid block.
  const uid = useId().replace(/:/g, "");
  const filterId = `ash-invert-${uid}`;
  const maskId = `ash-mask-${uid}`;

  return (
    <svg
      aria-hidden
      viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`}
      width={width}
      height={height}
      // No inline `display`: an inline style would outrank a `md:hidden`
      // utility and both header sizes would render at once.
      className={cn("block shrink-0", className)}
    >
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 0 1"
          />
        </filter>
        <mask id={maskId}>
          <image
            href={SRC}
            x={0}
            y={0}
            width={SRC_W}
            height={SRC_H}
            filter={`url(#${filterId})`}
            preserveAspectRatio="none"
          />
        </mask>
      </defs>
      <rect
        x={0}
        y={0}
        width={SRC_W}
        height={SRC_H}
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
