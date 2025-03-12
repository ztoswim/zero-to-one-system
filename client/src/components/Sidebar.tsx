import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { logoutUser } from "../auth";
import { menuConfig } from "./menuConfig";  // 引入菜单配置
import { FaTachometerAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa"; // 引入图标

const Sidebar = ({ role }: { role: string }) => {
  const navigate = useNavigate();

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
    <div className="h-full bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-4">Zero To One</h1>
      <ul className="flex-1">
        {menuConfig[role]?.map((item) => (
          <li key={item.path} className="mb-2">
            <button
              onClick={() => navigate(item.path)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 flex items-center"
            >
              <span className="mr-3">{iconMap[item.path]}</span> {/* 渲染对应的图标 */}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded text-white w-full">
        退出登录
      </button>
    </div>
  );
};

export default Sidebar;
