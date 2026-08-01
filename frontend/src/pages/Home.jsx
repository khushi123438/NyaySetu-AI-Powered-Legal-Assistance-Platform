import AIFeatures from "../components/AiFeatures/AiFeatures";
import Background from "../components/Background/Background";
import Hero from "../components/Hero/Hero";
import LegalProblems from "../components/LegalProblems/LegalProblems";
import Navbar from "../components/Navbar/Navbar";
import HowItWorks from "../components/HowItWorks/HowitWorks";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import Trust from "../components/Trust/Trust";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617]">
      <Background />

      <div className="relative z-10">

        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* Legal Problems */}
        <section id="legal">
          <LegalProblems />
        </section>

        {/* AI Features */}
        <section id="features">
          <AIFeatures />
        </section>

        {/* How It Works */}
        <section id="how">
          <HowItWorks />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Trust */}
        <section id="trust">
          <Trust />
        </section>

        {/* Footer */}
        <section id="footer">
          <Footer />
        </section>

      </div>
    </main>
  );
}