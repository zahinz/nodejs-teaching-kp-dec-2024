import path from "node:path";
import fs from "node:fs";

function home(req, res) {
  const homeHtmlPath = path.resolve("pages", "index.html");
  const homeHtml = fs.readFileSync(homeHtmlPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.send(homeHtml);
  res.end();
}

function users(req, res) {
  const username = req.params.username;
  const formatUsername = username.replaceAll("-", " ");
  // render the user page by using the parameter from the route
  const userHtmlPath = path.resolve("pages", "user.html");
  const userHtml = fs.readFileSync(userHtmlPath, "utf-8");

  const updatedHtml = userHtml.replace("[[USERNAME]]", formatUsername);
  res.setHeader("Content-Type", "text/html");
  res.send(updatedHtml);
  res.end();
}

function search(req, res) {
  const query = req.query;
  res.send(`<pre>${JSON.stringify(query, null, 2)}</pre>`);
}

function notFound(req, res) {
  const notFoundHtmlPath = path.resolve("pages", "404.html");
  const notFoundHtml = fs.readFileSync(notFoundHtmlPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.status(404).send(notFoundHtml);
  res.end();
}

const controllers = {
  home,
  users,
  search,
  notFound,
};

export default controllers;
