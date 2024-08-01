const { getFirestore, collection, getDocs, query, where } = require("firebase/firestore");
const { db } = require("./firebaseConfig");

async function fetchUserChatData(userId) {
  const q = query(collection(db, "chats"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  let chatData = [];
  querySnapshot.forEach((doc) => {
    chatData.push(doc.data());
  });
  return chatData;
}

module.exports = { fetchUserChatData };
