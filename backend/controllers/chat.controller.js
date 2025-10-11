import { getGeminiResponse } from "../services/chat.service.js";
import { randomUUID } from "crypto";

const chatSessions = new Map();

export const chat = async (req, res) => {
  const { message } = req.body;
  let {sessionId} = req.body;

  if (!sessionId) {
    sessionId = randomUUID(); // sinh sessionId mới
    console.log("Tạo sessionId mới:", sessionId);
  }

  // Lấy history cũ hoặc tạo mới
  const history = chatSessions.get(sessionId) || [];

  try {
    // Giả sử hàm streamGeminiResponse có thể tách phần xử lý trả text ra
    const reply = await getGeminiResponse(message, history);

    // Cập nhật history
    const updatedHistory = [
      ...history,
      { role: "user", content: message },
      { role: "model", content: reply },
    ];
    chatSessions.set(sessionId, updatedHistory);

    // Trả về response thông thường
    res.json({sessionId, reply: reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Lỗi khi gọi Gemini API" });
  }
};
