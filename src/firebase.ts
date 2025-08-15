// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `AIzaSyDt-TQLLS92drzP8Ph8_hQAjvbaooh0LWA`,
  authDomain: `
lms-project-f5593.firebaseapp.com`,
  projectId: `
lms-project-f5593`,
  storageBucket: `
lms-project-f5593.appspot.com`,
messagingSenderId: "593035277317",
appId: "1:593035277317:web:fac8cb0a5cf731f89c186c",
measurementId: "G-QXS0G6SXGQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
