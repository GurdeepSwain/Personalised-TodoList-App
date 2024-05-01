import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpmydPrlxwfyl3uZJpMcLZVE0NwNJf_Us",
  authDomain: "personalised-todo-app.firebaseapp.com",
  databaseURL: "https://personalised-todo-app-default-rtdb.firebaseio.com",
  projectId: "personalised-todo-app",
  storageBucket: "personalised-todo-app.appspot.com",
  messagingSenderId: "108574939604",
  appId: "1:108574939604:web:03260edf8bf435f0955e41",
  measurementId: "G-57L635YDJR"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
