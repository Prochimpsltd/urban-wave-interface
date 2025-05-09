
import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Bot, Filter, ArrowLeft, Search, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChatHistoryItem } from './crawler/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for the chat history
const mockChatLogs: ChatHistoryItem[] = [
  {
    id: '1',
    botName: 'Customer Support Bot',
    timestamp: '2023-05-10T14:30:00',
    lastMessage: 'How can I help you today?',
    sentimentScore: 0.8,
    serialNumber: 'CS-BOT-001',
    conversation: [
      { isBot: true, message: 'Welcome! How can I assist you?', timestamp: '2023-05-10T14:25:00' },
      { isBot: false, message: 'I need help with my order', timestamp: '2023-05-10T14:28:00' },
      { isBot: true, message: 'How can I help you today?', timestamp: '2023-05-10T14:30:00' }
    ]
  },
  {
    id: '2',
    botName: 'Real Estate Assistant',
    timestamp: '2023-05-09T11:15:00',
    lastMessage: 'Here are some properties that match your criteria',
    sentimentScore: 0.6,
    serialNumber: 'RE-BOT-002',
    conversation: [
      { isBot: true, message: 'Welcome to our real estate chatbot!', timestamp: '2023-05-09T11:05:00' },
      { isBot: false, message: 'I am looking for apartments in downtown', timestamp: '2023-05-09T11:10:00' },
      { isBot: true, message: 'Here are some properties that match your criteria', timestamp: '2023-05-09T11:15:00' }
    ]
  },
  {
    id: '3',
    botName: 'Healthcare Advisor',
    timestamp: '2023-05-08T09:45:00',
    lastMessage: 'Based on your symptoms, I recommend consulting a doctor',
    sentimentScore: 0.4,
    serialNumber: 'HC-BOT-003',
    conversation: [
      { isBot: true, message: 'Hello, I can help answer your health questions.', timestamp: '2023-05-08T09:35:00' },
      { isBot: false, message: 'I have a headache and fever', timestamp: '2023-05-08T09:40:00' },
      { isBot: true, message: 'Based on your symptoms, I recommend consulting a doctor', timestamp: '2023-05-08T09:45:00' }
    ]
  },
  {
    id: '4',
    botName: 'Sales Assistant',
    timestamp: '2023-05-07T16:20:00',
    lastMessage: 'Would you like to schedule a demo?',
    sentimentScore: 0.7,
    serialNumber: 'SA-BOT-004',
    conversation: [
      { isBot: true, message: 'Welcome to our sales channel!', timestamp: '2023-05-07T16:15:00' },
      { isBot: false, message: 'I want to learn more about your enterprise plan', timestamp: '2023-05-07T16:18:00' },
      { isBot: true, message: 'Would you like to schedule a demo?', timestamp: '2023-05-07T16:20:00' }
    ]
  },
  {
    id: '5',
    botName: 'Technical Support',
    timestamp: '2023-05-06T10:05:00',
    lastMessage: 'Try resetting your device and let me know if that helps',
    sentimentScore: 0.5,
    serialNumber: 'TS-BOT-005',
    conversation: [
      { isBot: true, message: 'How can I help with your technical issue?', timestamp: '2023-05-06T10:00:00' },
      { isBot: false, message: 'My app keeps crashing', timestamp: '2023-05-06T10:03:00' },
      { isBot: true, message: 'Try resetting your device and let me know if that helps', timestamp: '2023-05-06T10:05:00' }
    ]
  }
];

const getSentimentColor = (score: number): string => {
  if (score >= 0.7) return 'bg-green-500';
  if (score >= 0.4) return 'bg-yellow-500';
  return 'bg-red-500';
};

interface ChatHistoryContentProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string | null) => void;
}

const ChatHistoryContent: React.FC<ChatHistoryContentProps> = ({ selectedChat, onSelectChat }) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [chatLogs, setChatLogs] = useState<ChatHistoryItem[]>(mockChatLogs);
  const [selectedChatDetails, setSelectedChatDetails] = useState<ChatHistoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedChat) {
      const chatDetails = chatLogs.find(chat => chat.id === selectedChat) || null;
      setSelectedChatDetails(chatDetails);
    } else {
      setSelectedChatDetails(null);
    }
  }, [selectedChat, chatLogs]);

  useEffect(() => {
    // Sort and filter chat logs based on sortOrder and search query
    let filteredLogs = [...mockChatLogs];
    
    if (searchQuery) {
      filteredLogs = filteredLogs.filter(chat => 
        chat.botName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        chat.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filteredLogs.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setChatLogs(filteredLogs);
  }, [sortOrder, searchQuery]);

  const formatDate = (dateString: string): string => {
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
    if (interval === 1) return '1 day ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return '1 hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return '1 minute ago';
    
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div className={`ml-64 bg-urban-dark min-h-screen ${selectedChat ? 'flex' : 'block'}`}>
      <div className={`${selectedChat ? 'w-1/2 border-r border-white/10' : 'w-full'} p-6`}>
        <div>
          <h1 className="text-2xl font-bold mb-1">Chat History</h1>
          <p className="text-muted-foreground mb-6">View and analyze your chat conversations</p>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 w-1/2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10 bg-urban-dark-3 border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Table view for chat history */}
          <div className="rounded-md overflow-hidden border border-white/10">
            <Table>
              <TableHeader className="bg-urban-dark-2">
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead className="text-white">Date/Time</TableHead>
                  <TableHead className="text-white">Call ID</TableHead>
                  <TableHead className="text-white">Agent</TableHead>
                  <TableHead className="text-white">Duration</TableHead>
                  <TableHead className="text-white text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chatLogs.map((chat) => (
                  <TableRow 
                    key={chat.id}
                    className="border-b border-white/10 hover:bg-urban-dark-2 cursor-pointer"
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <TableCell className="font-medium">{formatDate(chat.timestamp)}</TableCell>
                    <TableCell className="text-gray-400 font-mono text-xs">{chat.serialNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getSentimentColor(chat.sentimentScore)}`}></div>
                        {chat.botName}
                      </div>
                    </TableCell>
                    <TableCell>05:32</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            Showing {chatLogs.length} of {mockChatLogs.length} results
          </div>
        </div>
      </div>
      
      {selectedChat && selectedChatDetails && (
        <div className="w-1/2 p-6 bg-urban-dark-2 h-screen overflow-y-auto">
          <div className="mb-6 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => onSelectChat(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{selectedChatDetails.botName}</h2>
              <p className="text-sm text-gray-400">{selectedChatDetails.serialNumber} • {formatDate(selectedChatDetails.timestamp)}</p>
            </div>
          </div>
          
          {/* Call details section */}
          <Card className="mb-6 bg-urban-dark-3 border-none">
            <CardHeader>
              <CardTitle className="text-lg">Call Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg mb-1">Web Call</h3>
                  <p className="text-sm text-gray-400">ID: {selectedChatDetails.serialNumber}</p>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Sentiment:</span>
                  <Badge className={`${getSentimentColor(selectedChatDetails.sentimentScore)} text-black`}>
                    Neutral
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Call recording section */}
          <Card className="mb-6 bg-urban-dark-3 border-none">
            <CardHeader>
              <CardTitle className="text-lg">Call Recording</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" size="sm">
                  Play
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <p className="text-sm text-gray-400">No recording available for this call.</p>
            </CardContent>
          </Card>
          
          {/* Call information section */}
          <Card className="bg-urban-dark-3 border-none">
            <CardHeader>
              <CardTitle className="text-lg">Call Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Date & Time</p>
                  <p>{formatDate(selectedChatDetails.timestamp)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p>1:11</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">From</p>
                  <p>N/A</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">To</p>
                  <p>N/A</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Agent ID</p>
                  <p className="font-mono text-xs">{selectedChatDetails.serialNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Agent Name</p>
                  <p>{selectedChatDetails.botName.split(' ')[0]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryContent;
