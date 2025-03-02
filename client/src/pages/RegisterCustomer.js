import React, { useState, useEffect } from "react";

const ManageCustomers = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // 获取所有 Customer 用户
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/users?requesterRole=admin");
      const data = await response.json();
      const filtered = data.filter((user) => user.role === "customer");
      setUsers(filtered || []);
    } catch (err) {
      console.error("❌ 获取用户失败:", err);
      setUsers([]);
    }
  };

  // 处理用户编辑（仅修改用户名）
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editUserId) return;

    setMessage("");
  
    try {
      const response = await fetch(`http://localhost:3001/api/users/edit-user/${editUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, editorRole: "admin" }), // 仅允许修改用户名
      });

      const data = await response.json();
      if (response.ok) {
        fetchUsers(); // 刷新用户列表
        setUsername("");
        setEditUserId(null);
        setMessage("用户信息已更新！");
      } else {
        setMessage(data.message || "更新失败");
      }
    } catch (err) {
      console.error("❌ 更新失败:", err);
      setMessage("服务器错误，请稍后再试！");
    }
  };

  // 选中用户进行编辑
  const handleEdit = (user) => {
    setUsername(user.username);
    setEditUserId(user.id);
  };

  return (
    <div>
      <h2>客户管理 (Admin)</h2>
      {message && <p>{message}</p>}

      {/* 编辑客户表单 */}
      {editUserId && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            placeholder="修改用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">保存修改</button>
          <button onClick={() => setEditUserId(null)}>取消</button>
        </form>
      )}

      <h3>客户列表</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role}
              <button onClick={() => handleEdit(user)}>编辑</button>
            </li>
          ))
        ) : (
          <p>暂无客户</p>
        )}
      </ul>
    </div>
  );
};

export default ManageCustomers;
