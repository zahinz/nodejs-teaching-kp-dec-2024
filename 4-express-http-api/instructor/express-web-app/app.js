import express from "express";
import path from "node:path";
import fs from "node:fs";

const PORT = 3000;
const app = express();

app.get("/", function (req, res) {
  const homeHtmlPath = path.resolve("pages", "index.html");
  const homeHtml = fs.readFileSync(homeHtmlPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.send(homeHtml);
  res.end();
});

// routes parameters
app.get("/users/:username", function (req, res) {
  console.log(req.params);
  const userHtmlPath = path.resolve("pages", "user.html");
  const userHtml = fs.readFileSync(userHtmlPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.send(userHtml);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
