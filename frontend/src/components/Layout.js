import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DocNavbar from '../components/DocNavbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDocsRoute = location.pathname === '/docs-sharing';

  return (
    <div>
      {isDocsRoute ? <DocNavbar /> : <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
