import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false); // 侧边栏展开/折叠状态
  const role = getUserRole();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsCollapsed(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* 移动端菜单按钮 */}
      {isMobile && (
        <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* 侧边栏 */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobile && isOpen ? "active" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button className="sidebar-button" onClick={() => navigate("/home")}>
                <span className="sidebar-icon">🏠</span>
                {!isCollapsed && <span className="sidebar-label">首页</span>}
              </button>
            </li>
          </ul>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          {!isCollapsed && <span className="sidebar-label">退出</span>}
        </button>
      </aside>

      {/* 遮罩层 */}
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
