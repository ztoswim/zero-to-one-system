import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  console.log("🔹 Navbar 接收到的 user:", user);

  // 监听点击事件，点击 Navbar 以外的区域自动关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isSidebarOpen ? "shift-right" : ""}`}>
      {/* 左侧：菜单按钮 + LOGO + 标题 */}
      <div className="navbar-left">
      <button className={`menu-button ${isSidebarOpen ? "hidden" : ""}`} onClick={() => setIsSidebarOpen(true)}
>       <FaBars />
      </button>
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Logo" className="logo-img" />
          <span className="navbar-title">ZERO TO ONE ACADEMY</span>
        </div>
      </div>

      {/* 右侧：用户名 + 下拉菜单 */}
      <div className="navbar-user">
        <button onClick={() => setIsMenuOpen((prev) => !prev)}>
          {user?.username || "未登录"}
        </button>
        {isMenuOpen && (
          <div className="user-menu" ref={menuRef}>
            <button onClick={onLogout} className="logout">登出</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
