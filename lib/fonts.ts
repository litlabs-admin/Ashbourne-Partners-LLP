import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Both faces load as variable fonts: omitting `weight` is what makes next/font
// serve the variable file instead of one static cut per weight. That's a single
// request covering the whole axis, so intermediate weights are free.

// Body / subtext face. Set at 400 on <body> in globals.css.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face — headings, the wordmark, and CTA buttons.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
