
import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Bot, Filter, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ChatLog {
  id: string;
  botName: string;
  timestamp: string;
  lastMessage: string;
  sentimentScore: number;
  serialNumber: string;
  conversation: Array<{
    isBot: boolean;
    message: string;
    timestamp: string;
  }>;
}

const mockChatLogs: ChatLog[] = [
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
  const [chatLogs, setChatLogs] = useState<ChatLog[]>(mockChatLogs);
  const [selectedChatDetails, setSelectedChatDetails] = useState<ChatLog | null>(null);

  useEffect(() => {
    if (selectedChat) {
      const chatDetails = chatLogs.find(chat => chat.id === selectedChat) || null;
      setSelectedChatDetails(chatDetails);
    } else {
      setSelectedChatDetails(null);
    }
  }, [selectedChat, chatLogs]);

  useEffect(() => {
    // Sort chat logs based on sortOrder
    const sortedLogs = [...mockChatLogs].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setChatLogs(sortedLogs);
  }, [sortOrder]);

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
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div className={`ml-64 bg-urban-dark min-h-screen ${selectedChat ? 'flex' : 'block'}`}>
      <div className={`${selectedChat ? 'w-1/2 border-r border-white/10' : 'w-full'} p-6`}>
        <div>
          <h1 className="text-2xl font-bold mb-1">Chat History</h1>
          <p className="text-muted-foreground mb-6">View and analyze your chat conversations</p>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="flex items-center mr-2">
                <Filter className="h-4 w-4 mr-2" />
                Filters
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
          
          <div className="space-y-4">
            {chatLogs.map((chat) => (
              <Card 
                key={chat.id} 
                className="bg-urban-dark-3 border-none hover:bg-urban-dark-2 cursor-pointer transition-colors"
                onClick={() => onSelectChat(chat.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{chat.botName}</h3>
                        <span className="ml-2 text-xs text-gray-400">{chat.serialNumber}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">{chat.lastMessage}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">{getTimeSince(chat.timestamp)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">Sentiment:</span>
                        <div className={`h-2 w-2 rounded-full ${getSentimentColor(chat.sentimentScore)} mr-1`}></div>
                        <span className="text-xs">{(chat.sentimentScore * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          
          <div className="space-y-4">
            {selectedChatDetails.conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot ? 'bg-urban-dark-3' : 'bg-urban-purple text-white'
                  }`}
                >
                  <p>{msg.message}</p>
                  <div className="text-xs text-right mt-1 opacity-70">
                    {formatDate(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Card className="mt-8 bg-urban-dark-3 border-none">
            <CardHeader>
              <CardTitle className="text-lg">Chat Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Sentiment Score:</span>
                <Badge className={getSentimentColor(selectedChatDetails.sentimentScore)}>
                  {(selectedChatDetails.sentimentScore * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Chat Duration:</span>
                <span>8 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Messages Exchanged:</span>
                <span>{selectedChatDetails.conversation.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryContent;
