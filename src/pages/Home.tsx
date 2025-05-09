
import React from 'react';
import ParticleBackground from '@/components/particles/ParticleBackground';
import HeroSection from '@/components/home/HeroSection';
import UseCasesSection from '@/components/home/UseCasesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CtaSection from '@/components/home/CtaSection';
import Footer from '@/components/home/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-urban-dark text-white relative overflow-x-hidden">
      <ParticleBackground />
      <HeroSection />
      <UseCasesSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
