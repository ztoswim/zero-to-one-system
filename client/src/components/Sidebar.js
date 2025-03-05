import { useNavigate } from "react-router-dom";
import { LogOut, Home, Users, Settings } from "lucide-react";
import API_BASE_URL from "../api/apiConfig"; // 统一 API 地址
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

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

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <button className="sidebar-button" onClick={() => navigate("/")}>
              <Home size={20} /> 首页
            </button>
          </li>
          <li>
            <button className="sidebar-button" onClick={() => navigate("/users")}>
              <Users size={20} /> 用户管理
            </button>
          </li>
          <li>
            <button className="sidebar-button" onClick={() => navigate("/settings")}>
              <Settings size={20} /> 设置
            </button>
          </li>
        </ul>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={20} /> 退出登录
      </button>
    </aside>
  );
};

export default Sidebar;
