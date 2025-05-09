
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Globe, Play, ChevronRight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CrawlForm, CrawledUrl } from './types';

interface CrawlerConfigStepProps {
  form: UseFormReturn<CrawlForm>;
  isCrawling: boolean;
  progress: number;
  crawledUrls: CrawledUrl[];
  handleStartCrawling: () => void;
  handleNextStep: () => void;
}

const CrawlerConfigStep: React.FC<CrawlerConfigStepProps> = ({
  form,
  isCrawling,
  progress,
  crawledUrls,
  handleStartCrawling,
  handleNextStep
}) => {
  return (
    <Card className="bg-urban-dark-3 border-none">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Globe className="mr-2 h-5 w-5 text-urban-teal" />
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
        
        {crawledUrls.length > 0 && <CrawledUrlsList crawledUrls={crawledUrls} />}
      </CardContent>
    </Card>
  );
};

// Extracted component for the crawled URLs list
const CrawledUrlsList: React.FC<{ crawledUrls: CrawledUrl[] }> = ({ crawledUrls }) => {
  return (
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
  );
};

export default CrawlerConfigStep;
