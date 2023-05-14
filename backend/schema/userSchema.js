//Dependancies
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  signUpDate: {
    type: Date,
    default: Date.now,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
      // Should be required
      // required : true,
    },
  ],
});

module.exports = userSchema;
