
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, FileText, Globe, Clock, MoreHorizontal, Bot } from 'lucide-react';

const knowledgeBases = [
  {
    id: '1',
    name: 'Support Documentation',
    source: 'Web Crawler',
    sourceUrl: 'https://docs.example.com',
    documentCount: 34,
    lastUpdated: '2023-05-01T14:30:00',
    usage: 'Customer Support Assistant'
  },
  {
    id: '2',
    name: 'Property Listings',
    source: 'Web Crawler',
    sourceUrl: 'https://properties.example.com',
    documentCount: 128,
    lastUpdated: '2023-05-03T09:15:00',
    usage: 'Real Estate Agent'
  },
  {
    id: '3',
    name: 'Medical Knowledge',
    source: 'Web Crawler',
    sourceUrl: 'https://health.example.com',
    documentCount: 76,
    lastUpdated: '2023-04-28T11:45:00',
    usage: 'Healthcare Advisor'
  }
];

const KnowledgeBaseContent: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    let interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1">Knowledge Base</h1>
        <p className="text-muted-foreground mb-6">Manage your knowledge sources for AI chatbots</p>
        
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Button className="bg-urban-teal hover:bg-urban-teal/90">
            Add Knowledge Source
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeBases.map((kb) => (
            <Card key={kb.id} className="bg-urban-dark-3 border-none hover:bg-urban-dark-2 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full bg-urban-dark p-2 mr-3">
                      <Book className="h-4 w-4 text-urban-teal" />
                    </div>
                    <CardTitle className="text-md">{kb.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Source:</span>
                    <span className="ml-2 truncate">{kb.source} • {kb.sourceUrl}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Documents:</span>
                    <Badge className="ml-2 bg-urban-dark">{kb.documentCount}</Badge>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Updated:</span>
                    <span className="ml-2">{getTimeSince(kb.lastUpdated)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Bot className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Used by:</span>
                    <Badge className="ml-2 bg-urban-purple text-white">{kb.usage}</Badge>
                  </div>
                  
                  <div className="pt-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">View</Button>
                    <Button variant="outline" size="sm" className="flex-1">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseContent;
