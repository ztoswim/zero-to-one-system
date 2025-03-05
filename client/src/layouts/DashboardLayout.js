import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, role }) => {
  return (
    <div style={styles.container}>
      <Sidebar role={role} />
      <div style={styles.content}>{children}</div>
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
  },
};

export default DashboardLayout;
