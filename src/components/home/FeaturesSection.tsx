
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Lock, LineChart, Bot, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Advanced AI Understanding",
    description: "Our AI doesn't just respond—it comprehends nuance, context, and emotion, delivering near-human conversational experiences."
  },
  {
    icon: Zap,
    title: "Lightning Fast Responses",
    description: "With 50ms average response time, UrbanChat.AI eliminates waiting, keeping your customers engaged without delay."
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and compliance with SOC 2, HIPAA, and GDPR ensures your sensitive conversations remain private."
  },
  {
    icon: LineChart,
    title: "Actionable Analytics",
    description: "Transform conversations into insights with detailed analytics that reveal customer sentiment, trends, and opportunities."
  },
  {
    icon: Bot,
    title: "Seamless Integration",
    description: "Deploy across websites, mobile apps, and messaging platforms with simple APIs and pre-built widgets."
  },
  {
    icon: Sparkles,
    title: "Custom Training",
    description: "Feed your AI with company-specific knowledge to create an extension of your brand and expertise."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-urban-dark-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-urban-purple/20 text-urban-purple hover:bg-urban-purple/30">
            Revolutionary Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Think Beyond Chatbots</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Not all AI chatbots are created equal. UrbanChat.AI delivers capabilities that don't just match expectations—they redefine them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="mr-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-urban-purple to-urban-teal">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
