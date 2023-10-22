import express from "express";
import "dotenv/config";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import userRoute from "./src/routes/user/user.route.js";
import authRoute from "./src/routes/auth/auth.route.js";
import GoogleAuth from "./src/auth/auth.google.js";
import Google from "passport-google-oauth20";
import User from "./src/models/user.model.js";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const GoogleStrategy = Google.Strategy;
// middleware configuration
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24,
    },
  })
);

//! setup Psssport middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate("session"));
GoogleAuth();

// Route configuration
app.use(userRoute);
app.use("/auth", authRoute);

export default app;
