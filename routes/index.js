var express = require("express");
const { checkLogin } = require("../utilities/middleware");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Express" });
});
router.get("/controlPanel", checkLogin, function (req, res, next) {
  res.render("controlPanel/index");
});

module.exports = router;
