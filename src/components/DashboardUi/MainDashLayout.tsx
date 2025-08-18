import { Layout as AntLayout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './DashboardHeader';
import DashboardHeader from './DashboardHeader';

const { Content } = AntLayout;

const DashLayout = () => {
  const location = useLocation();
  
  // Use DashboardHeader for dashboard routes, regular Header for others
  const isDashboardRoute = location.pathname.includes('/dashboard') || location.pathname.includes('/profile');
  const HeaderComponent = isDashboardRoute ? DashboardHeader : Header;

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {isDashboardRoute && <Sidebar />}
      <AntLayout>
        <HeaderComponent />
        <Content style={{ margin: isDashboardRoute ? '24px 16px 0' : '0' }}>
          <div style={{ padding: isDashboardRoute ? 24 : 0, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default DashLayout;