import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    switch (role) {
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
  }, [navigate]);

  return null;
};

export default Dashboard;
