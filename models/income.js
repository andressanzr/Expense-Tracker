const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Work", "Unemployment benefit", "Pension", "Self-employed", "Other"],
    required: true,
  },
});

module.exports = mongoose.model("Income", IncomeSchema);
