// client/src/pages/home.tsx
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import WallOfHopeSection from "@/components/wall-of-hope-section";
import ImpactSection from "@/components/impact-section";
import GetInvolvedSection from "@/components/get-involved-section";
import NewsSection from "@/components/news-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WallOfHopeSection />
      <ImpactSection />
      <GetInvolvedSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
