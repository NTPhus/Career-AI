import React, { use, useEffect, useState } from "react";
import "./ChatInput.css";
import { useSearchParams } from "react-router-dom";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const majorName = searchParams.get("majorName");

  useEffect(() => {
    if (key) {
      const university = key.slice(0, -2);
      const prompt =
        "Hãy cho tôi biết thông tin về ngành " +
        majorName +
        " tại " +
        university;
      onSend(prompt);
    }
  }, key);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập nội dung câu hỏi..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button onClick={handleSend}>Gửi</button>
    </div>
  );
}

export default ChatInput;
