zero-to-one-ststem/
├── 📂 client/         # 前端代码 (React)
│   ├── 📂 src/
│   │   ├── 📂 api/                 # API 请求封装
│   │   │   ├── apiConfig.js          
│   │   │   ├── authApi.js          # 登录/注册 API
│   │   │   ├── userApi.js          # 用户管理 API
│   │   │   ├── studentApi.js       # 学生管理 API
│   │   ├── 📂 assets/               
│   │   │   ├── Logo.png      
│   │   ├── 📂 components/          # 复用组件
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── menuConfig.js
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   ├── 📂 pages/               # 页面组件
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BossDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CoachDashboard.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   ├── auth.js             # 处理 token & 角色
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   ├── package.json
│   ├── .gitignore
│
├── 📂 server/         # 后端代码 (Node.js + Express + MongoDB)
│   ├── 📂 config/
│   │   ├── db.js                   # MongoDB 连接
│   ├── 📂 controllers/             # 业务逻辑
│   │   ├── authController.js      
│   │   ├── userController.js       # 用户管理
│   │   ├── studentController.js    # 学生管理
│   ├── 📂 middleware/              # 中间件
│   │   ├── authMiddleware.js       # 认证 & 授权
│   ├── 📂 models/                  # Mongoose 数据模型
│   │   ├── User.js
│   │   ├── Student.js
│   ├── 📂 routes/                  # 路由
│   │   ├── authRoutes.js           # 认证 (登录、注册、登出)
│   │   ├── userRoutes.js           # 用户管理
│   │   ├── studentRoutes.js        # 学生管理
│   ├── server.js                   # 入口文件
│   ├── package.json
│   ├── .env
│   ├── .gitignore

🟢 1️⃣ 登录 & 认证
涉及文件

前端：

auth.js（管理 Token & 角色）
authApi.js（API 请求）
Login.js（登录页面）
Dashboard.js（角色跳转）
App.js（全局路由）
后端：

authController.js（登录/注册逻辑）
authRoutes.js（认证路由）
authMiddleware.js（JWT 验证）
🟠 2️⃣ 用户管理
涉及文件

前端：

userApi.js（API 请求）
BossDashboard.js（Boss 管理界面）
AdminDashboard.js（Admin 界面）
后端：

userController.js（用户管理逻辑）
userRoutes.js（用户管理 API）
🔵 3️⃣ 学生管理
涉及文件

前端：

studentApi.js（API 请求）
AdminDashboard.js（管理学生）
CoachDashboard.js（查看学生）
后端：

studentController.js（学生逻辑）
studentRoutes.js（学生 API）
🟣 4️⃣ 角色 & 权限
涉及文件

前端：

auth.js（获取角色）
Dashboard.js（跳转不同角色）
Sidebar.js（根据角色显示不同菜单）
后端：

authMiddleware.js（权限验证）
🟡 5️⃣ 全局组件 & 布局
涉及文件

Sidebar.js（导航）
DashboardLayout.js（仪表盘布局）