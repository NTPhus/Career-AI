import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message, isUser }) {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      {message}
    </div>
  );
}

export default ChatMessage;
