import React, { useState, useEffect } from 'react';
import { loader, logo } from "../images";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultOptions = [
    { 
      title: 'Brainstorm names', 
      description: 'For my fantasy football team with my frog theme' 
    },
    { 
      title: 'Suggest some codenames', 
      description: 'For a project introducing flexible work arrangements' 
    },
    { 
      title: 'Write an SQL query', 
      description: 'That adds a \'status\' column to an \'order\' table' 
    },
    { 
      title: 'Explain why popcorn pops', 
      description: 'To a kid who loves watching it in the microwave' 
    }
  ];

  const sendMessage = async (message) => {
    const userMessage = message || userInput;
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
    // Scroll to the bottom whenever chatHistory updates
    const chatContainer = document.getElementById('chat-history');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='flex flex-col h-full'>
      <img src={logo} alt="melsoft logo" className="h-[10vh] object-contain mb-auto" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-center text-xl mb-4" style={{ color: '#100547' }}>Leo 2.0 Chatbot 🤖</h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-96 relative">
          <div className='text-center mb-4'>How can I help you today?</div>
          <div id="chat-history" className="h-96 overflow-y-auto mb-4">
  {defaultOptions.map((option, index) => (
    <div
      key={index}
      onClick={() => sendMessage(option.title)}
      className="cursor-pointer p-4 mb-4 rounded-3xl border border-gray-300 text-gray-500 text-sm hover:bg-gray-50"
      style={{ opacity: 0.7 }}
    >
      <div className="text-sm font-bold">{option.title}</div>
      <div className="text-xs">{option.description}</div>
    </div>
  ))}
  {chatHistory.map((message, index) => (
    <div
      key={index}
      className={`p-3 mb-2 rounded-lg ${message.type === 'user' ? 'bg-gray-200 self-end text-right' : 'bg-green-100 self-start text-left'}`}
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
