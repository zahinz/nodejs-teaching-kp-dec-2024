import express from "express";
import path from "node:path";
import fs from "node:fs";

const PORT = 3000;
const app = express();

// static routes
app.get("/", function (req, res) {
  const homeHtmlPath = path.resolve("pages", "index.html");
  const homeHtml = fs.readFileSync(homeHtmlPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.send(homeHtml);
  res.end();
});

// dynamic routes
// routes parameters
app.get("/users/:username", function (req, res) {
  const username = req.params.username;
  const formatUsername = username.replaceAll("-", " ");
  // render the user page by using the parameter from the route
  const userHtmlPath = path.resolve("pages", "user.html");
  const userHtml = fs.readFileSync(userHtmlPath, "utf-8");
  const updatedHtml = userHtml.replace("[[USERNAME]]", formatUsername);
  res.setHeader("Content-Type", "text/html");
  res.send(updatedHtml);
  res.end();
});

// query parameters
app.get("/search", function (req, res) {
  const query = req.query;
  res.send(`<pre>${JSON.stringify(query, null, 2)}</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
