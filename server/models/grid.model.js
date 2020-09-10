const { Schema, model, Types } = require("mongoose");

const Grid = new Schema({
  // score: { type: Number, default: 0 },
  grid: { type: String },
  step: { type: Number },
  id: { type: String },
  // automata: { type: String, enum: ["gameOfLife"] },
  owner: { type: Types.ObjectId, ref: "User", required: true},
});

module.exports = model("Grid", Grid);
