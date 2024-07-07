// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyugKN5Eu8gZVC9jpaVdLGoWINz3Cs1ko",
  authDomain: "farm2family-8032a.firebaseapp.com",
  projectId: "farm2family-8032a",
  storageBucket: "farm2family-8032a",
  messagingSenderId: "157311847118",
  appId: "1:157311847118:web:809c01d8d69d5be5eb9e9f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
