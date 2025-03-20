import { useState, useEffect } from "react";
import { getAllUsers } from "../api/userApi";
import UserForm from "../form/UserForm";

// 定义用户数据的类型
interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]); // 明确 users 是 User 类型的数组
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const data: User[] = await getAllUsers(); // 明确返回的是 User 类型数组
      setUsers(data);
    } catch (error) {
      console.error("加载用户失败", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">用户管理</h1>

      <button
        onClick={() => {
          setSelectedUser(null);
          setIsModalOpen(true);
        }}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        + 新建
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">用户名</th>
            <th className="p-2">邮箱</th>
            <th className="p-2">角色</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
