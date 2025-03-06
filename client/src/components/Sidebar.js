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

  const [isCollapsed, setIsCollapsed] = useState(true);  // 默认收起

  const handleMouseEnter = () => setIsCollapsed(false);
  const handleMouseLeave = () => setIsCollapsed(true);

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
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo区域 */}
      <div className="flex items-center justify-center mb-8">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        {!isCollapsed && (
          <span className="ml-3 text-xl font-bold tracking-wider uppercase text-indigo-400">
            Zero To One
          </span>
        )}
      </div>

      <div className="border-t-2 border-gray-700 mb-6"></div>

      {/* 菜单 */}
      <nav className="flex-1 space-y-2">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center w-full rounded-md py-3 transition-all duration-200 ease-in-out ${
                location.pathname === path ? "bg-indigo-700" : "hover:bg-indigo-600"
              }`}
            >
              {/* 图标容器：固定宽高，始终居中 */}
              <div className="flex items-center justify-center w-12 h-12 text-xl">
                {icon}
              </div>

              {/* 文字：展开时显示 */}
              {!isCollapsed && (
                <span className="text-base whitespace-nowrap">{label}</span>
              )}
            </button>
          ))}
      </nav>

      <div className="border-t-2 border-gray-700 mt-6"></div>

      {/* 退出按钮 */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full rounded-md py-3 transition-all duration-200 ease-in-out hover:bg-red-600"
        >
          {/* 图标容器：固定宽高，始终居中 */}
          <div className="flex items-center justify-center w-12 h-12 text-xl">
            <FaSignOutAlt />
          </div>

          {/* 文字：展开时显示 */}
          {!isCollapsed && <span className="text-base">退出</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
