// ChatWindow.jsx
import React, { useState, useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatWindow.css";
import { sendToAI, } from "../../services/aiService";
// resetSession
import TypingBubble from "../TypingBubble/TypingBubble";
import WelcomeMessage from "./WelcomeMessage";
import Footer from "../../Layout/LayoutDefault/Footer.jsx"

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null); // chỉ dùng 1 ref để scroll

  // Auto scroll mỗi khi có tin mới hoặc trạng thái typing thay đổi
  // useEffect(() => {
  //   endRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, loading]);

  const handleSend = async (text) => {
    const clean = (text || "").trim();
    if (!clean) return;

    setError("");
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), message: clean, isUser: true },
    ]);

    try {
      setLoading(true);
      const aiRaw = await sendToAI(clean);
      const aiText = typeof aiRaw === "string" ? aiRaw : aiRaw?.message || "";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), message: aiText, isUser: false },
      ]);
    } catch (e) {
      console.error(e);
      setError("Không gọi được API. Kiểm tra server localhost:3000 nhé.");
    } finally {
      setLoading(false);
    }
  };

  // const handleNewSession = () => {
  //   resetSession();
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       id: crypto.randomUUID(),
  //       message: "🔄 Bắt đầu phiên chat mới.",
  //       isUser: false,
  //     },
  //   ]);
  // };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h2>
          <span className="brand">Career</span>AI Chat
        </h2>
      </div>

      <div className="chat-body">
        {/* ... phần title/suggestions của bạn ... */}

        {/* ✅ TypingBubble phải nằm TRONG .messages */}
        <div className="messages">
          {Array.isArray(messages) && messages.length > 0 ? (
            <>
              {messages.map((m) => (
                <ChatMessage key={m.id} {...m} />
              ))}
              {loading && <TypingBubble />}   {/* 3 chấm của bot */}
              <div ref={endRef} />
            </>
          ) : (
            <>
              <WelcomeMessage/>
              {loading && <TypingBubble />}
              <div ref={endRef} />
            </>
          )}
        </div>


        {error && <div className="error">{error}</div>}

        <div className="input-row">
          <ChatInput onSend={handleSend} />
          {/* hoặc thêm nút session:
          <button onClick={handleNewSession}>Phiên mới</button> */}

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ChatWindow;
