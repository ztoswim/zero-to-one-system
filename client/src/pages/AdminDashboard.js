import React from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
  },
};

export default AdminDashboard;
