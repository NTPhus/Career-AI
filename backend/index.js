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

// ======================
// 🧠 Hàm test model API (chỉ chạy khi cần)
// ======================
async function callModel() {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      R1: 3,
      R2: 2,
      R3: 2,
      R4: 3,
      R5: 3,
      R6: 2,
      R7: 3,
      R8: 2,
      I1: 3,
      I2: 2,
      I3: 2,
      I4: 3,
      I5: 2,
      I6: 2,
      I7: 2,
      I8: 2,
      A1: 2,
      A2: 2,
      A3: 3,
      A4: 2,
      A5: 2,
      A6: 2,
      A7: 2,
      A8: 2,
      S1: 4,
      S2: 5,
      S3: 5,
      S4: 5,
      S5: 5,
      S6: 5,
      S7: 5,
      S8: 5,
      E1: 4,
      E2: 5,
      E3: 5,
      E4: 2,
      E5: 5,
      E6: 5,
      E7: 5,
      E8: 3,
      C1: 3,
      C2: 4,
      C3: 5,
      C4: 5,
      C5: 3,
      C6: 3,
      C7: 5,
      C8: 3,
      TIPI1: 6,
      TIPI2: 4,
      TIPI3: 7,
      TIPI4: 7,
      TIPI5: 6,
      TIPI6: 6,
      TIPI7: 6,
      TIPI8: 5,
      TIPI9: 5,
      TIPI10: 4,
      urban: 3,
      gender: 2,
    });
    console.log("🎯 Prediction:", response.data.prediction);
  } catch (error) {
    console.error("❌ Error calling model:", error.message);
  }
}

// Gọi thử model sau khi server đã sẵn sàng
// (có thể comment dòng dưới khi deploy thật)
setTimeout(callModel, 2000);
