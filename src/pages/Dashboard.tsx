
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard: React.FC = () => {
  // In a real app, this would come from an auth provider
  const user = {
    name: "Alex Morgan",
    plan: "Pro Plan",
    expiry: "June 30"
  };

  return (
    <div className="min-h-screen bg-urban-dark text-white">
      <DashboardHeader 
        username={user.name} 
        planType={user.plan}
        planExpiry={user.expiry}
      />
      <div className="flex">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
