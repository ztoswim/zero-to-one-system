import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole();
    if (role === "boss") navigate("/dashboard/boss");
    else if (role === "admin") navigate("/dashboard/admin");
    else if (role === "coach") navigate("/dashboard/coach");
    else navigate("/dashboard/customer");
  }, [navigate]);

  return <p>跳转中...</p>;
};

export default Dashboard;
