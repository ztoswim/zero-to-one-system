import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaThumbtack, FaChevronLeft } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ user, isPinned, setIsPinned, isSidebarOpen, setIsSidebarOpen }) => {
  useEffect(() => {
    if (!isPinned) {
      setIsSidebarOpen(false); // 如果未固定，确保 Sidebar 关闭
    }
  }, [isPinned]);

  if (!user) return null;

  const dashboards = {
    boss: "/boss-dashboard",
    admin: "/admin-dashboard",
    coach: "/coach-dashboard",
    customer: "/customer-dashboard",
  };

  const menuItems = [
    { name: "Dashboard", path: dashboards[user.role] || "/", roles: ["boss", "admin", "coach", "customer"] },
    { name: "Students List", path: "/studentlist", roles: ["boss", "admin", "coach"] },
    { name: "Account Manage", path: "/accountmanage", roles: ["boss", "admin"] },
  ];

  return (
    <>
      {/* 左侧触发区域（鼠标悬停展开 Sidebar） */}
      {!isPinned && (
        <div className="sidebar-hover-area" onMouseEnter={() => setIsSidebarOpen(true)}></div>
      )}

      {/* 遮罩层，点击时关闭 Sidebar */}
      {isSidebarOpen && !isPinned && (
        <div className="sidebar-overlay active" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar 组件 */}
      <div
        className={`sidebar ${isSidebarOpen || isPinned ? "open" : "closed"} ${isPinned ? "pinned" : ""}`}
        onMouseLeave={() => !isPinned && setIsSidebarOpen(false)} // 鼠标离开时关闭 Sidebar
      >
        {/* 固定按钮（点击后固定或收回 Sidebar） */}
        <button
          onClick={() => {
            if (isPinned) {
              setIsPinned(false); // 如果已经固定，则取消固定并收回
              setIsSidebarOpen(false);
            } else {
              setIsPinned(true); // 否则，固定 Sidebar（保持展开）
              setIsSidebarOpen(true);
            }
          }}
          className="pin-btn"
        >
          {isPinned ? <FaChevronLeft /> : <FaThumbtack />}
        </button>

        {/* 菜单导航 */}
        <nav className="sidebar-menu">
          {menuItems.filter(item => item.roles.includes(user.role)).map(item => (
            <Link key={item.path} to={item.path} className="menu-item">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
