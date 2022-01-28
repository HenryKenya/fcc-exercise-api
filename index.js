// Imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const port = 3000;

// Base config
const app = express();

// Middle ware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Db set up
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema, model } = mongoose;

// todo: refactor so that these are from functions instead
const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true },
});

const logSchema = new Schema({
  username: { type: String, required: true },
  count: Number,
  log: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

const exerciseModel = model("Exercise", exerciseSchema);
const userModel = model("User", userSchema);
const logModel = model("Log", logSchema);

// Routes
app.get("/", (request, response) => {
  response.send("Hello world");
});

// User
app.post("/api/users", (request, response) => {
  const { username } = request.body;

  response.json({ status: 200, user: username });
});
app.get("/api/users", (req, res) => {
  res.send("Return all users");
});

// Exercise
app.post("/api/:_id/exercises", (request, response) => {
  // Todo: post exercise attached to a user
});

app.get("/api/users/:_id/logs", (req, res) => {
  res.send(
    "Returns an object with the count property of how many exercise belong to that user"
  );
});

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
});
