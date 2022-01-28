// Imports
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const res = require("express/lib/response");
const port = 3000;

// Base config
const app = express();

// Middle ware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (request, response) => {
  response.send("Hello world");
});
app.post("/api/users", (request, response) => {
  const { username } = request.body;
  response.json({ status: 200, user: username });
});

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
});
