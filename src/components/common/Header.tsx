
import React, { useState } from 'react';
import { Drawer, Dropdown, Avatar} from 'antd';
import type { MenuProps } from 'antd';

import { MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import  {logout} from '../../store/authSlice';
import CustomButton from '../ui/CustomButton';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = async () => {
    await dispatch (logout());
    navigate('/login');
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: (
        <span onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}>
          Dashboard
        </span>
      ),
    },
    {
      key: 'profile',
      label: <span onClick={() => navigate('/profile')}>Profile</span>,
    },
    {
      key: 'logout',
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #eaeaea',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>My LMS</div>

      <nav className="nav-items" style={{ display: 'flex', gap: '1.5rem', flexGrow: 1, justifyContent: 'center' }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              textDecoration: 'none',
              color: location.pathname === item.to ? '#FF9500' : '#000',
              fontWeight: 500,
              fontSize: '16px',
              paddingBottom: '2px',
              borderBottom: location.pathname === item.to ? '2px solid #FF9500' : '2px solid transparent',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right Section */}
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {!isAuthenticated ? (
          <>
            <CustomButton variant="secondary" size="md" className="login-btn" onClick={() => navigate('/login')}>
              Login
            </CustomButton>
            <CustomButton variant="primary" size="md" className="signup-btn" onClick={() => navigate('/register')}>
              Sign Up
            </CustomButton>
          </>
        ) : (
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" arrow>
            <Avatar style={{ backgroundColor: '#FF9500', cursor: 'pointer' }}>
              {user?.firstName?.charAt(0).toUpperCase() || <UserOutlined />}
            </Avatar>
          </Dropdown>
        )}
        <div className="mobile-toggle" aria-label="Toggle Navigation" style={{ display: 'none', marginLeft: '8px' }}>
          {open ? (
            <CloseOutlined style={{ fontSize: 24 }} onClick={toggleDrawer} />
          ) : (
            <MenuOutlined style={{ fontSize: 24 }} onClick={toggleDrawer} />
          )}
        </div>
      </div>

      <Drawer placement="right" closable={false} onClose={toggleDrawer} open={open} bodyStyle={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={toggleDrawer}
              style={{
                fontSize: '18px',
                fontWeight: 500,
                color: location.pathname === item.to ? '#FF9500' : '#000',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Drawer>

      <style>
        {`
          @media (max-width: 768px) {
            .nav-items {
              display: none !important;
            }

            .mobile-toggle {
              display: block !important;
              margin-left: 8px;
            }

            .header-actions {
              margin-left: auto;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .login-btn, .signup-btn {
              font-size: 14px;
              padding: 4px 10px;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;

