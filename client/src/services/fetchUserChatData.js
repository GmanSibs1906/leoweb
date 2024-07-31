// fetchUserChatData.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchUserChatData = async (userId) => {
  const q = query(collection(db, "users", userId, "chats"));
  const querySnapshot = await getDocs(q);
  const chatData = [];
  querySnapshot.forEach((doc) => {
    chatData.push(doc.data());
  });
  return chatData;
};
