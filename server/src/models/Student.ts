import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  birthDate: { type: Date, required: true },
  parentName: String,
  parentContact: { type: String, required: true },
  address: String,
  classDuration: String,
  classLocation: String,
  email: String,
});

export default mongoose.model("Student", StudentSchema);
