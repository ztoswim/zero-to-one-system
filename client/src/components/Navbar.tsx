import { useState, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth";
import { menuConfig } from "./menuConfig"; // 引入共享菜单配置
import { FaTachometerAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa"; // 引入图标

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 手动映射路径到图标
  const iconMap: { [key: string]: JSX.Element } = {
    "/boss-dashboard": <FaTachometerAlt />,
    "/users": <FaUsers />,
    "/students": <FaChalkboardTeacher />,
    "/admin-dashboard": <FaTachometerAlt />,
    "/coach-dashboard": <FaTachometerAlt />,
    "/customer-dashboard": <FaTachometerAlt />,
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Zero To One</h1>
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
        ☰
      </button>
      {menuOpen && (
        <div className="absolute top-12 right-4 bg-gray-700 rounded shadow-lg w-48">
          <ul>
            {menuConfig[role]?.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center"
                >
                  <span className="mr-3">{iconMap[item.path as keyof typeof iconMap]}</span> {/* 渲染对应的图标 */}
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
              >
                退出登录
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
