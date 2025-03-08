import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI } from "./config";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
