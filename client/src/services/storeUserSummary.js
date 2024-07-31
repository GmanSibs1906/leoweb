// storeUserSummary.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const storeUserSummary = async (userId, summary) => {
  await setDoc(doc(db, "users", userId), { summary }, { merge: true });
};
