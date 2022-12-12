const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const userController = require("../controllers/user");

router.get("/signUp", function (req, res, next) {
  res.render("user/signup");
});
router.post("/signUp", async function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const registeredUser = await User.register(
    new User({ firstName, lastName, email }),
    password
  );
  req.login(registeredUser, (err) => {
    if (err) return err;
    res.redirect("/");
  });
});
router.post("/logout", userController.logout);

router
  .route("/login")
  .get(async (req, res, next) => {
    res.render("user/login");
  })
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/user/login",
    }),
    userController.login
  );

module.exports = router;
