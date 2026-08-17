"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";

const LAST_UPDATED = "18 August 2026";

function EmailLink({ children }: { children: string }) {
  return (
    <a
      href={`mailto:${children}`}
      className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-2 transition-colors hover:text-ink/70"
    >
      {children}
    </a>
  );
}

function SiteLink({ children }: { children: string }) {
  return (
    <a
      href={`https://${children}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-2 transition-colors hover:text-ink/70"
    >
      {children}
    </a>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-[14.5px] font-semibold text-ink">{children}</h3>;
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

function Section({ id, number, title, children }: SectionProps) {
  return (
    <ScrollReveal y={14} duration={0.55} amount={0.15}>
      <section id={id} className="scroll-mt-28 border-t border-border py-8 first:border-t-0 first:pt-0">
        <h2 className="font-display text-[21px] font-extrabold tracking-tight text-ink md:text-[23px]">
          <span className="mr-2 text-ink-faint/70">{number}</span>
          {title}
        </h2>
        <div className="mt-4 flex flex-col gap-4 text-[15.5px] leading-[1.75] text-ink-muted">
          {children}
        </div>
      </section>
    </ScrollReveal>
  );
}

export function PrivacyPolicyContent() {
  return (
    <>
      <Header theme="light" />
      <main className="min-h-screen bg-bg pt-[84px]">
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <ScrollReveal y={12} duration={0.7} amount={0.4}>
              <Eyebrow asPill className="mb-6">
                <span className="text-ink-muted">Privacy</span>
              </Eyebrow>
            </ScrollReveal>
            <ScrollReveal y={20} duration={0.9} delay={0.06} amount={0.3}>
              <h1 className="section-heading font-display text-ink">Privacy Policy</h1>
            </ScrollReveal>
            <ScrollReveal y={14} duration={0.75} delay={0.12} amount={0.4}>
              <p className="mx-auto mt-5 text-[15px] text-ink-muted">
                Last updated: {LAST_UPDATED}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <Section id="who-we-are" number="1." title="Who we are">
            <P>
              Ashbourne Partners LLP ("we," "us," "our") provides an AI-powered voice agent service
              that answers business phone calls, has conversations with callers, and takes actions
              such as booking appointments, taking messages, and answering questions on behalf of
              our business customers.
            </P>
            <P>This Privacy Policy explains how we collect, use, share, and protect information when you:</P>
            <List
              items={[
                <>Visit our website at <SiteLink>ashbournepartners.com</SiteLink></>,
                "Book a demo or contact us",
                "Use Ashbourne as a customer to answer calls for your business",
                "Call a business that uses Ashbourne",
              ]}
            />
            <P>
              If you have any questions about this policy, contact us at{" "}
              <EmailLink>hello@ashbournepartners.com</EmailLink>.
            </P>
          </Section>

          <Section id="information-we-collect" number="2." title="Information we collect">
            <div className="flex flex-col gap-2.5">
              <SubHeading>Information you give us directly</SubHeading>
              <List
                items={[
                  "Name, business name, email address, and phone number, when you fill out a form, book a demo, or contact us",
                  "Any information you include in messages to us",
                ]}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <SubHeading>Information we collect if you are an Ashbourne customer</SubHeading>
              <List
                items={[
                  "Account and billing information",
                  "Configuration data you provide (business hours, FAQs, services offered, calendar/CRM connections)",
                  "Call data relating to calls handled by Ashbourne on your behalf, including call recordings, transcripts, call summaries, and caller-provided information (see Section 3)",
                ]}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <SubHeading>Information we collect about callers</SubHeading>
              <P>
                When Ashbourne answers a call on behalf of one of our business customers, we
                process:
              </P>
              <List
                items={[
                  "The caller's phone number",
                  "The audio of the call and an automatically generated transcript",
                  "Any information the caller provides during the call (such as their name, the reason for calling, or appointment details)",
                  "A summary and sentiment classification generated from the call",
                ]}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <SubHeading>Information collected automatically</SubHeading>
              <List
                items={[
                  "Website usage data, such as pages visited and time spent, via cookies and analytics tools",
                  "Device and browser information, IP address, and general location (city/country level)",
                ]}
              />
            </div>
          </Section>

          <Section id="call-recording-ai" number="3." title="Call recording and AI processing">
            <P>
              Ashbourne&apos;s core function involves answering and recording phone calls. Where
              required by law, callers are informed at the start of the call that they are
              speaking with an AI assistant and that the call may be recorded and processed by AI
              systems. Call audio is processed in real time to generate a response, and a
              transcript, summary, and sentiment score are generated after the call ends.
            </P>
            <P>
              Our business customers are responsible for ensuring that their use of Ashbourne,
              including any call recording, complies with applicable law in their jurisdiction,
              including obtaining any consents required from callers.
            </P>
          </Section>

          <Section id="how-we-use-information" number="4." title="How we use information">
            <P>We use the information we collect to:</P>
            <List
              items={[
                "Provide, operate, and improve the Ashbourne service",
                "Answer calls, respond to caller requests, and complete actions such as booking appointments or taking messages",
                "Generate call transcripts, summaries, and analytics for our business customers",
                "Respond to inquiries and provide customer support",
                "Send service updates, product communications, or marketing (you can opt out of marketing at any time)",
                "Monitor, secure, and improve our systems",
                "Comply with legal obligations",
              ]}
            />
          </Section>

          <Section id="legal-basis" number="5." title="Legal basis for processing (UK GDPR)">
            <P>Where UK or EU data protection law applies, we rely on the following legal bases:</P>
            <List
              items={[
                <><span className="font-semibold text-ink">Contract</span>: to provide the service to our business customers and their callers</>,
                <><span className="font-semibold text-ink">Legitimate interests</span>: to operate, secure, and improve our service, and for direct marketing to prospective customers</>,
                <><span className="font-semibold text-ink">Consent</span>: where required, such as certain call recording notices or marketing communications</>,
                <><span className="font-semibold text-ink">Legal obligation</span>: where we must retain or disclose information to comply with the law</>,
              ]}
            />
          </Section>

          <Section id="how-we-share" number="6." title="How we share information">
            <P>We do not sell personal information. We may share information with:</P>
            <List
              items={[
                <><span className="font-semibold text-ink">Service providers</span> who help us operate Ashbourne, including telephony, speech recognition, AI processing, voice synthesis, hosting, and analytics providers, under contractual confidentiality and data protection obligations</>,
                <><span className="font-semibold text-ink">Our business customers</span>, who receive call recordings, transcripts, summaries, and caller information relating to calls made to their business</>,
                <><span className="font-semibold text-ink">Legal and regulatory authorities</span>, where required by law or to protect our rights, safety, or the rights and safety of others</>,
                <><span className="font-semibold text-ink">A buyer or successor</span>, in the event of a merger, acquisition, or sale of assets, subject to this policy or a successor policy</>,
              ]}
            />
          </Section>

          <Section id="international-transfers" number="7." title="International data transfers">
            <P>
              Some of our service providers may process data outside the UK or EEA. Where this
              happens, we take steps to ensure appropriate safeguards are in place, such as
              Standard Contractual Clauses or equivalent legal mechanisms.
            </P>
          </Section>

          <Section id="data-retention" number="8." title="Data retention">
            <P>
              We retain personal information, including call recordings and transcripts, for as
              long as necessary to provide the service, meet our contractual obligations to
              business customers, and comply with legal, accounting, or reporting requirements.
              Retention periods may be configured by our business customers within limits set out
              in their agreement with us. After the applicable retention period, data is securely
              deleted or anonymized.
            </P>
          </Section>

          <Section id="your-rights" number="9." title="Your rights">
            <P>If UK GDPR or a similar law applies to you, you may have the right to:</P>
            <List
              items={[
                "Access the personal information we hold about you",
                "Correct inaccurate information",
                "Request deletion of your information",
                "Object to or restrict certain processing",
                "Request a copy of your information in a portable format",
                "Withdraw consent, where processing is based on consent",
              ]}
            />
            <P>
              To exercise these rights, contact us at{" "}
              <EmailLink>hello@ashbournepartners.com</EmailLink>. If you are not satisfied with our
              response, you have the right to complain to the UK Information Commissioner&apos;s
              Office (ICO) at <SiteLink>ico.org.uk</SiteLink>.
            </P>
            <P>
              If you are a caller to a business using Ashbourne and wish to exercise your rights
              over call data, you may also need to contact that business directly, as they control
              how and why your call was processed.
            </P>
          </Section>

          <Section id="cookies" number="10." title="Cookies">
            <P>
              Our website uses cookies and similar technologies to operate the site, remember
              preferences, and understand how visitors use our website. You can control cookies
              through your browser settings. For more detail, see our Cookie Policy.
            </P>
          </Section>

          <Section id="childrens-privacy" number="11." title="Children's privacy">
            <P>
              Ashbourne is a business tool and is not directed at children. We do not knowingly
              collect personal information from children under 16.
            </P>
          </Section>

          <Section id="security" number="12." title="Security">
            <P>
              We use reasonable technical and organizational measures to protect personal
              information against unauthorized access, loss, or misuse. No method of transmission
              or storage is completely secure, and we cannot guarantee absolute security.
            </P>
          </Section>

          <Section id="changes" number="13." title="Changes to this policy">
            <P>
              We may update this Privacy Policy from time to time. Material changes will be
              reflected by an updated &quot;Last updated&quot; date at the top of this page, and
              where appropriate, we will provide additional notice.
            </P>
          </Section>

          <Section id="contact-us" number="14." title="Contact us">
            <P>
              If you have questions about this Privacy Policy or how we handle your information,
              contact us at:
            </P>
            <div className="rounded-xl border border-border bg-surface p-5 text-ink">
              <p className="font-display text-[15px] font-bold">Ashbourne Partners LLP</p>
              <p className="mt-2 text-[14.5px]">
                Email: <EmailLink>hello@ashbournepartners.com</EmailLink>
              </p>
              <p className="mt-1 text-[14.5px]">
                Website: <SiteLink>ashbournepartners.com</SiteLink>
              </p>
            </div>
          </Section>
        </section>
      </main>
      <Footer />
    </>
  );
}
