
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { CrawlForm, CrawledUrl, WebCrawlerStep } from './crawler/types';
import StepNavigation from './crawler/StepNavigation';
import CrawlerConfigStep from './crawler/CrawlerConfigStep';
import ChatbotSetupStep from './crawler/ChatbotSetupStep';
import ChatbotPreviewStep from './crawler/ChatbotPreviewStep';

const WebCrawlerContent: React.FC = () => {
  const [step, setStep] = useState<WebCrawlerStep>('crawler');
  const [isCrawling, setIsCrawling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawledUrls, setCrawledUrls] = useState<CrawledUrl[]>([]);
  const [chatbotName, setChatbotName] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  
  const form = useForm<CrawlForm>({
    defaultValues: {
      url: '',
      crawlDepth: '2',
      requestTimeout: '10000',
      outputFormat: 'markdown',
      urlFilter: '',
      extractContent: true,
      followExternalLinks: false,
      stealthMode: true
    }
  });

  const handleStartCrawling = () => {
    if (!form.getValues().url) return;
    
    setIsCrawling(true);
    setProgress(0);
    setCrawledUrls([]);
    
    // Simulate crawling with incremental progress updates
    const timer = setInterval(() => {
      setProgress(prev => {
        // Generate and add a new crawled URL
        if (prev % 10 === 0 && prev > 0 && prev < 100) {
          const newUrl = `https://example.com/page-${Math.floor(Math.random() * 100)}`;
          setCrawledUrls(urls => [
            ...urls, 
            {
              url: newUrl,
              status: 'completed',
              contentPreview: `Content extracted from ${newUrl}. This is sample text that would be extracted from the webpage...`
            }
          ]);
        }
        
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsCrawling(false);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleNextStep = () => {
    if (step === 'crawler') {
      setStep('setup');
    } else if (step === 'setup') {
      setStep('preview');
    }
  };

  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <Tabs value={step} className="w-full">
        <StepNavigation 
          step={step} 
          isCrawling={isCrawling} 
          progress={progress} 
        />
        
        <TabsContent value="crawler" className="mt-0">
          <CrawlerConfigStep 
            form={form}
            isCrawling={isCrawling}
            progress={progress}
            crawledUrls={crawledUrls}
            handleStartCrawling={handleStartCrawling}
            handleNextStep={handleNextStep}
          />
        </TabsContent>
        
        <TabsContent value="setup" className="mt-0">
          <ChatbotSetupStep 
            form={form}
            chatbotName={chatbotName}
            setChatbotName={setChatbotName}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            crawledUrls={crawledUrls}
            handleNextStep={handleNextStep}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <ChatbotPreviewStep 
            form={form}
            chatbotName={chatbotName}
            selectedModel={selectedModel}
            crawledUrls={crawledUrls}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebCrawlerContent;
