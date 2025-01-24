// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX5FO0jqkShqG9xJlrYG3ridZcz0Th8Gk",
  authDomain: "snazzmart-onlinestore-client.firebaseapp.com",
  projectId: "snazzmart-onlinestore-client",
  storageBucket: "snazzmart-onlinestore-client.firebasestorage.app",
  messagingSenderId: "815095142458",
  appId: "1:815095142458:web:215f3e4bcaad2cf9dbfd03",
  measurementId: "G-R1NMMTKQ99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);