/********** Dependencies ***********/
const mongoose = require("mongoose");

/******** People Schema *******/
const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    moblie: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avater: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

/********** People Model ********/
const People = mongoose.model("People", peopleSchema);

/********** Module Exports ********/
module.exports = People;
