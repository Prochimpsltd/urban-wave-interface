
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import ChatHistoryContent from '@/components/dashboard/ChatHistoryContent';
import ChatbotListContent from '@/components/dashboard/ChatbotListContent';
import LeadsContent from '@/components/dashboard/LeadsContent';
import WebCrawlerContent from '@/components/dashboard/WebCrawlerContent';
import KnowledgeBaseContent from '@/components/dashboard/KnowledgeBaseContent';

const Dashboard: React.FC = () => {
  // In a real app, this would come from an auth provider
  const user = {
    name: "Alex Morgan",
    plan: "Pro Plan",
    expiry: "June 30"
  };

  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'history':
        return <ChatHistoryContent selectedChat={selectedChat} onSelectChat={setSelectedChat} />;
      case 'leads':
        return <LeadsContent />;
      case 'chatbots':
        return <ChatbotListContent />;
      case 'create-chatbot':
        return <WebCrawlerContent />;
      case 'knowledge-base':
        return <KnowledgeBaseContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-urban-dark text-white">
      <DashboardHeader 
        username={user.name} 
        planType={user.plan}
        planExpiry={user.expiry}
      />
      <div className="flex">
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
