import { useState } from "react";
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

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
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
