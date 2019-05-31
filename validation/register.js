const isEmpty = require("./generics/isEmpty");
const Validator = require("validator");

module.exports = validateSignup = data => {
  const errors = {};

  // check if inputs are empty
  data.email = isEmpty(data.email) ? "" : data.email;
  data.username = isEmpty(data.username) ? "" : data.username;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confPassword = isEmpty(data.confPassword) ? "" : data.confPassword;

  // validate username input
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required.";
  }

  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username can only contain letters and numbers.";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters.";
  }

  // validate password input
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be atleast 8 characters.";
  }

  // validate confPassword
  if (Validator.isEmpty(data.confPassword)) {
    errors.confPassword = "Confirm Password field is required.";
  }

  if (!Validator.equals(data.confPassword, data.password)) {
    errors.confPassword = "Passwords must match.";
  }

  // validate email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
