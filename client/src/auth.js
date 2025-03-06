import { jwtDecode } from "jwt-decode";

// 获取 Token & 角色
export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role") || null;

// 存储 Token & 角色
export const saveUserAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// 检查 Token 是否有效
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    return jwtDecode(token).exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// 退出登录
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// 自定义 Hook：管理用户角色
export const useAuth = () => {
  const [userRole, setUserRole] = useState(getUserRole());

  useEffect(() => {
    setUserRole(getUserRole()); // 确保 useState 更新
  }, []);

  return userRole;
};
