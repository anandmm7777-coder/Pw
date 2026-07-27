// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFL7Qsh0s4k-5UK0dQc8jHgzIh7HSqPLU",
  authDomain: "fir-39286.firebaseapp.com",
  projectId: "fir-39286",
  storageBucket: "fir-39286.firebasestorage.app",
  messagingSenderId: "412102812344",
  appId: "1:412102812344:web:c6cf773b826ee3ea304a4d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);