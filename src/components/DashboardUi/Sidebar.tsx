import { Layout, Menu, Card, Avatar, Typography, Tooltip } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Use actual user data or fallback to mock data
  const currentUser = {
    name: user?.name || 'User',
    id: user?.id || 'E173037',
    avatarUrl: user?.avatarUrl || undefined,
    role: user?.role || 'student',
  };

  const handleProfileCardClick = () => {
    navigate('/profile');
  };

  const getSelectedKey = () => {
    if (location.pathname.includes('/dashboard/admin')) return 'admin';
    if (location.pathname.includes('/dashboard/instructor')) return 'instructor';
    if (location.pathname.includes('/dashboard/student')) return 'student';
    return 'admin';
  };

  // Get menu items based on user role
  const getMenuItems = () => {
    const items = [];

    // Show student dashboard for students
    if (currentUser.role === 'student') {
      items.push(
        <Menu.Item 
          key="student" 
          icon={<UserOutlined style={{ fontSize: '16px' }} />}
          style={{
            height: '52px',
            lineHeight: '52px',
            marginBottom: '12px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <Link to="/dashboard/student" style={{ color: 'white' }}>
            Student Dashboard
          </Link>
        </Menu.Item>
      );
    }

    // Show instructor dashboard for instructors
    if (currentUser.role === 'instructor') {
      items.push(
        <Menu.Item 
          key="instructor" 
          icon={<BookOutlined style={{ fontSize: '16px' }} />}
          style={{
            height: '52px',
            lineHeight: '52px',
            marginBottom: '12px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <Link to="/dashboard/instructor" style={{ color: 'white' }}>
            Instructor Dashboard
          </Link>
        </Menu.Item>
      );
    }

    // Show admin dashboard for admins
    if (currentUser.role === 'admin') {
      items.push(
        <Menu.Item 
          key="admin" 
          icon={<SettingOutlined style={{ fontSize: '16px' }} />}
          style={{
            height: '52px',
            lineHeight: '52px',
            marginBottom: '12px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <Link to="/dashboard/admin" style={{ color: 'white' }}>
            Admin Dashboard
          </Link>
        </Menu.Item>
      );
    }

    return items;
  };

  return (
    <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
             {/* Logo */}
       <div style={{ 
         padding: '20px 16px', 
         textAlign: 'center', 
         borderBottom: '1px solid #f0f0f0',
         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
         marginBottom: '8px',
         

        
       }}>
         <Text style={{ 
           fontSize: '22px', 
           fontWeight: 'bold', 
           color: 'white',
           textShadow: '0 2px 4px rgba(0,0,0,0.2)'
         }}>
           LMS Platform
         </Text>
       </div>

      {/* User Profile Card */}
      <div style={{ padding: '16px' }}>
        <Tooltip title="Click to view profile" placement="right">
          <Card
            size="small"
            style={{ 
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={handleProfileCardClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
          <div style={{ textAlign: 'center' }}>
            <Avatar
              size={64}
              src={currentUser.avatarUrl}
              icon={<UserOutlined />}
              style={{ marginBottom: '12px' }}
            />
            <div>
              <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                Hi, {currentUser.name}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {currentUser.id}
              </Text>
            </div>
          </div>
        </Card>
        </Tooltip>
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        style={{ 
          borderRight: 0,
          padding: '0 16px'
        }}
      >
        {getMenuItems()}
      </Menu>
    </Sider>
  );
};

export default Sidebar;