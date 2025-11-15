// 🔹 Load biến môi trường càng sớm càng tốt
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

import route from "./routes/index.route.js";

// ======================
// ⚙️ Cấu hình cơ bản
// ======================
const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ======================
// 🚏 Khai báo route
// ======================
route(app);

// ======================
// 🔗 Kết nối MongoDB
// ======================
mongoose
  .connect(databaseURL)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// ======================
// 🚀 Khởi động server
// ======================
app.listen(port, () => {
  console.log(`🌐 Server is running at http://localhost:${port}`);
});
