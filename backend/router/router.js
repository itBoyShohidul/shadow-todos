// Dependancies
const express = require("express");

// Internals
const router = express.Router();
const userHandler = require("../handler/userHandler");
const todoHandler = require("../handler/todoHandler");
const checkLogin = require("../middlewares/checkLogin");

// Conifgs

router.get("/", (req, res) => {
  res.send("Hello to Shadow World");
});

// User route
router.use("/user", userHandler);

// Todo Route
router.use("/todo", checkLogin, todoHandler); // ==> Private / Protected

module.exports = router;
