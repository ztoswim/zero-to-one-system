import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/apiConfig"; // 统一 API 地址

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. 调用后端 Logout API
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // 2. 清除本地存储 Token
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 3. 跳转到登录页
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside>
      {/* 其他 Sidebar 菜单 */}
      <button onClick={handleLogout}>登出</button>
    </aside>
  );
};

export default Sidebar;
