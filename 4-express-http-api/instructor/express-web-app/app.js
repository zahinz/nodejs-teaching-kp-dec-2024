import express from "express";
import appRouter from "./routes/index.js";
import middlewares from "./middlewares/index.js";

const PORT = 3000;
const app = express();

// use is a method that allows us to add middleware to the request handling chain
app.use("/", middlewares.logger, appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
