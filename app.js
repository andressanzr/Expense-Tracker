const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("dotenv").config();
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const expensesRouter = require("./routes/expenses");

const User = require("./models/user");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const sessionConfig = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(flash());
app.use(session(sessionConfig));
app.use(logger("dev"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/expenses", expensesRouter);

app.all("*", (req, res, next) => {
  res.send("Not found");
});
// error handler
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message = "Unexpected error" } = err;
  res.status(statusCode).render("error", { err });
});

module.exports = app;
