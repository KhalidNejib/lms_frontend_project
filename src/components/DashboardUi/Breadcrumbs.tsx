import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';

interface BreadcrumbsProps {
  items?: { label: string; href?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items: propItems }) => {
  const location = useLocation();

  // Generate breadcrumbs based on current path if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: { label: string; href?: string }[] = [];

    // Always add home
    breadcrumbs.push({
      label: 'Home',
      href: '/'
    });

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip the first segment if it's just 'dashboard'
      if (segment === 'dashboard' && index === 0) {
        breadcrumbs.push({
          label: 'Dashboard',
          href: currentPath
        });
        return;
      }

      // Map segments to readable labels
      let label = segment;
      switch (segment) {
        case 'student':
          label = 'Student';
          break;
        case 'instructor':
          label = 'Instructor';
          break;
        case 'admin':
          label = 'Admin';
          break;
        case 'profile':
          label = 'Profile';
          break;
        case 'courses':
          label = 'Courses';
          break;
        case 'configuration':
          label = 'Configuration';
          break;
        default:
          // Capitalize first letter
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      // Don't make the last item a link
      const isLast = index === pathSegments.length - 1;
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const items = propItems || generateBreadcrumbs();

  return (
    <nav style={{ 
      marginBottom: '16px', 
      fontSize: '14px', 
      color: '#666',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
    {items.map((item, idx) => (
        <React.Fragment key={item.label}>
        {item.href ? (
            <Link 
              to={item.href} 
              style={{ 
                color: '#FF9500', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {item.label === 'Home' && <HomeOutlined />}
              {item.label === 'Dashboard' && <DashboardOutlined />}
            {item.label}
          </Link>
        ) : (
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: '#333',
              fontWeight: '500'
            }}>
              {item.label === 'Home' && <HomeOutlined />}
              {item.label === 'Dashboard' && <DashboardOutlined />}
              {item.label}
            </span>
          )}
          {idx < items.length - 1 && (
            <span style={{ color: '#d9d9d9' }}>/</span>
          )}
        </React.Fragment>
    ))}
  </nav>
);
};

export default Breadcrumbs;