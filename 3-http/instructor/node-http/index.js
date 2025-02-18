const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

let visitorCount = 0;
const server = http.createServer(function (req, res) {
  console.log(`Current visitor count: ${visitorCount}`);
  console.log(`You vsitor number ${visitorCount + 1}`);

  const ipAddress = req.connection.remoteAddress;
  console.log(`Visitor IP Address: ${ipAddress}`);
  // create a new /contact route and respond with a JSON object
  const url = req.url;
  if (url === "/") {
    visitorCount++;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello from node js http server!",
      })
    );
    return;
  } else if (url === "/whatsapp") {
    visitorCount++;
    res.writeHead(301, { Location: "https://wa.me/60196974200" });
    res.end();
    return;
  } else {
    const pathNotFoundPage = path.join("pages", "404.html");
    const notFoundPage = fs.readFileSync(pathNotFoundPage, "utf-8");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(notFoundPage);
    return;
  }
});

// listen for requests
const PORT = 3000;
server.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
