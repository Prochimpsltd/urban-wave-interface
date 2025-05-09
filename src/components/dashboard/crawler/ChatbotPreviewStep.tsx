
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CrawlForm, CrawledUrl } from './types';

interface ChatbotPreviewStepProps {
  form: UseFormReturn<CrawlForm>;
  chatbotName: string;
  selectedModel: string;
  crawledUrls: CrawledUrl[];
}

const ChatbotPreviewStep: React.FC<ChatbotPreviewStepProps> = ({
  form,
  chatbotName,
  selectedModel,
  crawledUrls
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-urban-dark-3 border-none h-[500px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bot className="mr-2 h-5 w-5 text-urban-teal" />
            {chatbotName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-urban-dark-2 p-3 rounded-lg max-w-[80%]">
                <p>Hello! I'm {chatbotName}. How can I assist you today?</p>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input 
              placeholder="Type your message..." 
              className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
            />
            <Button className="bg-urban-purple hover:bg-urban-purple/90">
              Send
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="bg-urban-dark-3 border-none">
        <CardHeader>
          <CardTitle className="text-lg">Chatbot Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Configuration</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Name:</div>
              <div>{chatbotName}</div>
              <div className="text-gray-400">Model:</div>
              <div>{selectedModel}</div>
              <div className="text-gray-400">Knowledge Base:</div>
              <div>{form.getValues().url}</div>
              <div className="text-gray-400">URLs Crawled:</div>
              <div>{crawledUrls.length}</div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="bg-urban-teal hover:bg-urban-teal/90 w-full">
              Deploy Chatbot
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotPreviewStep;
