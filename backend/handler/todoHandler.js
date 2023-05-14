//Dependancies
const express = require("express");
const mongoose = require("mongoose");
const todos = express.Router();

//Internal imports
const todoSchema = require("../schema/todoSchema");
const userSchema = require("../schema/userSchema");
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// Show All Todo
todos.get("/", (req, res) => {
  Todo.find({ user: req.id })
    .select({
      __v: 0,
    })
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({
        message: "Data not found",
      })
    );
});

// Create Todo
todos.post("/new", (req, res) => {
  const newTodo = new Todo({ ...req.body, user: req.id });
  newTodo
    .save()
    .then(() => {
      User.updateOne(
        { _id: req.id },
        {
          $push: { todos: newTodo._id },
        }
      ).then();
    })
    .then(() => {
      res.status(200).json("Todo created Successfully");
    })
    .catch(() => res.status(500).json({ message: "There was an error" }));
});

// Show Todo
todos.get("/:id", (req, res) => {
  Todo.find({ _id: req.params.id })
    .select({ __v: 0 })
    .then((data) => res.status(200).json({ result: data }))
    .catch(() =>
      res.status(500).json({
        message: "Data not found",
      })
    );
});

// Update Todo
todos.put("/:id", (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then(() => res.status(200).json({ message: "Updated Successfully" }))
    .catch(() =>
      res.status(500).json({ message: "An Error Occured to Update" })
    );
});

// Delete Todo
todos.delete("/:id", (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted Successfully" }))
    .catch(() =>
      res.status(500).json({ message: "An Error Occured to Delete" })
    );
});

module.exports = todos;
