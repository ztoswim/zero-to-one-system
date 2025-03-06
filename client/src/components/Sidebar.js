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

  const [isCollapsed, setIsCollapsed] = useState(true);

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
      {/* Logo区 */}
      <div className="flex items-center mb-8">
        <img src={Logo} alt="Logo" className="w-12" />
        <span
          className={`ml-4 text-xl font-bold tracking-wider uppercase text-indigo-400 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 translate-x-[-10px]" : "opacity-100 translate-x-0"
          }`}
        >
          Zero To One
        </span>
      </div>

      <div className="border-t-2 border-gray-700 mb-6"></div>

      {/* 菜单项 */}
      <nav className="flex-1 space-y-2">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex items-center w-full rounded-md py-3 px-2 hover:bg-indigo-600 transition-all duration-200 ease-in-out ${
                location.pathname === path ? "bg-indigo-700" : ""
              }`}
            >
              {/* 图标容器 */}
              <div
                className={`flex items-center justify-center min-w-[40px] h-10 text-xl ${
                  isCollapsed ? "mx-auto" : "mr-3"
                }`}
              >
                {icon}
              </div>

              {/* 文字容器 */}
              <span
                className={`text-base whitespace-nowrap transition-all duration-300 ${
                  isCollapsed ? "opacity-0 translate-x-[-10px]" : "opacity-100 translate-x-0"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
      </nav>

      <div className="border-t-2 border-gray-700 mt-6"></div>

      {/* 退出按钮 */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="relative flex items-center w-full rounded-md py-3 px-2 hover:bg-red-600 transition-all duration-200 ease-in-out"
        >
          {/* 图标容器 */}
          <div
            className={`flex items-center justify-center min-w-[40px] h-10 text-xl ${
              isCollapsed ? "mx-auto" : "mr-3"
            }`}
          >
            <FaSignOutAlt />
          </div>

          {/* 文字容器 */}
          <span
            className={`text-base whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "opacity-0 translate-x-[-10px]" : "opacity-100 translate-x-0"
            }`}
          >
            退出
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
