import React, { useState } from 'react';
import { Layout, Typography, Space, Badge, Avatar, Button, Dropdown, Popover, List, Divider, Button as AntButton } from 'antd';
import { 
  WarningOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotifications, useNotificationCount, useMarkNotificationAsRead, useMarkAllNotificationsAsRead, useDeleteNotification } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  user?: { name: string; avatarUrl?: string; email?: string };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user: propUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { data: notifications } = useNotifications();
  const { data: notificationCount } = useNotificationCount();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Use prop user or auth user
  const user = propUser || authUser;
  
  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard/admin')) return 'Admin Progress';
    if (location.pathname.includes('/dashboard/instructor')) return 'Instructor Dashboard';
    if (location.pathname.includes('/dashboard/student')) return 'Student Dashboard';
    if (location.pathname.includes('/profile')) return 'My Profile';
    if (location.pathname.includes('/configuration')) return 'System Configuration';
    return 'Dashboard';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
    setNotificationVisible(false);
  };

  const handleDeleteNotification = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    deleteNotification.mutate(notificationId);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: handleProfileClick,
    },
    {
      key: 'configuration',
      icon: <SettingOutlined />,
      label: 'Configuration',
      onClick: () => navigate('/configuration'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const notificationContent = (
    <div style={{ width: 350, maxHeight: 400, overflow: 'auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Typography.Text strong>Notifications</Typography.Text>
        <Space>
          <AntButton 
            size="small" 
            type="text"
            onClick={() => markAllAsRead.mutate()}
            loading={markAllAsRead.isPending}
          >
            Mark all read
          </AntButton>
        </Space>
      </div>
      
      {notifications && notifications.length > 0 ? (
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: notification.isRead ? 'transparent' : '#f6ffed',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => handleNotificationClick(notification)}
            >
              <List.Item.Meta
                avatar={getNotificationIcon(notification.type)}
                title={
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Typography.Text strong style={{ fontSize: '14px' }}>
                      {notification.title}
                    </Typography.Text>
                    <Space>
                      {!notification.isRead && (
                        <AntButton
                          size="small"
                          type="text"
                          icon={<CheckOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead.mutate(notification.id);
                          }}
                          loading={markAsRead.isPending}
                        />
                      )}
                      <AntButton
                        size="small"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => handleDeleteNotification(e, notification.id)}
                        loading={deleteNotification.isPending}
                      />
                    </Space>
                  </div>
                }
                description={
                  <div>
                    <Typography.Text style={{ fontSize: '12px', color: '#666' }}>
                      {notification.message}
                    </Typography.Text>
                    <div style={{ marginTop: '4px' }}>
                      <Typography.Text type="secondary" style={{ fontSize: '11px' }}>
                        {formatTimeAgo(notification.createdAt)}
                      </Typography.Text>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Typography.Text type="secondary">No notifications</Typography.Text>
        </div>
      )}
    </div>
  );

  // Only show critical alerts on admin dashboard
  const showCriticalAlerts = location.pathname === '/dashboard/admin';

  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        height: '64px',
      }}
    >
      {/* Left side - Title */}
      <div>
        <Title level={3} style={{ margin: 0, color: '#262626' }}>
          {getPageTitle()}
        </Title>
      </div>

      {/* Right side - Notifications and User */}
      <Space size="middle">
        {/* Notification Bell */}
        <Popover
          content={notificationContent}
          title={null}
          trigger="click"
          placement="bottomRight"
          open={notificationVisible}
          onOpenChange={setNotificationVisible}
        >
          <Badge count={notificationCount?.unread || 0} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              size="middle"
              style={{ fontSize: '18px' }}
            />
          </Badge>
        </Popover>

        {showCriticalAlerts && (
          <Badge count={3} size="small">
            <Button
              type="primary"
              danger
              icon={<WarningOutlined />}
              size="middle"
              onClick={() => console.log('Critical alerts clicked')}
            >
              3 critical alerts
            </Button>
          </Badge>
        )}
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Avatar 
            src={user?.avatarUrl}
            icon={<UserOutlined />} 
            size="default"
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default DashboardHeader; 