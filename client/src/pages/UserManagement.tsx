import { useState, useEffect } from "react";
import { getAllUsers } from "../api/userApi";
import UserForm from "../form/UserForm";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const roles = ["boss", "admin", "coach", "customer"];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("boss"); // 当前选中的角色

  const fetchUsers = async () => {
    try {
      const data: User[] = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("加载用户失败", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 筛选当前角色的用户
  const filteredUsers = users.filter((user) => user.role === activeRole);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">用户管理</h1>

      {/* 切换角色的 Tabs */}
      <div className="flex mb-4 space-x-2 border-b">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`p-2 ${activeRole === role ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
          >
            {role.toUpperCase()} 用户
          </button>
        ))}
      </div>

      {/* 新建用户按钮 */}
      <button
        onClick={() => {
          setSelectedUser(null);
          setIsModalOpen(true);
        }}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        + 新建
      </button>

      {/* 当前角色的用户列表 */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">用户名</th>
            <th className="p-2">邮箱</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td
                  className="p-2 text-blue-500 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  {user.username}
                </td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-2 text-center text-gray-500">
                没有用户
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 用户表单弹窗 */}
      <UserForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        refreshList={fetchUsers}
      />
    </div>
  );
};

export default UserManagement;
