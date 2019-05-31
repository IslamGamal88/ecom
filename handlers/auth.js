const { User } = require("../models");
const { secretKey } = require("../config/keys");
const jwt = require("jsonwebtoken");
const validateSignup = require("../validation/register");

exports.login = async (req, res, next) => {
  try {
    // import validation function
    const { errors, isValid } = validateLogin(req.body);

    let user = await User.findOne({ email: req.body.email });
    let { id, username, email } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({ id, username, email }, secretKey);
      return res.status(200).json({ token, id, username, email });
    } else {
      errors.email = "Invalid Username/Password";
      return next({ status: 400, message: "Invalid Username/Password" });
      //   return res.status(400).json(errors);
    }
  } catch (error) {
    return next({ status: 400, message: "Invalid Username/Password" });
  }
};

exports.signup = async function(req, res, next) {
  try {
    // import validation function
    const { errors, isValid } = validateSignup(req.body);
    // destructure required fields
    const { username, password, email } = req.body;
    // check validation
    if (!isValid) return res.status(400).json(errors);
    // signup new user
    let user = await User.create({ username, password, email });
    return res.status(200).json({ message: "Register complete!" });
  } catch (error) {
    if (error.code === 11000) {
      errors.duplicate = "Sorry , that Username and/or Email is already taken";
    }
    return res.status(400).json(errors);
  }
};
