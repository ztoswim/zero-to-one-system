import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["boss", "admin", "coach", "customer"], required: true },
});

export default mongoose.model("User", UserSchema);
