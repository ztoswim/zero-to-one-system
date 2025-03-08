import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "boss" | "admin" | "coach" | "customer";
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true, lowercase: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["boss", "admin", "coach", "customer"], required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
