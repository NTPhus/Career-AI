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

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

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
    const response = await axios.post("http://localhost:5000/predict", {
      features: {
        AVG_score: [8.5],
        Fav_subject_1: ["Toán"],
        Fav_subject_2: ["Lý"],
        Fav_subject_3: ["Hóa"],
        Prize: ["Yes"],
        Hobby_1: ["Nghiên cứu"],
        Hobby_2: ["Xem phim"],
        Hobby_3: ["Nghe nhạc"],
        Character: ["Hướng nội"],
        Career_trends_1: ["Lương cao"],
        Career_trends_2: ["Khám phá"],
        Career_trends_3: ["Thăng tiến nhanh"],
      },
    });
    console.log("🎯 Prediction:", response.data.prediction);
  } catch (error) {
    console.error("❌ Error calling model:", error.message);
  }
}

// Gọi thử model sau khi server đã sẵn sàng
// (có thể comment dòng dưới khi deploy thật)
setTimeout(callModel, 2000);
