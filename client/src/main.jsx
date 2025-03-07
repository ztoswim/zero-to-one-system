import React from 'react';
import ReactDOM from 'react-dom/client';  // 使用 ReactDOM.createRoot
import './index.css';  // 引入全局样式
import App from './App';  // 引入根组件

// 使用 ReactDOM.createRoot 来挂载 React 应用
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
