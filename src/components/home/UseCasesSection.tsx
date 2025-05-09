
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Building2, ShoppingCart, Stethoscope, GraduationCap, BriefcaseBusiness } from 'lucide-react';

const useCases = [
  {
    title: "Customer Support",
    description: "Transform your customer service with 24/7 intelligent support that resolves issues instantly. Increase satisfaction by 78%.",
    icon: MessageSquare,
    gradient: "from-pink-500 to-orange-500"
  },
  {
    title: "Enterprise Solutions",
    description: "Streamline internal communications and knowledge management. Boost employee productivity by up to 35%.",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "E-commerce",
    description: "Create personalized shopping experiences that convert. Our AI drives an average 42% increase in sales conversion.",
    icon: ShoppingCart,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    title: "Healthcare",
    description: "Provide preliminary patient support and scheduling that respects privacy. Reduce administrative workload by 65%.",
    icon: Stethoscope,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Education",
    description: "Deliver personalized learning assistance available anytime. Students report 89% higher engagement with material.",
    icon: GraduationCap,
    gradient: "from-amber-500 to-yellow-400"
  },
  {
    title: "Financial Services",
    description: "Secure, compliant customer service that handles routine inquiries. Financial institutions save $5M annually on average.",
    icon: BriefcaseBusiness, 
    gradient: "from-purple-600 to-indigo-500"
  }
];

const UseCasesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Industry-Leading Use Cases</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            UrbanChat.AI isn't just another chatbot—it's a revolutionary tool that adapts to your industry's unique needs with unmatched precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="glass-morphism border-none hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className={`h-2 bg-gradient-to-r ${useCase.gradient}`}></div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${useCase.gradient} text-white`}>
                    <useCase.icon size={24} />
                  </div>
                  <CardTitle>{useCase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gradient">
            Trusted by Fortune 500 Companies Worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {/* Company logos would go here in a real implementation */}
            <div className="text-xl font-bold text-gradient">ACME Inc.</div>
            <div className="text-xl font-bold text-gradient">GlobalTech</div>
            <div className="text-xl font-bold text-gradient">FutureCorp</div>
            <div className="text-xl font-bold text-gradient">InnovateX</div>
            <div className="text-xl font-bold text-gradient">OmegaSys</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
