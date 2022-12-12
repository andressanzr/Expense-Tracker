const Expense = require("../models/expense");

module.exports = {
  addExpense: (req, res, next) => {
    const { userId, name, amount, date, category } = req.body;
    new Expense();
  },
};
