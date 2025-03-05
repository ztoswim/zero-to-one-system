import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole();
    console.log("当前用户角色:", role); // ✅ 调试
    if (!role) return navigate("/login"); // 防止未登录用户访问 Dashboard

    switch (role) {
      case "boss":
        navigate("/dashboard/boss");
        break;
      case "admin":
        navigate("/dashboard/admin");
        break;
      case "coach":
        navigate("/dashboard/coach");
        break;
      default:
        navigate("/dashboard/customer");
    }
  }, [navigate, getUserRole]); // ✅ 确保 useEffect 监听 role 变化

  return <p>跳转中...</p>;
};

export default Dashboard;
