const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { auth } = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.createLogin = functions.firestore
  .document("account-requests/{docId}")
  .onCreate((snap, context) => {
    const userData = snap.data();

    const userID = context.auth.uid;

    db.collection("registered-users")
      .doc(`${userID}`)
      .set({
        ...userData,
        userID: userID,
        memberSince: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() =>
        admin
          .auth()
          .createUser({
            uid: userID,
            email: userData.email,
            emailVerified: false,
            phoneNumber: userData.phone,
            password: "secretPassword",
            displayName: userData.firstName,
            photoURL: "",
            disabled: false,
          })
          .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
          })
          .catch(function (error) {
            console.log("Error creating new user:", error);
          })
      );
  });
