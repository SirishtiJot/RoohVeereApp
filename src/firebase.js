import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxeWFgKR8uL9vCLMi5L_zBmmattp2sMiI",
  authDomain: "roohveere-5c8cc.firebaseapp.com",
  projectId: "roohveere-5c8cc",
  storageBucket: "roohveere-5c8cc.firebasestorage.app",
  messagingSenderId: "757664607107",
  appId: "1:757664607107:web:a0c76b48b7239141c124b6",
  measurementId: "G-9SCBPGFBZ4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
