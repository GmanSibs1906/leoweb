import React, { useState, useEffect, useRef } from 'react';
import { loader } from "../images";
import Sidebar from './Sidebar';

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef(null);

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

      // Call text-to-speech function
      speakText(botMessage);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please try Google Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  useEffect(() => {
    // Scroll to the bottom whenever chatHistory updates
    const chatContainer = document.getElementById('chat-history');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  const resetChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="flex h-screen gap-5 max-md:flex-col max-md:gap-0">
      <Sidebar resetChat={resetChat} />
      <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full items-center justify-center">
        <div className="flex flex-col mt-10 max-md:mt-4 max-md:max-w-full items-center">
          <div className="flex flex-col justify-center font-medium max-md:max-w-full items-center">
            <div className="flex flex-col pb-10 max-md:max-w-full items-center">
              <div className="self-center text-5xl tracking-tight text-center leading-[64.2px] text-indigo-950 max-md:max-w-full max-md:text-4xl">
                How can I help you today? <i className="fa-regular fa-face-smile-beam"></i>
              </div>
              <div className="flex flex-wrap justify-center content-start items-center px-8 mt-8 mb-16 text-2xl leading-7 text-white max-md:px-4 max-md:my-8 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-full items-center">
                  <div className="flex flex-col justify-center rounded-xl max-md:max-w-full items-center">
                    <div id="chat-history" className="h-96 overflow-y-auto mb-4 w-full">
                      {defaultOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => sendMessage(option.title)}
                          className="cursor-pointer p-4 mb-4 self-center rounded-3xl border border-gray-300 text-gray-500 text-sm hover:bg-gray-50"
                          style={{ opacity: 0.7, width: '795px' }}
                        >
                          <div className="text-sm font-bold">{option.title}</div>
                          <div className="text-xs">{option.description}</div>
                        </div>
                      ))}
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 mb-2 self-center rounded-lg ${message.type === 'user' ? 'bg-gray-200 text-right' : 'bg-green-100 text-left'}`}
                          style={{ width: '795px' }}
                        >
                          {message.text}
                        </div>
                      ))}
                    </div>
                    <form className="flex w-full items-center justify-center" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 mr-2 p-4 text-sm border rounded-2xl"
                        placeholder="Ask me anything"
                      />
                      <button type="button" className="mr-2 px-3 bg-[#100547] rounded-full">
                        <i className="fa fa-file text-sm"></i>
                      </button>
                      <button type="button" className="mr-2 px-3 bg-[#100547] rounded-full">
                        <i className="fa fa-image text-sm"></i>
                      </button>
                      <button type="button" className="mr-2 px-3 bg-[#100547] rounded-full" onClick={handleSpeechRecognition}>
                        <i className="fa fa-microphone text-sm"></i>
                      </button>
                      <button type="submit" className="bg-[#100547] text-white px-4 py-2 rounded-2xl">
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
  );
}

export default Chat;
