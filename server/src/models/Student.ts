import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  studentName: string;
  gender: "male" | "female";
  birthDate: Date;
  parentName?: string;
  parentContact: string;
  address?: string;
  classDuration?: string;
  classLocation?: string;
  email?: string;
}

const StudentSchema = new Schema<IStudent>({
  studentName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  birthDate: { type: Date, required: true },
  parentName: { type: String },
  parentContact: { type: String, required: true },
  address: { type: String },
  classDuration: { type: String },
  classLocation: { type: String },
  email: { type: String },
});

export default mongoose.model<IStudent>("Student", StudentSchema);
