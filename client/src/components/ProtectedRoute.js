import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />; // 未登录，跳转到登录页
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />; // 没权限，跳转首页

  return children;
};

export default ProtectedRoute;
