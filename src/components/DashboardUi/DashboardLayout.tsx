import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  user: { name: string; avatarUrl?: string; email?: string };
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, children }) => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader user={user} />
      <main style={{ 
        padding: 32, 
        background: '#fafbfc', 
        flex: 1,
        overflowY: 'auto'
      }}>
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout; 