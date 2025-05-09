
import React from 'react';
import { Bot, MoreHorizontal, Play, Settings, Trash, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  },
  {
    id: '4',
    name: 'Sales Assistant',
    status: 'active',
    model: 'GPT-4',
    knowledgeBase: 'Product Catalog',
    createdAt: '2023-05-10',
  },
  {
    id: '5',
    name: 'Technical Support Bot',
    status: 'inactive',
    model: 'GPT-3.5',
    knowledgeBase: 'Technical Manuals',
    createdAt: '2023-05-15',
  }
];

const ChatbotListContent: React.FC = () => {
  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1">AI Chatbots</h1>
        <p className="text-muted-foreground mb-6">Manage your AI chatbot instances</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search chatbots..." 
              className="pl-10 bg-urban-dark-3 border-none"
            />
          </div>
          <Button className="bg-urban-teal hover:bg-urban-teal/90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Chatbot
          </Button>
        </div>
        
        {/* Table view for chatbots */}
        <div className="rounded-md overflow-hidden border border-white/10">
          <Table>
            <TableHeader className="bg-urban-dark-2">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-white">Chatbot</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Model</TableHead>
                <TableHead className="text-white">Knowledge Base</TableHead>
                <TableHead className="text-white">Created</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatbots.map((bot) => (
                <TableRow 
                  key={bot.id}
                  className="border-b border-white/10 hover:bg-urban-dark-2"
                >
                  <TableCell>
                    <div className="flex items-center">
                      <div className="rounded-full bg-urban-dark p-2 mr-3">
                        <Bot className="h-5 w-5 text-urban-teal" />
                      </div>
                      <div>
                        <p className="font-medium">{bot.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={bot.status === 'active' ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}>
                      {bot.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{bot.model}</TableCell>
                  <TableCell className="text-urban-teal">{bot.knowledgeBase}</TableCell>
                  <TableCell>{new Date(bot.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-urban-purple hover:bg-urban-purple/90 h-8 flex items-center"
                        size="sm"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ChatbotListContent;
