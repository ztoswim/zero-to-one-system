const bcrypt = require("bcrypt");
const connection = require("./db");

const encryptExistingUsers = async () => {
  connection.query("SELECT id, password FROM users", async (err, results) => {
    if (err) {
      console.error("❌ 查询用户失败:", err);
      return;
    }

    for (let user of results) {
      if (!user.password.startsWith("$2b$")) { // 只加密明文密码，避免重复加密
        const hashedPassword = await bcrypt.hash(user.password, 10);
        connection.query(
          "UPDATE users SET password = ? WHERE id = ?",
          [hashedPassword, user.id],
          (err) => {
            if (err) console.error("❌ 更新密码失败:", err);
            else console.log(`✅ 用户 ${user.id} 的密码已加密`);
          }
        );
      }
    }
  });
};

encryptExistingUsers();
