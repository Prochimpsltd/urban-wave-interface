
import React from 'react';
import { Clock } from 'lucide-react';

interface ComingSoonContentProps {
  title: string;
}

const ComingSoonContent: React.FC<ComingSoonContentProps> = ({ title }) => {
  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <p className="text-muted-foreground mb-6">This feature is currently under development</p>
      
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-urban-dark-3 rounded-full p-6 mb-4">
          <Clock className="h-16 w-16 text-urban-teal opacity-80" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-gray-400 text-center max-w-md">
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonContent;
