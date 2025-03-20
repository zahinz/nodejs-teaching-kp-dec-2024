import express from "express";
import cors from "cors";
import { dbCheck } from "./database/connection.js";
import appRouter from "./routes/index.js";

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const app = express();
// fix cors issue when using fetch in the frontend
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbCheck();

app.use("/", appRouter);

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
  console.log(`Environment: ${env}`);
});
