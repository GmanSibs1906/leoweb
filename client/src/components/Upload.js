import React, { useState, useEffect } from "react";
import { loader, logo } from "./images";

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
