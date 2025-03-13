import { Router } from "express";
import userController from "../controllers/user.js";
import isAuthenticated from "../middleware/isAuth.js";

const appRouter = Router();

appRouter.post("/register", userController.register);
appRouter.post("/login", userController.login);

// test routes for authorization
appRouter.get("/public", userController.testPublic);

//  private route
appRouter.get("/private", isAuthenticated, userController.testPrivate);
appRouter.get("/private-2", isAuthenticated, userController.testPrivate);

export default appRouter;
