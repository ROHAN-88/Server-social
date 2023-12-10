import express from "express";
import admin from "firebase-admin";
import serviceAccount from "./social-media-7bd5c-firebase-adminsdk-syy9r-4634753782.json" assert { type: "json" };
import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const routes = express.Router();
// //!admin intialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

routes.post("/send-notification", (req, res) => {
  const registrationTokens = req.body.registrationTokens; // Array of FCM tokensf
  // //!firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC_4tf_Pr893pTdV76GqYi6Jigx5J639p0",
    authDomain: "social-media-7bd5c.firebaseapp.com",
    projectId: "social-media-7bd5c",
    storageBucket: "social-media-7bd5c.appspot.com",
    messagingSenderId: "614443793608",
    appId: "1:614443793608:web:67de309e814ce222ac39fd",
    measurementId: "G-MHF79B99JG",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);

  const message = {
    notification: {
      title: "John Doe",
      body: "Hello, how are you?",
    },
    token: registrationTokens,
  };

  //!firebase -1
  //   console.log("It's me android token");
  //   const androidPromise = admin.messaging().send(message);
  //   // const webPromise = admin.messaging().sendToDevice(webTokens, message);
  //   console.log("It's me web token");
  //   const webPromise = admin.messaging().send(message);

  //   webPromise
  //     .then((webResponse) => {
  //       console.log("Successfully sent web message:", webResponse);
  //     })
  //     .catch((webError) => {
  //       console.error("Error sending web message:", webError);
  //     });
  //   console.log("Web Tokens:", webTokens);
  //   Promise.all([androidPromise, webPromise])
  //     .then((responses) => {
  //       console.log("Successfully sent messages:", responses);
  //       res.status(200).send("Notifications sent successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error sending messages:", error);
  //       res.status(500).send("Error sending notifications");
  //     });
  //!firebase-2
  // Send a message to the device corresponding to the provided
  // registration token.
  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});

export default routes;
