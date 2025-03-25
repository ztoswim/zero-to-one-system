import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, JSX } from "react";
import { ToastContainer, toast } from "react-toastify"; // 引入 ToastContainer 和 toast
import "react-toastify/dist/ReactToastify.css"; // 引入样式

// 引入布局和页面组件
import DashboardLayout from "./components/DashboardLayout";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Login from "./pages/Login";
import BankList from "./pages/BankList"; // 引入银行列表页面
import SaleInvoices from "./pages/SaleInvoices"; // 引入销售发票页面
import UserManagement from "./pages/UserManagement"; // ✅ 添加用户管理页面
import StudentPage from "./pages/StudentPage"; // ✅ 引入学生页面

const App = () => {
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  // 角色与权限的配置
  const rolePermissions: Record<string, string[]> = {
    boss: ["/boss-dashboard", "/bank-list", "/sale-invoices", "/user-management", "/student-management"],
    admin: ["/admin-dashboard"],
    coach: ["/coach-dashboard"],
    customer: ["/customer-dashboard"]
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    
    // 如果没有 token，跳转到登录页面
    if (!localStorage.getItem("token")) {
      window.location.href = '/login';
    }

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 角色验证组件
  const ProtectedRoute = ({ children, roleRequired }: { children: JSX.Element, roleRequired: string }) => {
    if (role !== roleRequired) {
      toast.error("您没有权限访问此页面，请先登录！");
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* 登录页面 */}
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* 根路径跳转 */}
        <Route path="/" element={<Navigate to={role ? `/${role}-dashboard` : "/login"} />} />

        {/* Dashboard 页面，角色验证 */}
        {role ? (
          <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
            {/* 根据配置来定义哪些角色访问哪些页面 */}
            {rolePermissions[role]?.map((path) => {
              switch (path) {
                case "/boss-dashboard":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="boss"><BossDashboard /></ProtectedRoute>}
                    />
                  );
                case "/admin-dashboard":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>}
                    />
                  );
                case "/coach-dashboard":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="coach"><CoachDashboard /></ProtectedRoute>}
                    />
                  );
                case "/customer-dashboard":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="customer"><CustomerDashboard /></ProtectedRoute>}
                    />
                  );
                case "/bank-list":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="boss"><BankList /></ProtectedRoute>}
                    />
                  );
                case "/sale-invoices":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="boss"><SaleInvoices /></ProtectedRoute>}
                    />
                  );
                case "/user-management":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="boss"><UserManagement /></ProtectedRoute>}
                    />
                  );
                case "/student-management":
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={<ProtectedRoute roleRequired="boss"><StudentPage /></ProtectedRoute>}
                    />
                  );
                default:
                  return null;
              }
            })}
          </Route>
        ) : null}

        {/* 404 页面，默认回到登录 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* ToastContainer 用于显示 toast 消息 */}
      <ToastContainer />
    </Router>
  );
};

export default App;
