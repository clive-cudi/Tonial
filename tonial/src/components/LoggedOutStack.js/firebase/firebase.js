import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhOaApQC4bvyk0ZGdNQIlj1KGQVFJD_0w",

  authDomain: "tonial-app-tercy.firebaseapp.com",

  projectId: "tonial-app-tercy",

  storageBucket: "tonial-app-tercy.appspot.com",

  messagingSenderId: "267160040503",

  appId: "1:267160040503:web:aceb7d1dd7952539e83bb2",

  measurementId: "G-07182Y9VRS",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();

export { db, storage };
