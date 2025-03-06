import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();
  const menuRef = useRef(null);

  // ✅ 默认收起
  const [isCollapsed, setIsCollapsed] = useState(true); 

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside
      ref={menuRef}
      className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out h-screen p-4 bg-gray-900 text-white shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      }`} // 这里直接控制宽度
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo区域 */}
      <div className="flex items-center mb-8">
        <img src={Logo} alt="Logo" className="w-12" />
        {!isCollapsed && (
          <span className="ml-4 text-xl font-bold tracking-wider uppercase text-indigo-400">Zero To One</span>
        )}
      </div>

      {/* 分割线 */}
      <div className="border-t-2 border-gray-700 mb-6"></div>

      {/* 菜单项 */}
      <nav className="flex-1">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center p-3 w-full rounded-md mb-4 hover:bg-indigo-600 hover:scale-105 transition-all duration-200 ease-in-out ${
                location.pathname === path ? "bg-indigo-700" : ""
              }`}
            >
              <span className="text-xl">{icon}</span>
              {!isCollapsed && <span className="ml-4">{label}</span>}
            </button>
          ))}
      </nav>

      {/* 分割线 */}
      <div className="border-t-2 border-gray-700 mt-6"></div>

      {/* 退出按钮 */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="ml-4">退出</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
