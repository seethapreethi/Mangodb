const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  username: { type: String, unique: true }, 
});

module.exports = mongoose.model("User", userSchema);
