import admin from "firebase-admin"
import { initializeApp } from "firebase/app";
import * as serviceAccount from './service-account.json';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "tigrinhos-fiec.firebaseapp.com",
    projectId: "tigrinhos-fiec",
    storageBucket: "tigrinhos-fiec.appspot.com",
    messagingSenderId: "119350795797",
    appId: "1:119350795797:web:85143a803ed23dde13b81c"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://tigrinhos-fiec-default-rtdb.firebaseio.com"
 });

 export {
    firebaseAdmin,
    firebaseApp
 }