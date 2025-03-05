import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* 右侧内容区 */}
      <div style={{ ...styles.content, marginLeft: isCollapsed ? "80px" : "250px" }}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    transition: "margin-left 0.3s ease",
  },
};

export default DashboardLayout;
