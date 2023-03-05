import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD2_AnvYfwN5AOHXTou4CuJV3ggA4zDjFM",
  authDomain: "hoyochat.firebaseapp.com",
  projectId: "hoyochat",
  storageBucket: "hoyochat.appspot.com",
  messagingSenderId: "797519743437",
  appId: "1:797519743437:web:7c2ae78a39d96a097d9c84",
  measurementId: "G-2LM4HMXHKN"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)