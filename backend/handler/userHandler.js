// Dependancies
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

// Internals
const userRoute = express.Router();
const userSchema = require("../schema/userSchema");
const User = mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");

userRoute.get("/", (req, res) => {
  res.send("Hello to user");
});

// Sign Up
userRoute.post(
  "/signup",
  // Body validation checking
  [
    body("firstName").notEmpty().withMessage("firstName Property is required."),
    body("lastName").notEmpty().withMessage("lastName Property is required."),
    body("username").notEmpty().withMessage("username Property is required."),
    body("email").notEmpty().withMessage("email Property is required."),
    body("password").notEmpty().withMessage("password Property is required."),
  ],

  async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Body validation Result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const isExist = await User.find({ username: username });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isExist <= 0) {
      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });
      await newUser
        .save()
        .then(() => {
          res.status(200).send("New user created");
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    } else {
      res.status(500).send("User All ready exist");
    }
  }
);

// Login
userRoute.post(
  "/login",
  // Body validation checking
  [
    body("username").notEmpty().withMessage("username Property is required."),
    body("password").notEmpty().withMessage("password Property is required."),
  ],
  async (req, res) => {
    // Body validation Result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
      const { username, password } = req.body;
      const users = await User.find({ username: username });
      const user = users[0];
      const isUserValid = await bcrypt.compare(password, user.password);

      if (isUserValid) {
        const token = await jwt.sign(
          { username: username, userID: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "15 days",
          }
        );

        res.json({
          token_access: token,
          message: "Token created successfully",
        });
      } else {
        res.status(500).send("Authentication failed");
      }
    } catch {
      res.status(500).send("User not found");
    }
  }
);

// Show all users as super admin
userRoute.get("/admin", checkLogin, (req, res) => {
  User.find()
    .select({ __v: 0 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error finding user");
    });
});

module.exports = userRoute;
