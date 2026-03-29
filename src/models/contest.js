const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Contest", contestSchema);
