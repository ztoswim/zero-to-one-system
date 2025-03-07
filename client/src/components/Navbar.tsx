import { useState, useEffect, useRef } from "react";
import { Menu, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useAuth } from "../auth";
import menuConfig from "./menuConfig";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useAuth(); // 使用正确的解构方式
  const role = userRole || ""; // 确保 role 始终是字符串
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex lg:hidden items-center justify-between bg-gray-900 text-white p-4 shadow-lg relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 transition-all duration-300" />
        <span className="ml-4 text-xl font-semibold tracking-wide uppercase transition-all duration-300">
          Zero To One
        </span>
      </div>

      {/* 菜单按钮（展开后隐藏） */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 transition-all duration-300 transform hover:scale-110 hover:bg-gray-800 rounded-md"
        >
          <Menu className="text-white" size={28} />
        </button>
      )}

      {/* 下拉菜单 */}
      <div
        ref={menuRef}
        className={`absolute top-14 right-4 bg-gray-900 text-white shadow-lg rounded-lg w-48 p-2 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* 菜单项 */}
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => {
            const resolvedPath = typeof path === "function" ? path(role) : path;
            return (
              <button
                key={resolvedPath}
                onClick={() => {
                  navigate(resolvedPath);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center p-3 w-full text-left rounded-md transition-all duration-200 ease-in-out ${
                  location.pathname === resolvedPath ? "bg-indigo-700" : "hover:bg-indigo-600"
                }`}
              >
                <div className="text-xl">{icon}</div>
                <span className="ml-3 transition-opacity duration-300">{label}</span>
              </button>
            );
          })}

        {/* 退出按钮 */}
        <div className="w-full border-t border-gray-700 my-2"></div>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full text-left rounded-md transition-all duration-200 ease-in-out hover:bg-red-600"
        >
          <LogOut size={24} />
          <span className="ml-3 transition-opacity duration-300">退出</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
