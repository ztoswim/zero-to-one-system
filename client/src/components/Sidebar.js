import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();

  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebarCollapsed", !isCollapsed);
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside className={`hidden lg:flex flex-col w-${isCollapsed ? "16" : "64"} bg-gray-900 text-white h-screen p-4`}>
      <div className="flex items-center justify-between">
        <img src={Logo} alt="Logo" className="w-10" />
        {!isCollapsed && <span className="text-lg">Zero To One</span>}
        <button onClick={toggleSidebar}><FaBars /></button>
      </div>

      <nav className="mt-6 flex-1">
        {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
          <button key={path} onClick={() => navigate(path)}
            className={`flex items-center p-3 rounded hover:bg-gray-700 ${location.pathname === path ? "bg-gray-700" : ""}`}>
            <span className="text-xl">{icon}</span>
            {!isCollapsed && <span className="ml-3">{label}</span>}
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} className="flex items-center p-3 rounded hover:bg-red-600">
        <FaSignOutAlt className="text-xl" />
        {!isCollapsed && <span className="ml-3">退出</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
