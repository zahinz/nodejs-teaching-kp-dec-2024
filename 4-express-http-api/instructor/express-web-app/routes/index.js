import express from "express";
import controllers from "../controllers/index.js";

const appRouter = express.Router();
// static routes
appRouter.get("/", controllers.home);
// dynamic routes
// routes parameters
appRouter.get("/users/:username", controllers.users);
// query parameters
appRouter.get("/search", controllers.search);
// not found route
appRouter.get("*", controllers.notFound);

export default appRouter;
