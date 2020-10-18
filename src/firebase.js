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
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const functions = firebase.functions();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetchin user");
  }
};

export default firebase;
