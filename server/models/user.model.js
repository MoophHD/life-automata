const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  provider: {
    type: String,
    enum: ["Local", "Google", "Github"],
    required: true,
  },
  providerId: String
});

module.exports = model("User", User);
