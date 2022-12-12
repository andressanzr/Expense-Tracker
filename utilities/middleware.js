module.exports = {
  checkLogin: (req, res, next) => {
    if (req.user != null) {
      return next();
    } else {
      res.render("error", { err: { message: "Unauthorized" } });
    }
  },
};
