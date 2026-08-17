import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { inter, jakarta } from "@/lib/fonts";
import type { Metadata, Viewport } from "next";

const SITE_URL = "https://www.ashbournepartners.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  title: {
    default: "Ashbourne Partners LLP, Voice AI that answers every call",
    template: "%s · Ashbourne Partners LLP",
  },
  description:
    "Ashbourne Partners LLP builds voice AI agents that answer your business calls 24/7, qualify callers, book appointments, and route the calls that matter, in a natural, human-like voice.",
  keywords: [
    "Voice AI",
    "AI voice agents",
    "AI answering service",
    "Ashbourne Partners",
    "AI receptionist",
    "Missed call recovery",
  ],
  openGraph: {
    title: "Ashbourne Partners LLP, Voice AI that answers every call",
    description:
      "Never miss another customer call. Ashbourne voice AI answers instantly, qualifies callers, and books appointments, all in a natural, human-like voice.",
    url: SITE_URL,
    siteName: "Ashbourne Partners LLP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashbourne Partners LLP, Voice AI for growing businesses",
    description:
      "Never miss another customer call. Ashbourne voice AI answers instantly and books appointments 24/7.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#001A78",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, jakarta.variable].join(" ")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ashbourne Partners LLP",
              url: SITE_URL,
              description:
                "Voice AI for growing businesses, answers calls 24/7, qualifies callers, books appointments.",
              parentOrganization: {
                "@type": "Organization",
                name: "LitLabs",
                url: "https://litlabs.io",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
