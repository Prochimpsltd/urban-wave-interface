
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, Globe, ChevronRight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CrawlForm, CrawledUrl } from './types';

interface ChatbotSetupStepProps {
  form: UseFormReturn<CrawlForm>;
  chatbotName: string;
  setChatbotName: (name: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  crawledUrls: CrawledUrl[];
  handleNextStep: () => void;
}

const ChatbotSetupStep: React.FC<ChatbotSetupStepProps> = ({
  form,
  chatbotName,
  setChatbotName,
  selectedModel,
  setSelectedModel,
  crawledUrls,
  handleNextStep
}) => {
  return (
    <Card className="bg-urban-dark-3 border-none">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Bot className="mr-2 h-5 w-5 text-urban-teal" />
          Chatbot Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div>
            <Label htmlFor="chatbotName">Chatbot Name</Label>
            <Input 
              id="chatbotName" 
              placeholder="e.g., Customer Support Assistant" 
              className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="modelSelection">AI Model</Label>
            <Select 
              defaultValue={selectedModel}
              onValueChange={setSelectedModel}
            >
              <SelectTrigger className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal">
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Knowledge Base</Label>
            <Card className="bg-urban-dark-2 border-urban-dark p-3 mt-1">
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-urban-teal mr-2" />
                <span className="text-sm">{form.getValues().url || 'No URL specified'}</span>
                <Badge className="ml-auto">{crawledUrls.length} URLs</Badge>
              </div>
            </Card>
          </div>
          
          <Button 
            type="button" 
            className="bg-urban-purple hover:bg-urban-purple/90 w-full"
            onClick={handleNextStep}
            disabled={!chatbotName}
          >
            Preview Chatbot
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatbotSetupStep;
