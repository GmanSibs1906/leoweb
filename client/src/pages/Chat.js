import React, { useState, useEffect } from "react";
import { loader, logo } from "../images";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // for image recognition
  const [imageRequest, setImageRequest] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [imageError, setImageError] = useState("");

  // upload the pic
  const uploadImage = async (e) => {
    setImageResponse("");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImage(file);
    setImageUrl(URL.createObjectURL(file)); // Create a local URL for the image

    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("http://localhost:5000/upload", options);
      const data = await response.json();
      setImageUrl(data.url); // Save the image URL
      console.log(data);
    } catch (error) {
      console.error("Problem uploading images: " + error.message);
    }
  };

  const analyzeImage = async () => {
    setImageResponse("");
    if (!image) {
      setImageError("Please upload an image first!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: userInput,
          imageUrl: imageUrl // Send the image URL along with the user's text input
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/vision", options);
      const data = await response.json();
      setImageResponse(data.message.content);

      setChatHistory((prevHistory) => [
        { type: "image", imageUrl },
        { type: "user", text: userInput },
        { type: "imageResponse", text: data.message.content },
        ...prevHistory,
      ]);

    } catch (error) {
      console.error(error.message);
      setImageError("Something broke, please try again");
    }
  };

  const sendMessage = async () => {
    const userMessage = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: userMessage },
        { type: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-history");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className=" flex flex-col h-full ">
      <img
        src={logo}
        alt="melsoft logo"
        className=" h-[10vh] object-contain mb-auto "
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 w-96">
          <h1 className="text-center text-2xl mb-4">Leo 2.0 Chatbot 🤖</h1>
          <div id="chat-history" className="h-96 overflow-y-auto mb-4 flex flex-col">
            {chatHistory.map((message, index) => (
              <React.Fragment key={index}>
                {message.type === "user" && (
                  <div className="text-left p-3 mb-2 rounded-lg bg-gray-200 mr-2">
                    {message.text}
                  </div>
                )}
                {message.type === "imageResponse" && (
                  <div className="text-left p-3 mb-2 rounded-lg bg-green-100 ml-2">
                    {message.text}
                  </div>
                )}
                {message.type === "image" && (
                  <div className="text-left p-3 mb-2 rounded-lg bg-gray-200 mr-2">
                    <img src={message.imageUrl} alt="uploaded" className="w-full object-contain" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {imageRequest ? (
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                analyzeImage();
              }}
            >
              <div className=" w-full flex justify-center my-[10px] cursor-pointer ">
                <div className="bg-[#100547] text-white px-4 py-1 rounded-md">
                  <label htmlFor="files">Upload</label>
                  <input
                    type="file"
                    onChange={uploadImage}
                    id="files"
                    accept="image/*"
                    hidden
                  />
                </div>
              </div>
              {image && (
                <div className="w-full my-4">
                  <img src={imageUrl} alt="preview" className="w-full object-contain" />
                </div>
              )}
              <div className=" flex ">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 mr-2 p-2 border rounded-md"
                  placeholder="Enter your message"
                />
                <button
                  type="submit"
                  className="bg-[#100547] text-white px-4 py-2 rounded-md"
                >
                  Ask Leo
                </button>
              </div>
            </form>
          ) : (
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <div className=" text-sm my-[10px] w-full flex justify-center ">
                <span
                  className=" text-red-900 underline cursor-pointer mr-[5px] "
                  onClick={() => setImageRequest(true)}
                >
                  upload image
                </span>
                to ask questions about.
              </div>
              <div className=" flex ">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 mr-2 p-2 border rounded-md"
                  placeholder="Enter your message"
                />
                <button
                  type="submit"
                  className="bg-[#100547] text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </form>
          )}
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



/*
import React, { useState, useEffect, useRef } from "react";
import { loader } from "../images";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/authContext";

function Chat() {
  const { currentUser } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);

  // for image recognition
  const [imageRequest, setImageRequest] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [imageError, setImageError] = useState("");

  // upload the pic
  const uploadImage = async (e) => {
    setImageResponse("");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImage(file);
    setImageUrl(URL.createObjectURL(file)); // Create a local URL for the image

    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("http://localhost:5000/upload", options);
      const data = await response.json();
      setImageUrl(data.url); // Save the image URL
      console.log(data);
    } catch (error) {
      console.error("Problem uploading images: " + error.message);
    }
  };

  const analyzeImage = async () => {
    setImageResponse("");
    if (!image) {
      setImageError("Please upload an image first!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: userInput,
          imageUrl: imageUrl, // Send the image URL along with the user's text input
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/vision", options);
      const data = await response.json();
      setImageResponse(data.message.content);

      setChatHistory((prevHistory) => [
        { type: "image", imageUrl },
        { type: "user", text: userInput },
        { type: "imageResponse", text: data.message.content },
        ...prevHistory,
      ]);
    } catch (error) {
      console.error(error.message);
      setImageError("Something broke, please try again");
    }
  };

  const defaultOptions = [
    {
      title: "Brainstorm names",
      description: "For my fantasy football team with my frog theme",
    },
    {
      title: "Suggest some codenames",
      description: "For a project introducing flexible work arrangements",
    },
    {
      title: "Write an SQL query",
      description: "That adds a 'status' column to an 'order' table",
    },
    {
      title: "Explain why popcorn pops",
      description: "To a kid who loves watching it in the microwave",
    },
  ];

  const listAvailableVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    voices.forEach((voice, index) => {
      console.log(`${index}: ${voice.name} (${voice.lang})`);
    });
  };

  useEffect(() => {
    listAvailableVoices();

    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Please try Google Chrome."
      );
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      setIsMicrophoneActive(false);
    };

    recognitionRef.current = recognition;

    window.speechSynthesis.onvoiceschanged = () => {
      listAvailableVoices();
    };
  }, []);

  const sendMessage = async (message) => {
    const userMessage = message || userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userMessage,
          sessionId: currentUser.uid,
          uid: currentUser.uid,
        }),
      });

      const data = await response.json();
      const botMessage = data.response;

      console.log(botMessage);

      setChatHistory((prevHistory) => [
        { type: "user", text: userMessage },
        { type: "bot", text: botMessage },
        ...prevHistory,
      ]);

      // Call text-to-speech function
      speakText(botMessage);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1.5;
    speech.rate = 1.2;
    speech.volume = volume;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.name === "Google UK English Male"
    ); // Change the name to the desired voice
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  const handleSpeechRecognition = () => {
    const recognition = recognitionRef.current;

    if (isMicrophoneActive) {
      recognition.stop();
      setIsMicrophoneActive(false);
    } else {
      recognition.start();
      setIsMicrophoneActive(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsMicrophoneActive(false);
    setIsPaused(false);
  };

  const handleIncreaseVolume = () => {
    setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1));
  };

  const handleDecreaseVolume = () => {
    setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0));
  };

  useEffect(() => {
    // Scroll to the bottom whenever chatHistory updates
    const chatContainer = document.getElementById("chat-history");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex h-screen gap-5 max-md:flex-col max-md:gap-0 bg-cover bg-center">
      <Sidebar />
      <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full items-center justify-center bg-custom-pattern bg-opacity-[30%]">
        <div className="flex flex-col mt-10 max-md:mt-4 max-md:max-w-full items-center">
          <div className="flex flex-col justify-center font-medium max-md:max-w-full items-center">
            <div className="flex flex-col pb-10 max-md:max-w-full items-center">
              <div className="self-center text-5xl tracking-tight text-center leading-[64.2px] text-indigo-950 max-md:max-w-full max-md:text-4xl">
                How can I help you today?{" "}
                <i className="fa-regular fa-face-smile-beam"></i>
              </div>
              <div className="flex flex-wrap justify-center content-start items-center px-8 mt-8 mb-16 text-2xl leading-7 text-white max-md:px-4 max-md:my-8 max-md:max-w-full">
                <div className="flex flex-col max-w-full w-full items-center">
                  <div className="flex flex-col justify-center rounded-xl max-md:max-w-full items-center">
                    <div
                      id="chat-history"
                      className="h-96 overflow-y-auto mb-4 w-full"
                    >
                      {chatHistory.length === 0 &&
                        defaultOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => sendMessage(option.title)}
                            className="cursor-pointer p-4 mb-4 self-center rounded-3xl border border-gray-300 text-gray-500 text-sm hover:bg-white"
                            style={{ opacity: 0.7, width: "795px" }}
                          >
                            <div className="text-sm font-bold">
                              {option.title}
                            </div>
                            <div className="text-xs">{option.description}</div>
                          </div>
                        ))}
                      ;
                      {imageRequest ? (
                        <div>
                          <div className="box-border justify-center item-center h-32 w-full m-12 p-40 border-4 bg-white">
                            <div className="bg-[#100547] text-white px-4 py-1 rounded-md">
                              <label className="" htmlFor="files">
                                Upload
                              </label>
                              <input
                                type="file"
                                onChange={uploadImage}
                                id="files"
                                accept="image/*"
                                hidden
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="bg-[#100547] text-white px-4 py-2 my-5 rounded-2xl"
                            onClick={() => setImageRequest(false)}
                          >
                            Chat to Leo
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div
                            id="chat-history"
                            className="h-96 overflow-y-auto mb-4 w-full"
                          >
                            {chatHistory.length === 0 &&
                              defaultOptions.map((option, index) => (
                                <div
                                  key={index}
                                  onClick={() => sendMessage(option.title)}
                                  className="cursor-pointer p-4 mb-4 self-center rounded-3xl border border-gray-300 text-gray-500 text-sm hover:bg-white"
                                  style={{ opacity: 0.7, width: "795px" }}
                                >
                                  <div className="text-xl font-bold">
                                    {option.title}
                                  </div>
                                  <div className="text-xs">
                                    {option.description}
                                  </div>
                                </div>
                              ))}
                            {chatHistory.map((message, index) => (
                              <div
                                key={index}
                                className={`p-4 mb-2 self-center text-indigo-950 rounded-xl ${
                                  message.type === "user"
                                    ? "bg-transparent border border-gray-200 text-sm text-right"
                                    : "bg-transparent border border-indigo-950 text-left text-indigo-950 py-4 my-6"
                                }`}
                                style={{ width: "795px" }}
                              >
                                {message.text}
                              </div>
                            ))}
                          </div>
                          <div className="bg-indigo-950 w-full rounded-xl">
                            <div
                              className="flex w-full items-center justify-center"
                              onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {imageRequest ? (
                        <div className="bg-indigo-950 w-full rounded-xl">
                          <form
                            className="flex w-full items-center justify-center"
                            onSubmit={(e) => {
                              e.preventDefault();
                              analyzeImage();
                            }}
                          >
                            <input
                              type="text"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              className="flex-1 mr-2 p-4 text-sm text-gray-200 rounded-2xl bg-indigo-950"
                              placeholder="Write your question about the image"
                            />

                            <button
                              type="button"
                              className={`mr-2 px-3 text-gray-300 bg-[#100547] rounded-full ${
                                isMicrophoneActive
                                  ? "bg-green-700 text-white"
                                  : "bg-transparent"
                              } rounded-full`}
                              onClick={handleSpeechRecognition}
                            >
                              <i className="fa fa-microphone text-sm"></i>
                            </button>

                            <button
                              type="submit"
                              className="bg-[#100547] text-white px-4 py-2 rounded-2xl"
                            >
                              Ask
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="bg-indigo-950 w-full rounded-xl">
                          <form
                            className="flex w-full items-center justify-center"
                            onSubmit={(e) => {
                              e.preventDefault();
                              sendMessage();
                            }}
                          >
                            <input
                              type="text"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              className="flex-1 mr-2 p-4 text-sm text-gray-200 rounded-2xl bg-indigo-950"
                              placeholder="Ask me anything"
                            />
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                            >
                              <i className="fa fa-file text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              onClick={() => setImageRequest(true)}
                            >
                              <i className="fa fa-image text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className={`mr-2 px-3 text-gray-300 bg-[#100547] rounded-full ${
                                isMicrophoneActive
                                  ? "bg-green-700 text-white"
                                  : "bg-transparent"
                              } rounded-full`}
                              onClick={handleSpeechRecognition}
                            >
                              <i className="fa fa-microphone text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              onClick={handleResume}
                            >
                              <i class="fa-regular fa-circle-play text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              onClick={handlePause}
                            >
                              <i className="fa-regular fa-circle-pause text-sm"></i>
                            </button>

                            <button
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              type="button"
                              onClick={handleStop}
                            >
                              <i class="fa-regular fa-circle-stop text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              onClick={handleDecreaseVolume}
                            >
                              <i className="fa fa-volume-down text-sm"></i>
                            </button>
                            <button
                              type="button"
                              className="mr-2 px-3 text-gray-300 bg-[#100547] rounded-full"
                              onClick={handleIncreaseVolume}
                            >
                              <i className="fa fa-volume-up text-sm"></i>
                            </button>
                            <button
                              type="submit"
                              className="bg-[#100547] text-white px-4 py-2 rounded-2xl"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      )}
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
*/
