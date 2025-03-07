import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole, UserRole } from "../auth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(getUserRole());

  // 更新 role
  useEffect(() => {
    const checkRole = () => {
      const newRole = getUserRole();
      if (newRole !== role) {
        setRole(newRole); // setRole 只会更新 UserRole 类型
      }
    };

    window.addEventListener("storage", checkRole);
    return () => {
      window.removeEventListener("storage", checkRole);
    };
  }, [role]);

  // 在角色变动时进行跳转
  useEffect(() => {
    if (role === null) {
      navigate("/login");  // 没有角色则跳转到登录页
    } else {
      navigate(`/${role}`);  // 跳转到对应角色的页面
    }
  }, [role, navigate]);

  return <p>跳转中...</p>;
};

export default Dashboard;
