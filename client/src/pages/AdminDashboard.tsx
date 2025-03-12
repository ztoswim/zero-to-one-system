import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getUserRole } from "../auth";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole();
    if (role !== "admin") {
      navigate("/login"); // 如果不是 admin，重定向到登录页面
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>欢迎来到 Admin 管理后台</p>

      {/* 你可以添加更多内容 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">统计 1</h2>
          <p>一些统计信息内容...</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">统计 2</h2>
          <p>一些统计信息内容...</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">统计 3</h2>
          <p>一些统计信息内容...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
