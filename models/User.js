const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 12;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function(plainPassword, next) {
  try {
    let isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

module.exports = User = mongoose.model("User", userSchema);
