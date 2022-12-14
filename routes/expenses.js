var express = require("express");
var router = express.Router();

const Expense = require("../models/expense");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("expenses/index");
});
router.post("/add", (req, res, next) => {
  const { userId, name, amount, date, category } = req.body;
  console.log(userId, name, amount, date, category);
});

module.exports = router;
