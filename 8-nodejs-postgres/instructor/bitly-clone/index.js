import express from "express";
import { dbCheck } from "./database/connection.js";
import appRouter from "./routes/index.js";

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbCheck();

app.use("/", appRouter);

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
  console.log(`Environment: ${env}`);
});
