// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuiuJ_3RoPh8M5P2n-VVEign8DXBdIEIE",
  authDomain: "node-red-sms-af32e.firebaseapp.com",
  databaseURL: "https://node-red-sms-af32e-default-rtdb.firebaseio.com",
  projectId: "node-red-sms-af32e",
  storageBucket: "node-red-sms-af32e.firebasestorage.app",
  messagingSenderId: "664745566772",
  appId: "1:664745566772:web:aa60aa1f08baf1f1d1a061"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

/* chat ID generator */
function chatIDFor(a, b) {
  return a < b ? `${a}_${b}` : `${b}_${a}`;
}

/* Auth helpers */
async function register(email, pass) {
  await createUserWithEmailAndPassword(auth, email, pass);
}

async function signIn(email, pass) {
  await signInWithEmailAndPassword(auth, email, pass);
}

/* Export everything */
export const fb = {
  auth,
  db,
  ref,
  set,
  push,
  onValue,
  register,
  signIn,
  chatIDFor
};
