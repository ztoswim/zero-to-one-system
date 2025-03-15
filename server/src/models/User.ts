import mongoose, { Schema, Document } from "mongoose";

// 更新 IUser 接口，加入 Biztory 相关的字段
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "boss" | "admin" | "coach" | "customer";
  biztoryUsername?: string;  // 可选字段，存储 Biztory 用户名
  biztoryApiKey?: string;    // 可选字段，存储 Biztory API Key
  biztoryUserId?: string;    // 可选字段，存储 Biztory 用户 ID
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true, lowercase: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["boss", "admin", "coach", "customer"], required: true },
  
  // Biztory 相关字段
  biztoryUsername: { type: String },  // Biztory 用户名
  biztoryApiKey: { type: String },    // Biztory API Key
  biztoryUserId: { type: String },    // Biztory 用户 ID
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
