import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import ClientSection from "@/components/home/ClientSection";
import CareerSection from "@/components/home/CareerSection";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <ClientSection />
      <CareerSection />
    </div>
  );
}
