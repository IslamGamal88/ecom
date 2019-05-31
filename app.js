// libs
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 8000;
const db = require("./models");
const authRoutes = require("./routes/auth");
const errorHandler = require("./handlers/error");
const app = express();

// app setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./handlers/passport-jwt")(passport);

// routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);

// Not found wild card
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on  port ${port}`);
});
