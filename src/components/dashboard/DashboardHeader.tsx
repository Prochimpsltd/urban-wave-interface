
import React from 'react';
import { Bell, FileText, Laptop, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  username: string;
  planExpiry: string;
  planType: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username, planExpiry, planType }) => {
  return (
    <header className="bg-urban-dark border-b border-white/10 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <span className="text-gradient-primary">Urban</span>
          <span className="text-white">Chat.AI</span>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center text-gray-300">
            <FileText className="w-4 h-4 mr-2" />
            Documentation
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center text-gray-300">
            <Laptop className="w-4 h-4 mr-2" />
            API Docs
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm text-gray-400">
          {planType} · Expires: {planExpiry}
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-urban-purple text-white">1</Badge>
        </Button>
        
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/lovable-uploads/9b335ece-c5a3-45d9-890f-d32b99b8042a.png" />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <Button variant="ghost" size="sm" className="ml-2 flex items-center text-gray-300">
            {username}
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
