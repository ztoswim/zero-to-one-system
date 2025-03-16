import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';  // 引入登出图标
import { menuConfig } from './menuConfig';
import { logoutUser } from '../auth';  // 引入 logoutUser 函数

const Sidebar = ({ role }: { role: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 调用 logoutUser 函数来清除 token 和 role
    logoutUser();
    // 跳转到登录页面
    navigate('/login');
  };

  return (
    <div className="h-full bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-4">Zero To One</h1>
      <ul>
        {menuConfig[role]?.map((item) => (
          <li key={item.path} className="mb-2">
            <button
              onClick={() => navigate(item.path)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 flex items-center"
            >
              <span className="mr-3">
                {item.path === "/users" ? <FaUsers /> : <FaTachometerAlt />}
              </span>
              {item.label}
            </button>
          </li>
        ))}
        {/* 添加登出按钮 */}
        <li className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 flex items-center"
          >
            <FaSignOutAlt className="mr-3" />
            登出
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
