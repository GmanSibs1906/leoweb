const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD73h43t8viQo0TYait0n5Eimm2wEk38LY",
  authDomain: "leodatabase-80687.firebaseapp.com",
  projectId: "leodatabase-80687",
  storageBucket: "leodatabase-80687.appspot.com",
  messagingSenderId: "464417745012",
  appId: "1:464417745012:web:f75c796f063a48abbe0921"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { app, auth, db };
