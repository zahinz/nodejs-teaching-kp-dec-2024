import express from "express";
import { dbCheck } from "./database/connection.js";

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const app = express();

dbCheck();

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
  console.log(`Environment: ${env}`);
});
