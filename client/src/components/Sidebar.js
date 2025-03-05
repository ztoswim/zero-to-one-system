import React from "react";
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/authUtils";

const Sidebar = () => {
  const role = getUserRole(); // 直接解析 Token 获取角色

  const menuItems = {
    boss: [
      { name: "账户管理", path: "/account" },
      { name: "学生管理", path: "/students" },
      { name: "员工管理", path: "/employees" },
    ],
    admin: [
      { name: "账户管理", path: "/account" },
      { name: "学生管理", path: "/students" },
    ],
    coach: [{ name: "学生管理", path: "/students" }],
    customer: [{ name: "账户管理", path: "/account" }],
  };

  return (
    <div style={styles.sidebar}>
      <h2>控制面板</h2>
      <ul>
        {menuItems[role]?.map((item, index) => (
          <li key={index}>
            <Link to={item.path} style={styles.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <button style={styles.logout} onClick={() => logout()}>登出</button>
    </div>
  );
};

const logout = () => {
  localStorage.removeItem("token"); // 清除 Token
  window.location.href = "/login"; // 跳转到登录页面
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    padding: "10px 0",
  },
  logout: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Sidebar;
