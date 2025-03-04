import React from "react";
import { logout } from "../auth";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1>管理系统</h1>
      <button onClick={logout} style={styles.logoutButton}>退出</button>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;
