const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 8888;

// home route
app.get("/", function (req, res) {
  return res.status(200).write("<h1>Hello from express js server!</h1>");
});

// contact route
app.get("/contact", function (req, res) {
  return res.status(200).write("<h1>Contact us at: 012-3456789</h1>");
});

// not found route
app.use(function (req, res) {
  const pathNotFoundPage = path.join("pages", "404.html");
  const notFoundPage = fs.readFileSync(pathNotFoundPage, "utf-8");
  return res.status(404).write(notFoundPage);
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
