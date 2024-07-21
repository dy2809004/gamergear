import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyugKN5Eu8gZVC9jpaVdLGoWINz3Cs1ko",
  authDomain: "farm2family-8032a.firebaseapp.com",
  projectId: "farm2family-8032a",
  storageBucket: "farm2family-8032a.appspot.com",
  messagingSenderId: "157311847118",
  appId: "1:157311847118:web:809c01d8d69d5be5eb9e9f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, collection, getDocs, storage, ref, getDownloadURL };
