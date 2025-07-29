import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
        <div className="page-content">
          <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
