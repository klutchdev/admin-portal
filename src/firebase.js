import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCjLgAX5zTmOoITvQiApdH3-zpbhX7H-fQ",
  authDomain: "babajan-manage.firebaseapp.com",
  databaseURL: "https://babajan-manage.firebaseio.com",
  projectId: "babajan-manage",
  storageBucket: "babajan-manage.appspot.com",
  messagingSenderId: "541779636128",
  appId: "1:541779636128:web:1a9a813728bf6cc570bec5",
  measurementId: "G-XLME7XL87W",
};

firebase.initializeApp(firebaseConfig);

// firebase.initializeApp({
//   apiKey: process.env.FIREBASE_API,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGE_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// });

export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;
