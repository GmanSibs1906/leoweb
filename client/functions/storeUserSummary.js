const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { db } = require("./firebaseConfig");

async function storeUserSummary(userId, summary) {
  const userSummaryDoc = doc(db, "userSummaries", userId);
  await setDoc(userSummaryDoc, { summary });
}

module.exports = { storeUserSummary };
