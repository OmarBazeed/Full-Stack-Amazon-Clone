const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//! App Config
const app = express();

//! middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//! API Routes
//*==> i am the(Frontend) iam getting the informations of session id (client secret key) from the server (backend) which creates a server.. So i go to home page of the server "/" ==> which will be my local server address with the path which i will create in the server address with post method
app.get("/", (req, res) => res.status(200).send("hello world"));

//*==> here i am sending the total price or amount from the frontend to the server using post method then send the session id (client secret key) to the frontend After dealing between the server and the Stripe
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  console.log(paymentIntent);

  //! ok - created
  //* Here Everything Is Ok So I Send The clientSecret To The Frontend To Use it With Stripe And Complete The Purchasing Process (Confirmation)
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//! example endpoint ===> ((- firebase emulators:start --only functions -))
//! http://127.0.0.1:5001/clone-28b89/us-central1/api

//! listen command
exports.api = functions.https.onRequest(app);

// ** Explanation **
//  فى النهايه خالص انا كل الى عملته انى عملت سيرفير خاص بشغل الباك اند و دا باستخدام الفانكشنز بتاع الفيير بييز (فير بييز اينيت) و بتكمل علشان تستخدم الفانكشنز و تعمل سيرفير و عشلان تجيب العنوان بتاعه --> firebase emulators:start --only functions
// بعدين العمليه كلها بتتوقف على انك تبعت من الفرونت اند السعر الكلى الى هتشترى بيه علشان الاستريب ياكد عمليه الخصم من الحساب تمام يبقى كدا هتروح للفرونت و تستخدم الاكسيوس مثلا و تبعت السعر الكلى للسيرفير علشان يرد عليك (السيكريت كى) الى هو بيجيبه من الاستريب تمام.. فتروح انتا كفرونت  تستخدمه مع الاستريب علشان تاكد عمليه الشراء
