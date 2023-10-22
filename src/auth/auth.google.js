import passport from "passport";
import Google from "passport-google-oauth20";
import User from "../models/user.model.js";
import "dotenv/config.js";
const GoogleStrategy = Google.Strategy;

const GoogleAuth = () => {
  passport.serializeUser(async (user, done) => {
    // console.log("serializeUser", user);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    // console.log("deserializeUser", user);
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const data = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        };
        const user = await User.findOne({ googleId: data.id });
        if (!user) {
          const newUser = new User({
            email: data.email,
            googleId: data.id,
            name: data.name,
            photoUrl: data.photo,
          });
          const newuserData = await newUser.save();
          // console.log("newuserData", newuserData);
          return done(null, newuserData);
        } else {
          // console.log(`user exists`, user);
          return done(null, user);
        }
      }
    )
  );
};

export default GoogleAuth;
