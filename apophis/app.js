var createError = require("http-errors");
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var dotenv = require("dotenv");
var logger = require("morgan");
var authRouter = require("./routes/auth");

var indexRouter = require("./routes/index");

dotenv.config();
var app = express();

const { sequelize } = require("./models");

/** alter: true를 해줘야 데이터베이스에 수정이 반영됨 */
sequelize
  .sync({
    alter: false,
  })
  .then(() => {
    console.log("데이터베이스 연결 성공.");
  })
  .catch((error) => {
    console.error(error);
  });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use("/", indexRouter);
app.use("/auth", authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
