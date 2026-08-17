import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { ProblemVsSolution } from "@/components/sections/ProblemVsSolution";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      {/* The homepage hero is the brand blue, so the bar starts white-on-transparent
          over it and flips to the standard light bar once scrolled past. */}
      <Header theme="dark" />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <LiveDemo />
        <ProblemVsSolution />
        <FAQ />
        <About />
      </main>
      <Footer />
    </>
  );
}
