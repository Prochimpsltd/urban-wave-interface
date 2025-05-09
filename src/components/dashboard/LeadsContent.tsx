
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LeadsContent: React.FC = () => {
  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1">Leads Management</h1>
        <p className="text-muted-foreground mb-6">Collect and manage lead information from your chatbot interactions</p>
        
        <Card className="bg-urban-dark-3 border-none">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-urban-dark-2 p-8 mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-urban-teal"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Leads Management Coming Soon</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Our leads management system is currently in development. Soon you'll be able to capture, 
              organize, and analyze lead information collected by your chatbots.
            </p>
            <Button className="bg-urban-teal hover:bg-urban-teal/90">
              Get Early Access
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadsContent;
