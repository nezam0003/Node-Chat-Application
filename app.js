/*********** Dependencies **********/
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

/******* Connect to Database ********/
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

/******* Request Parsers ********/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/********** Set view engine **********/
app.set("view engine", "ejs");

/******* set static folder ********/
app.use(express.static(path.join(__dirname, "public")));

/******* Parse cookies ********/
app.use(cookieParser(process.env.COOKIE_SECRET));

/********** Router setup *********/
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

/************ 404 not found Handler ***********/
app.use(notFoundHandler);

/************ common error Handler ***********/
app.use(errorHandler);

/************ server start ************/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
