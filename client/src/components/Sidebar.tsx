import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { menuConfig } from './menuConfig';

const Sidebar = ({ role }: { role: string }) => {
  const navigate = useNavigate();

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
      </ul>
    </div>
  );
};

export default Sidebar;
