// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUge_0O3NA5qDOKRjtnQzI40Je1O-KEvo",
  authDomain: "wastenet-59699.firebaseapp.com",
  projectId: "wastenet-59699",
  storageBucket: "wastenet-59699.appspot.com",
  messagingSenderId: "77066363002",
  appId: "1:77066363002:web:9edeba33f627d039c61bc3",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { app, db };
