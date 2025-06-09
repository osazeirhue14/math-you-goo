// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9M20hXPSd0pAikPEMfqGqILzvXm381cY",
  authDomain: "math-you-goo.firebaseapp.com",
  projectId: "math-you-goo",
  storageBucket: "math-you-goo.firebasestorage.app",
  messagingSenderId: "708580144689",
  appId: "1:708580144689:web:7c98307995755ca1614710",
  measurementId: "G-PEDDBS89KV"
};

// Initialize Firebase only if there are no other instances
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
