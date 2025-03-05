import { useNavigate } from "react-router-dom";
import { LogOut, Home, Users, Settings, Briefcase } from "lucide-react";
import API_BASE_URL from "../api/apiConfig"; // 统一 API 地址
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 获取用户角色

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

  // 定义不同角色的菜单项
  const menuItems = [
    { role: ["boss", "admin", "coach", "customer"], label: "首页", path: `/${role}-dashboard`, icon: <Home size={20} /> },
    { role: ["boss", "admin"], label: "用户管理", path: "/users", icon: <Users size={20} /> },
    { role: ["boss"], label: "员工管理", path: "/staff", icon: <Briefcase size={20} /> },
    { role: ["boss", "admin", "coach"], label: "设置", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <ul>
          {menuItems
            .filter(item => item.role.includes(role))
            .map((item, index) => (
              <li key={index}>
                <button className="sidebar-button" onClick={() => navigate(item.path)}>
                  {item.icon} {item.label}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={20} /> 退出登录
      </button>
    </aside>
  );
};

export default Sidebar;
