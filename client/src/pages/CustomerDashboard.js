import React from "react";
import Sidebar from "../components/Sidebar";

const CustomerDashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Customer Dashboard</h1>
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

export default CustomerDashboard;
