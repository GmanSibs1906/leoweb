import React, { useState, useEffect } from 'react';
import { loader } from "../images";
import Sidebar from './Sidebar';

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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col mt-32 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col justify-center font-medium max-md:max-w-full">
            <div className="flex flex-col pb-20 max-md:max-w-full">
              <div className="self-center text-6xl tracking-tight text-center leading-[64.2px] text-indigo-950 max-md:max-w-full max-md:text-4xl">
                How can I help you today?
              </div>
              <div className="flex flex-wrap justify-center content-start items-center px-16 mt-16 mb-36 text-2xl leading-7 text-white max-md:px-5 max-md:my-10 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-[795px]">
                  <div className="flex flex-col justify-center rounded-xl max-md:max-w-full">
                    <div className="flex flex-col justify-center max-md:max-w-full">
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
                          placeholder="Ask me anything"
                        />
                        <button type="submit" className="bg-[#100547] text-white px-4 py-2 rounded-md">
                          Send
                        </button>
                      </form>
                      {isLoading && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <img src={loader} width="150px" alt="Loading..." />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
