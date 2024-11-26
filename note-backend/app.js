const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(middleware.requestLogger);
app.use(express.json());

const notesRouter = require("./controllers/note");
const userRouter = require("./controllers/user");

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
