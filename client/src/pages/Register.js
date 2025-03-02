import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Register.css";  

const Register = ({ isOpen, onClose, isLoginRegister, selectedUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");  
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setEmail(selectedUser.email || "");
      setUsername(selectedUser.username || "");
      setRole(selectedUser.role || "customer");
    } else {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("customer");
    }
  }, [isOpen, selectedUser]);

  if (!isOpen) return null; 

  const handleRegister = async () => {
    setMessage(""); 
    
    try {
      const payload = isLoginRegister
        ? { email, username, password, confirmPassword }
        : { email, username, password, role, creatorRole: localStorage.getItem("role") };
    
      const url = isLoginRegister
        ? "http://localhost:3001/api/users/register"
        : "http://localhost:3001/api/users/create-user";
    
      const { data } = await axios.post(url, payload);
    
      setMessage(data.message);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "操作失败");
    }
  };

  const handleSave = async () => {
    if (!selectedUser?.id) return; 

    try {
      const payload = {
        username,
        email,
        password,
        role,
        editorRole: localStorage.getItem("role"),
      };

      await axios.put(`http://localhost:3001/api/users/update/${selectedUser.id}`, payload);
      setMessage("用户信息已更新");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "更新失败");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser?.id) return;

    try {
      await axios.delete(`http://localhost:3001/api/users/delete/${selectedUser.id}`);
      setMessage("用户已删除");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "删除失败");
    }
  };

  return (
    <div className="register-modal">
      <div className="register-box">
        {/* 右上角 X 关闭按钮 */}
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{selectedUser ? "编辑用户" : isLoginRegister ? "注册新账号" : "创建新用户"}</h2>

        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!selectedUser}
        />

        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLoginRegister && (
          <input
            type="password"
            placeholder="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {!isLoginRegister && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">CUSTOMER</option>
            <option value="admin">ADMIN</option>
            <option value="coach">COACH</option>
            <option value="boss">BOSS</option>
          </select>
        )}

        {message && <p className="error-message">{message}</p>}

        {/* **按钮布局：左侧 保存，右侧 删除** */}
        <div className="button-group">
          {selectedUser ? (
            <>
              <button className="save-btn" onClick={handleSave}>保存</button>
              <button className="delete-btn" onClick={handleDelete}>删除</button>
            </>
          ) : (
            <button className="register-btn" onClick={handleRegister}>
              {isLoginRegister ? "注册" : "创建用户"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
