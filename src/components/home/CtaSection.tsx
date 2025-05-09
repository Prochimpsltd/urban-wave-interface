
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/ui/auth-modal';

const CtaSection: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto glass-morphism rounded-2xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Elevate Your Customer Experience Today
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have transformed their customer interactions with UrbanChat.AI. Get started in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-purple hover:opacity-90 px-8 rounded-full"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Start Free Trial
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-urban-teal text-urban-teal hover:bg-urban-teal/10 px-8 rounded-full"
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            No credit card required. 14-day free trial with full access.
          </p>
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

export default CtaSection;
