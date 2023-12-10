// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken } from "firebase/messaging";\
// import express from "express"

// //!express
// const router = express.Router();

// //!firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyC_4tf_Pr893pTdV76GqYi6Jigx5J639p0",
//   authDomain: "social-media-7bd5c.firebaseapp.com",
//   projectId: "social-media-7bd5c",
//   storageBucket: "social-media-7bd5c.appspot.com",
//   messagingSenderId: "614443793608",
//   appId: "1:614443793608:web:67de309e814ce222ac39fd",
//   measurementId: "G-MHF79B99JG",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);
// // Add the public key generated from the console here.
// getToken(messaging, {
//   vapidKey:
//     "BH3sSdjzRW67NSTp0f3XazcnEnjmxDrgTCC2JpKihRjzWz1Jl213qvlQ0bj3hFlyxUdoxrbxboB4xFmushPFxZg",
// });

// router.post("/send-notification", (req, res) => {

// res.status(200).send("hello world")
// })
