const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const { fetchUserChatData } = require('./fetchUserChatData');
const { analyzeUserChat } = require('./analyzeUserChat');
const { storeUserSummary } = require('./storeUserSummary');

exports.scheduledUserAnalysis = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const usersSnapshot = await admin.firestore().collection('users').get();
  usersSnapshot.forEach(async (userDoc) => {
    const userId = userDoc.id;
    const chatData = await fetchUserChatData(userId);
    const summary = await analyzeUserChat(chatData);
    await storeUserSummary(userId, summary);
  });
  console.log('User analysis completed');
});
