const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
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
    enum: [
      "Food",
      "Clothes",
      "Transportation",
      "Rent",
      "Travel",
      "Taxes",
      "Bills",
      "Othe",
    ],
    required: true,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
