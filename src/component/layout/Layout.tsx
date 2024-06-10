import React, { useState, ReactNode } from 'react';
import Sidebar from '@/component/sidebar/Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={styles.container}>
      <div className={`${isSidebarExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed} bg-gray-900`}>
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <main className={isSidebarExpanded ? styles.mainExpanded : styles.mainCollapsed}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

