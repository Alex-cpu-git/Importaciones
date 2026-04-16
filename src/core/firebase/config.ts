import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgEZrlvqTET0YrJ2V7G0cSHfyG2ne7WlU",
  authDomain: "clothes-945d3.firebaseapp.com",
  projectId: "clothes-945d3",
  storageBucket: "clothes-945d3.firebasestorage.app",
  messagingSenderId: "495036502034",
  appId: "1:495036502034:web:dc41b0ce86f1a2d0e948cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);

export default app;
