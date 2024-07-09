import React, { useState, ReactNode } from "react";
import Sidebar from "@/component/sidebar/Sidebar";
import styles from "./Layout.module.css";
import Footer from "../footer/Footer";

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
      <div
        className={`${
          isSidebarExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed
        } bg-gray-900`}
      >
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={
          isSidebarExpanded ? styles.mainExpanded : styles.mainCollapsed
        }
      >
        <main className="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
