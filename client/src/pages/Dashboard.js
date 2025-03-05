import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    const checkRole = () => {
      const newRole = getUserRole();
      if (newRole !== role) {
        setRole(newRole);
      }
    };

    window.addEventListener("storage", checkRole);
    return () => window.removeEventListener("storage", checkRole);
  }, [role]);

  useEffect(() => {
    console.log("当前用户角色:", role); // ✅ 调试
    if (!role) {
      navigate("/login");
      return;
    }

    navigate(`/${role}`);
  }, [role, navigate]);

  return <p>跳转中...</p>;
};

export default Dashboard;
