module.exports = {
  login: (req, res, next) => {
    req.flash(
      "success",
      `Welcome back ${req.user.firstName} ${req.user.lastName}!`
    );
    res.redirect("/");
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      console.log(err);
      req.flash("success", `Successfully loged out!`);
      res.redirect("/");
    });
  },
};
