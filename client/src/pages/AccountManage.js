import React, { useEffect, useState } from "react";
import Register from "./Register"; 
import { getUsers } from "../api/userApi"; // ✅ 直接从 API 文件调用
import "../styles/AccountManage.css";

const AccountManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const role = localStorage.getItem("role"); 

  // ✅ 统一使用 API 文件的 getUsers()
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("获取用户列表失败", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const categorizedUsers = {
    customer: users.filter((user) => user.role === "customer"),
    coach: users.filter((user) => user.role === "coach"),
    admin: users.filter((user) => user.role === "admin"),
    boss: users.filter((user) => user.role === "boss"),
  };

  const displayedUsers = (categorizedUsers[selectedRole] || []).filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    fetchUsers(); // ✅ 关闭时刷新用户列表
  };

  return (
    <div className="account-manage">
      <div className="header">
        <h2 className="title">用户管理</h2>
        <div className={`header-right ${role === "admin" ? "admin-only" : ""}`}>
          <input
            type="text"
            placeholder="搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {role === "boss" && (
            <button className="create-btn" onClick={() => handleOpenModal()}>
              新建
            </button>
          )}
        </div>
      </div>

      <hr />

      {role === "boss" && (
        <div className="role-switch">
          {["customer", "coach", "admin", "boss"].map((category) => (
            <button
              key={category}
              className={`role-btn ${selectedRole === category ? "active" : ""}`}
              onClick={() => setSelectedRole(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="user-list">
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <button
              key={user.id}
              className="user-item"
              onClick={() => handleOpenModal(user)}
            >
              {user.username}
            </button>
          ))
        ) : (
          <p className="empty-message">暂无用户</p>
        )}
      </div>

      {isModalOpen && (
        <Register
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedUser={selectedUser}
          isEditMode={!!selectedUser}
        />
      )}
    </div>
  );
};

export default AccountManage;
