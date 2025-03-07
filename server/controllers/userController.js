const User = require("../models/User");
require("dotenv").config();

// 获取用户信息
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("username role email"); // ✅ 明确返回 email
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "服务器错误" });
  }
};

// Boss 编辑员工信息
const updateEmployee = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["admin", "coach"].includes(role)) {
      return res.status(400).json({ message: "无效的角色" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }

    user.role = role;
    await user.save();
    res.json({ message: "用户信息已更新" });
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
};

// 删除用户（仅 Boss）
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }

    await user.deleteOne(); // 推荐用 `deleteOne()` 而不是 `remove()`（官方建议）
    res.json({ message: "用户已删除" });
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
};

module.exports = {
  getUserProfile,
  updateEmployee,
  deleteUser,
};
