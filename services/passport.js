const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //single argument loads data out of users

passport.serializeUser((user, done) => {
  console.log("serializing");
  //done is the callback onSuccess
  done(null, user.id); //user id is Mongo DB id key, and will be the data contained within the cookie
});

passport.deserializeUser((id, done) => {
  console.log("deserializing");
  User.findById(id).then(user => {
    if (user) {
      done(null, user);
    } else {
      done(null, {});
    }
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //makes it so https works
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({ googleId: profile.id }).save();
        done(null, newUser);
      }
    }
    // (accessToken, refreshToken, profile, done) => {
    //   console.log("1", accessToken);
    //   console.log("2", refreshToken);
    //   console.log("3", profile);
    // }
  )
);
