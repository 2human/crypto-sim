const express = require("express");
const passport = require("passport");
require("./services/passport");

const app = express();

app.get("/", (req, res) => {
  res.send("this is the main page");
});

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
