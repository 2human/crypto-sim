const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User"); //this needs to be loaded first so that the schema is created
require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

// app.use sets up middleware, which alters the data of every request without having to manually alter data
app.use(
  //tells app to use cookies, populatiing req.session property, which passport then accesses
  cookieSession({
    maxAge: THIRTY_DAYS,
    keys: [keys.cookieKey],
  })
);

//tells passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("this is the main page");
});

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js
  app.use(express.static(path.join(__dirname, "client/build")));
  // Express will serve up index.html when route not recognized
  // ordered last so that others will be used if exists
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
