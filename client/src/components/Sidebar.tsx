import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth";

const menuConfig: Record<string, { label: string; path: string }[]> = {
  boss: [
    { label: "仪表盘", path: "/boss-dashboard" },
    { label: "用户管理", path: "/users" },
    { label: "学生管理", path: "/students" },
  ],
  admin: [
    { label: "仪表盘", path: "/admin-dashboard" },
    { label: "用户管理", path: "/users" },
  ],
  coach: [
    { label: "仪表盘", path: "/coach-dashboard" },
    { label: "学生管理", path: "/students" },
  ],
  customer: [
    { label: "仪表盘", path: "/customer-dashboard" },
  ],
};

const Sidebar = ({ role }: { role: string }) => {
  const navigate = useNavigate();

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
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700"
            >
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
