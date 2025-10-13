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
    const response = await axios.post("http://localhost:5000/predict", {
      features: {
        "Giới tính": "Nữ",
        "1. Tôi có tính tự lập": "Chưa bao giờ đúng",
        "2. Tôi suy nghĩ thực tế": "Chưa bao giờ đúng",
        "3. Tôi là người thích nghi với môi trường mới":
          "Chỉ đúng 1 vài trường hợp",
        "4. Tôi có thể vận hành, điều khiển các máy móc thiết bị":
          "Chỉ đúng 1 vài trường hợp",
        "5. Tôi làm các công việc thủ công như gấp giấy, đan, móc,...":
          "Chỉ đúng 1 vài trường hợp",
        "6. Tôi thích tiếp xúc với thiên nhiên động vật cây cỏ":
          "Gần như là đúng",
        "7. Tôi thích những công việc sử dụng tay chân hơn là trí óc":
          "Gần như là đúng",
        "8. Tôi thích những công việc  thấy ngay kết quả": "Hoàn toàn đúng",
        "9. Tôi thích những công việc ngoài trời hơn là trong văn phòng":
          "Chỉ đúng 1 vài trường hợp",
        "10. Tôi có tìm hiểu khám phá nhiều vấn đề mới":
          "Chỉ đúng 1 vài trường hợp",
        "11. Tôi có khả năng phân tích vấn đề": "Chỉ đúng 1 nửa",
        "12. Tôi biết suy nghĩ một cách mạch lạc, chặt chẽ":
          "Chỉ đúng 1 vài trường hợp",
        "13. Tôi thích thực hiện các thí nghiệm hay nghiên cứu":
          "Gần như là đúng",
        "14. Tôi có khả năng tổng hợp, khái quát, suy đoán những vấn đề":
          "Chưa bao giờ đúng",
        "15. Tôi thích những hoạt động điều tra, phân loại, kiểm tra, đánh giá":
          "Gần như là đúng",
        "16. Tôi tự tổ chức công việc của mình phải làm":
          "Chỉ đúng 1 vài trường hợp",
        "17. Tôi thích suy nghĩ về những vấn đề phức tạp, làm những công việc phức tạp":
          "Chưa bao giờ đúng",
        "18. Tôi có khả năng giải quyết các vấn đề": "Chưa bao giờ đúng",
        "19. Tôi là người dễ xúc động": "Hoàn toàn đúng",
        "20. Tôi có óc tưởng tượng phong phú": "Chỉ đúng 1 nửa",
        "21. Tôi thích sự tự do, không theo những quy định, quy tắc":
          "Hoàn toàn đúng",
        "22. Tôi có khả năng thuyết trình, diễn xuất": "Chỉ đúng 1 nửa",
        "23. Tôi có thể chụp hình, vẽ tranh, trang trí, điêu khắc":
          "Chưa bao giờ đúng",
        "24. Tôi có năng khiếu âm nhạc": "Chỉ đúng 1 nửa",
        "25. Tôi có khả năng viết , trình bày những ý tưởng của mình":
          "Chưa bao giờ đúng",
        "26. Tôi thích làm những công việc mới, những công việc đòi hỏi sự sáng tạo":
          "Chưa bao giờ đúng",
        "27. Tôi thoải mái bộc lộ những ý thích": "Chưa bao giờ đúng",
        "28. Tôi là người thân thiện, hay giúp đỡ người khác":
          "Chưa bao giờ đúng",
        "29. Tôi thích gặp gỡ làm việc với con người": "Chỉ đúng 1 nửa",
        "30. Tôi là người lịch sự, tử tế": "Chỉ đúng 1 vài trường hợp",
        "31. Tôi thích khuyên bảo, huấn luyện hay giảng giải cho người khác":
          "Gần như là đúng",
        "32. Tôi là người biết lắng nghe": "Chưa bao giờ đúng",
        "33. Tôi thích các hoạt động chăm sóc sức khỏe của bản thân và người khác":
          "Chỉ đúng 1 nửa",
        "34. Tôi thích các hoạt động vì mục tiêu chung của cộng đồng, xã hội":
          "Gần như là đúng",
        "35. Tôi mong muốn mình có thể đóng góp để xã hội tốt đẹp hơn":
          "Chưa bao giờ đúng",
        "36. Tôi có khả năng hoà giải, giải quyết những công việc mâu thuẫn":
          "Chỉ đúng 1 nửa",
        "37. Tôi là người có tính phiêu lưu mạo hiểm": "Hoàn toàn đúng",
        "38. Tôi có tính quyết đoán": "Chưa bao giờ đúng",
        "39. Tôi là người năng động": "Chỉ đúng 1 vài trường hợp",
        "40. Tôi có khả năng diễn đạt, tranh luận và thuyết phục người khác":
          "Gần như là đúng",
        "41. Tôi thích các việc quản lý, đánh giá": "Chỉ đúng 1 nửa",
        "42. Tôi thường đặt ra các mục tiêu, kế hoạch trong cuộc sống":
          "Gần như là đúng",
        "43. Tôi thích gây ảnh hưởng đến người khác": "Chưa bao giờ đúng",
        "44. Tôi là người thích cạnh tranh, và muốn mình giỏi hơn người khác":
          "Chưa bao giờ đúng",
        "45. Tôi muốn người khác phải kính trọng, nể phục tôi":
          "Chỉ đúng 1 vài trường hợp",
        "46. Tôi là người có đầu óc sắp xếp, tổ chức": "Chưa bao giờ đúng",
        "47. Tôi có tính cẩn trọng": "Gần như là đúng",
        "48. Tôi là người chu đáo, chính xác và đáng tin cậy":
          "Gần như là đúng",
        "49. Tôi thích công việc tính toán sổ sách, ghi chép số liệu":
          "Chỉ đúng 1 vài trường hợp",
        "50. Tôi thích các công việc lưu trữ, phân loại, cập nhật thông tin":
          "Chỉ đúng 1 nửa",
        "51. Tôi thường đặt ra mục tiêu, kế hoạch trong cuộc sống":
          "Chưa bao giờ đúng",
        "52. Tôi thích dự kiến các khoản thu chi": "Chỉ đúng 1 nửa",
        "53. Tôi thích lập thời khóa biểu, sắp xếp lịch làm việc":
          "Chưa bao giờ đúng",
        "54. Tôi thích làm việc với các con số, làm việc theo hướng dẫn, quy trình":
          "Chỉ đúng 1 nửa",
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
