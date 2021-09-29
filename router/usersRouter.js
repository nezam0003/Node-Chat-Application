/********** Dependencies ************/
const express = require("express");
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

const router = express.Router();

/******* Users page ********/
router.get("/", decorateHtmlResponse("Users"), getUsers);

/********* Add user ********/
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

/********* Module exports ********/
module.exports = router;
