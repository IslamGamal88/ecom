const express = require("express");
const router = express.Router();
const { signup, login } = require("../handlers/auth");
// signup route
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
