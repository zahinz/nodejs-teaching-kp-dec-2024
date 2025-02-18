const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer(function (req, res) {
  // create a new /contact route and respond with a JSON object
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello from node js http server!",
      })
    );
  } else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Contact data",
      })
    );
  } else {
    const pathNotFoundPage = path.join("pages", "404.html");
    const notFoundPage = fs.readFileSync(pathNotFoundPage, "utf-8");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(notFoundPage);
  }
});

// listen for requests
const PORT = 3000;
server.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
