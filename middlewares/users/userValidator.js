/********** Dependencies ************/
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

/********* import User models ******/
const User = require("../../models/people");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("moblie")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be bangladeshi number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Moblie number already exists");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "password must be 8 characters long and should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
    ),
];

/***** user validation handler ******/
const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove upload file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    //  response the errors
    res.status(500).json({ errors: mappedErrors });
  }
};

/********** Module exports ************/
module.exports = { addUserValidator, addUserValidationHandler };
