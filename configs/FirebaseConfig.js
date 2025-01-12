import { initializeApp } from "firebase/app";
import  {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "niu-gossip.firebaseapp.com",
  projectId: "niu-gossip",
  storageBucket: "niu-gossip.appspot.com",
  messagingSenderId: "801433210710",
  appId: "1:801433210710:web:5273ee3b534d508920d0f7",
  measurementId: "G-QSE46K5XBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);