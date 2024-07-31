const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function analyzeUserChat(chatData) {
  const messages = chatData.map((chat) => chat.text).join("\n");

  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [{ role: "user", content: `Analyze the following chat messages and provide a summary:\n${messages}` }],
    max_tokens: 150,
  });

  return response.data.choices[0].message.content.trim();
}

module.exports = { analyzeUserChat };
