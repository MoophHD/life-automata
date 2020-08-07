const { Schema, model, Types } = require("mongoose");

const Grid = new Schema({
  score: { type: Number, default: 0 },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  automata: { type: String, enum: ["gameOfLife"] },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Grid", Grid);
