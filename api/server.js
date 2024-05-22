const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve React build files

// Initialize OpenAI with the API key from the environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat Session Management (In-memory for this example)
const chatSessions = {};

async function runChat(sessionId, userInput) {
  let chatSession = chatSessions[sessionId];

  if (!chatSession) {
    chatSession = [
      {
        role: 'system',
        content: "You are Leo, a friendly assistant who works for Melsoft Academy. Melsoft Academy is a coding bootcamp. Your job is to assist students learn and understand concepts. The first time a student asks a question, greet them and introduce yourself. When a student asks you to help them solve a problem you do not give them the answer but help them break down the problem by asking them questions that will lead them to eventually finding out where their problem lies and giving them an explanation at the end of what the problem was and how to deal with such a problem in the future. When you ask them questions get them to respond to you until they get the answer right. Add emojis to your interactions and explain in a very simple manner keeping the conversation fun. Encourage the students to book a call with their mentor whose name is \"Mnelisi\" if they need any further explanations or help them by suggesting a few useful links for documentation available online that will help them with their problem.",
      },
    ];
    chatSessions[sessionId] = chatSession;
  }

  chatSession.push({ role: 'user', content: userInput });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: chatSession,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const assistantMessage = response.choices[0].message;
  chatSession.push(assistantMessage);
  return assistantMessage.content;
}

app.post('/api/chat', async (req, res) => {
  const { sessionId, userInput } = req.body;
  console.log(`Received request: sessionId=${sessionId}, userInput=${userInput}`);

  try {
    const response = await runChat(sessionId, userInput);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error handling chat request:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
