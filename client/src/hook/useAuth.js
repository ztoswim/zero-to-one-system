import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/userApi"; // 导入验证 token 的 API

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // 保存角色信息
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { isValid, decoded } = await verifyToken(); // 调用验证 token 的 API
        if (isValid) {
          setIsAuthenticated(true);
          setRole(decoded.role);  // 获取角色并保存
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  return { isAuthenticated, loading, role };
};

export default useAuth;
