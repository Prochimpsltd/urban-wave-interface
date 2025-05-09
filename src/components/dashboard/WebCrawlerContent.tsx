
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, ChevronRight, Play, Web, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CrawlForm {
  url: string;
  crawlDepth: string;
  requestTimeout: string;
  outputFormat: string;
  urlFilter: string;
  extractContent: boolean;
  followExternalLinks: boolean;
  stealthMode: boolean;
}

interface CrawledUrl {
  url: string;
  status: 'crawling' | 'completed' | 'error';
  contentPreview: string;
}

const WebCrawlerContent: React.FC = () => {
  const [step, setStep] = useState<'crawler' | 'setup' | 'preview'>('crawler');
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
        
        <TabsContent value="crawler" className="mt-0">
          <Card className="bg-urban-dark-3 border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Web className="mr-2 h-5 w-5 text-urban-teal" />
                Web Crawler Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="url">Website URL</Label>
                    <Input 
                      id="url" 
                      placeholder="https://example.com" 
                      className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
                      {...form.register('url')}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="crawlDepth">Crawl Depth</Label>
                      <Input 
                        id="crawlDepth" 
                        placeholder="2" 
                        type="number"
                        className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
                        {...form.register('crawlDepth')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="requestTimeout">Request Timeout (ms)</Label>
                      <Input 
                        id="requestTimeout" 
                        placeholder="10000" 
                        type="number"
                        className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
                        {...form.register('requestTimeout')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="outputFormat">Output Format</Label>
                      <Select 
                        defaultValue={form.getValues().outputFormat}
                        onValueChange={(value) => form.setValue('outputFormat', value)}
                      >
                        <SelectTrigger className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal">
                          <SelectValue placeholder="Select output format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plaintext">Plain Text</SelectItem>
                          <SelectItem value="markdown">Markdown</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="urlFilter">URL Filter (only crawl URLs containing this text)</Label>
                    <Input 
                      id="urlFilter" 
                      placeholder="e.g., /blog or /docs" 
                      className="bg-urban-dark-2 border-urban-dark focus:border-urban-teal"
                      {...form.register('urlFilter')}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Advanced Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-urban-dark-2 p-3 rounded-md">
                      <div className="flex items-center space-x-2">
                        <input 
                          id="extractContent" 
                          type="checkbox" 
                          className="rounded border-gray-500 text-urban-teal focus:ring-urban-teal"
                          checked={form.getValues().extractContent}
                          onChange={(e) => form.setValue('extractContent', e.target.checked)}
                        />
                        <Label htmlFor="extractContent">Extract Content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          id="followExternalLinks" 
                          type="checkbox"
                          className="rounded border-gray-500 text-urban-teal focus:ring-urban-teal"
                          checked={form.getValues().followExternalLinks}
                          onChange={(e) => form.setValue('followExternalLinks', e.target.checked)}
                        />
                        <Label htmlFor="followExternalLinks">Follow External Links</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          id="stealthMode" 
                          type="checkbox"
                          className="rounded border-gray-500 text-urban-teal focus:ring-urban-teal"
                          checked={form.getValues().stealthMode}
                          onChange={(e) => form.setValue('stealthMode', e.target.checked)}
                        />
                        <Label htmlFor="stealthMode">Stealth Mode</Label>
                      </div>
                    </div>
                  </div>
                  
                  {!isCrawling && progress === 0 && (
                    <Button 
                      type="button" 
                      className="bg-urban-teal hover:bg-urban-teal/90 w-full"
                      onClick={handleStartCrawling}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Crawling
                    </Button>
                  )}
                  
                  {isCrawling && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Crawling in progress...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  
                  {progress === 100 && !isCrawling && (
                    <Button 
                      type="button" 
                      className="bg-urban-purple hover:bg-urban-purple/90 w-full"
                      onClick={handleNextStep}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
              
              {crawledUrls.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-md font-medium mb-4">Crawled URLs ({crawledUrls.length})</h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {crawledUrls.map((item, index) => (
                      <Card key={index} className="bg-urban-dark-2 border-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="text-sm font-medium truncate max-w-[70%]">{item.url}</h4>
                            <Badge className="bg-green-500/20 text-green-500">
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2">{item.contentPreview}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="setup" className="mt-0">
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
                      <Web className="h-4 w-4 text-urban-teal mr-2" />
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
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebCrawlerContent;
