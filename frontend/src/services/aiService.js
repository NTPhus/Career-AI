// src/services/aiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
});

const SESSION_KEY = "career_ai_session";

/**
 * Gửi message lên server, đính kèm sessionId (nếu có)
 * Server tự lưu history, chỉ trả về message mới.
 */
export async function sendToAI(text) {
  const sessionId = localStorage.getItem(SESSION_KEY) || null;

  // chỉ gửi 2 trường này
  const payload = { sessionId, message: text };

  const res = await api.post("/chat", payload);
  const { sessionId: newSessionId, reply } = res.data || {};

  // lưu sessionId mới nếu server trả về lần đầu
  if (newSessionId && newSessionId !== sessionId) {
    localStorage.setItem(SESSION_KEY, newSessionId);
  }

  return reply;
}

export async function getDescFromAI(major, character) {
  console.log("Major gửi lên API:", major);

  const res = await api.post("/chat/desc", { major, character});

  return res.data; // chỉ trả data để dễ dùng trong frontend
}

export function resetSession() {
  localStorage.removeItem(SESSION_KEY);
}
