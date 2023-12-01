import express from "express";
import admin from "firebase-admin";
// import { initializeApp } from "firebase/app";
import serviceAccount from "./social-media-7bd5c-firebase-adminsdk-syy9r-4634753782.json" assert { type: "json" };

// const admin = require("firebase-admin");
// const token = require("./google-services.json");

const routes = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

routes.post("/send-notification", (req, res) => {
  const registrationTokens = req.body.registrationTokens; // Array of FCM tokens
  const webTokens = req.body.webTokens;
  // const msgBody = toString(req.body.message); //?changes done here converted value into string

  const message = {
    data: {
      messageType: "newMessage",
      sender: "John Doe",
      messageContent: "Hello, how are you?",
    },
    notification: {
      title: "Title n",
      body: "Welcome to social Network",
    },
  };

  const androidPromise = admin
    .messaging()
    .sendToDevice(registrationTokens, message);
  // const webPromise = admin.messaging().sendToDevice(webTokens, message);
  const webPromise = admin.messaging().sendToDevice(webTokens, message);
  webPromise
    .then((webResponse) => {
      console.log("Successfully sent web message:", webResponse);
    })
    .catch((webError) => {
      console.error("Error sending web message:", webError);
    });

  console.log("Web Tokens:", webTokens);

  Promise.all([androidPromise, webPromise])
    .then((responses) => {
      console.log("Successfully sent messages:", responses);

      res.send("Notifications sent successfully");
    })
    .catch((error) => {
      console.error("Error sending messages:", error);
      res.status(500).send("Error sending notifications");
    });
});

export default routes;
