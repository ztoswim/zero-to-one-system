const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // ❌ 不要加 useNewUrlParser
    console.log(`✅ MongoDB 连接成功: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB 连接失败: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
