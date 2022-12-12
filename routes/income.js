var express = require("express");
var router = express.Router();

const Expense = require("../models/expense");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("");
});
router.post("/add", (req, res, next) => {
  const { userId, amount, date, category } = req.body;
  console.log(userId, amount, category);
});

module.exports = router;
