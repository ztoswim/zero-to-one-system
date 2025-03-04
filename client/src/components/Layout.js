import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "20px",
  },
};

export default Layout;
