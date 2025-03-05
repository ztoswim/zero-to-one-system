import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import API_BASE_URL from "../api/apiConfig"; // 统一 API 地址
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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
      console.error("Logout failed", error);
    }
  };

  // 根据用户角色定义不同的菜单项
  const menuItems = [
    { role: ["boss", "admin", "coach", "customer"], label: "首页", icon: <FaHome className="sidebar-icon" />, path: `/${role}-dashboard` },
    { role: ["boss", "admin"], label: "用户管理", icon: <FaUsers className="sidebar-icon" />, path: "/users" },
    { role: ["boss", "admin", "coach"], label: "课程管理", icon: <FaChalkboardTeacher className="sidebar-icon" />, path: "/courses" },
    { role: ["boss"], label: "员工管理", icon: <FaUserTie className="sidebar-icon" />, path: "/staff" },
    { role: ["boss", "admin", "coach", "customer"], label: "设置", icon: <FaCog className="sidebar-icon" />, path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(({ role, label, icon, path }) =>
            role.includes(role) ? (
              <li key={path}>
                <button className="sidebar-button" onClick={() => navigate(path)}>
                  {icon} {label}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        退出登录
      </button>
    </aside>
  );
};

export default Sidebar;
