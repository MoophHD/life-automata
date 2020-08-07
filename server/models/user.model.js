const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  grids: [{ type: Types.ObjectId, ref: "Grid" }],
  provider: {
    type: String,
    enum: ["Local", "Google", "Github"],
    required: true,
  },
});

module.exports = model("User", User);
