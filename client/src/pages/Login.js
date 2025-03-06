import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/Logo.png";

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await login(username, password);

      setUserRole(role);
      navigate(`/${role}`);
    } catch (err) {
      setError(err.message || "登录失败");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <img src={logo} alt="Logo" className="w-3/4 max-w-xs mx-auto mb-4 transform transition-transform duration-300 hover:scale-110" />
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none text-base"
            />
          </div>

          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
