// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs,addDoc, collection, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj6JmQdm6ar_TBJP8SzMuCGjXfrg46LAo",
  authDomain: "jobbrigde.firebaseapp.com",
  databaseURL: "https://jobbrigde-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jobbrigde",
  storageBucket: "jobbrigde.firebasestorage.app",
  messagingSenderId: "544915427605",
  appId: "1:544915427605:web:41a890a5ed95bc3112591c",
  measurementId: "G-BC5R8VEMKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db, getFirestore, addDoc, collection, query, where, getDocs};