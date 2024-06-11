import React, { useState, ReactNode } from 'react';
import Sidebar from '@/component/sidebar/Sidebar';
import styles from './Layout.module.css';
import Footer from "@/component/footer/Footer";
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
      <div className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
        <Footer isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
  
      </div>
    </div>
  );
};

export default Layout;
