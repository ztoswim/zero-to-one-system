import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi";
import { getUserRole } from "../auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);

        // 根据角色跳转到对应 Dashboard
        switch (userData.role) {
          case "boss":
            navigate("/boss");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "coach":
            navigate("/coach");
            break;
          case "customer":
            navigate("/customer");
            break;
          default:
            navigate("/login");
        }
      } catch (err) {
        console.error("获取用户信息失败:", err);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) {
    return <p>加载中...</p>;
  }

  return <h1>欢迎, {user.username}！</h1>;
};

export default Dashboard;
