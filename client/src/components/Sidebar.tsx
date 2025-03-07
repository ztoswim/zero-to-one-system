import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../auth";  // 这里修正
import menuConfig from "./menuConfig";
import Logo from "../assets/Logo.png";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useAuth();  // 修正：正确解构 useAuth
  const role = userRole || ""; // 确保 role 是字符串
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleCollapse = (collapse: boolean) => setIsCollapsed(collapse);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      ref={menuRef}
      className={`hidden lg:flex flex-col h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={() => toggleCollapse(false)}
      onMouseLeave={() => toggleCollapse(true)}
    >
      {/* Logo */}
      <div className={`flex items-center justify-center transition-all ${isCollapsed ? "h-16" : "h-36"}`}>
        <img
          src={Logo}
          alt="Logo"
          className={`object-contain transition-all ${isCollapsed ? "w-12 h-12" : "w-40 h-40"}`}
        />
      </div>

      {/* 分割线 */}
      <div className="w-full border-t border-gray-700 my-2"></div>

      {/* 导航菜单 */}
      <nav className="flex-1 space-y-1 px-2">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => {
            const resolvedPath = typeof path === "function" ? path(role) : path;
            return (
              <button
                key={resolvedPath}
                onClick={() => navigate(resolvedPath)}
                className={`flex items-center w-full rounded-md py-2 px-4 transition-all ${
                  location.pathname === resolvedPath ? "bg-indigo-700" : "hover:bg-indigo-600"
                }`}
              >
                <div className={`flex items-center justify-center ${isCollapsed ? "w-16" : "w-14 -ml-4"} h-10 text-xl`}>
                  {icon}
                </div>
                <span
                  className={`text-base whitespace-nowrap transition-opacity duration-300 ${
                    isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
                  } -ml-1`}
                >
                  {label}
                </span>
              </button>
            );
          })}
      </nav>

      {/* 底部退出按钮 */}
      <div className="mt-auto px-2">
        <div className="w-full border-t border-gray-700 my-2"></div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full rounded-md py-2 px-4 transition-all hover:bg-red-600"
        >
          <div className={`flex items-center justify-center ${isCollapsed ? "w-16" : "w-14 -ml-4"} h-10 text-xl`}>
            <LogOut size={20} />
          </div>
          <span
            className={`text-base transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
            } -ml-1`}
          >
            退出
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
