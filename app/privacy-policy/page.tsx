import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ashbourne Partners LLP collects, uses, shares, and protects information from website visitors, customers, and callers.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
