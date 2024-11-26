// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, addDoc, collection, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGNkdb-r6z2ATekfgbnc3-aZIbeASRVQg",
  authDomain: "jobbridge-478d9.firebaseapp.com",
  projectId: "jobbridge-478d9",
  storageBucket: "jobbridge-478d9.firebasestorage.app",
  messagingSenderId: "248424778013",
  appId: "1:248424778013:web:baf40c186224d9ed0ff9f4",
  measurementId: "G-8GLM4MZYFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, auth, db, getFirestore, addDoc, collection, query, where, getDocs };