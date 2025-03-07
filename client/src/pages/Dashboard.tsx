import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole, UserRole } from "../auth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(getUserRole());

  useEffect(() => {
    const checkRole = () => {
      const newRole = getUserRole();
      if (newRole !== role) {
        setRole(newRole);
      }
    };

    window.addEventListener("storage", checkRole);
    return () => {
      window.removeEventListener("storage", checkRole);
    };
  }, [role]);

  useEffect(() => {
    console.log("当前用户角色:", role);
    if (!role) {
      navigate("/login");
    } else {
      navigate(`/${role}`);
    }
  }, [role, navigate]);

  return <p>跳转中...</p>;
};

export default Dashboard;
