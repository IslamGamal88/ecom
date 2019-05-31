const mongoose = require("mongoose");
const { mongoURI } = require("../config/keys");
const User = require("./User");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: true
  })
  .then(done => {
    console.log("done");
  })
  .catch(err => console.log("err", err));

module.exports.User = User;
