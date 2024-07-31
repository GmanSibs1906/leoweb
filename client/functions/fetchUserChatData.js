const { getFirestore, collection, getDocs, query, where } = require("firebase/firestore");
const { db } = require("./firebaseConfig");

async function fetchUserChatData(userId) {
  const chatsRef = collection(db, "users", userId, "chats");  
  const querySnapshot = await getDocs(chatsRef);
  let chatData = [];
  querySnapshot.forEach((doc) => {
    chatData.push(doc.data());
  });
  return chatData;
}

module.exports = { fetchUserChatData };
