const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { OpenAI } = require("openai"); 

// Load environment variables (make sure you have the OPENAI_API_KEY in your .env file or Firebase config)
require('dotenv').config();

// Initialize Firebase Admin SDK (only once)
admin.initializeApp();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});
// Import your helper functions (make sure the paths are correct)
const { fetchUserChatData } = require('./fetchUserChatData');
const { storeUserSummary } = require('./storeUserSummary');

// Scheduled Cloud Function
exports.scheduledUserAnalysis = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
    const usersSnapshot = await admin.firestore().collection('users').get();
    const userSummaries = [];

    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const chatData = await fetchUserChatData(userId);
        const userSummary = await generateUserSummary(chatData);

        userSummaries.push({ userId, summary: userSummary });
        await storeUserSummary(userId, userSummary);
    }

    console.log('User analysis completed:', userSummaries);
});


// Function to generate the user summary using OpenAI
async function generateUserSummary(chatData) {
  if (chatData.length === 0) {
    return "No chat data available for analysis."; // Handle cases where no chats exist
  }

  const messages = chatData.map((chat) => chat.text).join("\n");

  const response = await openai.createChatCompletion({
    model: "gpt-4o", // Use the best model available for more detailed analysis 
    messages: [{
      role: "user",
      content: `You are a learning assistant AI. Analyze these chat interactions between a student and the AI to provide a summary of the student's learning progress, areas of improvement, and any consistent misconceptions or challenges:\n${messages}`
    }],
  });

  return response.data.choices[0].message.content.trim();
}
