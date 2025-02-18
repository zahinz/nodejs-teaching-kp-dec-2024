const http = require("node:http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello from node js http server!",
    })
  );

  // create a new /contact route and respond with a JSON object
});

// listen for requests
const PORT = 3000;
server.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
