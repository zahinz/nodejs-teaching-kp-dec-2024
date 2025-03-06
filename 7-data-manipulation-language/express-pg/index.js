import express from "express";
import appRouter from "./routes/index.js";
import { checkDatabaseConnection } from "./database/connection.js";

const server = express();
const PORT = 8080;

checkDatabaseConnection();
server.use("/", appRouter);

server.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
