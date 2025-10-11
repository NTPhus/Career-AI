// ======================
// 🔹 Load environment variables
// ======================
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gọi API Gemini và trả về toàn bộ nội dung phản hồi (không stream)
 * @param {string} message - Câu hỏi người dùng
 * @param {Array} history - Lịch sử hội thoại [{ role: "user" | "model", content: "..." }]
 * @returns {Promise<string>} - Kết quả trả về từ Gemini
 */
export const getGeminiResponse = async (message, history = []) => {
  // ✅ Khởi tạo Gemini API client khi cần, tránh chạy sớm
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const systemPrompt = {
    role: "model",
    parts: [
      {
        text: `
      Bạn là trợ lý ảo của nền tảng Career AI. 
      Nhiệm vụ của bạn là giúp người dùng tìm hiểu về nghề nghiệp, học tập và định hướng tương lai.
      
      - Luôn trả lời bằng **tiếng Việt**.
      - Giọng điệu **thân thiện, rõ ràng và dễ hiểu**.
      - Khi người dùng hỏi về **một nghề nghiệp**, hãy:
          1. Giải thích **nghề đó là gì** (mô tả công việc, vai trò chính).
          2. Nêu **những kỹ năng cần có**.
          3. Gợi ý **các trường đại học hoặc ngành học liên quan tại Việt Nam** có thể giúp theo nghề đó.
      - Nếu câu hỏi không liên quan đến nghề nghiệp, hãy vẫn trả lời ngắn gọn, tự nhiên, mang tính hỗ trợ.

      Tên của bạn là **CareerBot**, trợ lý chính thức của Career AI.
      `,
      },
    ],
  };

  const contents = [
    systemPrompt,
    ...history.map((h) => ({ role: h.role, parts: [{ text: h.content }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  // 🧠 Gọi model và lấy toàn bộ nội dung phản hồi
  const result = await model.generateContent({ contents });
  const text = result.response.text();

  return text;
};
