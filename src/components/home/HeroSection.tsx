
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/ui/auth-modal';

const HeroSection: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient-primary">Urban</span>
          <span className="text-white">Chat.AI</span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-light mb-6 text-gradient">
          Revolutionizing Conversations with AI
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The next generation AI chatbot platform that transforms how businesses connect with customers across industries.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-purple hover:opacity-90 px-8 rounded-full"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-urban-teal text-urban-teal hover:bg-urban-teal/10 px-8 rounded-full"
          >
            See Demo
          </Button>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
