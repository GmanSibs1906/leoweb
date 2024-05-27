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
    <div className="py-4 pl-4 bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-4 pt-8 pb-4 w-full rounded-3xl border-r border-solid bg-indigo-950 border-r-white border-r-opacity-10 max-md:pr-5 max-md:mt-8">
            <div className="flex flex-col">
              <div className="flex flex-col pb-20 text-3xl font-semibold leading-6 text-neutral-50">
                <div className="flex flex-col justify-center px-4 py-3 w-full rounded-xl bg-white bg-opacity-10">
                  <div className="flex gap-4">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1d54f81eb727e2a2f3a7831e0a8f60ca4fe3fee44cb34a40fa74a58980439b0?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 aspect-[1.15] w-[46px]"
                    />
                    <div className="flex-1 justify-center my-auto text-ellipsis">
                      LEO AI
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex z-10 flex-col -mt-10 text-base leading-6 text-neutral-200">
                <div className="flex flex-col">
                  <div className="flex gap-3 px-4 py-3 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3415f94d759050ebb1e94797edd04e7090640ade2e0df79d2b856e8326832677?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>How to write an impacting ...</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8747002c886561fe6eeeb0e87f1a4f3f53d518003eee30c1b9fbbbe657d30016?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Web accessibility</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa20cd752807bdd975666312096c93ffb101d4c3783f54f1b4cd832035df4a1a?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Design inspiration</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8efc6241736f05d408d82e03fcbf86ae39daecda1f1136ad15b63663f28fde6?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>What is machine learning</div>
                  </div>
                </div>
                <div className="flex gap-3 px-4 py-3 mt-4 font-medium bg-pink-800 rounded-xl shadow-sm">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/680ccf037ae3324b37240a189f6910948d4861387c221cff6415294bfe79e299?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div>Start a new chat</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-72 text-base leading-6 text-neutral-200 max-md:mt-10">
              <div className="flex flex-col justify-center">
                <div className="flex flex-col pt-1.5">
                  <div className="flex gap-3 px-4 py-3 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/95104ea10286005fdd20849ea71461da3c49910312168d6ca7783cda6909cac5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Clear all conversations</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/52b5be7910d5bbaf066b7fe2921b6d14bf03f04e61f3a0a2d6d5e7e8d899ed92?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Switch Light Mode</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/492ff50bc1a3acfb621a7b9b9d72d373d161c07ba723418cf9949ef20a3e38e7?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Upgrade to Pro</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c1654f44627c6b0db56679b08e79147fd6de35a07bf126250abf1a88f2b548?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Updates & FAQ</div>
                  </div>
                  <div className="flex gap-3 px-4 py-3 mt-1.5 text-rose-500 rounded-xl shadow-sm">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c84f30c054d44366b00df6b2494c7ffafbbd15234fc91f67f38efca58c3cf02?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                    <div>Log out</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}

export default Chat;
