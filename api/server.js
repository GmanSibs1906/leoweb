const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
const admin = require('firebase-admin');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "leodatabase-80687.appspot.com"
});

const firestore = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    model: 'gpt-4o',
    messages: chatSession,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const assistantMessage = response.choices[0].message;
  chatSession.push(assistantMessage);

  // Save chat to Firestore
  const userId = sessionId; // Assuming sessionId is the same as userId
  await firestore.collection('users').doc(userId).collection('chats').add({
    userInput: userInput,
    botResponse: assistantMessage.content,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  return assistantMessage.content;
}

app.post('/api/chat', async (req, res) => {
  const { sessionId, userInput, uid } = req.body;
  console.log(`Received request: sessionId=${sessionId}, userInput=${userInput}, uid=${uid}`);

  try {
    const response = await runChat(sessionId, userInput);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error handling chat request:', error);
    res.status(500).json({ error: error.message });
  }
});

const upload = multer({
  storage: multer.memoryStorage()
}).single("file");

app.post("/upload", upload, async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const filename = Date.now() + '-' + file.originalname;
    const fileRef = bucket.file(filename);

    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error("Error uploading image: ", error);
      res.status(500).send("Error uploading image to Firebase");
    });

    stream.on('finish', async () => {
      await fileRef.makePublic();
      const url = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
      console.log(`Image uploaded to: ${url}`);
      res.json({ url });

      // Save image URL to Firestore
      const { uid } = req.body;
      await firestore.collection('users').doc(uid).collection('uploads').add({
        imageUrl: url,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).send("Error uploading image to Firebase");
  }
});

app.post("/vision", async (req, res) => {
  try {
    const { message, imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image URL provided.' });
    }

    // Download image from URL and convert it to base64
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageAsBase64 = Buffer.from(response.data, 'binary').toString('base64');

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: message },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageAsBase64}`
              }
            },
          ],
        },
      ],
    });

    console.log(aiResponse.choices[0]);
    res.send(aiResponse.choices[0]);
  } catch (error) {
    console.error("Error handling vision request:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
