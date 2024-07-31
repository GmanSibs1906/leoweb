// analyzeUserChat.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",
});
const openai = new OpenAIApi(configuration);

export const analyzeUserChat = async (chatData) => {
  const messages = chatData.map(chat => ({
    role: chat.type === 'user' ? 'user' : 'assistant',
    content: chat.text,
  }));

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes user chat data to provide insights for personalized learning.",
      },
      ...messages,
    ],
  });

  const summary = response.data.choices[0].message.content;
  return summary;
};
