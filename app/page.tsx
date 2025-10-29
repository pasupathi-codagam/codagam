import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import CareerSection from "@/components/home/CareerSection";
import ClientSection from "@/components/home/ClientSection";

export default function Home() {
  return (
    <div >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientSection />
      <ProductsSection />
      <CareerSection />
    </div>
  );
}
