
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, Users, Bot, Settings, PanelLeft, FileCog, PaintBucket, Book, Plus, LayoutDashboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, onClick }) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={`w-full justify-start ${active ? 'bg-white/10' : ''}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </Button>
);

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-urban-dark-2 border-r border-white/10 h-screen overflow-y-auto fixed">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" className="p-1">
              <PanelLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              active={activeSection === 'dashboard'}
              onClick={() => onSectionChange('dashboard')} 
            />
            <SidebarItem 
              icon={<Clock className="w-5 h-5" />} 
              label="Chat History" 
              active={activeSection === 'history'}
              onClick={() => onSectionChange('history')} 
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label="Leads" 
              active={activeSection === 'leads'}
              onClick={() => onSectionChange('leads')} 
            />
            <SidebarItem 
              icon={<Bot className="w-5 h-5" />} 
              label="AI Chatbots" 
              active={activeSection === 'chatbots'}
              onClick={() => onSectionChange('chatbots')} 
            />
            <SidebarItem 
              icon={<Book className="w-5 h-5" />} 
              label="Knowledge Base" 
              active={activeSection === 'knowledge-base'}
              onClick={() => onSectionChange('knowledge-base')} 
            />
            <SidebarItem 
              icon={<Plus className="w-5 h-5" />} 
              label="Create New Chatbot" 
              active={activeSection === 'create-chatbot'}
              onClick={() => onSectionChange('create-chatbot')} 
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 mt-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            GENERAL
          </h3>
          <div className="space-y-1">
            <SidebarItem 
              icon={<FileCog className="w-5 h-5" />} 
              label="API Management" 
              active={activeSection === 'api'}
              onClick={() => onSectionChange('api')} 
            />
            <SidebarItem 
              icon={<PaintBucket className="w-5 h-5" />} 
              label="White Label Service" 
              active={activeSection === 'white-label'}
              onClick={() => onSectionChange('white-label')} 
            />
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Settings" 
              active={activeSection === 'settings'}
              onClick={() => onSectionChange('settings')} 
            />
          </div>
        </div>
        
        <div className="mt-auto p-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="font-medium">Basic Plan</h3>
                <p className="text-sm text-gray-400">1,000 messages/month</p>
              </div>
              <Badge>Active</Badge>
            </div>
            
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                1,000 messages/month
              </div>
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Custom branding
              </div>
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Lead generation
              </div>
            </div>
            
            <Button className="w-full mt-4 bg-gradient-purple hover:opacity-90">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
