
import React from 'react';
import { Bot, MoreHorizontal, Play, Settings, Trash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const chatbots = [
  {
    id: '1',
    name: 'Customer Support Assistant',
    status: 'active',
    model: 'GPT-4',
    knowledgeBase: 'Support Documentation',
    createdAt: '2023-04-15',
  },
  {
    id: '2',
    name: 'Real Estate Agent',
    status: 'active',
    model: 'GPT-4',
    knowledgeBase: 'Property Listings',
    createdAt: '2023-04-20',
  },
  {
    id: '3',
    name: 'Healthcare Advisor',
    status: 'inactive',
    model: 'GPT-3.5',
    knowledgeBase: 'Medical Knowledge',
    createdAt: '2023-05-03',
  }
];

const ChatbotListContent: React.FC = () => {
  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1">AI Chatbots</h1>
        <p className="text-muted-foreground mb-6">Manage your AI chatbot instances</p>
        
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Button className="bg-urban-teal hover:bg-urban-teal/90">
            Create New Chatbot
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((bot) => (
            <Card key={bot.id} className="bg-urban-dark-3 border-none">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="rounded-full bg-urban-dark p-2 mr-3">
                      <Bot className="h-5 w-5 text-urban-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-md font-semibold">{bot.name}</CardTitle>
                      <p className="text-xs text-gray-400">Created {new Date(bot.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge className={bot.status === 'active' ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"}>
                    {bot.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span>{bot.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Knowledge Base:</span>
                    <span className="text-urban-teal">{bot.knowledgeBase}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex justify-between">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button className="bg-urban-purple hover:bg-urban-purple/90">
                  <Play className="h-4 w-4 mr-2" />
                  Test Chatbot
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotListContent;
