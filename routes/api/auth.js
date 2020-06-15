const express = require("express");
const router = express.Router();
const AuthService = require("../../services/auth");
const authService = new AuthService();

router.post("/signin", async function (req, res, next) {
  let { email, password } = req.body;

  try {
    const { token, error } = await authService.signin({ email, password });
    if (token) {
      res.status(200).json({
        data: token,
        message: "User loged",
      });
    } else {
      res.status(400).json({
        message: error,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async function (req, res, next) {
  let { name, email, password } = req.body;

  try {
    const response = await authService.signup({
      name,
      email,
      password,
    });
    if (response.token) {
      res.status(200).json({
        data: response,
        message: "Registered user",
      });
    } else {
      res.status(400).json({
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
