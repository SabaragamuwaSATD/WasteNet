// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "reactnative-603c4.firebaseapp.com",
//   projectId: "reactnative-603c4",
//   storageBucket: "reactnative-603c4.appspot.com",
//   messagingSenderId: "1019095881653",
//   appId: "1:1019095881653:web:8e9a26dbc60485208bebfc",
//   measurementId: "G-00B6YDJJ7Z",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// //const analytics = getAnalytics(app);
