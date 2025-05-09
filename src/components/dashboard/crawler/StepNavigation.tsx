
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebCrawlerStep } from './types';

interface StepNavigationProps {
  step: WebCrawlerStep;
  isCrawling: boolean;
  progress: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ step, isCrawling, progress }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-1">Create New Chatbot</h1>
      <div className="flex items-center">
        <TabsList className="bg-urban-dark-3 mt-2">
          <TabsTrigger 
            value="crawler" 
            className={step === 'crawler' ? 'bg-urban-teal text-black' : ''}
            disabled={isCrawling}
          >
            1. Web Crawler
          </TabsTrigger>
          <TabsTrigger 
            value="setup" 
            className={step === 'setup' ? 'bg-urban-teal text-black' : ''}
            disabled={progress !== 100}
          >
            2. Setup Chatbot
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className={step === 'preview' ? 'bg-urban-teal text-black' : ''}
            disabled={step !== 'preview'}
          >
            3. Preview
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default StepNavigation;
