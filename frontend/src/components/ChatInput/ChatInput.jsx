import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if(message.trim()) {
      onSend(message);
      setMessage('');
    }
  }

  return (
    <div className="chat-input">
      <input 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatInput;
