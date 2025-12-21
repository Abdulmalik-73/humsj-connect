import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SectorsSection from "@/components/home/SectorsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SectorsSection />
    </Layout>
  );
};

export default Index;
