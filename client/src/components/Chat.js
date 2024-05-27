import React, { useState, useEffect } from 'react';
import { loader, logo } from "../images";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory(prevHistory => [
        ...prevHistory,
        { type: 'user', text: userMessage },
        { type: 'bot', text: botMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // scrolling 2 the bottom whenever chatHistory updatez
    const chatContainer = document.getElementById('chat-history');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]); 

  return (
    <div className=' flex flex-col h-full '>
        <img src={logo} alt="melsoft logo" className=" h-[10vh] object-contain mb-auto " />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h1 className="text-center text-2xl mb-4">Leo 2.0 Chatbot 🤖</h1>
        <div id="chat-history" className="h-96 overflow-y-auto mb-4">
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`text-${message.type === 'user' ? 'right' : 'left'} p-3 mb-2 rounded-lg ${message.type === 'user' ? 'bg-gray-200' : 'bg-green-100'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form className="flex" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
          <input 
            type="text" 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 mr-2 p-2 border rounded-md" 
            placeholder="Enter your message" 
          />
          <button type="submit" className="bg-[#100547] text-white px-4 py-2 rounded-md">
            Send
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loader} width="150px" alt="Loading..." /> 
        </div>
      )}
    </div>
    </div>
  );
}

export default Chat;
