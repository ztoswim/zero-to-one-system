import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import API_BASE_URL from "../api/apiConfig";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth <= 768 // 小屏幕默认折叠
  );

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev); // 切换侧边栏折叠状态
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true); // 小屏幕自动折叠
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.error("退出登录失败", error);
    }
  };

  const menuItems = [
    { role: ["boss", "admin", "coach", "customer"], label: "首页", icon: <FaHome />, path: `/${role}` },
    { role: ["boss", "admin"], label: "用户管理", icon: <FaUsers />, path: "/users" },
    { role: ["boss", "admin", "coach"], label: "课程管理", icon: <FaChalkboardTeacher />, path: "/courses" },
    { role: ["boss"], label: "员工管理", icon: <FaUserTie />, path: "/staff" },
    { role: ["boss", "admin", "coach", "customer"], label: "设置", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <>
      {/* 小屏幕时的菜单按钮 */}
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map(({ role: allowedRoles, label, icon, path }) =>
              allowedRoles.includes(role) ? (
                <li key={path}>
                  <button
                    className={`sidebar-button ${location.pathname === path ? "active" : ""}`}
                    onClick={() => {
                      navigate(path);
                      if (window.innerWidth <= 768) setIsCollapsed(true); // 点击后自动收起侧边栏
                    }}
                  >
                    <span className="sidebar-icon">{icon}</span>
                    {!isCollapsed && <span className="sidebar-label">{label}</span>}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          {!isCollapsed && <span className="sidebar-label">退出</span>}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
