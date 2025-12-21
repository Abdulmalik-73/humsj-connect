import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCILMZTgXinp906SDC_3tyvsFTgYhD9Y5A",
  authDomain: "humsj-external-affairs.firebaseapp.com",
  projectId: "humsj-external-affairs",
  storageBucket: "humsj-external-affairs.firebasestorage.app",
  messagingSenderId: "986132541110",
  appId: "1:986132541110:web:047d8203e698b05b6bc017",
  measurementId: "G-2C3W5WQEYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
