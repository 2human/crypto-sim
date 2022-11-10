const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema); //collection name, schema for collection; 2 arguments loads into mongoose
